import React, { useState, useEffect } from 'react'
import API from 'utils/API'
import { makeStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import LessonCard from 'components/lesson/LessonCard'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import LessonForm from 'components/admin/lessons/LessonForm'
import SnackBar from 'components/shared/SnackBar'
import ShowLesson from 'components/shared/ShowLesson'

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
            marginTop: theme.spacing(2),
    },
}))

interface LessonType {
    id:number,
    thumbnail:string,
    video:string,
    duration:string,
    title:string,
    description:string
    courseId:number
}

interface LessonsProps{
    accessToken:string
}

const  Lessons: React.FC<LessonsProps>= ({accessToken}) => {

    const classes = useStyles()
    const matches = useMediaQuery('(max-width:960px)')

    const [snackBarVal, setSnackBarVal]= useState<any>(null)
    const [lessons, setLessons]= useState<LessonType | any>(null)

    const [isLoading, setIsLoading]= useState<boolean>(false)

    const [filterBy, setFilterBy]= useState<string>('All')
    const [lessonToEdit, setLessonToEdit]= useState<LessonType | any>(null)
    const [lessonDetails, setLessonDetails]= useState<LessonType>({id: 0, thumbnail: '', video:'', duration: '', title: '', description: '', courseId: -1})

    const [showLessonForm, setShowLessonForm]= useState<boolean>(false)
    const [showLessonModal, setShowLessonModal]= useState<boolean>(false)

    const handleShowLessonForm= (e:boolean) => {
        setShowLessonForm(e)
    }

    const handleSnackBar= (e:any) => {
        setSnackBarVal(null)
        setSnackBarVal(e)
    };

    const retrieveLessons= () => {

        setIsLoading(true)

        API({
            method: 'POST',
            url: '/lesson/all',
            data: {filterBy: filterBy}
        })
        .then( response => {

            setLessons(response.data)
            setIsLoading(false)
        })
        .catch (err => {
            handleSnackBar(err.message)
        })
    }

    useEffect( () => {
        setLessons(null)
        retrieveLessons()   
    }, [filterBy])

    useEffect( () => {
        retrieveLessons()
    }, [snackBarVal])
    

    const showLesson= (lesson:LessonType) => {
        setLessonDetails(lesson)
        handleShowLessonModal(true)
    }

    const handleShowLessonModal= (e:boolean) => {
        setShowLessonModal(e)
    }

    const handleDelete= (id:number) => {

        API({
            method: 'DELETE',
            url: '/lesson/'+id,
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

    const handleEdit= (lesson:LessonType) => {
        setLessonToEdit(lesson)
        setShowLessonForm(true)
    }


    return (

        <Container maxWidth="xl">

            <Box display="flex" justifyContent="flex-end" mt={2}>
                <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<AddCircleIcon />}
                    onClick={ () => handleShowLessonForm(true)}
                >
                    Add Lesson
                </Button>
            </Box>

            <Box mt={5}>
                <Typography variant="h4" color="primary">Lessons</Typography>
            </Box>
                    
            <Box py={10}>
                <Grid container spacing={3}>
                    {
                        lessons && lessons.length > 0 ? lessons.map( ( lesson,index ) => 
                            (
                                <LessonCard lesson={lesson} key={index} isAdmin={true} showLessonModal={showLesson} handleEdit={handleEdit} handleDelete={handleDelete} />
                            )
                        ) : null
                    }
                    {
                        isLoading ? <Box width="100%" display="flex" justifyContent="center"><CircularProgress /></Box> : null
                    }
                </Grid>
            </Box>
            <LessonForm showCategories={true} accessToken={accessToken} show={showLessonForm} lesson={lessonToEdit} courseId={-1} handleShowLessonModal={handleShowLessonForm} handleSnackBar={handleSnackBar} />

            <ShowLesson enrolled={true} showLessonModal={showLessonModal} trailer={null} lesson={lessonDetails} handleShowLessonModal={handleShowLessonModal} />

            {
                snackBarVal !== null ? <SnackBar state="true" msg={snackBarVal} /> : null
            }
         </Container>
    )
}

export default Lessons
