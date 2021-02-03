import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Auth } from 'aws-amplify';

const useStyles = makeStyles((theme) => ({
    dialog: {
        background: theme.palette.primary.light,
    },
    formControl: {
      marginTop: 10,
      minWidth: 120,
    },
    textField: {
        fontSize: 14, 
        color: '#A2A3AC'
    }
  }));

export default function ChangePassword({show, handleShowChangePassForm, handleSnackBar}) {
  
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const [oldPassword, setOldPassword]= useState('')
  const [newPassword, setNewPassword]= useState('')
  const [confirmNewPassword, setConfirmNewPassword]= useState('')
  const [isPasswordConfonfirmed, setIsPasswordConfonfirmed]= useState(false)
  const [error, setError]= useState(null)

  const handleClose = () => {
    setOldPassword('')
    setNewPassword('')
    setConfirmNewPassword('')
    setIsPasswordConfonfirmed(false)
    setOpen(false)
    handleShowChangePassForm(false)
  }

  const isEmptyOrSpaces= (str) => {
    return str === null || str.match(/^ *$/) !== null
  }

  const isDisabled= () => {

      if(oldPassword && !isEmptyOrSpaces(oldPassword) && newPassword && !isEmptyOrSpaces(newPassword) && isPasswordConfonfirmed)
          return false
      
          return true
  }

  const handleConfirmPassword= () => {
    if(newPassword === confirmNewPassword){
      setIsPasswordConfonfirmed(true)
      setError(null)
    }
    else{
      setIsPasswordConfonfirmed(false)
      setError("Password is not matched")
    }
  }

  const handleSubmit= async() => {

    const user= await Auth.currentAuthenticatedUser()

    await user.changePassword(oldPassword, newPassword, (err, result) => {
      if(err) handleSnackBar(err.message)
      else handleSnackBar("Password changed successfully")
    })
    handleClose()
  }

  useEffect( () => {
    setOpen(show);
  }, [show])

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" style={{background: '#27293D', color: '#1E88F7'}}>
            Change Password
        </DialogTitle>
        <DialogContent className={classes.dialog}>
            <Box >
              <TextField
                autoFocus
                margin="dense"
                id="oldPassword"
                label="Old Password"
                type="password"
                fullWidth
                onChange={ (e) => setOldPassword(e.target.value) }
                InputProps={{
                    className: classes.textField,
                }}
              />
              <TextField
                margin="dense"
                id="newPassword"
                label="New Password"
                type="password"
                fullWidth
                onChange={ (e) => { setNewPassword(e.target.value); setIsPasswordConfonfirmed(false) } }
                InputProps={{
                    className: classes.textField,
                }}
              />
              <TextField
                margin="dense"
                id="confirmNewPassword"
                label="Confirm Password"
                type="password"
                fullWidth
                onChange={ (e) => { setConfirmNewPassword(e.target.value); setIsPasswordConfonfirmed(false) } }
                onBlur={handleConfirmPassword}
                InputProps={{
                    className: classes.textField,
                }}
              />
              {
                error ? <Box><Typography variant="body2" style={{color: 'red'}}>{error}</Typography></Box> : null
              }
            </Box>
        </DialogContent>
        <DialogActions className={classes.dialog} style={{paddingTop: 10}}>
          <Button onClick={handleClose} color="primary" variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isDisabled()} color="primary" variant="outlined">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
