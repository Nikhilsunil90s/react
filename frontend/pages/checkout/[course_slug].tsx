import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Paypal from 'components/paypal'
import Box from '@material-ui/core/Box'
import API from 'utils/API'
import NavBar from 'components/shared/nav/NavBar.jsx'
import { withSSRContext } from 'aws-amplify'

interface CourseType{
  _id?: number,
  title?: string,
  description?: string,
  slug:string,
  trailer?: string,
  cover_photo: string,
  fees:number
}

interface CheckoutProps{
  username:string,
  email:string
}

const index: React.FC<CheckoutProps>= ({username, email}) => {

  const router = useRouter()
  const { course_slug } = router.query

  const [course, setCourse]= useState<CourseType | any>(null) 

  const retrieveCourse= () => {
    API({
        method: 'GET',
        url: '/course/'+course_slug,
    })
    .then( response => {
        setCourse(response.data)
    })
    .catch (err => {
        console.log('Error')
    })
  }

  useEffect( () => {
    retrieveCourse()
  }, [course_slug]) 

  return (
    <>
      <NavBar bg="#191919" textColor="#FFF" />
      <Box p={5} style={{color: "#fff"}}>
        {
          course && course.length !== 0 ?
            <Paypal course={course} username={username} email={email} /> : null 
        }
      </Box>
    </>
  )
}

export async function getServerSideProps({ req, res }) {
  const { Auth } = withSSRContext({ req })
  try {
    const user = await Auth.currentAuthenticatedUser()
    return {
      props: {
          username: user.attributes.name,
          email: user.attributes.email
      }
    }
  } catch (err) {
    res.writeHead(302, { Location: '/login' })
    res.end()
  }
}

export default index

