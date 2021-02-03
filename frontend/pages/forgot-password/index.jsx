import React, { useState } from 'react'
import { Auth } from 'aws-amplify';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import Button from '@material-ui/core/Button';
import { useRouter } from 'next/router'
import { withSSRContext } from 'aws-amplify'
import { makeStyles } from '@material-ui/core/styles';
import NavBar from 'components/shared/nav/NavBar.jsx'

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

export default function ForgotPassword() {

    const classes = useStyles()

    const [stage, setStage]= useState(1)
    const [email, setEmail]= useState('')
    const [code, setCode]= useState('')
    const [newpassword, setNewPassword]= useState('')
    const [errorMsg, setErrorMsg]= useState(null)

    const router = useRouter()

    const sendCode= e => {
        e.preventDefault()

        Auth.forgotPassword(email)
        .then(data => { setErrorMsg(null); setStage(2) } )
        .catch(err => setErrorMsg(err.message));
        }

    const resetPassoword= e => {
        e.preventDefault()
        Auth.forgotPasswordSubmit(email, code, newpassword)
        .then(data => {
            setErrorMsg(null)
            router.push({
                pathname: '/login',
                query: { msgReset: 'success' },
            })
        })
        .catch(err => { setErrorMsg(err.message); setStage(1) });
    }

    const isEmptyOrSpaces= (str) => {
        return str === null || str.match(/^ *$/) !== null
    }

    const isDisabledStage1= () => {

        if(email && !isEmptyOrSpaces(email))
            return false
        
            return true
    }

    const isDisabledStage2= () => {

        if(code && !isEmptyOrSpaces(code) && newpassword && !isEmptyOrSpaces(newpassword))
            return false
        
            return true
    }


    return (
        <>
        <NavBar bg="#191919" textColor="#FFF" />
        <Box mt={10} display="flex" flexDirection="column" justifyContent="center" alignItems="center" p={2}>
            <Box p={3} display="flex" flexDirection="column" maxWidth="600px" width="100%" justifyContent="center" alignItems="center" style={{background: '#191919'}}>
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                    <RotateLeftIcon fontSize="large" color="primary" />
                    <Typography variant="h5" style={{marginTop: 10, color: '#F6F6F6'}}>Reset Passoword</Typography>
                </Box>
                {
                    errorMsg ? 
                    (
                        <Box mt={2}>
                            <Typography variant="body1" style={{marginTop: 10, color: 'red', textAlign: 'start'}}>
                                {errorMsg}
                            </Typography>
                        </Box>

                    ) : null
                }
                
                {
                    stage === 1 && (
                        <form className={classes.formStyle}>

                            <TextField 
                                type="email" 
                                label="Email" 
                                className={classes.inputStyle} 
                                InputProps={{ style: { color: '#f6f6f6', borderBottom: '1px solid #1E88F7' } }} 
                                onChange={e => setEmail(e.target.value)}
                            />
                            
                            <Box mt={5} display="flex" justifyContent="center" >
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    size="large" 
                                    className={classes.btnStyle}
                                    disabled={isDisabledStage1()}
                                    onClick={sendCode}
                                >
                                        Send Verification Code
                                </Button>
                            </Box>
                        </form>

                    ) 
                }
                {
                    stage === 2 && (

                        <form className={classes.formStyle}>

                            <TextField 
                                defaultValue=""
                                type="text" 
                                label="Code" 
                                className={classes.inputStyle} 
                                InputProps={{ style: { color: '#f6f6f6', borderBottom: '1px solid #1E88F7' } }} 
                                onChange={e => setCode(e.target.value)}
                            />

                            <TextField 
                                label="New Password" 
                                type="password" 
                                className={classes.inputStyle} 
                                InputProps={{ style: { color: '#f6f6f6', borderBottom: '1px solid #1E88F7' } }} 
                                style={{marginTop: 20}}
                                onChange={e => setNewPassword(e.target.value)}
                            />
                            
                            <Box mt={5} display="flex" justifyContent="center" >
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    size="large" 
                                    className={classes.btnStyle}
                                    disabled={isDisabledStage2()}
                                    onClick={resetPassoword}
                                >
                                        Reset Password
                                </Button>
                            </Box>
                        </form>
                    )
                }
      
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
    return {props:{}}
}
