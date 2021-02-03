import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  info: {
    height: '100%',
    minHeight: '128px',
  },
  media: {
    height: '128px',
  },
  firstColumn: {
    paddingRight: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(2),
      paddingRight: theme.spacing(0),
    }
  }
}));

export default function About() {

  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Container maxWidth="lg" style={{ marginTop: 20 }}>
      <Box pt={8} pb={10}>
        <Grid container>
          
          <Grid item xs={12} lg={6} className={classes.firstColumn}>
            <Card className={classes.info}>
              <CardContent className={classes.info}>
                <Box display="flex" flexDirection="column" height="100%" pt={2} px={2}>
                  <Typography variant={matches ? 'h4' : 'h3'} component="h2" gutterBottom={true} color="primary">About Austin Wilder</Typography>
                  <Box mb={2}>
                    <Typography variant="body1" component="p" color="textSecondary">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                        </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Grid container spacing={2} style={{ height: '100%', display: 'flex', alignContent: 'center' }}>
              <Grid item xs={12} md={8}>
                <Card>
                  <CardActionArea href="#">
                    <CardMedia className={classes.media} image="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80" />
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardActionArea href="#">
                    <CardMedia className={classes.media} image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" />
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardActionArea href="#">
                    <CardMedia className={classes.media} image="https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80" />
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item xs={12} md={8}>
                <Card>
                  <CardActionArea href="#">
                    <CardMedia className={classes.media} image="https://images.unsplash.com/photo-1573164574572-cb89e39749b4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" />
                  </CardActionArea>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}
