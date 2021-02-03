import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import lightBlue from '@material-ui/core/colors/lightBlue';

const primaryLight = lightBlue[100]

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: primaryLight,
    color: theme.palette.primary.main,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(webinar, time, host) {
  return { webinar, time, host };
}

const rows = [
  createData('Artificial Intelligence', '27/10/20 7pm-9pm EST', 'By: YJPW'),
  createData('Data Structure and Algorithms', '27/10/20 7pm-9pm EST', 'By: YJPW'),
  createData('Competitve Programing', '27/10/20 7pm-9pm EST', 'By: YJPW'),
];

const useStyles = makeStyles({
  table: {
    background: 'red',
    minWidth: 700,
  },
});

export default function DataTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} elevation={0}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell><b>Course Name</b></StyledTableCell>
            <StyledTableCell align="center"><b>Time & Date</b></StyledTableCell>
            <StyledTableCell align="center"><b>Instructor</b></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.webinar} style={{background: '#FFF'}}>
              <StyledTableCell component="th" scope="row">
                {row.webinar}
              </StyledTableCell>
              <StyledTableCell align="center">{row.time}</StyledTableCell>
              <StyledTableCell align="center">{row.host}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}