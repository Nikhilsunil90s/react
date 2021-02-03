import React from 'react'
import Container from '@material-ui/core/Container'
import NavBar from 'components/shared/nav/NavBar'
import Header from 'components/home/Header'
import About from 'components/home/About'
import Book from 'components/home/Book'
// import Testimonials from 'components/home/Testimonials'
// import Courses from 'components/home/courses'
import Blogs from 'components/home/blogs/Blogs'
import Portfolio from 'components/home/Portfolio'
import Footer from 'components/home/Footer'
import useMediaQuery from '@material-ui/core/useMediaQuery'

export default function index() {

    const matches = useMediaQuery('(max-width:960px)')

    return (
        <div style={{background: 'white', paddingBottom: 50}}>
            <div style={{marginBottom: 0}}>
                <NavBar bg="#fff" textColor="#191919" />
            </div>
            <Container maxWidth="lg"  style={{paddingLeft:  0 , paddingRight:  0}} >
                <Header/>
                {/* <About/> */}
                <Book/>
                {/* <Testimonials/>
                <Courses/> */}
                <Blogs />
                {/* <Portfolio/> */}
                <Footer color="black"/>
            </Container>
        </div>
    )
}
