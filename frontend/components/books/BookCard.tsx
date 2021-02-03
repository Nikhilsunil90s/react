import React, { useState, useEffect } from 'react'
import API from 'utils/API'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Image from 'material-ui-image'
import LockIcon from '@material-ui/icons/LockOpen'
import TextTruncate from 'react-text-truncate'
import { Auth } from 'aws-amplify'

const useStyles = makeStyles((theme) => ({
    root: {
        width: 345,
        height: 255,
        background: theme.palette.primary.light,
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

interface BookType{
    buy_link: string
    content: string
    cover_photo: string
    id: number
    price: string
    title: string
}

interface CourseCardProps {
    book:BookType
}

const BookCard: React.FC<CourseCardProps>= ({book}) => {
  const classes = useStyles();
  const [enrolled, setEnrolled]= useState<boolean>(false)
  const [cover, setCover]= useState(null)

  useEffect(() => {
    retrieveCover()
  }, [])

 

    const retrieveCover= () => {
        
        API({
            method: 'GET',
            url: '/media/'+book.cover_photo,
            responseType: 'arraybuffer'
            
          })
          .then( response => {
            
            const base64Str = btoa(
                new Uint8Array(response.data).reduce(
                  (data, byte) => data + String.fromCharCode(byte),
                  '',
                ),
            );  
            let image= `data:image/${book.cover_photo.substring(book.cover_photo.lastIndexOf('.')+1)};base64, ${base64Str}`
            setCover(image)

          })
          .catch( err => {
            console.log(err)
          })
    }

  return (
    <Box className={classes.root} borderRadius={5}>
        <Box position="relative" zIndex={9}>
            <Box style={{}} height="200px" overflow="hidden" borderRadius={5}>
                <Image
                    src={cover}
                    style={{paddingTop: 0, objectFit: 'cover', width:'100%', height: '100%'}}
                    color="#27293D"
                />
            </Box>
            <Box p={2} height="55px" style={{backgroundColor: '#ffffff', color:'#000000', textAlign: 'center'}}>
                <Typography variant="h5" style={{ }}>
                    <TextTruncate
                            line={2}
                            element="div"
                            truncateText="…"
                            text={book.title}
                    />
                </Typography>
            </Box>
        </Box>
       
    </Box>
  );
}

export default BookCard
