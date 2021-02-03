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
import PageForm from 'components/admin/page/PageForm'
import PageCard from 'components/page/PageCard'
import CircularProgress from '@material-ui/core/CircularProgress'

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
    content: string
    description: string
    url: string
}   

interface PageProps{
    accessToken:string
}

const Page:React.FC<PageProps> = ({accessToken}) => {

    const classes = useStyles()

    const [showPostForm, setShowPostForm]= useState<boolean>(false)
    const [snackBarVal, setSnackBarVal]= useState<any>(null)
    const [postToEdit, setPostToEdit]= useState<PostType | any>(null)

    const [pages, setPages]= useState<PostType | any>(null)

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

    const handleDelete= (id:number) => {

        API({
            method: 'DELETE',
            url: '/page/'+id,
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

    const handleEdit= (page:PostType) => {

        setPostToEdit(page)
        setShowPostForm(true)
    }

    useEffect(() => {
        retrievePages()
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
                    Create Page
                </Button>
            </Box>

            <Box mt={5}>
                <Typography variant="h4" color="primary">Page</Typography>
            </Box>

            <Box mt={5}>
                <Container maxWidth="xl" style={{'backgroundColor':'#162235'}}>
                    <Box py={5} >
                    


                    { pages && pages.length ?
                        (
                            <Box mt={pages && pages.length ? 15 : 0}>
                                <Box mb={2}><Typography variant="h6" color="primary">Pages</Typography></Box>
                                <Grid container spacing={3}>
                                    {
                                        pages.map( ( page,index ) => 
                                            (
                                                <PageCard page={page} isAdmin={true} key={index} handleDelete={handleDelete} handleEdit={handleEdit} />
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

            <PageForm accessToken={accessToken} post={postToEdit} show={showPostForm} handleShowPostModal={handleShowPostModal} handleSnackBar={handleSnackBar} />

            {
                snackBarVal !== null ? <SnackBar state="true" msg={snackBarVal} /> : null
            }
        </Container>
    )
}

export default Page
