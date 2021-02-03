import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Header from './Header.jsx'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import { Auth } from 'aws-amplify'
import SnackBar from 'components/shared/SnackBar'
import { useRouter } from 'next/router'
import API from 'utils/API'

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  appbar: {
      background: theme.palette.primary.background,
      color: '#FaFaFa',
      top: 0
  },   
  toolbar: {
    padding: 0,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'block',
    flexGrow: 1,
  },
  titleText: {
    color: '#FFF',
    textAlign: 'center',
    width: 120,
    padding: '10px',
    cursor: 'pointer',
    textDecoration: 'none',
    fontWeight: 900,
    marginLeft: 20,
  },
  sectionDesktop: {
    flexGrow: 2,
    display: 'none',
    maxWidth: 900,
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      justifyContent: 'space-evenly'
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  inputStyle: {
    width: 200,
    height: 50,
    border: "1px solid #1E88F7",
    padding: 5,
    fontSize: 16,
    borderRadius: 10,
    marginLeft: 10,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      marginTop: 10
    },
  }
}));

export default function NavBarSample({bg, textColor}) {
  const classes = useStyles();
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))
  const [code, setCode]= useState()
  const [showConfirmationSection, setShowConfirmationSection]= useState()

  const [snackBarVal, setSnackBarVal]= useState(null)
  const [sections, setSections]= useState(null)


  const router = useRouter()

  useEffect( () => {
    retrieveSections()
    if(localStorage.getItem('newUser'))
      setShowConfirmationSection(true)
    
    else
      setShowConfirmationSection(false)
  },[])

  const handleSnackBarVal= e => {
    setSnackBarVal(null)
    setSnackBarVal(e)
  }

  const retrieveSections= () => {
    API({
        method: 'GET',
        url: '/menu',
        
    })
    .then( response => {
        setSections(response.data)
    })
    .catch (err => {
      handleSnackBarVal(err.message)
    })
}


  const confirmSignUp=  async () => {
    try {
      await Auth.confirmSignUp(localStorage.getItem('newUser'), code)
      setShowConfirmationSection(false)
      localStorage.removeItem('newUser')
      router.push({
        pathname: '/login',
        query: { msg: 'success' },
      })
    } catch (error) {
        handleSnackBarVal(error.message)
    }

  }

  const resendConfirmationCode= async () => {
    try {
        await Auth.resendSignUp(localStorage.getItem('newUser'));
          handleSnackBarVal('code resent successfully');
    } catch (error) {
          handleSnackBarVal(error.message);
    }
  }

  

  return (
    <Box style={{cursor: 'pointer', background: bg ? bg : '#FFF'}}>
        <Header title="LOGO" sections={sections ? sections : []} textColor={textColor ? textColor : '#191919'} handleSnackBarVal={handleSnackBarVal} />
        <Box display={ showConfirmationSection ? 'flex' : 'none'} flexDirection="column" alignItems="center">
          <Box maxWidth={ matches ? 600 : 900} width="100%" flexDirection={matches ? 'column' : 'row'} p={2} mt={2} display="flex" justifyContent="center" alignItems={matches ? 'flex-start' : 'center'}>
            <Typography variant="body1" style={{color: textColor ? textColor : '#191919'}}>Enter confirmation code which is sent to your email: </Typography>
            <input type="text" name="confirmationCode" placeholder="Confirmation Code" className={classes.inputStyle} onChange={ e => setCode(e.target.value) }/>
            <Button onClick={confirmSignUp} variant="contained"  color="primary" style={{marginLeft: matches ? 0 : 20, marginTop: matches ? 10 : 0}}>Confirm</Button>
            <Button onClick={resendConfirmationCode} variant="contained"  color="primary" style={{marginLeft: matches ? 0 : 20, marginTop: matches ? 10 : 0}}>Resend Code</Button>
          </Box>
        </Box>
        {
          snackBarVal !== null ? <SnackBar state="true" msg={snackBarVal} /> : null
        }
    </Box>
  );
}
