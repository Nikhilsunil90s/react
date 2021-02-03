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

const Login: React.FC= () => {

    const classes = useStyles()

    const [email, setEmail]= useState('')
    const [password, setPassword]= useState('')
    const [loginErrorMsg, setLoginErrorMsg]= useState(null)
    const [snackBarVal, setSnackBarVal]= useState(null)

    const router = useRouter()

    const handleSnackBarVal= e => {
        setSnackBarVal(null)
        setSnackBarVal(e)
    }

    const handleEmailInput= (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordInput= (e) => {
        setPassword(e.target.value)
    }

    const isEmptyOrSpaces= (str) => {
        return str === null || str.match(/^ *$/) !== null
    }

    const isDisabled= () => {

        if(email && !isEmptyOrSpaces(email) && password && !isEmptyOrSpaces(password))
            return false
        
            return true
    }

    const handleLogin= async () => {
        try {
            const user = await Auth.signIn(email, password)
            setLoginErrorMsg(null)
            if(user.signInUserSession.idToken.payload['cognito:groups'])
                router.push('/admin/dashboard')
            else 
                router.push('/profile')
        } catch (error) {
            setLoginErrorMsg(error.message)
        }
    }

    useEffect( () => {
        if(router.query.msg)
            handleSnackBarVal("Congratulations! Account Confirmed")
        else if(router.query.msgReset)
            handleSnackBarVal("Congratulations! Password reset successfully")
    }, [router])



    return (
        <>
        <NavBar bg="#191919" textColor="#FFF" />
        <Box mt={10} display="flex" flexDirection="column" justifyContent="center" alignItems="center" p={2}>
            <Box p={3} display="flex" flexDirection="column" maxWidth="600px" width="100%" justifyContent="center" alignItems="center" style={{background: '#191919'}}>
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                    <HttpsIcon fontSize="large" color="primary" />
                    <Typography variant="h5" style={{marginTop: 10, color: '#F6F6F6'}}>Login</Typography>
                </Box>
                {
                    loginErrorMsg ? 
                    (
                        <Box mt={2}>
                            <Typography variant="body1" style={{marginTop: 10, color: 'red', textAlign: 'start'}}>
                                {loginErrorMsg}
                            </Typography>
                        </Box>

                    ) : null
                }
                <form className={classes.formStyle}>

                    <TextField 
                        label="Email" 
                        className={classes.inputStyle} 
                        InputProps={{ style: { color: '#f6f6f6', borderBottom: '1px solid #1E88F7' } }} 
                        onChange={handleEmailInput}
                    />

                    <TextField 
                        label="Password" 
                        type="password" 
                        className={classes.inputStyle} 
                        InputProps={{ style: { color: '#f6f6f6', borderBottom: '1px solid #1E88F7' } }} 
                        style={{marginTop: 20}}
                        onChange={handlePasswordInput}
                    />
                    
                    <Box mt={5} display="flex" justifyContent="center" >
                        <Button 
                            variant="contained" 
                            color="primary" 
                            size="large" 
                            className={classes.btnStyle}
                            disabled={isDisabled()}
                            onClick={handleLogin}
                        >
                                Login
                        </Button>
                    </Box>
                </form>
                <Box width="100%" mt={2} display="flex" justifyContent="flex-end">
                    <Link href={`/forgot-password`}><Typography color="primary" style={{cursor: 'pointer'}}>Forgot Password?</Typography></Link>
                </Box>
            </Box>
            <Box mt={2} maxWidth="600px" width="100%">
                <Typography variant="body1" style={{color: '#1E88F7', textAlign: 'end'}}>
                    Don't have an account ? <Link href={`/register`}><span style={{cursor: 'pointer'}}>Register</span></Link>
                </Typography>
            </Box>
            {
                snackBarVal !== null ? <SnackBar state="true" msg={snackBarVal} /> : null
            }
        </Box>
        </>
    )
}

export async function getServerSideProps({ req, res }) {
    const { Auth } = withSSRContext({ req })
    try {
      const user = await Auth.currentAuthenticatedUser()
      if(user.signInUserSession.idToken.payload['cognito:groups']){
        res.writeHead(302, { Location: '/admin/dashboard' })
        res.end()
      }
      else{
        res.writeHead(302, { Location: '/profile' })
        res.end()
      }
    } catch (err) {
      return {props:{}}
    }
}

export default Login

