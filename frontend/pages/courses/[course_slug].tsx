import React, { useState, useEffect } from 'react'
import API from 'utils/API'
import AppBar from 'components/shared/nav/AppBar'
import SubHeader from 'components/shared/nav/SubHeader'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Welcome from 'components/course/WelcomeMessage'
import LessonCard from 'components/course/LessonCard'
import ShowLesson from 'components/shared/ShowLesson'
import { useRouter } from 'next/router'
import SnackBar from 'components/shared/SnackBar'
import NavBar from 'components/shared/nav/NavBar.jsx'
import { withSSRContext } from 'aws-amplify'
import Footer from 'components/home/Footer'
import { Grid } from '@material-ui/core'
import ReactPlayer from 'react-player'
import lessonPreview from 'components/shared/VideoPlayer'
import VideoPlayer from 'components/shared/VideoPlayer'

interface lessonType {
    id: number,
    thumbnail: string,
    video: string,
    duration: string,
    title: string,
    description: string
}

interface CourseType {
    _id?: number,
    title?: string,
    description?: string
    trailer?: string,
    cover_photo: string,
    slug: string
}

interface CourseProps {
    userEmail: string
}


const Course: React.FC<CourseProps> = ({ userEmail }) => {

    const router = useRouter()
    const { course_slug } = router.query

    const [lessons, setLessons] = useState<lessonType | any>(null)

    const [showLessonModal, setShowLessonModal] = useState<boolean>(false)

    const [lessonDetails, setLessonDetails] = useState<lessonType>({ id: 0, thumbnail: '', video: '', duration: '', title: '', description: '' })

    const [trailer, setTrailer] = useState<string>('')

    const [snackBarVal, setSnackBarVal] = useState<any>(null)

    const [course, setCourse] = useState<CourseType | any>(null)

    const [enrolled, setEnrolled] = useState<boolean>(false)

    const handleSnackBar = (e: any) => {
        setSnackBarVal(null)
        setSnackBarVal(e)
    }

    const retrieveCourse = () => {
        API({
            method: 'GET',
            url: '/course/' + course_slug,
        })
            .then(response => {
                setCourse(response.data)
            })
            .catch(err => {
                handleSnackBar('Error')
            })
    }

    const retrieveLessons = () => {
        if (course) {
            API({
                method: 'GET',
                url: '/lesson/' + course.id,
            })
                .then(response => {
                    setLessons(response.data)

                    if(enrolled) {
                        setTimeout(() =>  showLesson(response.data[0]), 2000)
                        
                    }
                })
                .catch(err => {
                    handleSnackBar('Error')
                })
        }
    }

    useEffect(() => {
        retrieveCourse()
    }, [course_slug])

    useEffect(() => {
        if (course !== null)
            retrieveLessons()
    }, [course])

    useEffect(() => {
        if (course) {
            isUserEnrolled()
        }
    }, [course])

    const isUserEnrolled = () => {

        API({
            method: 'POST',
            url: '/enroll/item',
            data: { course_id: course.id, email: userEmail }
        })
            .then(response => {
                if (response.data.success)
                    setEnrolled(true)
                else
                    setEnrolled(false)
            })
            .catch(err => {
                setEnrolled(false)
            })
    }

    useEffect(() => {
        retrieveLessons()
    }, [snackBarVal])


    const showLesson = (lesson: lessonType) => {
        setTrailer(null)
        setLessonDetails(lesson)
        handleShowLessonModal(true)
    }

    const showTrailer = (trailer: string) => {
        setLessonDetails(null)
        setTrailer(trailer)
        handleShowLessonModal(true)
    }

    const handleShowLessonModal = (e: boolean) => {
        setShowLessonModal(e)
    }

    return (
        <>
            {/* <AppBar/>
            <SubHeader/> */}
            <NavBar bg="#191919" textColor="#FFF" />
            {
                course ? <Box style={{ height: 'calc(100vh - 65px)' }}><Welcome bgImg={course.cover_photo} title={course.title} trailer={course.trailer} showTrailer={showTrailer} slug={course.slug} enrolled={enrolled} /></Box> : null
            }

            <Box>
                <Grid container >
                    <Grid item xs={12} md={8} >
                     {
                        course ? 
                        <VideoPlayer enrolled={enrolled} showLessonModal={showLessonModal} lesson={lessonDetails} trailer={trailer} handleShowLessonModal={handleShowLessonModal} course_slug={course.slug} ></VideoPlayer> :
                        null
                     } 
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box >
                            {
                                lessons ? lessons.map((lesson: lessonType, index: number) => (
                                    <Box style={{ marginTop: "5px" }}><LessonCard key={index} lesson={lesson} isAdmin={false} count={++index} showLessonModal={showLesson} /></Box>
                                )) : null
                            }
                        </Box>
                    </Grid>
                </Grid>
                {/* <Container maxWidth="lg" style={{paddingTop: 20, paddingBottom: 100}}>
                    
                    
                    <Box>
                        {
                            lessons ? lessons.map( (lesson:lessonType, index:number) => (
                                <Box mt={10}><LessonCard key={index} lesson={lesson} isAdmin={false} count={++index} showLessonModal={showLesson} /></Box>
                            )) : null
                        }
                    </Box>
                </Container> */}
            </Box>


            {/* {
                course ? <ShowLesson enrolled={enrolled} showLessonModal={showLessonModal} lesson={lessonDetails} trailer={trailer} handleShowLessonModal={handleShowLessonModal} course_slug={course.slug} /> : null
            } */}

            {
                snackBarVal !== null ? <SnackBar state="true" msg={snackBarVal} /> : null
            }
            <Footer color="grey"/>
        </>
    )
}

export async function getServerSideProps({ req, res }) {
    const { Auth } = withSSRContext({ req })

    try {
        const user = await Auth.currentAuthenticatedUser()
        return {
            props: {
                userEmail: user.attributes.email
            }
        }
    } catch (err) {
        return { props: {} }
    }
}

export default Course
