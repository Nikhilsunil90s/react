import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  section: {
    backgroundImage: 'url("nereus-assets/img/bg/pattern2.png")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundColor: '#1A237E',
  },
  description: {
    color: "#C5CAE9"
  },
}));

export default function CTA(props) {
  const classes = useStyles();

  const content = {
    'header-p1': 'Donec lacinia',
    'header-p2': 'turpis non sapien lobortis pretium',
    'description': 'But in a much more real sense, I had no idea what to do. No, no, no. I don\'t wanna hear moaning. This is a good day.',
    'primary-action': 'Action',
    'secondary-action': 'Action',
    ...props.content
  };

  return (
    <section className={classes.section}>
      <Container maxWidth="sm">
        <Box py={10} textAlign="center" color="common.white">
          <Typography variant="h3" component="h3" gutterBottom={true}>
            <Typography color="secondary" variant="h3" component="span">{content['header-p1']} </Typography>
            <Typography variant="h3" component="span">{content['header-p2']}</Typography>
          </Typography>
          <Container maxWidth="sm">
            <Typography variant="subtitle1" paragraph={true} className={classes.description}>{content['description']}</Typography>
          </Container>
          <Box mt={3}>
            <Button variant="contained" color="secondary">{content['primary-action']}</Button>
          </Box>
        </Box>
      </Container>
    </section>
  );
}