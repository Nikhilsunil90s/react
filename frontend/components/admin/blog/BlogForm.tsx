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
  author: string
  mainImg: string
  category: string
  isFeatured: boolean
  
}

interface BlogFormProps{
  show: boolean
  post?:  PostType
  handleShowPostModal(e:boolean): void,
  handleSnackBar(e:any):void,
  accessToken:string
}

const BlogForm: React.FC<BlogFormProps> = ({show, post, handleShowPostModal, handleSnackBar, accessToken}) => {

  const classes = useStyles();

  const [open, setOpen] = useState<boolean>(false)
  const [id, setId]= useState<number>(-1)
  const [title, setTitle]= useState<string>('')
  const [content, setContent]= useState<any>('')
  const [mainImg, setMainImg]= useState<string>('')
  const [author, setAuthor]= useState<string>('')
  const [category, setCategory]= useState<string>('')
  const [categorydata, setCategorydata]= useState<any>('')
  const [authordata, setAuthordata]= useState<any>('')
  const [isFeatured, setIsFeatured]= useState<boolean | any>(false)
  const [currMainImg, setCurrMainImg]= useState<string>('')

  const handleClose = () => {    
    setId(-1)
    setTitle('')
    setContent('')
    setMainImg('')
    setAuthor('')
    setCategory('')
    setIsFeatured(false)
    setCurrMainImg('')
    handleShowPostModal(false)
    setOpen(false)
  }

  const handleMainImgUpload= (e:any) => {
    setMainImg(e)
  }

  const handleContent= (e:any) => {
    setContent(e)
  }

  const removeCurrMainImg= () => {
    setCurrMainImg('')
  }

  const retrieveMainImg= () => {
        
    API({
        method: 'GET',
        url: '/media/'+post.mainImg,
        responseType: 'arraybuffer'
        
      })
      .then( response => {
        
        const base64Str = btoa(
            new Uint8Array(response.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              '',
            ),
        );  
        let image= `data:image/${post.mainImg.substring(post.mainImg.lastIndexOf('.')+1)};base64, ${base64Str}`
        setCurrMainImg(image)

      })
      .catch( err => {
        console.log(err)
      })
  }

  const retrieveCategory= () => {
    API({
        method: 'GET',
        url: '/category',
    })
    .then( response => {
        setCategorydata(response.data)
    })
    .catch (err => {
        console.log('Error')
    })
  }

  const retrieveAuthor = () => {
    API({
        method: 'GET',
        url: '/author',
    })
    .then( response => {
        setAuthordata(response.data)
    })
    .catch (err => {
        console.log('Error')
    })
  }

  useEffect( () => {
    setOpen(show)
    retrieveCategory();
    retrieveAuthor();
  }, [show])

  useEffect( () => {
    if(post !== null){
      setId(post.id)
      setTitle(post.title)
      setContent(post.content)
      setAuthor(post.author)
      setCategory(post.category)
      setIsFeatured(post.isFeatured)
      retrieveMainImg()
      retrieveCategory()
    }
  }, [post])

  const isEmptyOrSpaces= (str:string) => {
    return str === null || str.match(/^ *$/) !== null
  }

  const isDisabled= () => {

      if(title && !isEmptyOrSpaces(title) && content && !isEmptyOrSpaces(content) &&
      (mainImg || currMainImg) && author && category)
      //(mainImg || currMainImg) && author && !isEmptyOrSpaces(author) && category && !isEmptyOrSpaces(category))
          return false
      
          return true
  }

  const handleSubmit= () => {

    let formData = new FormData()
    let httpMethod, httpUrl

    formData.append('title', title)
    formData.append('content', content)
    formData.append('author', author)
    formData.append('category', category)
    formData.append('isFeatured', isFeatured)

    if(!currMainImg)
      formData.append('mainImg', mainImg[0])

    
    if(post){
      httpMethod= 'PATCH'
      httpUrl='/blog/'+id
    }
    else{
      httpMethod= 'POST'
      httpUrl='/blog'
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
        <DialogTitle id="form-dialog-title" style={{background: '#191919', color: '#1E88F7'}} >{post !== null ? 'Edit Post' : 'Add Post'}</DialogTitle>
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
            {/* <TextField
              defaultValue={content}
              margin="dense"
              id="content"
              label="Write article"
              type="text"
              fullWidth
              multiline
              rows={5}
              onChange={ (e: React.ChangeEvent<{ value: unknown }>) => setContent(e.target.value as string) }
              InputProps={{
                  className: classes.textField,
              }}
              style={{marginTop: 20}}
            /> */}
            <Box my={5}>
              <Typography variant="body2" color="primary" style={{marginBottom: 30, fontWeight: 600}}>Write a post: </Typography>
              <QuillEditor addArticle={handleContent} placeholder="Write Article" defaultValue= {post ? post.content : null} />
            </Box>

            <Box my={3}><Typography color="primary" variant="body2" style={{fontWeight: 600}}>Author: </Typography> </Box>  

            <Select
              id="author"
              label="Author"
              value={author}
              fullWidth
              onChange={ (e: React.ChangeEvent<{ value: unknown }>) => setAuthor(e.target.value as string) }
            >
              {
                  authordata && authordata.length ? authordata.map((auths:CategoryData, index) => (
                    <MenuItem key={index} value={auths.id}>{auths.title}</MenuItem>
                  )) : null
              }    
            </Select> 

            <Box my={3}><Typography color="primary" variant="body2" style={{fontWeight: 600}}>Category: </Typography> </Box>  

          <Select
            id="category"
            label="Category"
            value={category}
            fullWidth
            onChange= { (e: React.ChangeEvent<{ value: unknown }> ) => setCategory(e.target.value as string) } 
          >
            {
                categorydata && categorydata.length ? categorydata.map((cats:CategoryData, index) => (
                  <MenuItem key={index} value={cats.id}>{cats.title}</MenuItem>
                )) : null
            }    
          </Select> 

            <Box mt={2}>
              <FormControlLabel
                control={<Checkbox checked={isFeatured} onChange={(e: React.ChangeEvent<{ value: unknown }>) => setIsFeatured(!isFeatured)} name="isFeatured" color="primary" />}
                label="Make Featured?"
                style={{color: '#1E88F7'}}
              />
            </Box>
            <Box>
              <Box my={3}><Typography color="primary" variant="body2" style={{fontWeight: 600}}>Main Image: </Typography> </Box>
              {
                currMainImg ? 
                (
                  <Badge style={{marginRight: 20}} badgeContent={<CancelTwoToneIcon color="primary"  style={{cursor: 'pointer'}} onClick={ () => removeCurrMainImg() } />}>
                      <Box style={{width: 80, height: 80}}><img style={{width: '100%', height: '100%', objectFit: 'cover'}} src={currMainImg}/></Box>
                  </Badge> 
                ) : 
                (
                  <MediaPreview handleImageUpload={handleMainImgUpload} />
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

export default BlogForm
