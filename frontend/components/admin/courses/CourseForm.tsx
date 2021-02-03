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
  title?: string,
  description?: string
  trailer?: string,
  cover_photo: string,
  fees:number
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
  const [description, setDescription]= useState<string>('')
  const [trailer, setTrailer]= useState<string>('')
  const [cover, setCover]= useState<string>('')
  const [fees, setFees]= useState<string>('')

  const [currTrailer, setCurrTrailer]= useState<string>('')
  const [currCover, setCurrCover]= useState<string>('')

  const handleClose = () => {
    setId(-1)
    setTitle('')
    setDescription('')
    setTrailer('')
    setCover('')
    setFees('')
    setCurrTrailer('')
    setCurrCover('')
    handleShowCourseModal(false)
    setOpen(false)
  }

  const handleTrailerUpload= (e:any) => {
    setTrailer(e)
  }

  const handleCoverUpload= (e:any) => {
    setCover(e)
  }

  const removeCurrTrailer= () => {
    setCurrTrailer('')
  }

  const removeCurrCover= () => {
    setCurrCover('')
  }

  useEffect( () => {
    setOpen(show)
  }, [show])

  const retrieveCover= () => {
        
    API({
        method: 'GET',
        url: '/media/'+course.cover_photo,
        responseType: 'arraybuffer'
        
      })
      .then( response => {
        
        const base64Str = btoa(
            new Uint8Array(response.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              '',
            ),
        );  
        let image= `data:image/${course.cover_photo.substring(course.cover_photo.lastIndexOf('.')+1)};base64, ${base64Str}`
        setCurrCover(image)

      })
      .catch( err => {
        console.log(err)
      })
  }

  const retrieveTrailer= () => {
        
    API({
        method: 'GET',
        url: '/media/'+course.trailer,
        responseType: 'arraybuffer'
        
      })
      .then( response => {
        
        const base64Str = btoa(
            new Uint8Array(response.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              '',
            ),
        );  
        let video= `data:video/${course.trailer.substring(course.trailer.lastIndexOf('.')+1)};base64, ${base64Str}`
        setCurrTrailer(video)

      })
      .catch( err => {
        console.log(err)
      })
  }

  useEffect( () => {
    if(course !== null){
      setId(course.id)
      setTitle(course.title)
      setDescription(course.description)
      setFees(course.fees)
      //setCurrTrailer(course.trailer)
      //setCurrCover(course.cover_photo)
      retrieveCover()
      retrieveTrailer()
    }
  }, [course])

  const isEmptyOrSpaces= (str:string) => {
    return str === null || str.match(/^ *$/) !== null
  }

  const isDisabled= () => {

      if(title && !isEmptyOrSpaces(title) && description && !isEmptyOrSpaces(description) &&
        fees && (trailer || currTrailer) && (cover || currCover))
          return false
      
          return true
  }

  const handleSubmit= () => {

    let formData = new FormData()
    let httpMethod, httpUrl

    formData.append('title', title)
    formData.append('description', description)
    formData.append('fees', fees)

    if(!currTrailer)
      formData.append('trailer', trailer[0])

    if(!currCover)
      formData.append('cover_photo', cover[0])
    
    if(course){
      httpMethod= 'PATCH'
      httpUrl='/course/'+id
    }
    else{
      httpMethod= 'POST'
      httpUrl='/course'
    }

    API({
      method: httpMethod,
      url: httpUrl,
      data: formData,
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
        <DialogTitle id="form-dialog-title" style={{background: '#191919', color: '#1E88F7'}} >{course !== null ? 'Edit Course' : 'Add Course'}</DialogTitle>
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
            <TextField
              defaultValue={description}
              margin="dense"
              id="description"
              label="Description"
              type="text"
              fullWidth
              multiline
              rows={5}
              onChange={ (e) => setDescription(e.target.value) }
              InputProps={{
                  className: classes.textField,
              }}
              style={{marginTop: 20}}
            />
            <TextField
              defaultValue={fees}
              margin="dense"
              id="fees"
              label="Fees"
              type="text"
              fullWidth
              onChange={ (e) => setFees(e.target.value) }
              InputProps={{
                  className: classes.textField,
              }}
              placeholder="e.g. 500.99"
              style={{marginTop: 20}}
            />
            <Box>
              <Box my={3}><Typography color="primary" variant="body2" style={{fontWeight: 600}}>Trailer: </Typography> </Box>
              {
                currTrailer ? 
                (
                  <Badge style={{marginRight: 20}} badgeContent={<CancelTwoToneIcon color="primary"  style={{cursor: 'pointer'}} onClick={ () => removeCurrTrailer() } />}>
                      <Box style={{width: 80, height: 80}}><video style={{width: '100%', height: '100%', objectFit: 'cover'}} src={currTrailer}/></Box>
                  </Badge> 
                ) : 
                (
                  <MediaPreview handleImageUpload={handleTrailerUpload} />
                )
              }
              <Box my={3}><Typography color="primary" variant="body2" style={{fontWeight: 600}}>Cover Photo: </Typography> </Box>
              {
                currCover ? 
                (
                  <Badge style={{marginRight: 20}} badgeContent={<CancelTwoToneIcon color="primary"  style={{cursor: 'pointer'}} onClick={ () => removeCurrCover() } />}>
                      <Box style={{width: 80, height: 80}}><img style={{width: '100%', height: '100%', objectFit: 'cover'}} src={currCover}/></Box>
                  </Badge> 
                ) : 
                (
                  <MediaPreview handleImageUpload={handleCoverUpload} />
                )
              }
            </Box>
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
