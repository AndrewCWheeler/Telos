import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import { navigate } from '@reach/router';

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
  },
  paper: {
    margin: '25px',
  },
  red: {
    color: theme.palette.secondary.dark,
  },
}));

const Admin = () => {
  const classes = useStyles();
  const [load, setLoad] = useState(0);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/users', { withCredentials: true })
      .then(response => {
        setAllUsers(response.data.results);
      })
      .catch(err => console.log(err));
  }, [load]);

  const deleteUser = (e, id) => {
    axios
      .delete('http://localhost:8000/api/users/' + id, {
        withCredentials: true,
      })
      .then(response => {
        if (response.data.message === 'success') {
          let count = load;
          if (count >= 0) {
            count++;
            setLoad(count);
          }
        }
      })
      .catch(err => console.log(err));
  };

  const logoutUser = () => {
    axios
      .get('http://localhost:8000/api/users/logout', { withCredentials: true })
      .then(response => {
        console.log(response.data.results);
        navigate('/signup');
      })
      .catch(err => console.log(err));
  };

  return (
    <TableContainer component={Paper} className={classes.paper}>
      <Table className={classes.table} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>User ID</TableCell>
            <TableCell align='right'>First Name</TableCell>
            <TableCell align='right'>Last Name</TableCell>
            <TableCell align='right'>Email</TableCell>
            <TableCell align='right'>Password</TableCell>
            <TableCell align='right'>Delete</TableCell>
            <TableCell align='right'>Logout</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allUsers.map((user, i) => (
            <TableRow key={i}>
              <TableCell component='th' scope='row'>
                {user._id}
              </TableCell>
              <TableCell align='right'>{user.firstName}</TableCell>
              <TableCell align='right'>{user.lastName}</TableCell>
              <TableCell align='right'>{user.email}</TableCell>
              <TableCell align='right'>{user.password}</TableCell>
              <TableCell align='right'>
                <Button
                  className={classes.red}
                  onClick={(e, id) => {
                    deleteUser(e, user._id);
                  }}
                >
                  Delete
                </Button>
              </TableCell>
              <TableCell align='right'>
                <Button className={classes.red} onClick={logoutUser}>
                  Logout
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Admin;
