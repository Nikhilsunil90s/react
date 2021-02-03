import React, { useState, useEffect } from 'react';
import API from 'utils/API'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MediaPreview from '../../shared/MediaPreview'

import Badge from '@material-ui/core/Badge';
import CancelTwoToneIcon from '@material-ui/icons/CancelTwoTone';

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
      color: '#7f7f7f'
  }
}));

interface CourseType{
  _id?: number,
  title?: string
}

interface CourseFormProps{
  show: boolean
  course?:  CourseType | any
  handleShowCourseModal(e:boolean): void,
  handleSnackBar(e:any):void,
  accessToken:string
}

const CourseForm: React.FC<CourseFormProps> = ({show, course, handleShowCourseModal, handleSnackBar, accessToken}) => {

  const classes = useStyles();

  const [open, setOpen] = useState<boolean>(false)
  const [id, setId]= useState<number>(-1)
  const [title, setTitle]= useState<string>('')

  const handleClose = () => {
    setId(-1)
    setTitle('')
    handleShowCourseModal(false)
    setOpen(false)
  }

  useEffect( () => {
    setOpen(show)
  }, [show])

  useEffect( () => {
    if(course !== null){
      setId(course.id)
      setTitle(course.title)
    }
  }, [course])

  const isEmptyOrSpaces= (str:string) => {
    return str === null || str.match(/^ *$/) !== null
  }

  const isDisabled= () => {

      if(title && !isEmptyOrSpaces(title))
          return false
      
          return true
  }

  const handleSubmit= () => {

    let formData = new FormData()
    let httpMethod, httpUrl

    formData.append('title', title)
   

   
    if(course){
      httpMethod= 'PATCH'
      httpUrl='/category/'+id
    }
    else{
      httpMethod= 'POST'
      httpUrl='/category'
    }

    API({
      method: httpMethod,
      url: httpUrl,
      data: {"title":title},
      headers: {
        Authorization: `Bearer ${accessToken}`,
        userType: 'admin'
      }
    })
    .then( response => {

        if(response.data.success){
          handleSnackBar(response.data.success) 
        }

        else{
          handleSnackBar(response.data.error)
        }
        handleClose()
    })
    .catch( err => {
      handleSnackBar('Error')
      handleClose()
    })
}

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" style={{background: '#191919', color: '#1E88F7'}} >{course !== null ? 'Edit Category' : 'Add Category'}</DialogTitle>
        <DialogContent className={classes.dialog}>
          <Box>
            <TextField
              autoFocus
              defaultValue={title}
              margin="dense"
              id="title"
              label="Title"
              type="text"
              fullWidth
              onChange={ (e) => setTitle(e.target.value) }
              InputProps={{
                  className: classes.textField,
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions className={classes.dialog} style={{paddingTop: 10}} >
          <Button onClick={handleClose} color="primary" variant="outlined" >
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" disabled={isDisabled()} variant="outlined" >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CourseForm
