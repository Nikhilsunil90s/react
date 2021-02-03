import React, { useState, useEffect } from 'react'
import API from 'utils/API'
import { makeStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import NavBar from 'components/shared/nav/NavBar.jsx'
import LessonCard from 'components/lesson/LessonCard'
import CircularProgress from '@material-ui/core/CircularProgress'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ShowLesson from 'components/shared/ShowLesson'

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

const  Lessons: React.FC= () => {

    const classes = useStyles()
    const matches = useMediaQuery('(max-width:960px)')

    const [snackBarVal, setSnackBarVal]= useState<any>(null)
    const [lessons, setLessons]= useState<LessonType | any>(null)

    const [isLoading, setIsLoading]= useState<boolean>(false)

    const [filterBy, setFilterBy]= useState<string>('All')
    const [courses, setCourses]= useState<any>('')
    const [lessonDetails, setLessonDetails]= useState<LessonType>({id: 0, thumbnail: '', video:'', duration: '', title: '', description: '', courseId: -1})

    const [showLessonForm, setShowLessonForm]= useState<boolean>(false)
    const [showLessonModal, setShowLessonModal]= useState<boolean>(false)

    const handleFilterBy= (event: React.ChangeEvent<{ value: unknown }>) => {
        setFilterBy(event.target.value as string)
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

    const retrieveCourses= () => {

        API({
            method: 'GET',
            url: '/course',
        })
        .then( response => {
            setCourses(response.data)
        })
        .catch (err => {
            handleSnackBar(err.message)
        })
    }

    useEffect(() => {

        retrieveCourses()

    }, []);

    useEffect( () => {
        setLessons(null)
        retrieveLessons()   
    }, [filterBy])

    const showLesson= (lesson:LessonType) => {
        setLessonDetails(lesson)
        handleShowLessonModal(true)
    }

    const handleShowLessonModal= (e:boolean) => {
        setShowLessonModal(e)
    }


    return (
        <>
        <Box className={classes.containerStyle} pt={0}>
        <NavBar bg="#fff" textColor="#191919" />
            <Container maxWidth="lg">
                <Box my={5} display="flex" justifyContent="center" style={{marginBottom: 0}}><Typography variant="h3" style={{color: 'black'}}>Lessons</Typography></Box>
            </Container>
            <Box mt={10} style={{marginTop:0, paddingTop: 0}}>
                <Container maxWidth="lg">
                    <Box display="flex" justifyContent="flex-end">
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-outlined-label">Filter By</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={filterBy}
                                onChange={handleFilterBy}
                                label="Filter By"
                            >
                            <MenuItem value="All">All</MenuItem>
                            {
                                courses && courses.length > 0 ? courses.map( ( course,index ) => 
                                    (
                                        <MenuItem key={index} value={course.id}>{course.title}</MenuItem>
                                    )
                                ) : null
                            }
                            </Select>
                        </FormControl>
                    </Box>
                    <Box py={10}>
                        <Grid container spacing={3}>
                            {
                                lessons && lessons.length > 0 ? lessons.map( ( lesson,index ) => 
                                    (
                                        <LessonCard lesson={lesson} key={index} showLessonModal={showLesson} />
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
            <ShowLesson showLessonModal={showLessonModal} trailer={null} lesson={lessonDetails} handleShowLessonModal={handleShowLessonModal} />
        </Box>
        </>
    )
}

export default Lessons
