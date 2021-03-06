import React from 'react'
import Nav from 'components/admin/appbar/Nav'
import Lessons from './Lessons'
import { withSSRContext } from 'aws-amplify'


export default function index({accessToken}) {
    return (
        <>
           <Nav component={<Lessons accessToken={accessToken} />}/>
        </>
    )
}

export async function getServerSideProps({ req, res }) {
  const { Auth } = withSSRContext({ req })
  try {
    const user = await Auth.currentAuthenticatedUser()
    if(!user.signInUserSession.idToken.payload['cognito:groups']){
      res.writeHead(302, { Location: '/profile' })
      res.end()
    }
    else{
      return {
          props: {
              accessToken: user.signInUserSession.accessToken.jwtToken
          }
      }
    }
  } catch (err) {
    res.writeHead(302, { Location: '/login' })
    res.end()
  }
  return {props: {}}
}
