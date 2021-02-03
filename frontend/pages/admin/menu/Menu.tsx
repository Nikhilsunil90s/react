import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import API from 'utils/API'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import SnackBar from 'components/shared/SnackBar'
import MenuCard from 'components/admin/menu/MenuCard.jsx'
import CircularProgress from '@material-ui/core/CircularProgress'
import MenuForm from 'components/admin/menu/MenuForm'

const useStyles = makeStyles((theme) => ({

    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
            marginTop: theme.spacing(2),
    },
    
}))

interface PostType{
    id: number
    title: string
    url: string
    mode: string,
    menuOrder: number
}

interface MenuProps{
    accessToken:string
}

const Menu:React.FC<MenuProps> = ({accessToken}) => {

    const classes = useStyles()
    
    const [showPostForm, setShowPostForm]= useState<boolean>(false)
    const [snackBarVal, setSnackBarVal]= useState<any>(null)
    const [postToEdit, setPostToEdit]= useState<PostType | any>(null)

    const [menus, setMenus]= useState<PostType | any>(null)
    const [menuLength, setMenusLength]= useState<any>(null)
    
    const [isLoading, setIsLoading]= useState<boolean>(false)



    const handleShowPostModal= (e:boolean) => {
        setShowPostForm(e)
        if(e===false)
            setPostToEdit(null)
    }

    const handleSnackBar= (e:any) => {
        setSnackBarVal(null)
        setSnackBarVal(e)
    }

    


    const retrieveMenus= () => {
        API({
            method: 'GET',
            url: '/menu',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                userType: 'admin'
            }
        })
        .then( response => {
            setMenus(response.data)
            setMenusLength(response.data.length)
        })
        .catch (err => {
            handleSnackBar(err.message)
        })
    }

    const handleDelete= (id:number) => {

        API({
            method: 'DELETE',
            url: '/menu/'+id,
            headers: {
                Authorization: `Bearer ${accessToken}`,
                userType: 'admin'
            }
        })
        .then( response => {
            if(response.data.success)
                handleSnackBar(response.data.success)
            else
                handleSnackBar(response.data.error)
        })
        .catch (err => {
            handleSnackBar('Error')
        })

    }

    const handleEdit= (menu:PostType) => {

        setPostToEdit(menu)
        setShowPostForm(true)
    }

    useEffect(() => {
        retrieveMenus()

    }, [snackBarVal])

    return (
        <Container maxWidth="xl">

            <Box display="flex" justifyContent="flex-end" mt={2}>
                <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<AddCircleIcon />}
                    onClick={ () => handleShowPostModal(true)}
                >
                    Create Menu
                </Button>
            </Box>

            <Box mt={5}>
                <Typography variant="h4" color="primary">Menu</Typography>
            </Box>

            <Box mt={5}>
                <Container maxWidth="xl" style={{'backgroundColor':'#162235'}}>
                    <Box py={5} >
                    


                    { menus && menus.length ?
                        (
                            <Box mt={menus && menus.length ? 15 : 0}>
                                <Box mb={2}><Typography variant="h6" color="primary">Menus</Typography></Box>
                                <Grid container spacing={3}>
                                    {
                                        menus.map( ( menu,index ) => 
                                            (
                                                <MenuCard menu={menu} isAdmin={true} key={index} handleDelete={handleDelete} handleEdit={handleEdit} />
                                            )
                                    )}
                                    {
                                        isLoading ? <Box width="100%" display="flex" justifyContent="center"><CircularProgress /></Box> : null
                                    }
                                </Grid>
                            </Box>
                        ) : null
                    }
                    </Box>
                </Container>
            </Box>

            <MenuForm accessToken={accessToken} post={postToEdit} menuLength={menuLength} show={showPostForm} handleShowPostModal={handleShowPostModal} handleSnackBar={handleSnackBar} />

            {
                snackBarVal !== null ? <SnackBar state="true" msg={snackBarVal} /> : null
            }
        </Container>
    )
}

export default Menu
