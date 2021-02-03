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

const Consultations: React.FC = () => {

    const classes = useStyles()
    const matches = useMediaQuery('(max-width:960px)')


    return (
        <>
            <Box className={classes.containerStyle} pt={0}>
                <NavBar bg="#fff" textColor="#191919" />
                <Container maxWidth="lg" style={{padding: matches ? '0px 10px': '0px 60px'}}>

                    <Box mt={5} display="flex" justifyContent="center">
                        <Typography variant="h5" style={{ fontWeight: 900, paddingBottom: 0, marginBottom: 0, color: 'black' }}>Scheduling a 1-1 consultation</Typography>
                    </Box>

                    <Box mt={1} justifyContent="center">
                        <Typography variant="body2" style={{ paddingBottom: 0, marginBottom: 0, color: 'black' }}>
                            Need help with writing a book, formatting for publication, putting it on amazon, or anything else? The majority of these topics are already addressed in my online courses, however some people want to take it a step further. While courses can cover a good amount issues, everyone has their own unique personality and writing style, therefore in order to personally tailor my services to help you even more I provide this additional option.
                        </Typography>
                    </Box>

                    <Box mt={1} justifyContent="center">

                    <Typography variant="body2" style={{ paddingBottom: 0, marginBottom: 0, color: 'black' }}>
                            If you want to become a better writer, author, and have your work appear more professional, then my online courses are an excellent tool to help with that. On the other hand, if you need me to specifically edit your book or need advice on a writing related topic that pertains to you then scheduling a 1-1 consultation with me would be a good choice.
                    </Typography>

                    </Box>

                    <Box mt={2} display="flex" justifyContent="center">
                        <Typography variant="h5" style={{ fontWeight: 900, paddingBottom: 0, marginBottom: 0, color: 'black' }}>How it Works</Typography>
                    </Box>

                    <Box mt={1}  justifyContent="center">
                        <Typography variant="body2" style={{  paddingBottom: 0, marginBottom: 0, color: 'black' }}>
                            1) I do consultations over Skype or phone.
                        </Typography>
                        
                      
                    </Box>

                    <Box mt={1}  justifyContent="center">
                    <Typography variant="body2" style={{  paddingBottom: 0, marginBottom: 0, color: 'black' }}>
                            2) Being a full-time author I only have so many hours in the day for other activities. Every hour I spend consulting is one less hour I could be writing. Therefore, while I do enjoy helping people, it has to be worth my time. I bill out at $60.00 per hour with a 30 minute consultation minimum.
                        </Typography>

                      
                    </Box>

                    <Box mt={1}  justifyContent="center">
                        
                    <Typography variant="body2" style={{  paddingBottom: 0, marginBottom: 0, color: 'black' }}>
                            3) To arrange a Skype session or a phone call, simply go to my contact page.
                        </Typography>
                      
                    </Box>

                        
                </Container>

                <Footer color="black"/>

               
            </Box>
        </>
    )
}

export default Consultations
