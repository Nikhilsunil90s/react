import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import lightBlue from "@material-ui/core/colors/lightBlue"
import TextTruncate from 'react-text-truncate'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import Avatar from '@material-ui/core/Avatar'
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
    backgroundWhite: {
      background:'white',
    },
    button: {
        margin: theme.spacing(1),
    },
    post: {
        position: 'relative',
        minHeight: 400,
        overflow: 'hidden',
        flexGrow: 1
      },
      img: {
        height: 250,
        width: '100%',
        //borderRadius: theme.shape.borderRadius,
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


export default function BlogCard({blog, isAdmin, handleDelete, handleEdit, showMore=false}) {

    console.log(showMore)

    const classes = useStyles()
    const [date, setDate]= useState('')
    const [mainImg, setMainImg]= useState('')

    var html = blog.content;
    var div = document.createElement("div");
    div.innerHTML = html;
    var text = div.textContent || div.innerText || "";
    var blog_content = text;

    let blogString = '';
    if(blog_content.length >100) {
        blogString = blog_content.substring(0,100)+'..';
        blogString+= '<br /><a href="/blog/'+blog.slug+'">Read More</a>';
    } else {
        blogString = blog_content;
        blogString+= '<br /><a href="/blog/'+blog.slug+'">Read More</a>';
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
        const d= new Date(blog.createdAt)
        setDate(d.getDate()+'-'+(d.getMonth()+1)+'-'+d.getFullYear())
    }, [])

    return (
        <Grid item xs={12} md={4}  className={classes.post} style={{'backgroundColor':'#162235','padding':'20px'}} > {/* style={{boxShadow: '5px 5px 5px #f6f6f6'}} */}
          <div className={classes.backgroundWhite}>
          <Link href={`/blog/${blog.slug}`}>
            <Box className={classes.img}>
              {/* <Image src={mainImg} alt="" style={{width: '100%', height: '100%', objectFit: 'cover', background: '#191919'}} /> */}
              <Image src={mainImg} alt="" style={{width: '100%', height: '500px', objectFit: 'cover',  background: '#191919'}} />
            </Box>
          </Link>
              <Box mt={2} mb={2} height={50}>
                {/*<Box mb={1}>
                  <Typography variant="overline" component="span" color="primary" style={{paddingLeft: 5}}>{blog.Category.title}</Typography>
                   <span className={classes.bullet}>•</span>
                  <Typography variant="overline" component="span" color="textSecondary">{date}</Typography> 
                </Box>*/}
                <Link href={`/blog/${blog.slug}`} color="inherit">
                  {/* <Typography variant="h6" component="h2" style={{paddingLeft: 10, cursor: 'pointer'}}>
                    <TextTruncate
                                style={{color:'black'}}
                                line={2}
                                element="div"
                                truncateText="…"
                                text={blog.title}
                    />
                  </Typography> */}

                  <Typography variant="h5" style={{ }}>
                    <TextTruncate
                            style={{color:'black'}}
                            line={2}
                            element="div"
                            truncateText="…"
                            text={blog.title}
                    />
                  </Typography>
                </Link>
              </Box>
              <Box height={100}>
                <Link href={`/blog/${blog.slug}`} color="inherit">
                  <Typography  variant="subtitle1" paragraph={true} color={isAdmin ? 'black' : 'textSecondary'} style={{padding: '0px 10px',color:'black'}} dangerouslySetInnerHTML={{__html: blogString}}></Typography>
                  {/* noWrap */}
                </Link>
              </Box>    
              
              <Box mt={3} display="flex" alignItems="center">
                {/* <Avatar alt="" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Icons8_flat_manager.svg/1024px-Icons8_flat_manager.svg.png" />
                <Box ml={2} textAlign="left">
                 <Typography variant="subtitle1" component="h2" className={classes.name}>{blog.Author.title}</Typography> 
                </Box> */}
                { isAdmin ? 
                        (
                            <Box className={classes.buttonWrapper}>
                                <Box p={1} borderRadius={5} display="flex" justifyContent="center" alignItems="center" style={{background: '#191919', cursor: 'pointer'}} onClick={ () => handleEdit(blog) }>
                                  <EditIcon 
                                      color="primary"
                                  />
                                </Box>
                                <Box mt={1} p={1} borderRadius={5} display="flex" justifyContent="center" alignItems="center" style={{background: '#191919', cursor: 'pointer'}} onClick={() => { if(window.confirm('Delete this post?')){handleDelete(blog.id)};}}>
                                  <DeleteIcon 
                                      color="primary"
                                  />
                                </Box>
                            </Box>
                        ) : null
                } 
              </Box> 
              </div>
        </Grid>
        
    )
}
