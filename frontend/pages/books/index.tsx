import React, { useState, useEffect } from 'react'
import API from 'utils/API'
import { makeStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Image from 'material-ui-image'
import TextTruncate from 'react-text-truncate'
import NavBar from 'components/shared/nav/NavBar.jsx'
import BlogCard from 'components/blog/BlogCard.jsx'
import CircularProgress from '@material-ui/core/CircularProgress'
import Link from 'next/link'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider';
import Footer from 'components/home/Footer'
import Book from 'components/home/Book'
import Carousel from "react-multi-carousel";
import BookCard from 'components/books/BookCard'

const useStyles = makeStyles((theme) => ({
    containerStyle:{
        background: '#FFF',
        width: '100% !important',
        position: 'relative',
        overflow: 'hidden',
        paddingBottom: 50,
        minHeight: '100vh'
    },
    boxPadding : {
        //padding:'20px',  
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
    }
}))

interface PostType{
    id: number
    title: string
    content: string
    author: string
    mainImg: string
    date: string
    isFeatured: boolean
}



const  Books: React.FC= () => {

    const classes = useStyles()
    const matches = useMediaQuery('(max-width:960px)')
    const [books, setBooks]= useState(null)
    const matchesXs = useMediaQuery('(max-width:1280px)')

    const retrieveBooks= () => {
        API({
            method: 'GET',
            url: '/book',
        })
        .then( response => {
            setBooks(response.data)
            
        })
        .catch (err => {
            console.log('Error')
        })
    }

    

    useEffect(() => {
        retrieveBooks()
    }, [])


    return (
        <>
        <Box className={classes.containerStyle} pt={0}>
        <NavBar bg="#fff" textColor="#191919" />
        <Container maxWidth="lg">
                {/* <Book /> */}

                <Box mt={10} mb={10} style={{marginBottom: 10, color: "#000"}} display="flex" justifyContent="center"><Typography variant="h3" >Books</Typography></Box>
             
              <Box mt={10} display="flex" flexDirection={matches? 'column' : 'row'} style={{paddingTop: 0, marginTop: 0}} alignItems={matches ? 'center' : 'flex-start'} flexWrap="wrap">
                {
                    books && books.length ? books.map( (book: any) => (
                         <Link href={`/book-detail/`+book.id}>
                            <Box ml={matches? 0 : 2} mt={10} style={{marginTop:30, marginBottom: 30, paddingTop:0, cursor: 'pointer'}} width={matchesXs ? "100%" : 'auto'}>
                                    <BookCard book={book} />
                                
                            </Box>
                         </Link>
                    )) : null
                }
                </Box>
            
                <Footer color="black"/>
            </Container>
        </Box>

        </>
    )
}

export default Books
