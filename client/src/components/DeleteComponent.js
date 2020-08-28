import React from 'react';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
// import { createMuiTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       light: '#757ce8',
//       main: '#3f50b5',
//       dark: '#002884',
//       contrastText: '#fff',
//     },
//     secondary: {
//       light: '#ff7961',
//       main: '#f44336',
//       dark: '#ba000d',
//       contrastText: '#000',
//     },
//   },
// });
const useStyles = makeStyles(theme => ({
  white: {
    color: theme.palette.primary.contrastText,
  },
  paper: {
    maxWidth: 500,
    margin: `${theme.spacing(2)}px auto`,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}));

const DeleteComponent = props => {
  const classes = useStyles();
  const { taskId, successCallback } = props;

  const deleteTask = e => {
    axios
      .delete('http://localhost:8000/api/tasks/' + taskId, {
        withCredentials: true,
      })
      .then(res => {
        successCallback();
      });
  };

  return (
    <DeleteIcon
      className={classes.white}
      aria-hidden='true'
      onClick={deleteTask}
    />
  );
};

export default DeleteComponent;
