import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import { Auth } from 'aws-amplify'
import { useRouter } from 'next/router'
import API from 'utils/API'
import Avatar from '@material-ui/core/Avatar'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import useMediaQuery from '@material-ui/core/useMediaQuery'


const useStyles = makeStyles((theme) => ({

  toolbarTitle: {
    flex: "unset",
    color: theme.palette.primary.main,
    paddingLeft: 50,
    overflow: "unset",
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 10
    },
  },
  toolbarSecondary: {
    overflowX: 'auto',
    padding: 0,
  },
  flexRight: {
    flex: 1,
    textAlign: "right"
  },

  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
    textDecoration: 'none',
  },
  boxBorder: {
    border: `1px solid ${theme.palette.divider}`,
    '&:hover' : {
      backgroundColor: 'rgb(86 128 214)',
      color: 'white'
    }
  },
  boxBorderDark: {
    border: `1px solid ${theme.palette.primary.text}`,
    '&:hover' : {
      backgroundColor: 'rgb(86 128 214)',
      color: 'white'
    }
  },
  boxBorderLight: {
    border: `1px solid #dcdcdc`,
    '&:hover' : {
      backgroundColor: 'rgb(86 128 214)',
      color: 'white'
    }
  },
 
  avatar: {
    right: 0,
    position: "absolute"
  }

}));

export default function Header({ sections, title, textColor, handleSnackBarVal }) {
  const classes = useStyles()
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  const [email, setEmail] = useState('')
  const [profilePic, setProfilePic] = useState('')
  const [profilePicPath, setProfilePicPath] = useState('')
  const [showHeader, setShowHeader] = useState('')
  const [anchorEl, setAnchorEl] = React.useState(null)
  const matches = useMediaQuery('(max-width:960px)')


  const handleLogout = async () => {
    try {
      await Auth.signOut()
      setIsAuthenticated(false)
      router.push('/')
    } catch (error) {
      handleSnackBarVal(error.message)
    }
  }

  useEffect(async () => {
    try {
      const user = await Auth.currentAuthenticatedUser()
      setEmail(user.attributes.email)
      setIsAuthenticated(true)
    } catch (err) {
      setIsAuthenticated(false)
    }

  }, [])


  useEffect(() => {
    if (textColor) {
      if (textColor === '#191919' || textColor === '#000'  ) {
        setShowHeader(true)
      } else {
        setShowHeader(false)
      }
    }
  }, [textColor])

  const setHoverUp = (index) => {
    document.getElementsByClassName('header-section-title')[index].style.color = 'white'
  }


  const setHoverDown = (index) => {
    document.getElementsByClassName('header-section-title')[index].style.color = '#000'
  }

  const retrieveProPicPath = () => {
    API({
      method: 'GET',
      url: '/profile/' + email
    })
      .then(response => {
        setProfilePicPath(response.data.image)
      })
      .catch(err => {
      })
  }

  const retrieveProPic = () => {

    API({
      method: 'GET',
      url: '/media/' + profilePicPath,
      responseType: 'arraybuffer'

    })
      .then(response => {

        const base64Str = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            '',
          ),
        );
        let image = `data:image/${profilePicPath.substring(profilePicPath.lastIndexOf('.') + 1)};base64, ${base64Str}`
        setProfilePic(image)

      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (email !== null) {
      retrieveProPicPath()
    }

  }, [email])

  useEffect(() => {
    if (profilePicPath !== null)
      retrieveProPic()
  }, [profilePicPath])

  return (
    <React.Fragment>
      <div>
        <Toolbar className={classes.toolbar}>
          <Link href="/">
            <Typography
              component="h2"
              variant="h5"
              color="inherit"
              align="start"
              noWrap
              className={classes.toolbarTitle}
            >
              <img src="../logo_new.png" style={{ position: "relative", "height": "40px", "marginTop": "10px" }} />

            </Typography>
          </Link>
          <Toolbar component="nav" variant="dense" className={classes.toolbarSecondaryLarge} style={{ display: matches ? 'none' : 'flex' }}>
            {
              !showHeader?
              <Link
              noWrap
              variant="body2"
              href="/"
              className={classes.toolbarLink}
            >
              <Typography style={{ fontWeight: 900, textTransform: 'uppercase', color: textColor ? textColor : '#191919' }}>Home</Typography>
            </Link> :
            null
            }
            
          </Toolbar>
          {
            isAuthenticated ?
              (

                <Box display="flex" alignItems="center" className={classes.avatar}>
                  <Avatar
                    src={profilePic}
                  />
                  <Box ml={1}>
                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleMenuOpen}>
                      <KeyboardArrowDownIcon color="primary" />
                    </Button>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                    >
                      <Link href="/profile"><MenuItem style={{ width: 100 }} onClick={handleMenuClose}>Profile</MenuItem></Link>
                      <MenuItem style={{ width: 100 }} onClick={e => { handleMenuClose(); handleLogout(); }}>Logout</MenuItem>
                    </Menu>
                  </Box>
                </Box>

              ) : isAuthenticated === false ? (
                <Box className={classes.flexRight}>
                  <Link href="/register">
                    <Button size="small" color="primary">Register</Button>
                  </Link>

                </Box>
              ) : null
          }
        </Toolbar>
        <Box style={{borderBottom: "1px solid #c9c9c9"}}></Box>

        {
         showHeader ?

            <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary} style={{ justifyContent: (sections.length > 10 || matches)  ? "" : "center"   }}>
              {sections.map((section, index) => (
                <Box p={2} className={textColor ? classes.boxBorderLight : classes.boxBorder} width={ (sections.length > 10 || matches)   ? "100%": "auto" } height="100%" textAlign="center" onMouseEnter= {() => setHoverUp(index)}  onMouseLeave= {() => setHoverDown(index)} >
                  <Link
                    noWrap
                    key={section.title}
                    variant="body2"
                    href={section.url}
                    key={section.id}

                    className={classes.toolbarLink}
                  >
                    <Typography style={{ fontWeight: 900, textTransform: 'uppercase', color: textColor ? textColor : '#191919' }} className="header-section-title">{section.title}</Typography>
                  </Link>
                </Box>
              ))}
            </Toolbar>
            :
            null
        }
        <Box style={{borderBottom: "1px solid #c9c9c9"}}></Box>

      </div>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};
