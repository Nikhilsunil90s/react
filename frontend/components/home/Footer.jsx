import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

import { fade } from '@material-ui/core/styles/colorManipulator';


const useStyles = makeStyles((theme) => ({
    contactWrapper: {
        backgroundColor: '#f6f6f6',
    },
    textColor: {
        color: 'black'
    },
    iconWrapper: {
        backgroundColor: 'rgb(219,219,219)',
    },
    footerNav: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(1)
    },
    footerLink: {
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        marginBottom: theme.spacing(2),
    }
}
));

export default function Footer({color}) {

    const classes = useStyles();
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down('sm'))


    return (

        <Container maxWidth="lg" >
           
            <Box py={6} textAlign="center">
            <Box mb={3}>
                <Link href="/" color="inherit" underline="none">
                    <Button color="primary">
                        <img src="../logo_new.png" style={{position:"relative","height":"35px"}} /> 
                    </Button>
                </Link>
            </Box>
            <Box mb={3} className={classes.textColor}>
                <IconButton style={{color: color}} aria-label="Facebook">
                    <FacebookIcon />
                </IconButton>
                <IconButton style={{color: color}} aria-label="Twitter">
                    <TwitterIcon />
                </IconButton>
                <IconButton style={{color: color}} aria-label="Instagram">
                    <InstagramIcon />
                </IconButton>
                <IconButton style={{color: color}} aria-label="LinkedIn">
                    <LinkedInIcon />
                </IconButton>
            </Box>
            <Typography style={{'color': 'rgb(184 183 183 / 70%)' }} component="p" variant="caption" gutterBottom={false}>© 2020 Austin Wilder. All rights reserved.</Typography>
            </Box>
        </Container>
    )
}