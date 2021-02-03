import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import lightBlue from "@material-ui/core/colors/lightBlue"
import TextTruncate from 'react-text-truncate'
import Link from 'next/link'
import Image from 'material-ui-image'
import API from 'utils/API'

const primaryLight = lightBlue[100];

const useStyles = makeStyles((theme) => ({
    buttonWrapper: {
        position: 'absolute',
        top: 0,
        right: 15,
        marginTop: 20,
        fontWeight: 600,
        

    },
    button: {
        margin: theme.spacing(1),
    },
    post: {
        position: 'relative',
        overflow: 'hidden',
        flexGrow: 1,
        paddingBottom: '10px !important',
      },
      img: {
        height: 250,
        width: '100%',
        borderRadius: theme.shape.borderRadius,
        cursor: 'pointer',
        transition: 'all 1s',
        overflow: 'hidden',
        '&:hover':{
            opacity: .8,
        }

      },
      bullet: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        color: theme.palette.text.hint
      },
      name: {
        lineHeight: 1,
      },
}))


export default function BlogCard({blog}) {

    const classes = useStyles()
    const [mainImg, setMainImg]= useState('')

    var html = blog.content;
    var div = document.createElement("div");
    div.innerHTML = html;
    var text = div.textContent || div.innerText || "";
    var blog_content = text;


    var titleHtml = blog.title;
    var div = document.createElement("div");
    div.innerHTML = titleHtml;
    var text = div.textContent || div.innerText || "";
    var blog_title = text;

    let blogTitle = blog_title.substring(0,80);



    let blogString = '';
    if(blog_content.length >80) {
        blogString = blog_content.substring(0,80)+'..';
        blogString+= '<br />';
    } else {
        blogString = blog_content;
        blogString+= '<br />';
    }

    const retrieveMainImg= () => {
        
      API({
          method: 'GET',
          url: '/media/'+blog.mainImg,
          responseType: 'arraybuffer'
          
        })
        .then( response => {
          
          const base64Str = btoa(
              new Uint8Array(response.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                '',
              ),
          );  
          let image= `data:image/${blog.mainImg.substring(blog.mainImg.lastIndexOf('.')+1)};base64, ${base64Str}`
          setMainImg(image)

        })
        .catch( err => {
          console.log(err)
        })
  }

  useEffect( () => {
    retrieveMainImg()
}, [])



    return (
        <Grid item xs={12} md={4}  className={classes.post}>
          <Box p={2} style={{background: '#FFF'}}>
            <Link href={`/blog/${blog.slug}`}>
              <Box className={classes.img}>
                <Image src={mainImg} alt="" style={{width: '100%', height: '100%', objectFit: 'cover', background: '#191919'}} />
              </Box>
            </Link>
            {/* <Box mt={5} height={100} overflow="hidden">
              <Typography  variant="subtitle1" paragraph={true}  style={{padding: '0px 10px', color: '#05284d'}} dangerouslySetInnerHTML={{__html: blog.content}}></Typography>
            </Box> */} 

            <Box mt={3} height={50} overflow="hidden">
                  {/* <Typography variant="h5" style={{ }}>
                    <TextTruncate
                            style={{color:'black'}}
                            line={2}
                            element="div"
                            truncateText="…"
                            text={blog.title}
                    />
                  </Typography> */}
                  <Typography  variant="h5"  color={'textSecondary'} style={{padding: '0px 10px',color:'black'}} dangerouslySetInnerHTML={{__html: blogTitle}}></Typography>


            </Box>  

            <Box height={100}>
                <Link href={`/blog/${blog.slug}`} color="inherit">
                  <Typography  variant="subtitle1" paragraph={true} color={'textSecondary'} style={{padding: '0px 10px',color:'black', marginBottom: '1px'}} dangerouslySetInnerHTML={{__html: blogString}}></Typography>
                  {/* noWrap */}
                </Link>
                {
                  blogString.length > 80 ? 
                <Link href={`/blog/${blog.slug}`}>
                   <Typography  variant="subtitle1" paragraph={true} color={'textSecondary'} style={{padding: '0px 10px',color:'blue'}} dangerouslySetInnerHTML={{__html: 'Read More'}}></Typography>
                </Link> :
                null

                }
                
            </Box>        

          </Box>
        </Grid>
    )
}
