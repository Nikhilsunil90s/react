import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import API from 'utils/API';


const useStyles = makeStyles((theme) => ({
  primaryAction: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginRight: theme.spacing(0),
      marginBottom: theme.spacing(2),
    }
  },
  contentBox: {
    maxWidth: theme.breakpoints.values['md'],
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(8),
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    [theme.breakpoints.up('lg')]: {
      maxWidth: theme.breakpoints.values['lg'] / 2,
      maxHeight: 512,
      paddingTop: theme.spacing(16),
      paddingBottom: theme.spacing(16),
      marginRight: 0,
      textAlign: 'center',
    }
  },
  img: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    objectFit: 'contain',
    height: 600,
    width: '100%'
  }
}
));

export default function Header(props) {

    const classes = useStyles();
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down('sm'))

    const [header_image, setHeader_Image]= useState(null)
    const [header_image_path, setHeader_Image_Path]= useState(null)

    const retrieveHeaderImagePath= () => {
      API({
          method: 'GET',
          url: '/home',
      })
      .then( response => {
        setHeader_Image_Path(response.data[0].header_image)
      })
      .catch (err => {
          console.log('Error')
      })
  }

  const retrieveHeaderImage= () => {
    
      API({
          method: 'GET',
          url: '/media/'+header_image_path,
          responseType: 'arraybuffer'
          
        })
        .then( response => {
          
          const base64Str = btoa(
              new Uint8Array(response.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                '',
              ),
          );  
          let image= `data:image/${header_image_path.substring(header_image_path.lastIndexOf('.')+1)};base64, ${base64Str}`
          setHeader_Image(image)

        })
        .catch( err => {
          console.log(err)
        })
  }

  useEffect(()=>{
    retrieveHeaderImagePath()
  },[])

  useEffect(()=>{
    if(header_image_path !== null)
      retrieveHeaderImage()
  },[header_image_path])
    

    return (

        <Grid container>
            <Grid item xs={12} lg={6} style={{display: 'flex', alignItems: 'center'}} style={{order: matches ? 1 : 2}}>
              <Box className={classes.contentBox}>
                  <Container >
                    <Typography variant="h5"  gutterBottom={true} color="primary">EDUCATING, TEACHING & INSPIRING</Typography>
                    <Typography variant="h5" style={{color: 'black'}} paragraph={true}>The Next Generation of Published Authors</Typography>
                    
                    <Box mt={4}>
                      <Link href="/courses"><Button style={{padding: 15, maxWidth: 300}} variant="contained" color="primary" className={classes.primaryAction}>Learn From Me</Button></Link>
                    </Box>
                  </Container>
              </Box>
            </Grid>
            <Grid item xs={12} lg={6} style={{order: matches ? 2 : 1}}>
              <Box position="relative" height={600}>
                  <img className={classes.img} src={header_image} alt="" />
              </Box>
            </Grid>
        </Grid>
    )
}