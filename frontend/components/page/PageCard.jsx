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
        top: 15,
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


export default function PageCard({page, isAdmin, handleDelete, handleEdit, showMore=false}) {


    const classes = useStyles()

    var html = page.content;
    var div = document.createElement("div");
    div.innerHTML = html;
    var text = div.textContent || div.innerText || "";
    var page_content = text;

    let pageString = '';
    if(page_content.length >100) {
        pageString = page_content.substring(0,100)+'..';
        pageString+= `<br /><a href="/pages${page.url}">Read More</a>`;
    } else {
        pageString = page_content;
        pageString+= `<br /><a href="/pages${page.url} >Read More</a>`;
    }


    useEffect( () => {
        
    }, [])

    return (
        <Grid item xs={12} md={4}  className={classes.post} style={{'backgroundColor':'#162235','padding':'20px'}} > {/* style={{boxShadow: '5px 5px 5px #f6f6f6'}} */}
          <div className={classes.backgroundWhite}>
          
              <Box mt={2} mb={2} height={50}>

                <Link href={`/page${page.url}`} color="inherit">

                  <Typography variant="h5" style={{ }}>
                    <TextTruncate
                            style={{color:'black'}}
                            line={2}
                            element="div"
                            truncateText="…"
                            text={page.title}
                    />
                  </Typography>
                </Link>
              </Box>

              <Box mt={2} mb={2} height={50}>

                <Link href={`/page${page.url}`} color="inherit">

                  <Typography variant="h5" style={{ }}>
                    <TextTruncate
                            style={{color:'black'}}
                            line={2}
                            element="div"
                            truncateText="…"
                            text={page.description}
                    />
                  </Typography>
                </Link>
              </Box>
              <Box height={100}>
                <Link href={`/page${page.url}`} color="inherit">
                  <Typography  variant="content" paragraph={true} color={isAdmin ? 'black' : 'textSecondary'} style={{padding: '0px 10px',color:'black'}} dangerouslySetInnerHTML={{__html: pageString}}></Typography>
                  {/* noWrap */}
                </Link>
              </Box>    
              
              
              <Box mt={3} display="flex" alignItems="center">
                
                { isAdmin ? 
                        (
                            <Box className={classes.buttonWrapper}>
                                <Box p={1} borderRadius={5} display="flex" justifyContent="center" alignItems="center" style={{background: '#191919', cursor: 'pointer'}} onClick={ () => handleEdit(page) }>
                                  <EditIcon 
                                      color="primary"
                                  />
                                </Box>
                                <Box mt={1} p={1} borderRadius={5} display="flex" justifyContent="center" alignItems="center" style={{background: '#191919', cursor: 'pointer'}} onClick={() => { if(window.confirm('Delete this post?')){handleDelete(page.id)};}}>
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
