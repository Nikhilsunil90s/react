import React from 'react'
import Nav from 'components/admin/appbar/Nav'
import Dashboard from './Dashboard'
import { withSSRContext } from 'aws-amplify'

export default function index() {
    return (
        <>
           <Nav component={<Dashboard/>}/>
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
    } catch (err) {
      res.writeHead(302, { Location: '/login' })
      res.end()
    }
    return {props: {}}
}
