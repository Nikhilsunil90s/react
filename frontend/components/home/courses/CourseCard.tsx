import React, { useState, useEffect } from 'react'
import API from 'utils/API'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Image from 'material-ui-image'
import TextTruncate from 'react-text-truncate'

const useStyles = makeStyles((theme) => ({
    root: {
        width: 345,
        height: 390,
        boxShadow: '5px 5px 2px #F6F6F6',
        color: theme.palette.primary.main,
        overflow: 'hidden',
        transition: 'all 1s',
        position: 'relative',
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
    }
}))

interface CourseType{
    id: number,
    title: string,
    description: string,
    slug: string,
    trailer: string,
    cover_photo: string,
    fees: number,
}

interface CourseCardProps {
    course:CourseType
}

const CourseCard: React.FC<CourseCardProps>= ({course}) => {
  const classes = useStyles();

  const [cover, setCover]= useState(null)

  useEffect(() => {
    retrieveCover()
  }, [])

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

  return (
    <Box className={classes.root} borderRadius={5}>
        <Box position="relative" zIndex={9}>
            <Box height="200px" overflow="hidden" borderRadius={5}>
                <Image
                    src={cover}
                    style={{objectFit: 'contain', width:'100%', height: '100%'}}
                    color="#27293D"
                />
            </Box>
            <Box p={2} height="55px">
                <Typography variant="h5">
                    <TextTruncate
                            line={2}
                            element="div"
                            truncateText="…"
                            text={course.title}
                    />
                </Typography>
            </Box>
            <Box mt={1} p={2} height="80px">
                <Typography variant="body1">
                    <TextTruncate
                            line={2}
                            element="div"
                            truncateText="…"
                            text={course.description}
                    />
                </Typography>
            </Box>
            <Box p={2} height="55px">
                <Typography variant="body1">Fees: ${course.fees}</Typography>
            </Box>
        </Box>
    </Box>
  );
}

export default CourseCard
