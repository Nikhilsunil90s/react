import React, { useState, useEffect } from 'react'
import API from 'utils/API'
import { makeStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Image from 'material-ui-image'
import TextTruncate from 'react-text-truncate'
import NavBar from 'components/shared/nav/NavBar.jsx'
import Link from 'next/link'
import Footer from 'components/home/Footer'
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
    containerStyle: {
        background: '#FFF',
        width: '100% !important',
        position: 'relative',
        overflow: 'hidden',
        paddingBottom: 50,
        minHeight: '100vh'
    },
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
        padding: "0px 60px 90px",
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
}))

interface PostType {
    id: number
    title: string
    content: string
    author: string
    mainImg: string
    date: string
    isFeatured: boolean
}

const About: React.FC = () => {

    const classes = useStyles()
    const matches = useMediaQuery('(max-width:960px)')

    const [header_image, setHeader_Image] = useState(null)
    const [header_image_path, setHeader_Image_Path] = useState(null)

    const retrieveHeaderImagePath = () => {
        API({
            method: 'GET',
            url: '/home',
        })
            .then(response => {
                setHeader_Image_Path(response.data[0].header_image)
            })
            .catch(err => {
                console.log('Error')
            })
    }

    const retrieveHeaderImage = () => {

        API({
            method: 'GET',
            url: '/media/' + header_image_path,
            responseType: 'arraybuffer'

        })
            .then(response => {

                const base64Str = btoa(
                    new Uint8Array(response.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        '',
                    ),
                );
                let image = `data:image/${header_image_path.substring(header_image_path.lastIndexOf('.') + 1)};base64, ${base64Str}`
                setHeader_Image(image)

            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        retrieveHeaderImagePath()
    }, [])

    useEffect(() => {
        if (header_image_path !== null)
            retrieveHeaderImage()
    }, [header_image_path])

    return (
        <>
            <Box className={classes.containerStyle} pt={0}>
                <NavBar bg="#fff" textColor="#191919" />
                <Container maxWidth="lg">

                    <Box mt={5} display="flex" justifyContent="center">
                        <Typography variant="h3" style={{ fontWeight: 900, paddingBottom: 0, marginBottom: 0, color: 'black' }}>About Us</Typography>
                    </Box>

                    <Box my={0} display="flex" justifyContent="center"><Typography variant="h3" style={{ color: 'black' }}>&nbsp;</Typography></Box>
                    {/* <Header title="Blog" sections={sections} /> */}

                </Container>


                <Grid container>
                    
                    <Grid item xs={12} lg={6} style={{ display: 'flex',  }}>
                        <Box className={classes.contentBox}>
                                <Typography variant="body2" gutterBottom={true} style={{'color': 'black'}}>
                                    Many of us authors discover our passion for writing at different times in our lives. I discovered it at the age of nine. Given, my work has improved since then, with me going on to become a published author, but only because I never quit chasing that dream, even back when I was a kid. I live in Colorado, surrounded by the rocky mountains. When I’m not writing I can be found hiking, hitting the gym, feeding my pet taratulas, investing in the stock market, and coming up with my next big idea.
                                </Typography>

                        </Box>
                    </Grid>
                    <Grid item xs={12} lg={6} >
                        <Box position="relative" height={600}>
                            <img className={classes.img} src={header_image} alt="" />
                        </Box>
                    </Grid>
                </Grid>
            <Footer color="black"/>

            </Box>

        </>
    )
}

export default About
