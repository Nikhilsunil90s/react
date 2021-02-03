import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    number: {
        backgroundColor: theme.palette.background.emphasis,
        color: theme.palette.text.secondary
      },
      img: {
        maxWidth: 256,
        marginBottom: theme.spacing(2)
      },
      stepActive: {
        border: '1px solid',
        borderColor: theme.palette.background.secondary,
        borderRadius: theme.shape.borderRadius
      }
}));

export default function Testimonials() {

  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Container maxWidth="lg" style={{marginTop: matches ? 50 : 100}}>
        <Box py={10} textAlign="center">
        <Box mb={8}>
            <Container maxWidth="sm">
            <Typography variant="h3" component="span" color="primary">WHAT OTHERS SAY</Typography>
            </Container>
        </Box>
        <Grid container spacing={6}>
            <Grid item xs={12} md={4}>
            <Box p={3} pb={4} style={{cursor: 'pointer'}}>
                <Box display="flex" justifyContent="center" mt={1} mb={4}>
                <Avatar className={classes.number}>1</Avatar>
                </Box>
                <img src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8&ixlib=rb-1.2.1&w=1000&q=80" alt="" className={classes.img} />
                <Typography variant="h6" component="h3" gutterBottom={true}>Donec fermentum</Typography>
                <Typography variant="body2" component="p" color="textSecondary">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
            </Box>
            </Grid>
            <Grid item xs={12} md={4}>
            <Box className={classes.stepActive} p={3} pb={4} style={{cursor: 'pointer'}}>
                <Box display="flex" justifyContent="center" mt={1} mb={4}>
                <Avatar className={classes.number}>2</Avatar>
                </Box>
                <img src="https://img.freepik.com/free-photo/cheerful-curly-business-girl-wearing-glasses_176420-206.jpg?size=626&ext=jpg" alt="" className={classes.img} />
                <Typography variant="h6" component="h3" gutterBottom={true}>Dolor sit amet consectutar</Typography>
                <Typography variant="body2" component="p" color="textSecondary">Donec id lorem eget purus maximus suscipit nec vitae quam.</Typography>
            </Box>
            </Grid>
            <Grid item xs={12} md={4} style={{cursor: 'pointer'}}>
            <Box p={3} pb={4}>
                <Box display="flex" justifyContent="center" mt={1} mb={4}>
                <Avatar className={classes.number}>3</Avatar>
                </Box>
                <img src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" className={classes.img} />
                <Typography variant="h6" component="h3" gutterBottom={true}>Aliquam pellentesque</Typography>
                <Typography variant="body2" component="p" color="textSecondary">Vivamus fringilla finibus tincidunt. Integer mollis pellentesque libero.</Typography>
            </Box>
            </Grid>
        </Grid>
        </Box>
    </Container>
  )
}
