import React, { useState, useEffect } from 'react';
import API from 'utils/API'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MediaPreview from '../../../components/shared/MediaPreview';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Badge from '@material-ui/core/Badge';
import CancelTwoToneIcon from '@material-ui/icons/CancelTwoTone';
import QuillEditor from './QuillEditor'

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
  },
  quillEditor : {
    '& img': {
      width: "100%"
    }
  } 
}));

interface CategoryData{
  id: number,
  title?: string
}

interface PostType{
  id: number
  title: string
  content: any
  description: string
  url:string  
}

interface PageFormProps{
  show: boolean
  post?:  PostType
  handleShowPostModal(e:boolean): void,
  handleSnackBar(e:any):void,
  accessToken:string
}

const PageForm: React.FC<PageFormProps> = ({show, post, handleShowPostModal, handleSnackBar, accessToken}) => {

  const classes = useStyles();

  const [open, setOpen] = useState<boolean>(false)
  const [id, setId]= useState<number>(-1)
  const [title, setTitle]= useState<string>('')
  const [content, setContent]= useState<any>('')
  const [description, setDescription]= useState<string>('')
  const [url, setUrl]= useState<string>('')


  const handleClose = () => {    
    setId(-1)
    setTitle('')
    setContent('')
    setUrl('')
    setDescription('')
    handleShowPostModal(false)
    setOpen(false)
  }


  const handleContent= (e:any) => {
    setContent(e)
  }

  useEffect( () => {
    setOpen(show)
    
  }, [show])

  useEffect( () => {
    if(post !== null){
      setId(post.id)
      setTitle(post.title)
      setContent(post.content)
      setUrl(post.url)
      setDescription(post.description)
    }
  }, [post])

  const isEmptyOrSpaces= (str:string) => {
    return str === null || str.match(/^ *$/) !== null
  }

  const isUrl= (str:string) => {    
    return  (str[0] == '/' && str.substring(1).match(/^(\d|\w)+$/))
  }

  const isDisabled= () => {

      if(title && !isEmptyOrSpaces(title) && content && !isEmptyOrSpaces(content) &&
       url && !isEmptyOrSpaces(url) && isUrl(url) && description && !isEmptyOrSpaces(description)) {
        return false
       } 
      
          return true
  }



  const handleSubmit= () => {
   
    let formData = new FormData()
    let httpMethod, httpUrl

    formData.append('title', title)
    formData.append('content', content)
    formData.append('url', url)
    formData.append('description', description)

    
    formData.append('mainImg', '')

    if(post){
      httpMethod= 'PATCH'
      httpUrl='/page/'+id
    }
    else{
      httpMethod= 'POST'
      httpUrl='/page'
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
      handleSnackBar(err.message)
      handleClose()
    })
}
  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" style={{background: '#191919', color: '#1E88F7'}} >{post !== null ? 'Edit Page' : 'Add Page'}</DialogTitle>
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
              onChange={ (e: React.ChangeEvent<{ value: unknown }>) => setTitle(e.target.value as string) }
              InputProps={{
                  className: classes.textField,
              }}
            />
            
            <TextField
              defaultValue={url}
              margin="dense"
              id="url"
              label="Url"
              type="text"
              fullWidth
              onChange={ (e: React.ChangeEvent<{ value: unknown }>) => setUrl(e.target.value as string) }
              InputProps={{
                  className: classes.textField,
              }}
              style={{marginTop: 20}}

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
            
            <Box my={5}>
              <Typography variant="body2" color="primary" style={{marginBottom: 30, fontWeight: 600}}>Content: </Typography>
              <QuillEditor  addArticle={handleContent} placeholder="Write Article" defaultValue= {post ? post.content : null} />
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

export default PageForm
