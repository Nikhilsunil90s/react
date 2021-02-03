import React,{useEffect,useState} from 'react'
import { SparkLine } from '../../../components/admin/dashboard/SparkLine'
import Box from '@material-ui/core/Box';
import { Grid, Typography } from '@material-ui/core';
import Widget from '../../../components/admin/dashboard/Widget'
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery'
import API from 'utils/API'
import SnackBar from 'components/shared/SnackBar'

const useStyles = makeStyles((theme) => ({
  widgetContainer: {
    marginTop: 50,
    display:"flex",
    justifyContent:"space-between",
    gap: 10,
    [theme.breakpoints.down('md')]: {
     flexDirection: 'column',
     justifyContent:"center",
     alignItems: 'flex-end',
     gap: 50,
    },
    [theme.breakpoints.down('xs')]: {
      alignItems: 'center',
      gap: 50,
    } 
  },
  gridItem: {
    [theme.breakpoints.down('sm')]: {
      marginTop: 50,
    } 

  }
}))

export default function Dashboard() {

    const classes = useStyles()
    const matches = useMediaQuery('(max-width:960px)')
    const [courses, setCourses]= useState(0)
    const [blogs, setBlogs]= useState(0)
    const [lessions, setLessions]= useState(0)
    const [users, setUsers]= useState(0)
    const [weeklySales, setWeeklySales]= useState(0)
    const [isLoading, setIsLoading]= useState(false)
    const [snackBarVal, setSnackBarVal]= useState(null)

    const handleSnackBar= (e) => {
      setSnackBarVal(null)
      setSnackBarVal(e)
    }  

    const data= [
        {
          "id": "japan",
          "color": "hsl(256, 70%, 50%)",
          "data": [
            {
              "x": "may",
              "y": 76
            },
            {
              "x": "jun",
              "y": 136
            },
            {
              "x": "jul",
              "y": 20
            },
            {
              "x": "aug",
              "y": 100
            },
            {
              "x": "sep",
              "y": 50
            },
            {
              "x": "oct",
              "y": 142
            },
          ]
        },
      ]

      const retrievePost= () => {
        setIsLoading(true)
        API({
            method: 'GET',
            url: '/home/count'
        })
        .then( response => {
            setCourses(response.data[0].courses);
            setBlogs(response.data[0].blogs);
            setLessions(response.data[0].lessions);
            setIsLoading(false)
        })
        .catch (err => {
            handleSnackBar(err.message)
        })
      }

      const weeklySale = () => {
        setIsLoading(true)
        API({
            method: 'GET',
            url: '/dashboard/weekly-sales'
        })
        .then( response => {  
            setWeeklySales(response.data)
            setIsLoading(false)
        })
        .catch (err => {
            handleSnackBar(err.message)
        })
      }

      const subscription = () => {
        setIsLoading(true)
        API({
            method: 'GET',
            url: '/dashboard/subscriptions/month'
        })
        .then( response => {  
            setWeeklySales(response.data)
            setIsLoading(false)
        })
        .catch (err => {
            handleSnackBar(err.message)
        })
      }

      useEffect(() => {
        retrievePost();
        //weeklySale();
        //subscription();
      },[]);  

    return (
        <div style={{color:'#f9f9f9', marginBottom: 20}}>
          
          <Box className={classes.widgetContainer}>
            <Widget title="Courses" desc={courses} bg="#00D9D0" type="ClassIcon" /> 
            <Widget title="Blog Posts" desc={blogs} bg="#D645D6" type="DescriptionIcon" />
            <Widget title="Lessions" desc={lessions} bg="#1e88f7" type="InsertCommentIcon"/>
            <Widget title="Users" desc={users} bg="#F6465C" type="PeopleAltIcon" />
          </Box>

          <Grid container style={{marginTop: 50}}>
            <Grid item xs={12}>
              <Box style={{background: '#191919' , borderRadius: 10}}>
                <Box p={2}><Typography variant="h5">Performance</Typography></Box>
                <Box height={ matches ? "130px" : "300px"}>
                    <SparkLine data={data} color="#1e88f7" curve="cardinal"/>
                </Box>
              </Box>
            </Grid>
          </Grid>

          <Grid container spacing={matches ? 0 : 3} style={{marginTop: 50}}>
            <Grid item xs={12} sm={12} md={6}>
              <Box style={{background: '#191919', borderRadius: 10}}>
                <Box p={2}><Typography variant="h5">Weekly Sales</Typography><Typography variant="h6">$5000</Typography></Box>
                <Box height={ matches ? "130px" : "200px"}>
                    <SparkLine data={data} color="#D645D6" curve="step" />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6} className={classes.gridItem}>
              <Box style={{background: '#191919', borderRadius: 10}}>
                <Box p={2}><Typography variant="h5">Subscriptions</Typography><Typography variant="h6">300</Typography></Box>
                <Box height={ matches ? "130px" : "200px"}>
                    <SparkLine data={data} color="#00D9D0" curve="linear" />
                </Box>
              </Box>
            </Grid>
          </Grid>

        </div>
    )
}
