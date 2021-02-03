import React, { useState, useEffect } from 'react'
import API from 'utils/API'
import { makeStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Image from 'material-ui-image'
import NavBar from 'components/shared/nav/NavBar.jsx'
import Footer from 'components/home/Footer'
import Avatar from '@material-ui/core/Avatar';
import RoomIcon from '@material-ui/icons/Room';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';


const useStyles = makeStyles((theme) => ({
    containerStyle: {
        background: '#FFF',
        width: '100% !important',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh'
    },
    contactWrapper: {
        backgroundColor: '#f6f6f6',
    },
    textColor: {
        color: 'black'
    },
    iconWrapper: {
        backgroundColor: 'rgb(219,219,219)',
    },
    
}))



const Contact: React.FC = () => {

    const classes = useStyles()
    const matches = useMediaQuery('(max-width:960px)')

  
    return (
        <>
            <Box className={classes.containerStyle} pt={0}>
                <NavBar bg="#fff" textColor="#191919" />
               
                <Box py={10} style={{padding: "10px 50px"}}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                    <div className={classes.contactWrapper}>
                        <Box textAlign="center" py={4}>
                        <Box display="flex" justifyContent="center" mb={3}>
                            <Avatar className={classes.iconWrapper}>
                            <RoomIcon color="primary" fontSize="small" />
                            </Avatar>
                        </Box>
                        <Typography variant="h6" gutterBottom={true} className={classes.textColor}>Address</Typography>
                        <Typography variant="body2" color="textSecondary" className={classes.textColor}>1652 Cordia Cir</Typography>
                        <Typography variant="body2" color="textSecondary" className={classes.textColor}> Newton, North Carolina(NC), 28658</Typography>
                        </Box>
                    </div>
                    </Grid>
                    <Grid item xs={12} md={4}>
                    <div className={classes.contactWrapper}>
                        <Box textAlign="center" py={4}>
                        <Box display="flex" justifyContent="center" mb={3}>
                            <Avatar className={classes.iconWrapper}>
                            <EmailIcon color="primary" fontSize="small" />
                            </Avatar>
                        </Box>
                        <Typography variant="h6" gutterBottom={true} className={classes.textColor}>Email</Typography>
                        <Typography variant="body2" color="textSecondary" className={classes.textColor}>hello@mui.dev</Typography>
                        <br />
                        </Box>
                    </div>
                    </Grid>
                    <Grid item xs={12} md={4}>
                    <div className={classes.contactWrapper}>
                        <Box textAlign="center" py={4}>
                        <Box display="flex" justifyContent="center" mb={3}>
                            <Avatar className={classes.iconWrapper}>
                            <PhoneIcon color="primary" fontSize="small" />
                            </Avatar>
                        </Box>
                        <Typography variant="h6" gutterBottom={true} className={classes.textColor}>Phone</Typography>
                        <Typography variant="body2" color="textSecondary" className={classes.textColor}>(318) 285-9856</Typography>
                        <br />
                        </Box>
                    </div>
                    </Grid>
                </Grid>
            </Box>

              
                <Footer color="black"/>

            </Box>

        </>
    )
}

export default Contact
