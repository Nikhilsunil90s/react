import React from 'react';
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'


export default function DataTable({enrolledCourses}) {

  const [rows, setRows]= React.useState('')

  React.useEffect( () => {
    
    if(enrolledCourses !== null){
      setRows(enrolledCourses)
    }
  }, [enrolledCourses])

  const getDate= (e) => {
    const d= new Date(e)
    return d.getDate()+'-'+(d.getMonth()+1)+'-'+d.getFullYear()
  }

  return (
    <Box>
      {
        rows && rows.length > 0 ? rows.map( (row, index) => 
        (
          <Box key={index} mt={2} p={5} style={{ background: '#14467a', color: "#FFF", borderRadius: 10 }}>
            <Typography variant="body1" ><b>Course: </b>{row.course_title}</Typography>
            <Typography variant="body1" style={{marginTop: 10}}><b>Enrolled On: </b> 
              { getDate(row.createdAt)}
            </Typography>
          </Box>    
        )) : null
      }
    </Box>
  );
}