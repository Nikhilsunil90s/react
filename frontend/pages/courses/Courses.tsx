import React, { useState, useEffect } from 'react'
import API from 'utils/API'
import { makeStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import CourseCard from 'components/course/CourseCard'
import SnackBar from 'components/shared/SnackBar'
import Link from 'next/link'
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
}))

interface CourseType{
    id: number,
    title: string,
    description: string,
    slug:string,
    trailer: string,
    cover_photo: string,
    fees:number
}

const Courses: React.FC= () => {


    const [snackBarVal, setSnackBarVal]= useState<any>(null)

    const [courses, setCourses]= useState<CourseType | any>(null) //all courses from db

    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down('sm'))
    const matchesXs = useMediaQuery(theme.breakpoints.down('xs'))


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
            handleSnackBar('Error')
        })
    }

    useEffect( () => {
        retrieveCourses()
    }, [snackBarVal])

    return (
        <>
        <Container maxWidth="xl" style={{background: 'white', paddingBottom: 50}}>

            <Box mt={5} display="flex" justifyContent="center">
                <Typography variant="h3" style={{fontWeight: 900, paddingBottom: 0, marginBottom: 0, color: 'black'}}>Programs Available For Purchase</Typography>
            </Box>

            <Box mt={10} display="flex" flexDirection={matches? 'column' : 'row'} style={{paddingTop: 0, marginTop: 0}} alignItems={matches ? 'center' : 'flex-start'} flexWrap="wrap">
                {
                    courses && courses.length ? courses.map( (course:CourseType) => (
                         <Link href={`/courses/${course.slug}`}>
                            <Box ml={matches? 0 : 2} mt={10} style={{marginTop:30, marginBottom: 30, paddingTop:0, cursor: 'pointer'}} width={matchesXs ? "100%" : 'auto'}>
                                    <CourseCard course={course} />
                                
                            </Box>
                         </Link>
                    )) : null
                }
            </Box>

            {
                snackBarVal !== null ? <SnackBar state="true" msg={snackBarVal} /> : null
            }
            
        </Container>
        <Footer color="black"/> 
        </>
    )
}

export default Courses
