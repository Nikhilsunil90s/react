import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Image from 'material-ui-image'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import Button from '@material-ui/core/Button'
import Link from 'next/link'
import API from 'utils/API'

const useStyles = makeStyles((theme) => ({
 
    contentWrapper: {
        maxWidth: 600,
        background: theme.palette.primary.dark,
        display: 'flex',
        margin: '20px 0px',
        padding: 20,
        borderRadius: 10,
        gap: 20,
        boxShadow:'2px 2px 5px #1E88F7',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            gap: 10,
        },
    },
    content: {
        display: 'flex',
        gap: 10,
        marginBottom: 5,
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            gap: 5,
            marginBottom: 10,
        },

    },
    title: {
        width: 150,
        color: '#817D7D',
    }, 
    buttonWrapper: {
        marginTop: 20,
        fontWeight: 600,
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            justifyContent: 'center'
        },

    },
    button: {
        margin: theme.spacing(1),
    },

}))

interface CourseType{
    id?: number,
    title?: string,
    description?: string
    thumbnail?: string
    trailer?: string,
    cover_photo: string,
    slug: string,
    fees:number
}

interface CourseCardProps{
    course:CourseType,
    isAdmin?:boolean,
    handleDelete(e:any): void,
    handleEdit(e:any):void

}

const CourseCard: React.FC<CourseCardProps>= ({course, isAdmin=true, handleDelete, handleEdit}) => {

    const classes = useStyles()
    const matches = useMediaQuery('(max-width:960px)')
    const matchesXs = useMediaQuery('(max-width:400px)')
    const [cover, setCover]= useState(null)

    const retrieveCover= () => {
        
        API({
            method: 'GET',
            url: '/media/'+course.cover_photo,
            responseType: 'arraybuffer'
            
          })
          .then( response => {
            
            const base64Str = btoa(
                new Uint8Array(response.data).reduce(
                  (data, byte) => data + String.fromCharCode(byte),
                  '',
                ),
            );  
            let image= `data:image/${course.cover_photo.substring(course.cover_photo.lastIndexOf('.')+1)};base64, ${base64Str}`
            setCover(image)

          })
          .catch( err => {
            console.log(err)
          })
    }

    useEffect(()=>{
        retrieveCover()
    },[])

    return (

        <Box className={classes.contentWrapper}>
            <Link href={`/admin/courses/${course.slug}`}>
                <Box flex="0 0 200px" height={150} maxWidth={200} style={{overflow: 'hidden', display: 'flex', alignItems: 'center'}}>
                    <Image
                        src={cover}
                        style={{objectFit: 'cover', width:'100%', height: '100%'}}
                        color="#27293D"
                    />
                </Box>
            </Link>
            <Box>
                <Link href={`/admin/courses/${course.slug}`}>
                    <Box mt={matches ? 2 : 0} mb={matches ? '10px' : '0px'}>
                        <Typography variant="h5" style={{fontWeight: 600, color: '#1E88F7'}}>{course.title}</Typography>
                    </Box>
                </Link>

                <Box mt={3} className={classes.content}>
                    <Box><Typography variant="body1" style={{color: '#A2A3AC'}}><b style={{color: '#F6F6F6'}}>Description: </b>{course.description}</Typography></Box>
                </Box>

                <Box mt={3}><Typography variant="body1" style={{color: '#A2A3AC'}}><b style={{color: '#F6F6F6'}}>Fees: </b>${course.fees}</Typography></Box>

                { isAdmin ? 
                    (
                        <Box className={classes.buttonWrapper}>
                            {
                                !matchesXs ? 
                                (
                                    <Box>
                                        <Button
                                        className={classes.button}
                                        variant="outlined"
                                        color="primary"
                                        startIcon={<EditIcon />}
                                        onClick={ () => handleEdit(course) }
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        className={classes.button}
                                        variant="outlined"
                                        color="primary"
                                        startIcon={<DeleteIcon />}
                                        onClick={() => { if(window.confirm('Delete this course?')){handleDelete(course.id)};}}
                                    >
                                        Delete
                                    </Button>
                                    </Box>
                                ) : 
                                (
                                    <Box>
                                        <EditIcon color="primary" />
                                        <DeleteIcon color="primary" style={{marginLeft: 5}} />
                                    </Box>
                                )
                            }
                        </Box>
                    ) : null
                }   

            </Box>
        </Box>
    )
}

export default CourseCard
