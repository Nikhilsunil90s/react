import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import AppBar from 'components/shared/nav/AppBar'
import SubHeader from 'components/shared/nav/SubHeader'
import Courses from './Courses'
import NavBar from 'components/shared/nav/NavBar.jsx'


const Course: React.FC = () => {


    return (
        <>
            {/* <AppBar/>
            <SubHeader/> */}
            <NavBar bg="#FFF" textColor="#000" />
            <div style={{backgroundColor: '#FFF'}}>
		    <Container maxWidth="lg" style={{backgroundColor: '#FFF', paddingTop: 20, paddingBottom: 100}}>
			<Box style={{}}>
			    <Courses/>  
			</Box>
		    </Container>
            </div>

        </>
    )
}

export default Course
