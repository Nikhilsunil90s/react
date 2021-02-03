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
import BlogForm from 'components/admin/blog/BlogForm'
import BlogCard from 'components/blog/BlogCard.jsx'
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
    author: string
    mainImg: string
    date: string
    category: string
    isFeatured: boolean
}

interface BlogProps{
    accessToken:string
}

const Blog:React.FC<BlogProps> = ({accessToken}) => {

    const classes = useStyles()

    const [showPostForm, setShowPostForm]= useState<boolean>(false)
    const [snackBarVal, setSnackBarVal]= useState<any>(null)
    const [postToEdit, setPostToEdit]= useState<PostType | any>(null)

    const [blogs, setBlogs]= useState<PostType | any>(null)

    const [isLoading, setIsLoading]= useState<boolean>(false)

    const [featuredBlogs, setFeaturedBlogs]= useState<PostType | any>(null)


    const handleShowPostModal= (e:boolean) => {
        setShowPostForm(e)
        if(e===false)
            setPostToEdit(null)
    }

    const handleSnackBar= (e:any) => {
        setSnackBarVal(null)
        setSnackBarVal(e)
    }

    const retrieveBlogs= () => {

        setIsLoading(true)

        API({
            method: 'POST',
            url: '/blog/posts',
            data: {filterBy: 'All'}
        })
        .then( response => {

            setBlogs(response.data)

            setIsLoading(false)
        })
        .catch (err => {
            handleSnackBar(err.message)
        })
    }

    const retrieveFeaturedBlogs= () => {
        API({
            method: 'GET',
            url: '/blog/posts/featured',
        })
        .then( response => {
            setFeaturedBlogs(response.data)
        })
        .catch (err => {
            handleSnackBar(err.message)
        })
    }

    const handleDelete= (id:number) => {

        API({
            method: 'DELETE',
            url: '/blog/'+id,
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

    const handleEdit= (blog:PostType) => {

        setPostToEdit(blog)
        setShowPostForm(true)
    }

    useEffect(() => {

        retrieveFeaturedBlogs()
        retrieveBlogs()

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
                    Create Post
                </Button>
            </Box>

            <Box mt={5}>
                <Typography variant="h4" color="primary">Blog</Typography>
            </Box>

            <Box mt={5}>
                <Container maxWidth="xl" style={{'backgroundColor':'#162235'}}>
                    <Box py={10} >
                    { featuredBlogs && featuredBlogs.length ?
                        (
                            <Box my={5}>
                                <Box mb={5}><Typography variant="h6" color="primary">Featured Posts:</Typography></Box>
                                <Grid container spacing={3}>
                                    {
                                        featuredBlogs.map( ( blog,index ) => 
                                            (
                                                <BlogCard blog={blog} isAdmin={true} key={index} handleDelete={handleDelete} handleEdit={handleEdit} />
                                            )
                                    )}
                                </Grid>
                            </Box>
                        ) : null 
                    }


                    { blogs && blogs.length ?
                        (
                            <Box mt={featuredBlogs && featuredBlogs.length ? 15 : 0}>
                                <Box mb={5}><Typography variant="h6" color="primary">Posts</Typography></Box>
                                <Grid container spacing={3}>
                                    {
                                        blogs.map( ( blog,index ) => 
                                            (
                                                <BlogCard blog={blog} isAdmin={true} key={index} handleDelete={handleDelete} handleEdit={handleEdit} />
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

            <BlogForm accessToken={accessToken} post={postToEdit} show={showPostForm} handleShowPostModal={handleShowPostModal} handleSnackBar={handleSnackBar} />

            {
                snackBarVal !== null ? <SnackBar state="true" msg={snackBarVal} /> : null
            }
        </Container>
    )
}

export default Blog
