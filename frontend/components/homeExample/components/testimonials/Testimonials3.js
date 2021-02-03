import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';

const useStyles = makeStyles((theme) => ({
  logo: {
    height: 48,
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  paper: {
    minHeight: 128,
    display: 'flex',
    alignItems: 'center'
  }
}));

export default function Testimonials(props) {
  const classes = useStyles();

  const content = {
    'header-p1': 'Lorem ipsum dolor',
    'header-p2': 'sit amet, consectetur adipiscing elit.',
    'description': 'Suspendisse aliquam tellus ante, porttitor mattis diam eleifend quis. Pellentesque pulvinar commodo eros sit amet finibus. Aenean et ornare erat.',
    'primary-action': 'See all integrations',
    'logo1': 'nereus-assets/img/logos/apple.svg',
    'logo2': 'nereus-assets/img/logos/facebook.svg',
    'logo3': 'nereus-assets/img/logos/marvel.svg',
    'logo4': 'nereus-assets/img/logos/react.svg',
    'logo5': 'nereus-assets/img/logos/nike.svg',
    'logo6': 'nereus-assets/img/logos/airbnb.svg',
    ...props.content
  };

  return (
    <section>
      <Container maxWidth="lg">
        <Box py={3}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={6}>
              <Box mt={6}>
                <Typography variant="h4" component="h3" gutterBottom={true}>
                  <Typography color="primary" variant="h4" component="span">{content['header-p1']} </Typography>
                  <Typography variant="h4" component="span">{content['header-p2']}</Typography>
                </Typography>
                <Typography color="textSecondary" variant="subtitle1" paragraph={true}>
                  {content['description']}
                </Typography>
                <Button color="secondary" endIcon={<ArrowRightAltIcon />}>{content['primary-action']}</Button>
              </Box>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Box display="flex" flexWrap="wrap" justifyContent="center">
                <Box m={1}>
                  <Paper variant="outlined" className={classes.paper}>
                    <img src={content['logo1']} alt="" className={classes.logo} />
                  </Paper>
                </Box>
                <Box m={1}>
                  <Paper variant="outlined" className={classes.paper}>
                    <img src={content['logo2']} alt="" className={classes.logo} />
                  </Paper>
                </Box>
                <Box m={1}>
                  <Paper variant="outlined" className={classes.paper}>
                    <img src={content['logo3']} alt="" className={classes.logo} />
                  </Paper>
                </Box>
                <Box m={1}>
                  <Paper variant="outlined" className={classes.paper}>
                    <img src={content['logo4']} alt="" className={classes.logo} />
                  </Paper>
                </Box>
                <Box m={1}>
                  <Paper variant="outlined" className={classes.paper}>
                    <img src={content['logo5']} alt="" className={classes.logo} />
                  </Paper>
                </Box>
                <Box m={1}>
                  <Paper variant="outlined" className={classes.paper}>
                    <img src={content['logo6']} alt="" className={classes.logo} />
                  </Paper>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </section>
  );
}