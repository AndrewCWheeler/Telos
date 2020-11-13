import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import Checkbox from '@material-ui/core/Checkbox';
import RadioButtonUncheckedRoundedIcon from '@material-ui/icons/RadioButtonUncheckedRounded';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';

import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import {
  MuiPickersUtilsProvider,
  DatePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
// import DeleteComponent from './DeleteComponent';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import EditIcon from '@material-ui/icons/Edit';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import LabelIcon from '@material-ui/icons/Label';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { Link, navigate } from '@reach/router';
import { makeStyles } from '@material-ui/core/styles';
import Moment from 'react-moment';
import 'moment-timezone';
import moment from 'moment';
import PropTypes from 'prop-types';
import { MenuItem, RootRef, Tooltip } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import Undo from '@material-ui/icons/Undo';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteComponent from '../components/DeleteComponent';


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 840,
    // flexGrow: 1,
  },
  fab: {
    margin: theme.spacing(2),
    color: theme.palette.primary.main,
  },
  rootList: {
    width: '100%',
    maxWidth: 752,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialogStyle: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
    // color: theme.palette.primary.main,
  },
  subtitle: {
    margin: theme.spacing(-1, 0, 0),
    color: theme.palette.primary.main,
  },
  // textMain: {
  //   color: theme.palette.primary.main,
  // },
  text: {
    color: theme.palette.text.primary,
    display: 'inline-block',
    overflowX: 'scroll',
    overflowY: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    padding: 0,
    margin: '0 5px 0 0',
    width: '120px',
    height: '100%',
  },
  select: {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.main,
  },
  paper: {
    maxWidth: 840,
    margin: `${theme.spacing(1)}px auto`,
    // margin: theme.spacing(2, 0),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  paper2: {
    backgroundColor: theme.palette.primary.main,
    border: `2px solid ${theme.palette.primary.contrastText}`,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  list: {
    marginBottom: 90,
    marginTop: 60,
  },
  listItem: {
    // margin: theme.spacing(1,0,0),
    maxHeight: '100%',
    width: '100%',
    backgroundColor: theme.palette.background.default,
    // color: theme.palette.primary.contrastText,
    // boxShadow: theme.shadows[10],
    // borderRadius: 3,
    borderBottom: '1px solid #e1dfdc',
    paddingLeft: 0,
  },
  primaryIconStyle: {
    fontSize:24,
    color: theme.palette.primary.main,
  },
  secondaryIconStyle: {
    fontSize:24,
    color: theme.palette.secondary.main,
  },
  neutralIconStyle: {
    fontSize:'24px',
    color: theme.palette.text.secondary,
  },
  inline: {
    display: 'inline',
    overflow: 'hidden',
    overflowWrap: 'ellipsis',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  undo: {
    color: theme.palette.secondary.main,
  }
}));

const Admin = () => {
  const classes = useStyles();
  const [load, setLoad] = useState(0);
  const [allUsers, setAllUsers] = useState([]);
  const [sessionUserId, setSessionUserId] = useState('');
  const [allTasks, setAllTasks] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [secondary, setSecondary] = useState(true);

  const removeFromDom = taskId => {
    setAllTasks(allTasks.filter(task => task._id !== taskId));
  };

  useEffect(() => {
    let one = 'http://localhost:8000/api/users/one';
    const requestOne = axios.get(one, { withCredentials: true });
    requestOne
      .then(response => {
        setSessionUserId(response.data.results._id);
      })
      .catch(error => {
        console.log(error);
      });
    let two = 'http://localhost:8000/api/tasks/user';
    const requestTwo = axios.get(two, { withCredentials: true });
    requestTwo
      .then(response => {
        setAllTasks(response.data.results);
      })
      .catch(error => {
        console.log(error);
      });
    let three = 'http://localhost:8000/api/categories/user';
    const requestThree = axios.get(three, {withCredentials: true });
    requestThree
      .then(response => {
        setAllCategories(response.data.results);
      }).catch(error => {
        console.log(error);
      });
    let four = 'http://localhost:8000/api/users';
    const requestFour = axios.get(four, {withCredentials: true });
    requestFour
      .then(response => {
        setAllUsers(response.data.results);
      }).catch(error => {
        console.log(error);
      })
    axios
      .all([requestOne, requestTwo, requestThree, requestFour])
      .then(
        axios.spread((...responses) => {
          const responseOne = responses[0];
          const responseTwo = responses[1];
          const responseThree = responses[2];
          const responseFour = responses[3]
          console.log(responseOne, responseTwo, responseThree, responseFour);
        })
      )
      .catch(errors => {
        navigate('/signup');
      });
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
    <Container className={classes.root}>
      <TableContainer component={Paper} style={{marginTop:90}}>
        <Table aria-label='simple table'>
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
                    onClick={(e, id) => {
                      deleteUser(e, user._id);
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
                <TableCell align='right'>
                  <Button 
                    onClick={logoutUser}>
                    Logout
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
      <List dense secondary = 'true' className={classes.list}>
        {allTasks.map((task, i) =>
          (
            <ListItem
              className={classes.listItem}
              key={i}
              disableRipple
              button
            >
              <Tooltip title="Chunk task" placement="left">
                <IconButton type='button' 
                // onClick={e => handleOpen(e, task._id)}
                >
                  <LabelIcon
                  // className={classes.folderStyle}
                  // edge="start" 
                  disableRipple
                  />
                </IconButton>
              </Tooltip>
              <ListItemText
                disableTypography
                // onClick={e => handleOpen(e, task._id)}
                primary={
                  <Typography
                    style={{fontSize:15}}
                    color="textPrimary"
                    >
                    {task.name}
                  </Typography>
                }
                secondary={<Typography style={{fontSize:12}}>{secondary ? task.category : null}</Typography>}
              />
              <Tooltip title="Delete Task" placement="right">
                <IconButton className={classes.deleteStyle} edge='end' aria-label='delete'>
                  <DeleteComponent
                    taskId={task._id}
                    successCallback={() => removeFromDom(task._id)}
                  />
                </IconButton>
              </Tooltip>
            </ListItem>
          )
        )}
      </List>
      </div>
    </Container>
  );
};

export default Admin;
