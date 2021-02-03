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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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

interface LessonType{
  _id?: number,
  title: string,
  description: string
  thumbnail: string,
  video: string
}

interface LessonFormProps{
  show: boolean,
  lesson?:  LessonType | any,
  courseId: number,
  handleShowLessonModal(e:boolean): void,
  handleSnackBar(e:any):void,
  accessToken:string
  showCategories?:boolean
}

const LessonForm: React.FC<LessonFormProps> = ({show, lesson, courseId, showCategories, handleShowLessonModal, handleSnackBar, accessToken}) => {

  const classes = useStyles();

  const [open, setOpen] = useState<boolean>(false)
  const [id, setId]= useState<number>(-1)
  const [title, setTitle]= useState<string>('')
  const [description, setDescription]= useState<string>('')
  const [thumbnail, setThumbnail]= useState<string>('')
  const [video, setVideo]= useState<string>('')

  const [currThumbnail, setCurrThumbnail]= useState<string>('')
  const [currVideo, setCurrVideo]= useState<string>('')

  const [filterBy, setFilterBy]= useState<string>('')
  const [courses, setCourses]= useState<any>('')

  const handleFilterBy= (event: React.ChangeEvent<{ value: unknown }>) => {
    setFilterBy(event.target.value as string)
  }

  const retrieveCourses= () => {

    API({
        method: 'GET',
        url: '/course',
    })
    .then( response => {
        setCourses(response.data)
    })
    .catch (err => {
        handleSnackBar(err.message)
    })
  }

  const handleClose = () => {
    setId(-1)
    setTitle('')
    setDescription('')
    setThumbnail('')
    setVideo('')
    setCurrThumbnail('')
    setCurrVideo('')
    setFilterBy('')
    handleShowLessonModal(false)
    setOpen(false)
  }

  const handleThumbnailUpload= (e:any) => {
    setThumbnail(e)
  }

  const handleVideoUpload= (e:any) => {
    setVideo(e)
  }

  const removeCurrThumbnail= () => {
    setCurrThumbnail('')
  }

  const removeCurrVideo= () => {
    setCurrVideo('')
  }

  useEffect( () => {
    setOpen(show)
  }, [show])

  const retrieveThumbnail= () => {
        
    API({
        method: 'GET',
        url: '/media/'+lesson.thumbnail,
        responseType: 'arraybuffer'
        
      })
      .then( response => {
        
        const base64Str = btoa(
            new Uint8Array(response.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              '',
            ),
        );  
        let image= `data:image/${lesson.thumbnail.substring(lesson.thumbnail.lastIndexOf('.')+1)};base64, ${base64Str}`
        setCurrThumbnail(image)

      })
      .catch( err => {
        console.log(err)
      })
  }

  const retrieveVideo= () => {
        
    API({
        method: 'GET',
        url: '/media/'+lesson.video,
        responseType: 'arraybuffer'
        
      })
      .then( response => {
        
        const base64Str = btoa(
            new Uint8Array(response.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              '',
            ),
        );  
        let video= `data:video/${lesson.video.substring(lesson.video.lastIndexOf('.')+1)};base64, ${base64Str}`
        setCurrVideo(video)

      })
      .catch( err => {
        console.log(err)
      })
  }

  useEffect( () => {
    if(lesson !== null){
      setId(lesson.id)
      setTitle(lesson.title)
      setDescription(lesson.description)
      setFilterBy(lesson.courseId)
      retrieveThumbnail()
      retrieveVideo()
    }
  }, [lesson])

  const isEmptyOrSpaces= (str:string) => {
    return str === null || str.match(/^ *$/) !== null
  }

  const isDisabled= () => {

      if(title && !isEmptyOrSpaces(title) && description && !isEmptyOrSpaces(description) &&
      (thumbnail || currThumbnail) && (video || currVideo))
          return false
      
          return true
  }

  const handleSubmit= () => {

    let formData = new FormData()
    let httpMethod, httpUrl

    formData.append('title', title)
    formData.append('description', description)

    if(showCategories)
      formData.append('courseId', filterBy)
    else
      formData.append('courseId', courseId.toString())

    if(!currThumbnail)
      formData.append('thumbnail', thumbnail[0])

    if(!currVideo)
      formData.append('video', video[0])
    
    if(lesson){
      httpMethod= 'PATCH'
      httpUrl='/lesson/'+id
    }
    else{
      httpMethod= 'POST'
      httpUrl='/lesson'
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
      handleSnackBar(err)
      handleClose()
    })
}

  useEffect(() => {
    if(showCategories)
      retrieveCourses()
  }, [showCategories])

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" style={{background: '#191919', color: '#1E88F7'}} >{lesson !== null ? 'Edit Lesson' : 'Add Lesson'}</DialogTitle>
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
            {
              showCategories && courses.length > 0 ? (
                <Box my={3} display="flex" justifyContent="flex-end">
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Course</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={filterBy}
                            onChange={handleFilterBy}
                            label="Course"
                        >
                        {
                            courses && courses.length > 0 ? courses.map( ( course,index ) => 
                                (
                                    <MenuItem key={index} value={course.id}>{course.title}</MenuItem>
                                )
                            ) : null
                        }
                        </Select>
                    </FormControl>
                </Box>

              ) : null
            }
            <Box>
              <Box my={3}><Typography color="primary" variant="body2" style={{fontWeight: 600}}>Thumbnail: </Typography> </Box>
              {
                currThumbnail ? 
                (
                  <Badge style={{marginRight: 20}} badgeContent={<CancelTwoToneIcon color="primary"  style={{cursor: 'pointer'}} onClick={ () => removeCurrThumbnail() } />}>
                      <Box style={{width: 80, height: 80}}><img style={{width: '100%', height: '100%', objectFit: 'cover'}} src={currThumbnail}/></Box>
                  </Badge> 
                ) : 
                (
                  <MediaPreview handleImageUpload={handleThumbnailUpload} />
                )
              }
              <Box my={3}><Typography color="primary" variant="body2" style={{fontWeight: 600}}>Video: </Typography> </Box>
              {
                currVideo ? 
                (
                  <Badge style={{marginRight: 20}} badgeContent={<CancelTwoToneIcon color="primary"  style={{cursor: 'pointer'}} onClick={ () => removeCurrVideo() } />}>
                      <Box style={{width: 80, height: 80}}><video style={{width: '100%', height: '100%', objectFit: 'cover'}} src={currVideo}/></Box>
                  </Badge> 
                ) : 
                (
                  <MediaPreview handleImageUpload={handleVideoUpload} />
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

export default LessonForm
