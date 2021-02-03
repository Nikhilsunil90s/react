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
import QuillEditor from '../blog/QuillEditor'

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

interface BookType{
  id: number,
  title: string,
  cover_photo: string,
  price:number
}

interface CourseFormProps{
  show: boolean
  book?:  BookType | any
  handleShowBookModal(e:boolean): void,
  handleSnackBar(e:any):void,
  accessToken:string
}

const BookForm: React.FC<CourseFormProps> = ({show, book, handleShowBookModal, handleSnackBar, accessToken}) => {

  const classes = useStyles();

  const [open, setOpen] = useState<boolean>(false)
  const [id, setId]= useState<number>(-1)
  const [title, setTitle]= useState<string>('')
  const [cover, setCover]= useState<string>('')
  const [price, setPrice]= useState<string>('')
  const [currCover, setCurrCover]= useState<string>('')
  const [content, setContent]= useState<any>('')
  const [buyLink, setBuyLink]= useState<any>('')

  const handleClose = () => {
    setId(-1)
    setTitle('')
    setCover('')
    setPrice('')
    setCurrCover('')
    setContent('')
    setBuyLink('')
    handleShowBookModal(false)
    setOpen(false)
  }

  const handleCoverUpload= (e:any) => {
    setCover(e)
  }

  const handleContent= (e:any) => {
    setContent(e)
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
        url: '/media/'+book.cover_photo,
        responseType: 'arraybuffer'
        
      })
      .then( response => {
        
        const base64Str = btoa(
            new Uint8Array(response.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              '',
            ),
        );  
        let image= `data:image/${book.cover_photo.substring(book.cover_photo.lastIndexOf('.')+1)};base64, ${base64Str}`
        setCurrCover(image)

      })
      .catch( err => {
        console.log(err)
      })
  }

  useEffect( () => {
    if(book !== null){
      setId(book.id)
      setTitle(book.title)
      setPrice(book.price)
      setContent(book.content)
      setBuyLink(book.buy_link)
      retrieveCover()
    }
  }, [book])

  const isEmptyOrSpaces= (str:string) => {
    return str === null || str.match(/^ *$/) !== null
  }

  const isDisabled= () => {

      if(title && !isEmptyOrSpaces(title)  &&
        price && (cover || currCover))
          return false
      
          return true
  }

  const handleSubmit= () => {

    let formData = new FormData()
    let httpMethod, httpUrl

    formData.append('title', title)
    formData.append('price', price)
    formData.append('content', content)
    formData.append('buy_link', buyLink)

    if(!currCover)
      formData.append('cover_photo', cover[0])
    
    if(book){
      httpMethod= 'PATCH'
      httpUrl='/book/'+id
    }
    else{
      httpMethod= 'POST'
      httpUrl='/book'
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
      console.log(err);
      handleSnackBar('Error')
      handleClose()
    })
}

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" style={{background: '#191919', color: '#1E88F7'}} >{book !== null ? 'Edit Book' : 'Add Book'}</DialogTitle>
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

            <Typography variant="body2" color="primary" style={{marginBottom: 30, fontWeight: 600}}>Description: </Typography>
            <QuillEditor addArticle={handleContent} placeholder="Write Description" defaultValue= {content} />

            <TextField
              defaultValue={price}
              margin="dense"
              id="price"
              label="Price"
              type="text"
              fullWidth
              onChange={ (e) => setPrice(e.target.value) }
              InputProps={{
                  className: classes.textField,
              }}
              placeholder="e.g. 500.99"
              style={{marginTop: 20}}
            />

            <TextField
              defaultValue={buyLink}
              margin="dense"
              id="buyLink"
              label="Buy Link"
              type="text"
              fullWidth
              onChange={ (e) => setBuyLink(e.target.value) }
              InputProps={{
                  className: classes.textField,
              }}
            />  


            <Box>
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

export default BookForm
