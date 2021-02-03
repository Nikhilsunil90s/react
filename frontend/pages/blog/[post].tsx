import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import API from 'utils/API'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'
import Avatar from '@material-ui/core/Avatar'
import NavBar from 'components/shared/nav/NavBar'
import { useRouter } from 'next/router'
import Button from '@material-ui/core/Button'
import Link from 'next/link'
import Grid from '@material-ui/core/Grid'
import Footer from 'components/home/Footer'

const useStyles = makeStyles((theme) => ({

  name: {
    lineHeight: 1,
  },
  content: {
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing(8),
      paddingRight: theme.spacing(8)  
    }
  },
  paragraph: {
    marginBottom: theme.spacing(3),
    objectFit: 'cover'
  },
  image: {
    width: '100%',
    maxHeight: 500,
    objectFit: 'cover',
    borderRadius: theme.shape.borderRadius
  }
  
}))

interface PostType{
  id: number
  title: string
  content: string
  author: string
  mainImg: string
  date: string
  isFeatured: boolean
}

export default function Post() {

  const classes = useStyles()

  const router = useRouter()
  const { post } = router.query

  const [blogPost, setBlogPost]= useState<PostType | any>(null) 
  const [mainImg, setMainImg]= useState(null)

  const [date, setDate]= useState('')

  const retrievePost= () => {
    API({
        method: 'GET',
        url: '/blog/'+post,
    })
    .then( response => {
        setBlogPost(response.data)
    })
    .catch (err => {
        console.log('Error')
    })
  }

  const retrieveMainImg= () => {
        
    API({
        method: 'GET',
        url: '/media/'+blogPost.mainImg,
        responseType: 'arraybuffer'
        
      })
      .then( response => {
        
        const base64Str = btoa(
            new Uint8Array(response.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              '',
            ),
        );  
        let image= `data:image/${blogPost.mainImg.substring(blogPost.mainImg.lastIndexOf('.')+1)};base64, ${base64Str}`
        setMainImg(image)

      })
      .catch( err => {
        console.log(err)
      })
  }

  useEffect( () => {
    retrievePost()
  }, [post])

  useEffect( () => {
    if(blogPost !== null){
      const d= new Date(blogPost.createdAt)
      setDate(d.getDate()+'.'+(d.getMonth()+1)+'.'+d.getFullYear())
      retrieveMainImg()
    }
  }, [blogPost])

  return (
    <section style={{background: '#FFF', minHeight: '100vh'}}>
      <NavBar bg="#fff" textColor="#191919" />
      {
        blogPost ? 
        (
          <Container maxWidth="md" style={{overflow: 'hidden'}}>
            <Box py={2}>
              <Box textAlign="center" mb={0}>
                <Container maxWidth="sm">
                  {/* <Chip color="primary" label={date} /> */}
                  {/* <Box my={4}>
                    <Typography variant="h3" component="h2">
                    <Typography variant="h3" component="span" color="primary">{blogPost.title}</Typography>
                    </Typography>
                  </Box> */}

                  <Box mt={5} display="flex" justifyContent="center">
                    <Typography variant="h3" style={{fontWeight: 900, paddingBottom: 0, marginBottom: 0, color: 'black'}}>{blogPost.title}</Typography>
                  </Box>

                  {/* <Box display="flex" justifyContent="center" alignItems="center">
                    <Avatar alt="" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Icons8_flat_manager.svg/1024px-Icons8_flat_manager.svg.png" />
                    <Box ml={2} textAlign="left">
                      <Typography variant="subtitle1" component="h2" className={classes.name}>{blogPost.author}</Typography>
                    </Box>
                  </Box> */}
                </Container>
              </Box>
              <Box className={classes.content}>
                <Box my={4}>
                  <img src={mainImg} alt="" className={classes.image} />
                </Box>
                <Typography variant="subtitle1" style={{color: '#464646'}} paragraph={true} className={classes.paragraph} dangerouslySetInnerHTML={{__html: blogPost.content}}></Typography>
              </Box>
            </Box>

            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
            >
              <Box py={2}>
                  <Link href={`/blog`}>  
                      <Button target="_blank" 
                          variant="contained"
                          color="primary"
                          style={{fontWeight: 600}}
                          href={null}
                      >
                          Back to blogs
                      </Button>
                  </Link>
              </Box>  
            </Grid>   

            

          </Container>
        ) : null
      }
      <Footer color="black"/>               
    </section>
  )
}
