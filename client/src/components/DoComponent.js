import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support

import { navigate } from '@reach/router';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
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
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CssBaseline from '@material-ui/core/CssBaseline';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';

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
import { RootRef } from '@material-ui/core';
import Moment from 'react-moment';
import 'moment-timezone';
import moment from 'moment';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import UpdateIcon from '@material-ui/icons/Update';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 752,
    flexGrow: 1,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialogStyle: {
    backgroundColor: theme.palette.background.paper,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
    color: theme.palette.primary.main,
  },
  textMain: {
    color: theme.palette.primary.main,
  },
  text: {
    color: theme.palette.primary.contrastText,
  },
  subtitle: {
    margin: theme.spacing(-1, 0, 0),
    color: theme.palette.primary.main,
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
  icon: {
    color: theme.palette.primary.main,
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
  const [openCal, setOpenCal] = useState(false);
  const [openEditTask, setOpenEditTask] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleOpenCal = () => {
    setOpenCal(true);
  };
  const handleCloseCal = () => {
    setOpenCal(false);
  };

  const handleEditTask = () => {
    setOpenEditTask(true);
  };
  const handleCloseEditTask = () => {
    setOpenEditTask(false);
  };

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
      });
    let two = 'http://localhost:8000/api/tasks/user';
    const requestTwo = axios.get(two, { withCredentials: true });
    requestTwo
      .then(response => {
        setAllTasks(response.data.results);
      })
      .catch(error => {
      });
    axios
      .all([requestOne, requestTwo])
      .then(
        axios.spread((...responses) => {
          const responseOne = responses[0];
          const responseTwo = responses[1];
        })
      )
      .catch(errors => {
        navigate('/signup');
      });
  }, [load]);

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

  const filteredTasks = allTasks.filter(tasks => {
    let found = '';
    if (
      moment(moment(tasks.scheduledAt)).isSame(dateParameter, 'day') === true 
      && tasks.completed === false
      ) {
      found = tasks.name;
    }
    return found;
  });

  const removeFromDom = taskId => {
    setAllTasks(allTasks.filter(task => task._id !== taskId));
  };

  const onChangeHandler = e => {
    setTask({
      ...task,
      owner: sessionUserId,
      [e.target.name]: e.target.value,
    });
  };

  const onPatchEditNameHandler = (e, id) => {
    // task.category = e.target.value;
    // task.chunked = true;
    axios
      .patch('http://localhost:8000/api/tasks/' + id, task, {
        withCredentials: true,
      })
      .then(res => {
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
      })
      .catch(err => console.log(err));
  };
  const onPatchEditChunkHandler = (e, i) => {
    task.category = e.target.value;
    task.chunked = true;
    axios
      .patch('http://localhost:8000/api/tasks/' + i, task, {
        withCredentials: true,
      })
      .then(res => {
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
      })
      .catch(err => console.log(err));
  };

  const onPatchHandler = (e, i) => {
    e.preventDefault();
    if (task.chunked === true) {
      axios
        .patch('http://localhost:8000/api/tasks/' + i, task, {
          withCredentials: true,
        })
        .then(res => {
          let count = load;
          if (count >= 0) {
            count++;
            setLoad(count);
          }
        })
        .catch(err => console.log(err));
    }
  };

  const onSelectHandler = e => {
    setSelectedCategory(e.target.value);
  };

  const onChangeDate = (date, id) => {
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
      })
      .catch(err => console.log(err));
  };

  const onDragEnd = result => {
    const { destination, source, draggableId } = result;
    if (!result.destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const items = reorder(
      allTasks,
      result.source.index,
      result.destination.index
    );
    setAllTasks(items);
  };

  const onCompleteHandler = (e,id) => {
    let thisTask = '';
    let one = `http://localhost:8000/api/tasks/${id}`;
    const requestOne = axios.get(one, { withCredentials: true });
    requestOne
    .then(res => {
      if (res.data.message === 'success') {
        thisTask = res.data.results;
      }
    })
    .catch(err => console.log(err));
    let two = `http://localhost:8000/api/tasks/${id}`;
    const requestTwo = axios.patch(two, task, { withCredentials: true });
    requestTwo
    .then(res => {
      if (res.data.message === 'success') {
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
    }})
    .catch(err => console.log(err));
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
        navigate('/signup');
      });
  };

  const toUpperCaseFilter = d => {
    return d.toUpperCase();
  };

  const handleDateParameter = date => {
    console.log(date);
    console.log(typeof date);
    console.log(date.toLocaleString('en-US', DATE_OPTIONS));
    console.log(moment.utc(date));
    setDateParameter(date);
  };

  return (
    <Container className={classes.root}>
      <CssBaseline />
      <Typography
        variant='h2'
        // component='h2'
        className={classes.title}
      >
        {'\u03C4\u03AD\u03BB\u03BF\u03C2'}
      </Typography>
      <h1 className={classes.title}>Do</h1>
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

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='droppable'>
          {provided => (
            <RootRef
              rootRef={provided.innerRef}
              {...provided.droppableProps}
            >
              <div>
                <List dense={dense}>
                {filteredTasks.map((task, i) =>
                  task.chunked && task.scheduled === true ? (
                  <Draggable
                    draggableId={task._id}
                    index={i}
                    key={task._id}
                  >
                    {provided => (
                      <ListItem
                      className={classes.list}
                      ContainerProps={{ ref: provided.innerRef }}
                      id='Task'
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      innerRef={provided.innerRef}
                    >
                    <IconButton
                      type='button'
                      className={classes.text}
                      onClick={e => onCompleteHandler(e, task._id)}
                    >
                      <CheckBoxOutlineBlankIcon />
                    </IconButton>
                    <IconButton
                      type='button'
                      onClick={e => handleOpenEdit(e)}
                    >
                      <EditIcon className={classes.text} />
                    </IconButton>
                    <Dialog
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
                      <DialogContent
                        className={classes.dialogStyle}
                      >
                        <Typography className={classes.title}>
                          <h2>
                            {task.name}
                          </h2>
                        </Typography>
                        <TextField
                          id='dump'
                          label='Edit task here...'
                          multiline
                          rowsMax={2}
                          size='medium'
                          variant='outlined'
                          onChange={e => {
                            onChangeHandler(e);
                          }}
                          onClick={e => {
                            onClickHandler(e, task._id);
                          }}
                          onBlur={e => {
                            onPatchEditNameHandler(e, task._id);
                          }}
                          placeholder={task.name}
                          name='name'
                          value={selectedIndex[i]}
                        />
                        <FormControl
                          variant='standard'
                          className={classes.formControl}
                        >
                          <InputLabel
                            className={classes.textMain}
                            htmlFor='category'
                          >
                              Chunk...
                          </InputLabel>
                          <Select
                            native
                            className={classes.textMain}
                            value={selectedIndex[i]}
                            onClick={e => {
                              onClickHandler(e, task._id);
                            }}
                            onChange={e => {
                              onPatchEditChunkHandler(e, task._id);
                            }}
                            label='Chunk...'
                            name='category'
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
                      </DialogContent>
                      <DialogActions>
                        <Button 
                          autoFocus 
                          onClick={handleCloseEdit}     
                          color="primary"
                        >
                          Cancel
                        </Button>
                        <IconButton
                          className={classes.icon}
                          aria-label='update task'
                          onClick={handleCloseEdit}
                        >
                          <LibraryAddIcon />
                        </IconButton>
                      </DialogActions>
                    </Dialog>
                    <ListItemText
                      disableTypography
                      className={classes.text}
                      textOverflow='ellipsis'
                      overflow='hidden'
                      primary={<Typography variant="body1" style={{color: 'white'}}>{task.name}</Typography>}
                      secondary={<Typography variant="body2" style={{color: '#bdbdbdde'}}>{secondary ? task.category : null}</Typography>}
                    />
                    <Dialog open={openCal} onClose={handleCloseCal}>
                      <DialogContent
                        className={classes.dialogStyle}
                      >
                        <DialogContentText>
                          Please select a date...
                        </DialogContentText>
                      </DialogContent>
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
                      <IconButton edge='end' aria-label='delete'>
                        <DeleteComponent
                          taskId={task._id}
                          successCallback={() => removeFromDom(task._id)}
                        />
                      </IconButton>
                      <DialogActions>
                        <IconButton
                          className={classes.icon}
                          aria-label='add to calendar'
                          onClick={e => {
                            onPatchDateHandler(e, task._id, i);
                          }}
                        >
                          <LibraryAddIcon />
                        </IconButton>
                      </DialogActions>
                    </Dialog>
                    <ListItemText
                      className={classes.text}
                      primary={
                        <Moment format='MM-DD-YYYY' filter={toUpperCaseFilter}>
                          {task.scheduledAt}
                        </Moment>
                      }
                    />
                  </ListItem>
                    )}
                </Draggable>
                ) : (
                  <div></div>
                )
              )}
            </List>
          </div>
          {provided.placeholder}
          </RootRef>
          )}
        </Droppable>
      </DragDropContext>
    </Container>
  );
};

export default DoComponent;
