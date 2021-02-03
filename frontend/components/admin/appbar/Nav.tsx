import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PagesIcon from '@material-ui/icons/Pages';
import Link from 'next/link';
import SubjectIcon from '@material-ui/icons/Subject';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import MovieIcon from '@material-ui/icons/Movie';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { Auth } from 'aws-amplify'
import { useRouter } from 'next/router'
import BorderColorIcon from '@material-ui/icons/BorderColor';
import CategoryIcon from '@material-ui/icons/Category';
import EditAttributesTwoToneIcon from '@material-ui/icons/EditAttributesTwoTone';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    background: theme.palette.primary.light,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    color:'#F6F6F6',
    background: theme.palette.primary.main,
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    color:'#F6F6F6',
    background: theme.palette.primary.main,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
    color: '#F6F6F6',
    overflow: 'hidden',
    marginBottom: 50,
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0),
    },
  },
  link: {
    color: '#F6F6F6',
    cursor: 'pointer'
  }
}));

export default function Nav({component}) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  const handleDrawerOpen = () => {
    setOpen(true);
  }

  const handleDrawerClose = () => {
    setOpen(false);
  }

  const handleLogout= async () => {
    try {
      await Auth.signOut()
      router.push('/')
    } catch (error) {
        
    }
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <Box width="100%" display="flex" justifyContent="center">
            <Typography variant="h6" style={{color: '#1E1E2E', fontWeight: 600}}>Austin Wilder</Typography>
          </Box>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
            <Link href="/admin/dashboard">
                <ListItem className={classes.link}>
                    <ListItemIcon><DashboardIcon /></ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItem>
            </Link>
            <Link href="/admin/courses">
                <ListItem className={classes.link}>
                    <ListItemIcon><LibraryBooksIcon /></ListItemIcon>
                    <ListItemText primary="Courses" />
                </ListItem>
            </Link>
            <Link href="/admin/lessons">
                <ListItem className={classes.link}>
                    <ListItemIcon><MovieIcon /></ListItemIcon>
                    <ListItemText primary="Lessons" />
                </ListItem>
            </Link>
            <Link href="/admin/blog">
                <ListItem className={classes.link}>
                <ListItemIcon><SubjectIcon /></ListItemIcon>
                <ListItemText primary="Blog" />
                </ListItem>
            </Link>
            <Link href="/admin/author">
                <ListItem className={classes.link}>
                <ListItemIcon><BorderColorIcon /></ListItemIcon>
                <ListItemText primary="Author" />
                </ListItem>
            </Link>
            <Link href="/admin/category">
                <ListItem className={classes.link}>
                <ListItemIcon><CategoryIcon /></ListItemIcon>
                <ListItemText primary="Category" />
                </ListItem>
            </Link>
        </List>
        <Divider />
        <List>
            <Link href="/admin/home">
              <ListItem className={classes.link}>
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
            </Link>
            <Link href="/admin/pages">
              <ListItem className={classes.link}>
                <ListItemIcon><PagesIcon /></ListItemIcon>
                <ListItemText primary="Pages" />
              </ListItem>
            </Link>
            <Link href="/admin/books">
              <ListItem className={classes.link}>
                <ListItemIcon><MenuBookIcon /></ListItemIcon>
                <ListItemText primary="Books" />
              </ListItem>
            </Link>
            <Link href="/admin/transactions">
              <ListItem className={classes.link}>
                <ListItemIcon><AccountBalanceIcon /></ListItemIcon>
                <ListItemText primary="Transactions" />
              </ListItem>
            </Link>
            <Link href="/admin/menu">
              <ListItem className={classes.link}>
                <ListItemIcon><EditAttributesTwoToneIcon /></ListItemIcon>
                <ListItemText primary="Menu Editor" />
              </ListItem>
            </Link>
            <ListItem className={classes.link} onClick={ e => { handleLogout(); } }>
              <ListItemIcon><ExitToAppIcon /></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
            <Container maxWidth="xl">
                {component}
            </Container>
      </main>
    </div>
  );
}
