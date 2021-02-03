import React, { useState, useEffect } from 'react'
import API from 'utils/API'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import SnackBar from 'components/shared/SnackBar'
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import BookForm from 'components/admin/home/BookForm'
import BookCard from 'components/admin/home/BookCard'


interface BookType{
    id: number,
    title: string,
    cover_photo: string,
    price:number
}

interface BookProps{
    accessToken: string
}

const Book: React.FC<BookProps>= ({accessToken}) => {

    const [snackBarVal, setSnackBarVal]= useState<any>(null)

    const [showBookForm, setShowBookForm]= useState<boolean>(false)

    const [books, setBooks]= useState<BookType | any>(null) //all courses from db

    const [bookToEdit, setBookToEdit]= useState<BookType | any>(null)

    const handleSnackBar= (e:any) => {
        setSnackBarVal(null)
        setSnackBarVal(e)
    }

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

    const handleDelete= (id:number) => {

        API({
            method: 'DELETE',
            url: '/book/'+id,
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

    const handleEdit= (book:BookType) => {
        setBookToEdit(book)
        setShowBookForm(true)
    }

    useEffect( () => {
        retrieveBooks()
    }, [snackBarVal])

    const handleShowBookModal= (e:boolean) => {
        setShowBookForm(e)
        if(e===false)
            setBookToEdit(null)
    }

    return (
        <Container maxWidth="xl">

            <Box display="flex" justifyContent="flex-end" mt={2}>
                <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<AddCircleIcon />}
                    onClick={ () => handleShowBookModal(true)}
                >
                    Create Book
                </Button>
            </Box>

            <Box mt={5}>
                <Typography variant="h4" color="primary">Books</Typography>
            </Box>
            

            <Box mt={10}>
                {
                    books && books.length ? books.map( (book:BookType) => (
                        <Box mt={10} style={{cursor: 'pointer'}}><BookCard book={book} handleDelete={handleDelete} handleEdit={handleEdit} /></Box>
                    )) : null
                }
            </Box>

            <BookForm accessToken={accessToken} show={showBookForm} handleShowBookModal={handleShowBookModal} book={bookToEdit} handleSnackBar={handleSnackBar} />

            {
                snackBarVal !== null ? <SnackBar state="true" msg={snackBarVal} /> : null
            }

        </Container>
    )
}

export default Book
