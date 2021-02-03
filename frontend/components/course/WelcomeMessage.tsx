import React, { useState, useEffect } from 'react'
import API from 'utils/API'
import { makeStyles } from '@material-ui/core/styles'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import DetailsIcon from '@material-ui/icons/Details'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import VideocamIcon from '@material-ui/icons/Videocam';
import Link from 'next/link'

const useStyles = makeStyles((theme) => ({

    container:{
        height: 'calc( 100vh - 120px )',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        color: theme.palette.secondary.light,
        position: 'relative'
    },
    backdrop: {
        zIndex: 2,
        color: '#fff',
        background: '#212121',
        opacity: .7,
        width: '100%',
        height: '100%',
        position: 'absolute'
    },
    bgImage: {
        zIndex: 1,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        position: 'absolute'
    },
    contentOverlay: {
        padding: '0px 5px',
        position: 'absolute',
        zIndex: 3,
        color: '#FFF',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        marginBottom: 20,
    },
    paper: {
        display: 'flex',
        alignItems: 'center',
        width: 550,
        height: 60,
        [theme.breakpoints.down('xs')]: {
            width: '100%',
          },
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
    button: {
        padding: theme.spacing(2),
    },
}))

interface lessonType {
    id: number,
    thumbnail:string,
    video:string,
    duration:string,
    title:string,
    description:string
}

interface WelcomeMessageProps{
    bgImg:string,
    title:string,
    trailer:string,
    slug:string
    showTrailer(trailer:string):void,
    enrolled:boolean
}

const WelcomeMessage: React.FC<WelcomeMessageProps>= ({bgImg, title, trailer, showTrailer, slug, enrolled}) => {

    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('xs'));
    const [cover, setCover]= useState(null)


    
    const retrieveCover= () => {
        
        API({
            method: 'GET',
            url: '/media/'+bgImg,
            responseType: 'arraybuffer'
            
          })
          .then( response => {
            
            const base64Str = btoa(
                new Uint8Array(response.data).reduce(
                  (data, byte) => data + String.fromCharCode(byte),
                  '',
                ),
            );  
            let image= `data:image/${bgImg.substring(bgImg.lastIndexOf('.')+1)};base64, ${base64Str}`
            setCover(image)
          })
          .catch( err => {
            console.log(err)
          })
      }

      useEffect(()=>{
        retrieveCover()
      })

    return (
        
            <Grid
                container
                direction="column"
                justify="flex-end"
                alignItems="center"
                className={classes.container}
            >
                <div className={classes.bgImage}>
                    <img src={cover} style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
                </div>
                <div className={classes.backdrop}></div>
                
                <Box className={classes.contentOverlay}>
                    <Box mt={1}><Typography  variant={matches ? "h2" : "h1"} style={{fontWeight: 600}}><i>Austin</i></Typography></Box>
                    <Box><Typography  variant={matches ? "h2" : "h1"} style={{fontWeight: 600}}><i>Wilder</i></Typography></Box>
                    <Box mt={1}><DetailsIcon color="primary" fontSize="large" /></Box>
                    <Box mt={1}><Typography variant="h5" style={{textAlign: 'center'}}>Teaches {title}</Typography></Box>
                    <Box mt={2}>
                        {
                            !enrolled ? 
                            (
                                <Link href={`/checkout/${slug}`}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        startIcon={<PlayArrowIcon />}
                                        style={{fontWeight: 600}}
                                        className={classes.button}
                                    >
                                        Enroll Now
                                    </Button>
                                </Link>
                            ) : null
                        }
                        <Button
                            variant="contained"
                            style={{background: '#191919', marginLeft: 20, color: '#fff', fontWeight: 600}}
                            startIcon={<VideocamIcon />}
                            className={classes.button}
                            onClick={()=> showTrailer(`${trailer}`)}
                        >
                            Trailer
                        </Button>
                    </Box>
                </Box>
            </Grid>
    )
}

export default WelcomeMessage
