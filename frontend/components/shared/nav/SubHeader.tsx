import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 65,
      background: theme.palette.primary.light,
      color: '#fff',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      borderBottom: '1px solid #212121',
      [theme.breakpoints.down('sm')]: {
        padding: '0px 10px'
      },
    },
  }),
);

export default function SubHeader() {

  const classes = useStyles()
  const matches = useMediaQuery('(max-width:960px)')

  return (
    <Breadcrumbs aria-label="breadcrumb" className={classes.root}>
      <Link color="inherit" href="/" onClick={handleClick}>
        Logo
      </Link>
      <Link color="inherit" href="/getting-started/installation/" onClick={handleClick}>
        All Courses
      </Link>
      <Link color="inherit" href="/getting-started/installation/" onClick={handleClick}>
        Computer Science
      </Link>
      <Link
        color="primary"
        href="/components/breadcrumbs/"
        onClick={handleClick}
        aria-current="page"
      >
        Artificial Intelligence
      </Link>
    </Breadcrumbs>
  );
}
