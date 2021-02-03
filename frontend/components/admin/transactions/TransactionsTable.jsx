import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Typography } from '@material-ui/core';

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    background: theme.palette.primary.light,
    color: '#F6F6F6'
  },
  container: {
    maxHeight: 440,
  },
  tableHead: {
      background: theme.palette.primary.main,
      borderColor: '#A2A3AC'
  }
}));

export default function TransactionsTable({transactions}) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const columns = [
    { id: 'username', label: 'User Name', minWidth: 170 },
    { id: 'email', label: 'Email', minWidth: 170 },
    { id: 'course', label: 'Course', minWidth: 170 },
    { id: 'fees', label: 'Fees', minWidth: 170 },
    { id: 'createdAt', label: 'Date', minWidth: 170 },
  ];

  const rows = transactions;

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead >
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  className={classes.tableHead}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align} style={{color: '#A2A3AC', borderColor: '#A2A3AC'}}>
                          {column.format && typeof value === 'number' ? column.format(value) : <Typography variant="body2">{value}</Typography>}
                        </TableCell>
                      );                    
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        style={{color:'#1E88F7'}}
      />
    </Paper>
  );
}