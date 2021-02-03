import React, { useState, useEffect} from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import HttpsIcon from '@material-ui/icons/Https';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import NavBar from 'components/shared/nav/NavBar.jsx'
import { Auth } from 'aws-amplify'
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

const SignUp= () => {

    const classes = useStyles()

    const [username, setUsername]= useState('')
    const [name, setName]= useState('')
    const [password, setPassword]= useState('')
    const [registrationErrorMsg, setRegistrationErrorMsg]= useState(null)
    const [navKey, setNavKey]= useState(1)

    const handleUsernameInput= (e) => {
        setName(e.target.value)
    }

    const handleEmailInput= (e) => {
        setUsername(e.target.value)
    }

    const handlePasswordInput= (e) => {
        setPassword(e.target.value)
    }

    const isEmptyOrSpaces= (str) => {
        return str === null || str.match(/^ *$/) !== null
    }

    const isDisabled= () => {

        if(username && !isEmptyOrSpaces(username) && name && !isEmptyOrSpaces(name) && password && !isEmptyOrSpaces(password))
            return false
        
            return true
    }

    const handleRegister= async () => {
        try {
            const { user } = await Auth.signUp({
                username,
                password,
                attributes: {
                    name
                }
            });
            setRegistrationErrorMsg(null)
            localStorage.setItem('newUser', user.username)
            setNavKey(prev => prev+1)
        } catch (error) {
            setRegistrationErrorMsg(error.message);
        }
    }


    return (
        <>
        <NavBar bg="#191919" textColor="#FFF" key={navKey} />
        <Box mt={10} display="flex" flexDirection="column" justifyContent="center" alignItems="center" p={2}>
            <Box p={3} display="flex" flexDirection="column" maxWidth="600px" width="100%" justifyContent="center" alignItems="center" style={{background: '#191919'}}>
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                    <HttpsIcon fontSize="large" color="primary" />
                    <Typography variant="h5" style={{marginTop: 10, color: '#F6F6F6'}}>Register</Typography>
                </Box>
                {
                    registrationErrorMsg ? 
                    (
                        <Box mt={2}>
                            <Typography variant="body1" style={{marginTop: 10, color: 'red', textAlign: 'start'}}>
                                {registrationErrorMsg}
                            </Typography>
                        </Box>

                    ) : null
                }
                <form className={classes.formStyle}>

                    <TextField 
                        label="Name" 
                        className={classes.inputStyle} 
                        InputProps={{ style: { color: '#f6f6f6', borderBottom: '1px solid #1E88F7' } }} 
                        onChange={handleUsernameInput}
                    />

                    <TextField 
                        label="Email" 
                        className={classes.inputStyle} 
                        InputProps={{ style: { color: '#f6f6f6', borderBottom: '1px solid #1E88F7' } }} 
                        style={{marginTop: 20}}
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
                            onClick={handleRegister}
                        >
                                Register
                        </Button>
                    </Box>
                </form>
            </Box>
            <Box mt={2} maxWidth="600px" width="100%">
                <Typography variant="body1" style={{color: '#1E88F7', textAlign: 'end'}}>
                    Already have an account ? <Link href={`/login`}><span style={{cursor: 'pointer'}}>Login</span></Link>
                </Typography>
            </Box>
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

export default SignUp

