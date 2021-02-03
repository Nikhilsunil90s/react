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
    objectFit: 'cover',
    '& img' : {
      width: "100%",
      height: "auto"
    }
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
  decsription: string
  url:  string
}

export default function Post() {

  const classes = useStyles()

  const router = useRouter()
  const { post } = router.query

  const [pagePost, setPagePost]= useState<PostType | any>(null) 

  const retrievePost= () => {
    API({
        method: 'GET',
        url: '/page/'+post,
    })
    .then( response => {
      if(response.data === null) {
        return window.location.href = '/404'
      }

      setPagePost(response.data)
    })
    .catch (err => {
        console.log('Error')
    })
  }

 

  

  useEffect( () => {

    if(post) {
      retrievePost()
    }
  }, [post])


  return (
    <section style={{background: '#FFF', minHeight: '100vh'}}>
      <NavBar bg="#fff" textColor="#191919" />
      {
        pagePost ? 
        (
          <Container maxWidth="md" style={{overflow: 'hidden'}}>
            <Box py={2}>
              <Box textAlign="center" mb={0}>
                <Container maxWidth="sm">
                  

                  <Box mt={5} display="flex" justifyContent="center">
                    <Typography variant="h3" style={{fontWeight: 900, paddingBottom: 0, marginBottom: 0, color: 'black'}}>{pagePost.title}</Typography>
                  </Box>

              
                </Container>
              </Box>
              <Box className={classes.content}>
                <Typography variant="subtitle1" style={{color: '#464646'}} paragraph={true} className={classes.paragraph} dangerouslySetInnerHTML={{__html: pagePost.description}}></Typography>
                
                <Typography variant="subtitle2"  style={{color: '#464646'}} paragraph={true} className={classes.paragraph} dangerouslySetInnerHTML={{__html: pagePost.content}}></Typography>
              </Box>
            </Box>

            

          </Container>
        ) : null
      }
      <Footer color="black"/>               
    </section>
  )
}
