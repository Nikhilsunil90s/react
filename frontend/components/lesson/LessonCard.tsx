import React, { useState, useEffect } from 'react'
import API from 'utils/API'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Image from 'material-ui-image'
import LockIcon from '@material-ui/icons/LockOpen'
import TextTruncate from 'react-text-truncate'
import { Auth } from 'aws-amplify'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 10,
        width: 345,
        background: theme.palette.primary.light,
        color: theme.palette.primary.main,
        overflow: 'hidden',
        transition: 'all 1s',
        position: 'relative',
        cursor: 'pointer',
        '&:hover': {
            opacity: .6
        },
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
    },
    lockWrapper : {
        background: theme.palette.primary.main,
        opacity: .2,
    },
    buttonWrapper: {
        width: 345,
        marginTop: 20,
        fontWeight: 600,
        display: 'flex',
        justifyContent: 'center',

    },
}))

interface LessonType {
    id:number,
    thumbnail:string,
    video:string,
    duration:string,
    title:string,
    description:string
    courseId:number
}

interface LessonCardProps {
    lesson:LessonType
    isAdmin?:boolean
    showLessonModal(e:LessonType):void,
    handleDelete?(e:any): void,
    handleEdit?(e:any):void
}

const LessonCard: React.FC<LessonCardProps>= ({lesson, isAdmin, showLessonModal, handleDelete, handleEdit}) => {
  const classes = useStyles();
  const [enrolled, setEnrolled]= useState<boolean>(false)
  const [thumbnail, setThumbnail]= useState(null)

  useEffect(() => {
    isUserEnrolled()
    retrieveThumbnail()
  }, [lesson])

    const isUserEnrolled= async () => {

        const user= await Auth.currentUserInfo()

        API({
            method: 'POST', 
            url: '/enroll/item', 
            data: {course_id: lesson.courseId, email: user.attributes.email}
        })
        .then( response => {
            if(response.data.success)
                setEnrolled(true)
            else
                setEnrolled(false)
        })
        .catch( err => {
            setEnrolled(false)
        })
    }

    const retrieveThumbnail= () => {
        
        API({
            method: 'GET',
            url: '/media/'+lesson.thumbnail,
            responseType: 'arraybuffer'
            
          })
          .then( response => {
            
            const base64Str = btoa(
                new Uint8Array(response.data).reduce(
                  (data, byte) => data + String.fromCharCode(byte),
                  '',
                ),
            );  
            let image= `data:image/${lesson.thumbnail.substring(lesson.thumbnail.lastIndexOf('.')+1)};base64, ${base64Str}`
            setThumbnail(image)

          })
          .catch( err => {
            console.log(err)
          })
    }

  return (
    <Box className={classes.root} borderRadius={5}>
        <Box  onClick={()=> showLessonModal(lesson)}>
            <Box height="200px" overflow="hidden" borderRadius={5}>
                <Image
                    src={thumbnail}
                    style={{objectFit: 'contain', width:'100%', height: '100%'}}
                    color="#27293D"
                />
            </Box>
            <Box p={2} height="55px" style={{backgroundColor: '#ffffff', color:'#000000', textAlign: 'center'}}>
                <Typography variant="h5" style={{ }}>
                    <TextTruncate
                            line={2}
                            element="div"
                            truncateText="…"
                            text={lesson.title}
                    />
                </Typography>
            </Box>
        </Box>
        { isAdmin ? 
                (
                    <Box className={classes.buttonWrapper}>
                        {
                            <Box>
                                <EditIcon color="primary" onClick={ () => handleEdit(lesson) } style={{cursor: 'pointer'}} />
                                <DeleteIcon color="primary" style={{marginLeft: 5, cursor: 'pointer'}} onClick={() => { if(window.confirm('Delete this lesson?')){handleDelete(lesson.id)};}}/>
                            </Box>
                        }
                    </Box>
                ) : null
        }
    </Box>
  );
}

export default LessonCard
