import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import NavDrawer from './NavDrawer'

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  appbar: {
      background: theme.palette.primary.background,
      color: '#FaFaFa',
      top: 0
  },   
  toolbar: {
    padding: 0,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'block',
    flexGrow: 1,
  },
  titleText: {
    color: '#FFF',
    textAlign: 'center',
    width: 120,
    padding: '10px',
    cursor: 'pointer',
    textDecoration: 'none',
    fontWeight: 900,
    marginLeft: 20,
  },
  sectionDesktop: {
    flexGrow: 2,
    display: 'none',
    maxWidth: 900,
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      justifyContent: 'space-evenly'
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function NavBar() {
  const classes = useStyles();

  return (
    <Box>
        <Box className={classes.grow}>
            <AppBar position="fixed" elevation={0} className={classes.appbar}>
                <Toolbar className={classes.toolbar} >
                    <div className={classes.title} >
                        <Typography className={classes.titleText} variant="h5" noWrap>
                            Logo
                        </Typography>
                    </div>
                    <div className={classes.sectionDesktop}>
                        <Button color="inherit">Home</Button>
                        <Button color="inherit" >About</Button>
                        <Button color="inherit">Testimonials</Button>
                        <Button color="inherit">Blog</Button>
                        <Button color="inherit">Courses</Button>
                        <Button color="inherit">Contact</Button>
                    </div>
                    <div className={classes.sectionMobile}> 
                        <NavDrawer/>
                    </div>
                </Toolbar>
             </AppBar>
            </Box>
    </Box>
  );
}
