import React from 'react'
import Nav from 'components/admin/appbar/Nav'
import CourseDetails from './CourseDetails'
import { withSSRContext } from 'aws-amplify'


interface CourseDetailsProps{
    accessToken?:string
}

const index: React.FC<CourseDetailsProps>= ({accessToken}) => {
    return (
        <>
           <Nav component={<CourseDetails accessToken={accessToken} />}/>
        </>
    )
}

export async function getServerSideProps({ req, res }) {
    const { Auth } = withSSRContext({ req })
    try {
      const user = await Auth.currentAuthenticatedUser()
      return {
            props: {
                accessToken: user.signInUserSession.accessToken.jwtToken
            }
        }
    } catch (err) {
      res.writeHead(302, { Location: '/login' })
      res.end()
    }
    return {props: {}}
}

export default index