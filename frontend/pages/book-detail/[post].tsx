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
import Link from '@material-ui/core/Link';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider';
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import Button from '@material-ui/core/Button'
import { useRouter } from 'next/router'
import Footer from 'components/home/Footer'


const useStyles = makeStyles((theme) => ({
    containerStyle:{
        background: '#FFF',
        width: '100% !important',
        position: 'relative',
        overflow: 'hidden',
        paddingBottom: 50,
        minHeight: '100vh'
    },
    filterItem : {
        textAlign : 'left',
        display : 'block',
        color: '#030303',
        fontSize: '16px',
        margin: '15px',
    },
    h2: {
        width: "80%",  
        fontWeight: "normal",   
        textAlign: "center",
        borderBottom: "1px solid #464646 !important",  
        lineHeight: "0.1em",
        margin: "10px 0 20px 30px",
        color: '#464646 !important',
        "& span": {
            background: "white",
            padding: "0 10px",
            color: '#464646 !important',
        }
    },
    boxPadding : {
        padding:'20px',  
        
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

const  BookDetail: React.FC= () => {

    const classes = useStyles()
    const matches = useMediaQuery('(max-width:768px)')
    const router = useRouter()
    const { post } = router.query

    //alert(post)
    const [snackBarVal, setSnackBarVal]= useState<any>(null)
    const [books, setBooks]= useState<PostType | any>(null)
    const [booksImage, setBooksImage]= useState<PostType | any>(null)
    const [booksDescription, setBooksDescription]= useState<PostType | any>(null)
    const [booksTitle, setBooksTitle]= useState<PostType | any>(null)
    const [booksLink, setBooksLink]= useState<PostType | any>('javascript:void(0)')
    const [isLoading, setIsLoading]= useState<boolean>(false)

    const handleSnackBar= (e:any) => {    
        setSnackBarVal(null)
        setSnackBarVal(e)
    };    

    const bookDetail= () => {
        setIsLoading(true)     
        API({
            method: 'GET',
            url: '/book/detail/'+post,
            data: {id:post}
        })  
        .then( response => {    
            setBooks(response.data)
            retrieveCover(response.data.cover_photo);
            setBooksTitle(response.data.title);
            setBooksDescription(response.data.content);
            if(response.data.buy_link != null) {
                //alert(response.data.buy_link);
                setBooksLink(response.data.buy_link);
            }
            setIsLoading(false)
        })
        .catch (err => {
            handleSnackBar(err.message)
        })
    }

    const retrieveCover= (cover_photo) => {
        
        API({
            method: 'GET',
            url: '/media/'+cover_photo,
            responseType: 'arraybuffer'
            
          })
          .then( response => {
            
            const base64Str = btoa(
                new Uint8Array(response.data).reduce(
                  (data, byte) => data + String.fromCharCode(byte),
                  '',
                ),
            );  
            let image= `data:image/${cover_photo.substring(cover_photo.lastIndexOf('.')+1)};base64, ${base64Str}`
            setBooksImage(image);
          })
          .catch( err => {
            console.log(err)
          })
    }

    useEffect(() => {
        bookDetail();
    },[post]);

    return (
        <>
        <Box className={classes.containerStyle} pt={0}>
        <NavBar bg="#fff" textColor="#191919" />  
                <Container maxWidth="lg">    
                    <Box my={5} display="flex" justifyContent="center" style={{marginBottom: 0}}>
                        <Typography variant="h3" style={{fontWeight: 900, paddingBottom: 0, marginBottom: 0, color: 'black'}}>{booksTitle}</Typography>
                    </Box>
                </Container>

                <Grid container direction="row">         
                    <Grid container direction="column" style = {{width:  matches ? "100%" : "50%"}} className={classes.boxPadding} >
                        <Grid container spacing={2}>
                            {/* {
                                books && books.length ? books.map( ( book,index ) => 
                                    (
                                        null
                                    )    
                                ) : <span style={{color:'black'}}>No book found</span>
                            }    
                            {
                                isLoading ? <Box width="100%" display="flex" justifyContent="center"><CircularProgress /></Box> : null
                            } */}
                            <Image
                                src={booksImage}
                                style={{objectFit: 'cover', width: '100%', height: '100%', cursor: 'pointer'}}
                                loading={true}
                                color="#27293D"
                            />
                        </Grid> 
                    </Grid>  

                    <Grid container direction="column" style = {{width:  matches ? "100%" : "50%"}} className={classes.boxPadding} >
                        <Grid container spacing={2}>
                            <Typography variant="subtitle1" style={{color: '#464646'}} paragraph={true} dangerouslySetInnerHTML={{__html: booksDescription}}></Typography>
                        </Grid>
                        
                        <Grid container spacing={2}>
                            <Button
                                target="_blank" 
                                href={booksLink}
                                variant="contained"
                                color="primary"
                                startIcon={<PlayArrowIcon />}
                                style={{fontWeight: 600}}
                            >
                                Buy
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>

                  
        </Box>
        <Footer  color="black"/>
        </>
    )
}

export default BookDetail
