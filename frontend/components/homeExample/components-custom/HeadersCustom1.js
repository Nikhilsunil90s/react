import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  section: {
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: 'calc(100vh - 130px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width:'100%'
  },
  box: {
    paddingTop: theme.spacing(8),
    paddingBottom:  theme.spacing(8),
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(2),
      paddingBottom:  theme.spacing(2),
    }
  },
  header: {
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      marginLeft: 0
    }
  },
  primaryAction: {
    padding: 15,
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginRight: theme.spacing(0),
      marginBottom: theme.spacing(2),
    }
  },
  img: {
    height: 768,
    width: 'auto',
    objectFit: 'cover'
  },
}
));

export default function Component(props) {
  const classes = useStyles();
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))

  return (
<section className={classes.section} style={{ backgroundImage: 'url("/media/images/home-bg.png")' }}>
  <Container maxWidth="xl" style={{ width: "100%"}}>
    <Box className={classes.box}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6} style={{margin: 0, padding: 0, order: 1}} >
          <Card className={classes.img}>
            <CardMedia image="https://i.ibb.co/D8ZbWPm/125203012-364886864607269-7315323003496175221-n.jpg" style={{width: '100%', height: '100%'}}></CardMedia>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} style={{order: 2}}>
          <Box display="flex" height="100%">
            <Box my="auto" width="100%">
              <Container maxWidth="xs" className={classes.header}>
                <Typography style={{lineHeight: 1}} variant="h2" component="h2" gutterBottom={true}>
                  <Typography variant={matches ? 'h3' : 'h2'} component="span" color="primary">Austin Wilder</Typography>
                  <Typography  variant={matches ? 'h4' : 'h3'} component="span"> ting, empowering and inspiring.</Typography>
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" style={{textAlign: 'center' }}>The Next Generation of eCommerce Entrepreneurs</Typography>
                <Box mt={3}>
                  <Link href="/courses"><Button variant="contained" color="primary" className={classes.primaryAction}>Lern Form Me</Button></Link>
                </Box>
              </Container>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  </Container>
</section>
  );
}