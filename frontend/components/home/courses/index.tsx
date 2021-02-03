import React, { useState, useEffect } from 'react';
import API from 'utils/API';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CourseCard from './CourseCard';
import Link from 'next/link';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    }
}));

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

  const classes = useStyles()

  const [courses, setCourses]= useState<CourseType | any>(null) //all courses from db

  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))
  const matchesXs = useMediaQuery(theme.breakpoints.down('xs'))

  const retrieveCourses= () => {
      API({
          method: 'GET',
          url: '/course',
      })
      .then( response => {
          setCourses(response.data)
      })
      .catch (err => {
      })
  }

  useEffect( () => {
      retrieveCourses()
  }, [])

  return (
      <Container maxWidth="xl" style={{marginTop: 100}}>

          <Box display="flex" justifyContent="center">
              <Typography variant="h3" color="primary">Courses</Typography>
          </Box>

          <Box display="flex" flexDirection={matches? 'column' : 'row'} alignItems={matches ? 'center' : 'flex-start'} flexWrap="wrap">
              {
                  courses && courses.length ? courses.map( (course:CourseType, index:number) => (
                       index < 6 ? 
                       (
                        <Link href={`/courses/${course.slug}`}>
                            <Box ml={matches? 0 : 5} mt={10} style={{cursor: 'pointer'}} width={matchesXs ? "100%" : 'auto'}>
                                    <CourseCard course={course} />
                            </Box>
                        </Link>
                       ) : null
                  )) : null
              }
          </Box>
          <Box display="flex" justifyContent="flex-end" my={5}>
                <Link href="/courses">
                    <Button
                        color="primary"
                        endIcon={<ArrowRightAltIcon/>}
                        className={classes.button}
                    >
                        See More
                    </Button>
                </Link>
            </Box>
      </Container>
  )
}

export default Courses
