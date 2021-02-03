import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import HttpsIcon from '@material-ui/icons/Https';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Link from 'next/link'
import NavBar from 'components/shared/nav/NavBar.jsx'
import { Auth } from 'aws-amplify'
import SnackBar from 'components/shared/SnackBar'
import { useRouter } from 'next/router'
import { withSSRContext } from 'aws-amplify'

const useStyles = makeStyles((theme) => ({
    formStyle: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        marginTop: 20,
    },
    btnStyle: {
        '& > *': {
          margin: theme.spacing(1),
        },
        border: '1px solid #1E88F7',
    },
    inputStyle: {
        padding: 2,
        fontSize: 14
    },
}))

const PagenotFound: React.FC= () => {

    const classes = useStyles()

   

    const router = useRouter()


    return (
        <>
        <NavBar bg="#191919" textColor="#FFF" />
        <Box mt={10} display="flex" flexDirection="column" justifyContent="center" alignItems="center" p={2}>
            <Box p={3} display="flex" flexDirection="column" maxWidth="600px" width="100%" justifyContent="center" alignItems="center" style={{background: '#191919'}}>
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                    <Typography variant="h5" style={{marginTop: 10, color: '#F6F6F6'}}>404 | This url is not found</Typography>
                </Box>
                
                
            </Box>
            
        </Box>
        </>
    )
}

export default PagenotFound

