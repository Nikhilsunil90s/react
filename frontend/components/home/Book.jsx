import React, { useState, useEffect } from 'react'
import API from 'utils/API'
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Image from 'material-ui-image';
import TextTruncate from 'react-text-truncate';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Link from '@material-ui/core/Link';   
//import Link from 'next/link'

export default function Book() {

    const [books, setBooks]= useState(null)
    const [covers, setCovers]= useState([])

    const retrieveBooks= () => {
        API({
            method: 'GET',
            url: '/book',
        })
        .then( response => {
            setBooks(response.data)
            response.data.map( book => {
                retrieveBookCovers(book.cover_photo)
            })
        })
        .catch (err => {
            console.log('Error')
        })
    }

    const retrieveBookCovers= (id) => {
        
        API({
            method: 'GET',
            url: '/media/'+id,
            responseType: 'arraybuffer'
            
          })
          .then( response => {
            
            const base64Str = btoa(
                new Uint8Array(response.data).reduce(
                  (data, byte) => data + String.fromCharCode(byte),
                  '',
                ),
            );  
            let image= `data:image/${id.substring(id.lastIndexOf('.')+1)};base64, ${base64Str}`

            if(covers === null)
                setCovers(image)
            else
                setCovers( oldArray => [...oldArray, image])
          })
          .catch( err => {
            console.log(err)
          })
    }

    useEffect(() => {
        retrieveBooks()
    }, [])

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };

    return (
        <Container maxWidth="lg" style={{marginTop: 20}}>
            <Box mb={10} style={{marginBottom: 10, color: "#000"}} display="flex" justifyContent="center"><Typography variant="h3" color="primary">Books</Typography></Box>
            {
                books && books.length > 0 ? (
                    <Carousel
                        swipeable={false}
                        draggable={false}
                        showDots={true}
                        responsive={responsive}
                        ssr={true}
                        keyBoardControl={true}
                        customTransition="all 1s"
                        transitionDuration={300}
                        containerClass="carousel-container"
                        removeArrowOnDeviceType={["tablet", "mobile"]}
                        dotListClass="custom-dot-list-style"
                        itemClass="carousel-item-padding-40-px"
                        style={{border: '1px solid red'}}
                    >
                            {
                                books.map((book, index) => (
                                    <Box px={1} key={index}>
                                        <Link href={`/book-detail/`+book.id}>
                                            <Image
                                                src={covers[index]}
                                                style={{objectFit: 'cover', width: '100%', height: '100%', cursor: 'pointer'}}
                                                color="#27293D"
                                            />
                                            <Box p={3} boxShadow="5px 5px 5px #f6f6f6" color="#777F97">
                                                <Typography>
                                                    <TextTruncate
                                                        line={3}
                                                        element="span"
                                                        truncateText="…"
                                                        text={book.title}
                                                    />
                                                </Typography>
                                            </Box>
                                        </Link>
                                    </Box> 
                                ))
                            } 
                    </Carousel>

                ) : null
            }
        </Container>
    )
}
