import React, { useState, useEffect } from 'react';
import API from 'utils/API'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';


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

interface PageData{
  id: number
  title: string
  content: any
  description: string
  url:string  
}

interface PostType{
  id: number
  title: string
  url: string,
  mode: string,
  menuOrder: number
}

interface MenuFormProps{
  show: boolean
  post?:  PostType
  menuLength: number
  handleShowPostModal(e:boolean): void,
  handleSnackBar(e:any):void,
  accessToken:string
}

const MenuForm: React.FC<MenuFormProps> = ({show, post, menuLength,  handleShowPostModal, handleSnackBar, accessToken}) => {

  const classes = useStyles();

  const [open, setOpen] = useState<boolean>(false)
  const [id, setId]= useState<number>(-1)
  const [title, setTitle]= useState<string>('')
  const [url, setUrl]= useState<string>('')
  const [mode, setMode]= useState<string>('')
  const [menuOrder, setMenuOrder]= useState<number>(null)
  const [totalMenus, setTotalMenus] = useState<number>(null)

  const [pages, setPages]= useState<PostType | any>(null)
  const [editMode, setEditMode]= useState<boolean>(false)

  const [showPages, setShowPages]= useState<string>('')

  const pagesOptions = [
    {'title': 'Select pages', 'value': 'page'},
    {'title': 'Custom Url', 'value': 'url'}
  ]

 
  const handleClose = () => {    
    setId(-1)
    setTitle('')
    setUrl('')
    setMenuOrder(0)
    handleShowPostModal(false)
    setOpen(false)
    setMenuOrder(totalMenus)

    setShowPages('page')
    setMode('page')
  }

  const showHideUrl = (e) => {
    if (e == 'page') { 
      setMode('page')
      setShowPages(e)
    } else {
      setMode('url')
      setShowPages(e)
    }  
  } 

  const setMenuItemOrder = (e: number) => {
    
    setMenuOrder(e)
  }
  
  useEffect( () => {
    setOpen(show)
    retrievePages()
    setShowPages('page')
    setMode('page')
  }, [show])

  useEffect( () => {
    if(post !== null){
      setId(post.id)
      setTitle(post.title)
      setMode(post.mode)
      setMenuOrder(post.menuOrder)
      setEditMode(true)
      if(post.mode === 'page') { 

        setShowPages('page')
        setUrl(post.url)

      }
      else {
        setShowPages('url')
        setUrl(post.url)
      
      }
    } else{
      setEditMode(false)
    }
  }, [post])


  useEffect(()=> {
    if(menuLength) {
      console.log(menuLength)
      setTotalMenus(menuLength)
      setMenuOrder(menuLength + 1)
    }
  }, [menuLength])

  const isEmptyOrSpaces= (str:string) => {
    return str === null || str.match(/^ *$/) !== null
  }

  const isUrl = (str)  => {
    if(str === '/') {
      return true 
    }
    return (str[0] == '/' && str.substring(1).match(/^(\d|\w|\/)+$/))
  }

  const isDisabled= () => {
      
      if(title && !isEmptyOrSpaces(title) && url && !isEmptyOrSpaces(url) &&  isUrl(url) && menuOrder && (editMode ? (menuOrder < totalMenus+1) : menuOrder )) {
        return false
      }
      
      return true
  }

  const retrievePages= () => {
    API({
        method: 'GET',
        url: '/page',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            userType: 'admin'
        }
    })
    .then( response => {
        setPages(response.data)
    })
    .catch (err => {
        handleSnackBar(err.message)
    })
}




  const handleSubmit= () => {

    let httpMethod, httpUrl


    if(post){
      httpMethod= 'PATCH'
      httpUrl='/menu/'+id
    }
    else{
      httpMethod= 'POST'
      httpUrl='/menu'
    }


    

    API({
      method: httpMethod,
      url: httpUrl,
      data: {title: title, url: url, mode: mode, menuOrder: menuOrder},
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
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
        <DialogTitle id="form-dialog-title" style={{background: '#191919', color: '#1E88F7'}} >{post !== null ? 'Edit Menu' : 'Add Menu'}</DialogTitle>
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
 
        
            {
              post ?
              <TextField
              defaultValue={menuOrder}
              margin="dense"
              id="menuOrder"
              label="Order"
              type="number"
              fullWidth
              onChange={ (e: React.ChangeEvent<{ value: unknown }>) => setMenuOrder(e.target.value as number) }
              InputProps={{
                  className: classes.textField,
              }}
            /> : null
            }
          
            <Select
              id="page"
              label="Choose Page or Url"
              value={showPages}
              fullWidth
              onChange={ (e: React.ChangeEvent<{ value: unknown }>) => showHideUrl(e.target.value as string) }
              style={{marginTop: 20}}
              
            >
              {
                  pagesOptions ? pagesOptions.map((option, index) => (
                    <MenuItem key={index} value={option.value}>{option.title}</MenuItem>
                  )) : null
              }    
            </Select> 
            
            {
              (showPages == 'page') ? 
            <Select
              id="url"
              label="Url"
              value={url}
              fullWidth
              onChange={ (e: React.ChangeEvent<{ value: unknown }>) => setUrl( e.target.value as string) }
              style={{marginTop: 20}}
              
            >
              {
                  pages && pages.length ? pages.map((page:PageData, index) => (
                    <MenuItem key={index} value={'/page'+ page.url}>{'/page' +page.url}</MenuItem>
                  )) : null
              }    
            </Select> :


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
            }  
            
            
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

export default MenuForm
