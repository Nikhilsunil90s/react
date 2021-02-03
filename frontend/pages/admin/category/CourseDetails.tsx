import React, { useState, useEffect } from 'react'
import API from 'utils/API'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Welcome from 'components/course/WelcomeMessage'
import LessonCard from 'components/course/LessonCard'
import ShowLesson from 'components/shared/ShowLesson'
import { useRouter } from 'next/router'
import SnackBar from 'components/shared/SnackBar'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import LessonForm from 'components/admin/lessons/LessonForm'

interface lessonType {
    id: number,
    thumbnail:string,
    video:string,
    duration:string,
    title:string,
    description:string
}

interface CourseType{
    _id?: number,
    title?: string,
    description?: string
    trailer?: string,
    cover_photo: string,
}

interface CourseDetailsProps{
    accessToken?:string
}

const Course: React.FC<CourseDetailsProps> = ({accessToken}) => {

    const router = useRouter()
    const { course_slug } = router.query

    const [lessons, setLessons] = useState<lessonType | any>(null)

    const [showLessonModal, setShowLessonModal]= useState<boolean>(false)

    const [lessonDetails, setLessonDetails]= useState<lessonType>({id: 0, thumbnail: '', video:'', duration: '', title: '', description: ''})

    const [snackBarVal, setSnackBarVal]= useState<any>(null)

    const [course, setCourse]= useState<CourseType | any>(null) 

    const [lessonToEdit, setLessonToEdit]= useState<lessonType | any>(null)

    const [showLessonForm, setShowLessonForm]= useState<boolean>(false)

    const [trailer, setTrailer]= useState<string>('')

    const handleSnackBar= (e:any) => {
        setSnackBarVal(null)
        setSnackBarVal(e)
    }

    const handleShowLessonForm= (e:boolean) => {
        setShowLessonForm(e)
    }

    const retrieveCourse= () => {
        API({
            method: 'GET',
            url: '/course/'+course_slug,
        })
        .then( response => {
            setCourse(response.data)
        })
        .catch (err => {
            handleSnackBar('Error')
        })
    }

    const retrieveLessons= () => {
        if(course){
            API({
                method: 'GET',
                url: '/lesson/'+course.id,
            })
            .then( response => {
                setLessons(response.data)
            })
            .catch (err => {
                handleSnackBar('Error')
            })
        }
    }
    
    useEffect( () => {
        retrieveCourse()
    }, [course_slug])

    useEffect( () => {
        if(course){
            retrieveLessons()
        }
    }, [course])

    useEffect( () => {
        retrieveLessons()
    }, [snackBarVal])
    

    const showLesson= (lesson:lessonType) => {
        setTrailer(null)
        setLessonDetails(lesson)
        handleShowLessonModal(true)
    }

    const showTrailer= (trailer:string) => {
        setLessonDetails(null)
        setTrailer(trailer)
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

    const handleEdit= (lesson:lessonType) => {
        setLessonToEdit(lesson)
        setShowLessonForm(true)
    }

    return (
        <>
           {
               course ?  <Box style={{height: 'calc(100vh - 65px)'}}><Welcome bgImg={course.cover_photo} title={course.title} trailer={course.trailer} showTrailer={showTrailer} slug={course.slug} enrolled={true} /></Box> : null
           }
            <Container maxWidth="md" style={{paddingTop: 20, paddingBottom: 100}}>
                <Box display="flex" justifyContent="flex-end">
                    <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<AddCircleIcon />}
                        onClick={ () => handleShowLessonForm(true)}
                    >
                        Add Lesson
                    </Button>
                </Box>
                <Box>
                    {
                        lessons ? lessons.map( (lesson:lessonType, index:number) => (
                            <Box mt={10}><LessonCard key={index} lesson={lesson} isAdmin={true} count={++index} showLessonModal={showLesson} handleEdit={handleEdit} handleDelete={handleDelete} /></Box>
                        )) : null
                    }
                </Box>
            </Container>

            <LessonForm accessToken={accessToken} show={showLessonForm} lesson={lessonToEdit} courseId={course ? course.id : -1} handleShowLessonModal={handleShowLessonForm} handleSnackBar={handleSnackBar} />

            <ShowLesson showLessonModal={showLessonModal} trailer={trailer} lesson={lessonDetails} handleShowLessonModal={handleShowLessonModal} />

            {
                snackBarVal !== null ? <SnackBar state="true" msg={snackBarVal} /> : null
            }
        </>
    )
}

// export async function getServerSideProps({ req, res }) {
//     const { Auth } = withSSRContext({ req })
//     try {
//       const user = await Auth.currentAuthenticatedUser()
//       return {
//             props: {
//                 accessToken: user.signInUserSession.accessToken.jwtToken
//             }
//         }
//     } catch (err) {
//       res.writeHead(302, { Location: '/login' })
//       res.end()
//     }
//     return {props: {}}
//   }

export default Course
