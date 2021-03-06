import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles((theme) => ({
    media: {
        height: '512px'
      },
}));

export default function Portfolio() {

  const classes = useStyles()

  return (
      <Container maxWidth="lg" style={{marginTop: 100}}>
          <Box pt={8} pb={12} textAlign="center">
            <Box mb={6}>
                <Container maxWidth="sm">
                    <Typography variant="h3" component="span" color="primary">Lets Connect</Typography>
                </Container>
            </Box>
            <Box>
                <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                    <Card>
                    <CardActionArea href="#">
                        <CardMedia className={classes.media} image="https://images.unsplash.com/photo-1493397212122-2b85dda8106b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80" />
                    </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card>
                    <CardActionArea href="#">
                        <CardMedia className={classes.media} image="https://images.unsplash.com/photo-1511818966892-d7d671e672a2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80" />
                    </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card>
                    <CardActionArea href="#">
                        <CardMedia className={classes.media} image="https://images.unsplash.com/photo-1451976426598-a7593bd6d0b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" />
                    </CardActionArea>
                    </Card>
                </Grid> 
                <Grid item xs={12} md={8}>
                    <Card>
                    <CardActionArea href="#">
                        <CardMedia className={classes.media} image="https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=645&q=80" />
                    </CardActionArea>
                    </Card>
                </Grid>
                </Grid>
            </Box>
        </Box>
      </Container>
  )
}
