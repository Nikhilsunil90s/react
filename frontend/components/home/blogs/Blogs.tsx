import React, { useState, useEffect } from 'react';
import API from 'utils/API';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import BlogCard from './BlogCard'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress'
import Link from 'next/link'
import Button from '@material-ui/core/Button';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const useStyles = makeStyles((theme) => ({
    containerStyle:{
        background: '#FFF',
        width: '100% !important',
        position: 'relative',
        overflow: 'hidden',
        paddingBottom: 50,
        minHeight: '100vh'
    },
    featuredImg: {
        transition: 'all 1s',
        '&:hover':{
            opacity: .8
        }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
            marginTop: theme.spacing(2),
    },
    button: {
        margin: theme.spacing(1),
    }
}));

interface PostType{
    id: number
    title: string
    content: string
    author: string
    mainImg: string
    date: string
    isFeatured: boolean
}

const Blogs: React.FC= () => {

    const classes = useStyles()
    const theme = useTheme()
    const matches = useMediaQuery('(max-width:960px)')
    const [blogs, setBlogs]= useState<PostType | any>(null)
    const [isLoading, setIsLoading]= useState<boolean>(false)
    const [contentWidth, setContentWidth]= useState<any>('')

    useEffect(() => {
        const win = typeof screen === 'object' ? window : false;

        if(win) {
            setContentWidth(window.innerWidth -10  + 'px')
            win.addEventListener('resize', handleResize)
        }
    
    }, [])
    

    const handleResize = (e) => {
        let width = window.innerWidth - 10 + 'px'
        setContentWidth('0px')
        setTimeout(() => {
            setContentWidth(width)
        },200)
    }
    

    const retrieveBlogs= (offsetVal=0) => {

        setIsLoading(true)

        API({
            method: 'POST',
            url: '/blog/posts',
            data: {blogOffset: offsetVal, filterBy: 'All'}
        })
        .then( response => {
            
            setBlogs(response.data)

            setIsLoading(false)
        })
        .catch (err => {
            console.log(err.message)
        })
    }

    useEffect(() => {
        retrieveBlogs()
    }, [])

    return ( 

        <Container  style={{width: 'calc('+ contentWidth +')', maxWidth: 'calc(3000px)',background: '#05284d', color: '#fff', padding: '10px 0px 10px 0px', margin: '50px 0px', 'marginLeft': 'calc(-50vw + 50%)'}}>
            <Box my={5} display="flex" style={{marginBottom: 10, color: '#00'}} justifyContent="center"><Typography variant="h3" >Featured Blogs</Typography></Box>
            <Box mt={10} style={{marginTop:0, padding: matches ? '0 10px' : '0 50px' }}>
                <Container maxWidth="lg">
                    <Box py={10} style={{marginTop: 0, paddingTop: 0}}>
                        <Grid container spacing={3}>
                            {
                                blogs && blogs.length ? blogs.map( ( blog,index ) => 
                                    (
                                        index <= 5 ? (
                                            <BlogCard blog={blog} key={index}  />
                                        ) : null
                                    )
                                ) : null
                            }
                            {
                                isLoading ? <Box width="100%" display="flex" justifyContent="center"><CircularProgress /></Box> : null
                            }
                        </Grid>
                    </Box>
                </Container>
            </Box>
            <Box my={2} display="flex" justifyContent="center">
                <Link href={`/blog`}>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<ArrowForwardIcon />}
                >
                    View More
                </Button>
                </Link>
          </Box>
            
        </Container>
  )
}

export default Blogs
