import React, { useState, useRef, useEffect } from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { useRouter } from 'next/router'
import API from 'utils/API'
import SnackBar from 'components/shared/SnackBar'

export default function Paypal({course, username, email}) {

    const [paidFor, setPaidFor] = useState(false)
    const [error, setError] = useState(null)
    const [snackBarVal, setSnackBarVal]= useState(null)
    const paypalRef = useRef()

    const router = useRouter()

    const handleSnackBar= (e) => {
      setSnackBarVal(null)
      setSnackBarVal(e)
    }

    useEffect(() => {
        window.paypal
        .Buttons({
            createOrder: (data, actions) => {
            return actions.order.create({
                purchase_units: [
                {
                    description: course.title,
                    amount: {
                    currency_code: 'USD',
                    value: course.fees,
                    },
                },
                ],
            });
            },
            onApprove: async (data, actions) => {
              const order = await actions.order.capture()
              setPaidFor(true)
              saveTransaction()
              enrollCourse()
              console.log(order)
            },
            onError: err => {
              setError(err)
              console.error(err)
            },
        })
        .render(paypalRef.current);
    }, [course.title, course.fees]);

    useEffect(() => {
      handleSnackBar(error)
    }, [error])

    const saveTransaction= () => {

      API({
        method: 'POST',
        url: '/transaction',
        data: {username: username, email: email,  course: course.title, fees: course.fees}
      })
      .then( response => {
  
          if(response.data.success)
            console.log('Success saving transaction')
  
          else
            console.log('Error saving transaction')
      })
      .catch( err => {
        console.log('Error saving transaction')
      })
      
    }

    const enrollCourse= () => {
      API({
        method: 'POST',
        url: '/enroll',
        data: {course_id: course.id, email: email}
      })
      .then( response => {
  
          if(response.data.success)
            console.log('Success enrolling')
  
          else
            console.log('Error enrolling')
      })
      .catch( err => {
        console.log('Error enrolling')
      })
    }

  if (paidFor) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
        <Typography variant="h5">Congrats, you just enrolled {course.title}!</Typography>
        <Button onClick={e => router.back() } style={{marginTop: 20}} variant="contained" color="primary">Go Back</Button>
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      {error && <div>Uh oh, an error occurred! {error.message}</div>}
      <h1>
        {course.title} for ${course.fees}
      </h1>
      <div ref={paypalRef} />
      {
        snackBarVal !== null ? <SnackBar state="true" msg={snackBarVal} /> : null
      }
    </Box>
  );
}
