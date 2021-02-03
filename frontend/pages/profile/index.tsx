import React, { useState, useEffect } from 'react'
import ProfileComp from 'components/profile/Profile'
import NavBar from 'components/shared/nav/NavBar.jsx'
import { withSSRContext } from 'aws-amplify'

interface ProfileProps{
    email: string,
    name: string
}

const Profile: React.FC<ProfileProps>= ({email, name}) => {
 
    return (
        <div>
            <NavBar bg="#191919" textColor="#FFF" />
            <ProfileComp email={email} name={name} />
        </div>
    )
}

export async function getServerSideProps({ req, res }) {
    const { Auth } = withSSRContext({ req })
    try {
      const user = await Auth.currentAuthenticatedUser()
      return {
        props: {
          email: user.attributes.email,
          name: user.attributes.name
        }
      }
    } catch (err) {
      res.writeHead(302, { Location: '/login' })
      res.end()
    }
    return {props: {}}
}

export default Profile
