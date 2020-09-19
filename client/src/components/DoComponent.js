import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support

import { navigate } from '@reach/router';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
// import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import DeleteComponent from './DeleteComponent';
// import FolderIcon from '@material-ui/icons/Folder';
import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// import { createMuiTheme } from '@material-ui/core/styles';
// import AddBoxIcon from '@material-ui/icons/AddBox';
import CssBaseline from '@material-ui/core/CssBaseline';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
import CachedIcon from '@material-ui/icons/Cached';
// import DateRangeIcon from '@material-ui/icons/DateRange';
// import DatePickComponent from './DatePickComponent';
// import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import 'date-fns';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import EventIcon from '@material-ui/icons/Event';
import { shadows } from '@material-ui/system';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  DateTimePicker,
  DatePicker,
  Calendar,
  // KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import BottomNavComponent from './BottomNavComponent';
import { RootRef } from '@material-ui/core';
import Moment from 'react-moment';
import 'moment-timezone';
import moment from 'moment';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import UpdateIcon from '@material-ui/icons/Update';
import EditIcon from '@material-ui/icons/Edit';

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
  root: {
    width: '100%',
    flexGrow: 1,
    maxWidth: 640,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  primaryTitle: {
    margin: theme.spacing(4, 0, 2),
    color: theme.palette.primary.main,
    // textShadow: '5px 5px 18px #3f50b5',
  },
  title: {
    margin: theme.spacing(4, 0, 2),
    color: theme.palette.primary.main,
  },

  text: {
    color: theme.palette.primary.contrastText,
  },
  subtitle: {
    color: theme.palette.secondary.light,
  },
  select: {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.main,
  },
  paper: {
    maxWidth: 640,
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
    margin: `${theme.spacing(1)}px auto`,
    maxHeight: '100%',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    boxShadow: theme.shadows[10],
    borderRadius: 10,
  },
  item: {
    margin: theme.spacing(1, 1),
    width: 250,
    color: theme.palette.primary.contrastText,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    backgroundColor: theme.palette.background.main,
    // justify: 'center',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  Fade.propTypes = {
    children: PropTypes.element,
    in: PropTypes.bool.isRequired,
    onEnter: PropTypes.func,
    onExited: PropTypes.func,
  };
  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

const DoComponent = () => {
  const [load, setLoad] = useState(0);
  const [task, setTask] = useState({
    name: '',
    category: '',
    chunked: '',
    owner: '',
    scheduled: '',
    scheduledAt: '',
    complete: '',
  });
  const [allTasks, setAllTasks] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [dense, setDense] = useState(false);
  const [secondary, setSecondary] = useState(true);
  const [openChunk, setOpenChunk] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dateParameter, setDateParameter] = useState(new Date());
  const [sessionUserId, setSessionUserId] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  const handleOpenChunk = () => {
    setOpenChunk(true);
  };
  const handleCloseChunk = () => {
    setOpenChunk(false);
  };
  const handleOpenEdit = () => {
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const classes = useStyles();

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
    axios
      .all([requestOne, requestTwo])
      .then(
        axios.spread((...responses) => {
          const responseOne = responses[0];
          console.log(responseOne);
          const responseTwo = responses[1];
          console.log(responseTwo);
        })
      )
      .catch(errors => {
        console.log(errors);
        navigate('/signup');
      });
  }, [load]);

  const DATE_OPTIONS = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  const reorder = (allTasks, startIndex, endIndex) => {
    const result = Array.from(allTasks);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const removeFromDom = taskId => {
    setAllTasks(allTasks.filter(task => task._id !== taskId));
  };

  const filteredTasks = allTasks.filter(tasks => {
    // const denominator = moment().format('YYYY-MM-DD');
    console.log(dateParameter);
    console.log(tasks.scheduledAt);
    let found = '';
    if (
      moment(moment(tasks.scheduledAt)).isSame(dateParameter, 'day') === true
    ) {
      found = tasks.name;
      console.log(found);
    }
    return found;
  });
  console.log(filteredTasks);

  const onPatchHandler = (e, i) => {
    e.preventDefault();
    if (task.chunked === true) {
      axios
        .patch('http://localhost:8000/api/tasks/' + i, task, {
          withCredentials: true,
        })
        .then(res => {
          console.log(res.data.results);
          let count = load;
          if (count >= 0) {
            count++;
            setLoad(count);
          }
          console.log(load);
        })
        .catch(err => console.log(err));
    }
  };

  const onClickHandler = (e, id) => {
    axios
      .get(`http://localhost:8000/api/tasks/${id}`, { withCredentials: true })
      .then(res => {
        if (res.data.message === 'success') {
          setTask(res.data.results);
        }
      })
      .catch(err => console.log(err));
  };
  console.log(task);

  const onPatchChunkHandler = (e, i) => {
    task.category = e.target.value;
    task.chunked = true;
    axios
      .patch('http://localhost:8000/api/tasks/' + i, task, {
        withCredentials: true,
      })
      .then(res => {
        console.log(res.data.results);
        setTask({
          name: '',
          category: '',
          chunked: false,
          scheduled: false,
          scheduledAt: '',
          completed: false,
          owner: '',
        });
        let count = load;
        if (count >= 0) {
          count++;
          setLoad(count);
        }
        console.log(load);
      })
      .catch(err => console.log(err));
  };

  const onSelectHandler = e => {
    console.log(e.target.value);
    setSelectedCategory(e.target.value);
  };

  const onChangeDate = (date, id) => {
    console.log(task);
    setSelectedDate(date);
    task.scheduledAt = date;
  };

  const onPatchDateHandler = (date, id) => {
    // setSelectedDate(date);
    // task.scheduledAt = date;
    task.scheduled = true;
    axios
      .patch(`http://localhost:8000/api/tasks/${id}`, task, {
        withCredentials: true,
      })
      .then(res => {
        console.log(res.data.results);

        setTask({
          name: '',
          category: '',
          chunked: false,
          scheduled: false,
          scheduledAt: '',
          completed: false,
          owner: '',
        });
        let count = load;
        if (count >= 0) {
          count++;
          setLoad(count);
        }
        console.log(load);
      })
      .catch(err => console.log(err));
  };

  const onCompleteHandler = id => {
    console.log(task);
    console.log('Set task as task.completed before updating.');
    console.log(id);
    console.log('Task Completed!');
  };

  // const handleDateChange = (date, id, i) => {
  //   setSelectedDate(date);
  //   let currScheduled = date;
  //   axios
  //     .get('http://localhost:8000/api/tasks/' + id)
  //     .then(res => {
  //       if (res.data.message === 'success') {
  //         let currTask = res.data.results;
  //         currTask.scheduledAt = currScheduled;
  //         setTask(currTask);
  //       }
  //     })
  //     .catch(err => console.log(err));
  // };

  // const onDateHandler = (e, id) => {
  //   e.preventDefault();
  //   if (task.scheduledAt !== null) {
  //     task.scheduled = true;
  //     axios
  //       .patch('http://localhost:8000/api/tasks/' + id, task)
  //       .then(res => {
  //         console.log(res.data.results);

  //         let count = load;
  //         if (count >= 0) {
  //           count++;
  //           setLoad(count);
  //         }
  //         console.log(load);
  //       })
  //       .catch(err => console.log(err));
  //   }
  // };

  const toUpperCaseFilter = d => {
    return d.toUpperCase();
  };

  const handleDateParameter = date => {
    console.log(date);
    console.log(typeof date);
    console.log(date.toLocaleString('en-US', DATE_OPTIONS));
    console.log(moment.utc(date));
    setDateParameter(date);
    // let count = load;
    // if (count >= 0) {
    //   count++;
    //   setLoad(count);
    // }
    // console.log(load);
  };

  return (
    <Container className={classes.root}>
      <CssBaseline />
      <Typography
        variant='h2'
        // component='h2'
        gutterBottom
        className={classes.primaryTitle}
      >
        {'\u03C4\u03AD\u03BB\u03BF\u03C2'}
      </Typography>
      <h1 className={classes.title}>Do Component</h1>
      <Typography variant='h6' className={classes.title}>
        Select Date to Sort and then DO it!
      </Typography>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <CssBaseline />
        <Grid container justify='space-around'>
          <DatePicker
            className={classes.text}
            margin='normal'
            id='Selected a date...'
            label='Date picker dialog'
            format='MM/dd/yyyy'
            value={dateParameter}
            onChange={e => {
              handleDateParameter(e);
            }}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </Grid>
      </MuiPickersUtilsProvider>
      {/* <DatePicker selected={date} onChange={onDateChange} /> */}
      <Grid container direction='row' justify='center'>
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={dense}
                onChange={event => setDense(event.target.checked)}
              />
            }
            label='Enable dense'
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={secondary}
                onChange={event => setSecondary(event.target.checked)}
              />
            }
            label='Enable secondary text'
          />
        </FormGroup>
      </Grid>

      <Grid container spacing={1}>
        <Grid item xs={12}>
          {/* <h3 className={classes.title}>Category:</h3>
          <FormControl variant='outlined' className={classes.formControl}>
            <InputLabel htmlFor='category'>Category</InputLabel>
            <Select
              native
              // value
              onChange={e => {
                onSelectHandler(e);
              }}
              label='Chunk...'
              name='category'
              // inputProps={{
              //   name: 'category',
              //   id: 'category',
              // }}
            >
              <option aria-label='None' value='' />
              <option value='Home'>Home</option>
              <option value='Health'>Health</option>
              <option value='Family'>Family</option>
              <option value='Friends'>Friends</option>
              <option value='Finance'>Finance</option>
              <option value='Creative'>Creative</option>
              <option value='Spiritual'>Spiritual</option>
              <option value='Social'>Social</option>
            </Select>
          </FormControl> */}
          <div>
            <List dense={dense}>
              {filteredTasks.map((task, i) =>
                task.chunked && task.scheduled === true ? (
                  // <Paper key={i} elevation={5} className={classes.paper}>
                  <ListItem
                    className={classes.list}
                    key={i}
                    // button
                    // selected={selectedIndex === 0}
                    // onClick={event => handleListItemClick(event, 0)}
                  >
                    {/* <i className='fa fa-folder-open-o' aria-hidden='true'></i> */}
                    {/* <IconButton
                        edge='start'
                        aria-label='add chunked'
                        onClick={e => {
                          onPatchHandler(e, task._id);
                        }}
                      >
                        <CachedIcon />
                      </IconButton> */}
                    <IconButton
                      type='button'
                      className={classes.text}
                      onClick={e => onCompleteHandler(e, task._id)}
                    >
                      <CheckBoxOutlineBlankIcon />
                    </IconButton>
                    <Modal
                      aria-labelledby='modal-chunk-select'
                      aria-describedby='choose-chunk-category'
                      className={classes.modal}
                      open={openChunk}
                      onClose={handleCloseChunk}
                      closeAfterTransition
                      BackdropComponent={Backdrop}
                      BackdropProps={{
                        timeout: 500,
                      }}
                    >
                      <Fade in={openChunk}>
                        <Grid className={classes.paper2}>
                          <FormControl
                            variant='standard'
                            className={classes.formControl}
                          >
                            <InputLabel
                              className={classes.text}
                              htmlFor='category'
                            >
                              Chunk...
                            </InputLabel>
                            <Select
                              native
                              className={classes.text}
                              value={selectedIndex[i]}
                              onClick={e => {
                                onClickHandler(e, task._id);
                              }}
                              onChange={e => {
                                onPatchChunkHandler(e, task._id);
                              }}
                              label='Chunk...'
                              name='category'
                              // inputProps={{
                              //   name: 'category',
                              //   id: 'category',
                              // }}
                            >
                              <option aria-label='None' value='' />
                              <option value='Home'>Home</option>
                              <option value='Health'>Health</option>
                              <option value='Family'>Family</option>
                              <option value='Friends'>Friends</option>
                              <option value='Finance'>Finance</option>
                              <option value='Creative'>Creative</option>
                              <option value='Spiritual'>Spiritual</option>
                              <option value='Social'>Social</option>
                            </Select>
                          </FormControl>
                        </Grid>
                      </Fade>
                    </Modal>

                    {/* <ListItemAvatar>
                        <Avatar>
                        <IconButton aria-label='delete'>
                        <FolderIcon taskId={task._id} />
                        </IconButton>
                        </Avatar>
                      </ListItemAvatar> */}

                    <ListItemText
                      className={classes.item}
                      primary={task.name}
                      secondary={secondary ? task.category : null}
                    />

                    {/* <ListItemText
                        className={classes.text}
                        primary={new Date(task.scheduledAt).toLocaleString(
                          'en-US',
                          DATE_OPTIONS
                          )}
                        /> */}
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <CssBaseline />
                      {/* <Grid container justify='space-around'> */}
                      <KeyboardDatePicker
                        className={classes.text}
                        key={i}
                        margin='normal'
                        InputAdornmentProps={{
                          position: 'start',
                        }}
                        margin='normal'
                        id='date-picker-dialog'
                        format='MM/dd/yyyy'
                        // label='Select a date...'
                        value={selectedDate}
                        onClick={e => {
                          onClickHandler(e, task._id);
                        }}
                        onChange={e => {
                          onChangeDate(e, task._id);
                        }}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                      {/* </Grid> */}
                    </MuiPickersUtilsProvider>
                    <IconButton
                      className={classes.text}
                      aria-label='add to calendar'
                      onClick={e => {
                        onPatchDateHandler(e, task._id, i);
                      }}
                    >
                      <UpdateIcon />
                    </IconButton>

                    <ListItemText
                      className={classes.text}
                      primary={
                        <Moment format='MM-DD-YYYY' filter={toUpperCaseFilter}>
                          {task.scheduledAt}
                        </Moment>
                      }
                    />

                    {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <CssBaseline />
                        <Grid container justify='space-around'>
                        <KeyboardDatePicker
                        className={classes.text}
                        margin='normal'
                        id='Selected a date...'
                        label='Date picker dialog'
                        format='MM/dd/yyyy'
                        value={selectedDate}
                        onChange={e => {
                          handleDateChange(e, task._id, i);
                        }}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                        />
                        </Grid>
                      </MuiPickersUtilsProvider> */}

                    {/* <DatePickComponent
                        taskId={task._id}
                        selectedIndexId={selectedIndexId}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        handleDateChange={handleDateChange}
                      /> */}

                    {/* <DateRangeIcon /> */}
                    <IconButton
                      type='button'
                      onClick={e => handleOpenEdit(e)}
                      className={classes.text}
                    >
                      <EditIcon />
                    </IconButton>
                    <Modal
                      aria-labelledby='modal-edit-select'
                      aria-describedby='choose-edit-category'
                      className={classes.modal}
                      open={openEdit}
                      onClose={handleCloseEdit}
                      closeAfterTransition
                      BackdropComponent={Backdrop}
                      BackdropProps={{
                        timeout: 500,
                      }}
                    >
                      <Fade in={openEdit}>
                        <Grid className={classes.paper2}>
                          <IconButton type='button' onClick={handleOpenChunk}>
                            <FolderOpenIcon className={classes.text} />
                          </IconButton>
                          <IconButton edge='end' aria-label='delete'>
                            <DeleteComponent
                              taskId={task._id}
                              successCallback={() => removeFromDom(task._id)}
                            />
                          </IconButton>
                        </Grid>
                      </Fade>
                    </Modal>
                  </ListItem>
                ) : (
                  <div></div>
                )
              )}
            </List>
          </div>
        </Grid>
      </Grid>
      <BottomNavComponent />
    </Container>
  );
};

export default DoComponent;
