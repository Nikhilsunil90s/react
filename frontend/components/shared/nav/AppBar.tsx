import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    appbar: {
        background: theme.palette.primary.light,
    },
    toolbar: {
        display: 'flex', 
        justifyContent: 'space-around',
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'space-between',
        },
    }
  }),
);

export default function Appbar() {

  const classes = useStyles()
  const matches = useMediaQuery('(max-width:960px)')

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appbar}>
        <Toolbar className={classes.toolbar}>
          <Box display="flex" alignItems="center">
            <Box display={ matches ? 'flex' : 'none' }>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon color="primary" fontSize="large" />
                </IconButton>
            </Box>
            <Typography variant="h5" style={{fontWeight: 600}}>
                LOGO
            </Typography>
            <Box ml={10} display={ matches ? 'none' : 'flex' } alignItems="center" style={{cursor: 'pointer'}}>
                <Typography variant="body1" >
                    Browse
                </Typography>
                <ExpandMoreIcon/>
            </Box>
          </Box>
          <Box display={ matches ? 'flex' : 'none' } alignItems="center" style={{cursor: 'pointer'}}>
                <Typography variant="body1" >
                    Browse
                </Typography>
                <ExpandMoreIcon/>
            </Box>
          <Box display={ matches ? 'none' : 'flex' }>
            <Button variant="outlined" color="primary" size="large">Sign in</Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}
