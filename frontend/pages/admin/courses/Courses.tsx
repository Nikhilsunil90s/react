import React, { useState, useEffect } from 'react'
import API from 'utils/API'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import CourseForm from 'components/admin/courses/CourseForm'
import CourseCard from 'components/admin/courses/CourseCard'
import SnackBar from 'components/shared/SnackBar'
// import { withSSRContext } from 'aws-amplify'
const useStyles = makeStyles((theme) => ({
    
}))

interface CourseType{
    _id?: number,
    title?: string,
    description?: string,
    trailer?: string,
    slug:string,
    cover_photo: string,
    fees: number
}

interface CoursesProps{
    accessToken: string
}

const Courses: React.FC<CoursesProps>= ({accessToken}) => {

    const [snackBarVal, setSnackBarVal]= useState<any>(null)

    const [showCourseForm, setShowCourseForm]= useState<boolean>(false)

    const [courses, setCourses]= useState<CourseType | any>(null) //all courses from db

    const [courseToEdit, setCourseToEdit]= useState<CourseType | any>(null)

    let covers= []

    const handleShowCourseModal= (e:boolean) => {
        setShowCourseForm(e)
        if(e===false)
            setCourseToEdit(null)
    }

    const handleSnackBar= (e:any) => {
        setSnackBarVal(null)
        setSnackBarVal(e)
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
            console.log('Error')
        })
    }

    const handleDelete= (id:number) => {

        API({
            method: 'DELETE',
            url: '/course/'+id,
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

    const handleEdit= (course:CourseType) => {
        setCourseToEdit(course)
        setShowCourseForm(true)
    }

    useEffect( () => {
        retrieveCourses()
    }, [snackBarVal])

    return (
        <Container maxWidth="xl">

            <Box display="flex" justifyContent="flex-end" mt={2}>
                <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<AddCircleIcon />}
                    onClick={ () => handleShowCourseModal(true)}
                >
                    Add Course
                </Button>
            </Box>

            <Box mt={5}>
                <Typography variant="h4" color="primary">Courses</Typography>
            </Box>

            <Box mt={10}>
                {
                    courses && courses.length ? courses.map( (course:CourseType) => (
                        <Box mt={10} style={{cursor: 'pointer'}}><CourseCard course={course} handleDelete={handleDelete} handleEdit={handleEdit} /></Box>
                    )) : null
                }
            </Box>

            <CourseForm accessToken={accessToken} show={showCourseForm} handleShowCourseModal={handleShowCourseModal} course={courseToEdit} handleSnackBar={handleSnackBar} />

            {
                snackBarVal !== null ? <SnackBar state="true" msg={snackBarVal} /> : null
            }

        </Container>
    )
}

export default Courses
