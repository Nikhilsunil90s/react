import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { emphasize, fade, darken, lighten } from '@material-ui/core/styles/colorManipulator';

import clsx from 'clsx';

import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

const useStyles = makeStyles((theme) => ({
  footerNav: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(1)
  },
  footerLink: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    marginBottom: theme.spacing(2),
  }
}
));

export default function Component(props) {
  const classes = useStyles();

  return (
<footer>
  <Container maxWidth="lg">
    <Box py={6} textAlign="center">
      <Link href="#" color="inherit" underline="none">
      </Link>
      <Box component="nav" className={classes.footerNav}>
        <Link href="#" variant="body1" color="textPrimary" className={classes.footerLink}>First Link</Link>
        <Link href="#" variant="body1" color="textPrimary" className={classes.footerLink}>Second Link</Link>
        <Link href="#" variant="body1" color="textPrimary" className={classes.footerLink}>Third Link</Link>
        <Link href="#" variant="body1" color="textPrimary" className={classes.footerLink}>Fourth Link</Link>
      </Box>
      <Box mb={3}>
        <IconButton color="inherit" aria-label="Facebook">
          <FacebookIcon />
        </IconButton>
        <IconButton color="inherit" aria-label="Twitter">
          <TwitterIcon />
        </IconButton>
        <IconButton color="inherit" aria-label="Instagram">
          <InstagramIcon />
        </IconButton>
        <IconButton color="inherit" aria-label="LinkedIn">
          <LinkedInIcon />
        </IconButton>
      </Box>
      <Typography color="textSecondary" component="p" variant="caption" gutterBottom={false}>© 2020 Austin Wilder. All rights reserved.</Typography>
    </Box>
  </Container>
</footer>
  );
}