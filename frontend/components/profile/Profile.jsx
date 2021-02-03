import React, { useState, useEffect } from 'react'
import API from 'utils/API'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import lightBlue from '@material-ui/core/colors/lightBlue'
import ProfileData from './ProfileData'
import PublishIcon from '@material-ui/icons/Publish'
import ChangePassword from './ChangePassword'
import SnackBar from 'components/shared/SnackBar'


const primaryLight = lightBlue[100];

const useStyles = makeStyles((theme) => ({
    avatarLarge: {
        width: theme.spacing(15),
        height: theme.spacing(15),
    },
    proPicOverlayStyle:{
        width: theme.spacing(15),
        height: theme.spacing(15),
        position: 'absolute',
        borderRadius: '50%',
        background: primaryLight,
        opacity: .8,
        zIndex: 9,
    },
    proPicChangeBtnStyle:{
        width: theme.spacing(15),
        height: theme.spacing(15),
        position: 'absolute',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 99,
    },
    textField: {
        color: '#f6f6f6'
    }

}))

export default function ProfileComp({email, name}) {

    const classes = useStyles()
    const matches = useMediaQuery('(max-width:960px)')

    const [profilePicPath, setProfilePicPath]= useState('')
    const [profilePic, setProfilePic]= useState(null)
    const [showUploadProPic, setShowUploadProPic]= useState(false)

    const [showChangePassowordForm, setShowChangePassowordForm]= useState(false)

    const [snackBarVal, setSnackBarVal]= useState(null)
    const [enrolledCourses, setEnrolledCourses]= useState('')

    const uploadProPic= (e) => {

        if(e.target.files && e.target.files.length !== 0){
            
            let formData = new FormData()

            formData.append('email', email )
            formData.append('proPic', e.target.files[0])

            API({
                method: 'POST', 
                url: '/profile', 
                data: formData
            })
            .then( response => {
                if(response.data.success)
                    retrieveProPic()
            })
            .catch( err => {
            })
        }
    }

    const retrieveProPicPath= () => {
        API({
            method: 'GET', 
            url: '/profile/'+email 
        })
        .then( response => {
            setProfilePicPath(response.data.image)
        })
        .catch( err => {
        })
    }

    const retrieveProPic= () => {
        
        API({
            method: 'GET',
            url: '/media/'+profilePicPath,
            responseType: 'arraybuffer'
            
          })
          .then( response => {
            
            const base64Str = btoa(
                new Uint8Array(response.data).reduce(
                  (data, byte) => data + String.fromCharCode(byte),
                  '',
                ),
            );  
            let image= `data:image/${profilePicPath.substring(profilePicPath.lastIndexOf('.')+1)};base64, ${base64Str}`
            setProfilePic(image)

          })
          .catch( err => {
            console.log(err)
          })
    }

    const retrieveEnrolledCourses= () =>{
    
        API({
            method: 'GET', 
            url: '/enroll/'+email
        })
        .then( response => {
            setEnrolledCourses(response.data)
        })
        .catch( err => {
        })
    }

    useEffect(() => {
        retrieveProPicPath()
        retrieveEnrolledCourses()
    }, [])

    useEffect(() => {   
        if(profilePicPath !== null )
            retrieveProPic()
    }, [profilePicPath])

    const handleShowChangePassForm= (e) => {
        setShowChangePassowordForm(e)
    }

    const handleSnackBar= (e) => {
        setSnackBarVal(null)
        setSnackBarVal(e)
    }

    return (
        <Container style={{paddingBottom: 50}}>
            <Box my={5} display="flex" justifyContent="center"><Typography variant="h3" color="primary">Profile</Typography></Box>
            <Box p={5} display="flex" flexDirection={matches ? 'column' : 'row'} justifyContent="space-between" borderRadius="10px" style={{background: '#191919'}}>
                <Box display="flex" alignItems="center" style={{cursor: 'pointer'}} position="relative">
                    <Avatar 
                        src={profilePic}
                        className={classes.avatarLarge}
                        onMouseEnter={() => setShowUploadProPic(true)}
                    />
                    {
                        showUploadProPic ? 
                        (
                            <Box position="absolute" top={0} onMouseLeave={() => setShowUploadProPic(false)}>
                                <Box className={classes.proPicOverlayStyle}></Box>
                                <Box className={classes.proPicChangeBtnStyle} onClick={uploadProPic}>
                                    <Button component="label">
                                        <PublishIcon color="primary" style={{fontSize: 48}} />
                                        <input
                                            type="file"
                                            style={{ display: "none" }}
                                            onChange={uploadProPic}
                                        />
                                    </Button>
                                </Box>
                            </Box>
                        ) : null
                    }
                    <Typography variant="h6" style={{marginLeft: 20}} color="primary"><b>{name}</b></Typography>
                </Box>
                <Box mt={matches ? 3 : 0}>
                    <Box>
                        <Button
                            variant="contained"
                            className={classes.button}
                            style={{width: 220, background: primaryLight, border: '1px solid #1687F4', color: '#1687F4', fontWeight: 600, margin: 0}}
                            onClick={ () => handleShowChangePassForm(true) }
                        >
                            Change Password
                        </Button>
                    </Box>
                </Box>
            </Box>
            <Box my={5}>
                <Typography variant="h5" color="primary">Enrolled Courses</Typography>
            </Box>
            <Box mb={5}>
                <ProfileData enrolledCourses={enrolledCourses} />
            </Box>
            <ChangePassword show={showChangePassowordForm} handleShowChangePassForm={handleShowChangePassForm} handleSnackBar={handleSnackBar} />
            {
                snackBarVal !== null ? <SnackBar state="true" msg={snackBarVal} /> : null
            }
        </Container>
    )
}
