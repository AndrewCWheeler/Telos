import React, { useState, useEffect } from 'react';
import Undo from '@material-ui/icons/Undo';
import PropTypes from 'prop-types';
import axios from 'axios';
import { navigate } from '@reach/router';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';

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
import MenuItem from '@material-ui/core/MenuItem';
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
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import { shadows } from '@material-ui/system';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import EventIcon from '@material-ui/icons/Event';
import EditIcon from '@material-ui/icons/Edit';
import UpdateIcon from '@material-ui/icons/Update';
import Button from '@material-ui/core/Button';

import 'date-fns';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  // KeyboardTimePicker,
  KeyboardDatePicker,
  DatePicker,
} from '@material-ui/pickers';
import { RootRef, FormLabel, Tooltip, ListItemSecondaryAction, ListItemIcon } from '@material-ui/core';
import Moment from 'react-moment';
import Radio from '@material-ui/core/Radio';
import RadioGroup, { useRadioGroup } from '@material-ui/core/RadioGroup';

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
    margin: theme.spacing(2, 0),
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
    color: theme.palette.primary.main,
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
  undo: {
    color: theme.palette.secondary.main,
  }
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

const ScheduleComponent = props => {
  const [load, setLoad] = useState(0);
  const [task, setTask] = useState({
    name: '',
    category: '',
    chunked: '',
    owner: '',
    scheduled: '',
    scheduledAt: '',
    completed: '',
  });
  const [allTasks, setAllTasks] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [dense, setDense] = useState(false);
  const [secondary, setSecondary] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [sessionUserId, setSessionUserId] = useState('');
  const [openCal, setOpenCal] = useState(false);
  const [openEditTask, setOpenEditTask] = useState(false);
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
  const [openEdit, setOpenEdit] = useState(false);

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

  const onClickHandler = (e, id) => {
    axios
      .get(`http://localhost:8000/api/tasks/${id}`, { withCredentials: true })
      .then(res => {
        if (res.data.message === 'success') {
          setTask(res.data.results);
          setSelectedIndex(res.data.results);
        }
      })
      .catch(err => console.log(err));
  };
  console.log(task);

  const reorder = (allTasks, startIndex, endIndex) => {
    const result = Array.from(allTasks);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onChangeHandler = e => {
    setTask({
      ...task,
      owner: sessionUserId,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
  };

  const removeFromDom = taskId => {
    setAllTasks(allTasks.filter(task => task._id !== taskId));
  };

  const onPatchEditNameHandler = (e, id) => {
    // task.category = e.target.value;
    // task.chunked = true;
    axios
      .patch('http://localhost:8000/api/tasks/' + id, task, {
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

  const onPatchEditChunkHandler = (e, id) => {
    task.category = e.target.value;
    task.chunked = true;
    axios
      .patch('http://localhost:8000/api/tasks/' + id, task, {
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

  const onPatchUnChunkHandler = (e, id) => {
    task.category = '';
    task.chunked = false;
    axios
      .patch('http://localhost:8000/api/tasks/' + id, task, {
        withCredentials: true,
      })
      .then(res => {
        console.log(res.data.message);
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
    handleCloseEdit();
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
        console.log(load);
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

  const toUpperCaseFilter = d => {
    return d.toUpperCase();
  };

  return (
    <Container className={classes.root}>
      <CssBaseline />
      {/* <Typography
        variant='h2'
        // component='h2'
        className={classes.title}
      >
        {'\u03C4\u03AD\u03BB\u03BF\u03C2'}
      </Typography> */}
      <div style={{marginTop:'100px'}}>
        <h1 className={classes.title}>Schedule</h1>
      </div>
      {/* <DatePicker selected={date} onChange={onDateChange} /> */}
      
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant='h6' className={classes.title}>
            Select Category to Sort and Calendar Icon to Schedule...
          </Typography>
          <h3 className={classes.title}>Select Category:</h3>
          <FormControl variant='standard' className={classes.formControl}>
            <InputLabel id="select-category">Category</InputLabel>
            <Select
              labelId="select-category"
              className={classes.textMain}
              // value
              onChange={e => {
                onSelectHandler(e);
              }}
              label='Chunk...'
              name='category'
              value={selectedCategory}
            >
              <MenuItem aria-label='None' value=''><em>None</em></MenuItem>
              <MenuItem value='Home'>Home</MenuItem>
              <MenuItem value='Health'>Health</MenuItem>
              <MenuItem value='Family'>Family</MenuItem>
              <MenuItem value='Friends'>Friends</MenuItem>
              <MenuItem value='Finance'>Finance</MenuItem>
              <MenuItem value='Creative'>Creative</MenuItem>
              <MenuItem value='Spiritual'>Spiritual</MenuItem>
              <MenuItem value='Social'>Social</MenuItem>
            </Select>
          </FormControl>
          <Grid container direction='row' justify='center' style={{marginTop:25}}>
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
                      {allTasks.map((task, i) =>
                        selectedCategory === task.category &&
                        task.chunked &&
                        task.scheduled !== true ? (
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
                                <Tooltip title="Edit Task" placement="left">
                                  <ListItemIcon
                                    type='button'
                                    edge='start'
                                    onClick={e => handleOpenEdit(e)}
                                  >
                                    <EditIcon className={classes.text} />
                                  </ListItemIcon>
                                </Tooltip>
                                <Dialog
                                  aria-labelledby='modal-edit-radio'
                                  aria-describedby='choose-chunk-category'
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
                                    <Tooltip title="Unchunk" placement="top">
                                      <IconButton 
                                      className={classes.undo}
                                      role='button'
                                      onClick={e => {onPatchUnChunkHandler(e, task._id)}}
                                      >
                                        <Undo />
                                      </IconButton>
                                    </Tooltip>
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
                                        // onChange={e => {
                                        //   onPatchChunkHandler(e, task._id);
                                        // }}
                                        label='Chunk...'
                                        name='category'
                                      >
                                        <option aria-label='None' value=''></option>
                                        <option value='Home'>Home</option>
                                        <option value='Health'>Health</option>
                                        <option value='Family'>Family</option>
                                        <option value='Friends'>Friends</option>
                                        <option value='Finance'>Finance</option>
                                        <option value='Creative'>
                                          Creative
                                        </option>
                                        <option value='Spiritual'>
                                          Spiritual
                                        </option>
                                        <option value='Social'>Social</option>
                                      </Select>
                                      {/* <IconButton
                                        type='button'
                                        className={classes.text}
                                        onClick={e =>
                                          onPatchEditHandler(e, task._id)
                                        }
                                      >
                                        <UpdateIcon />
                                      </IconButton> */}
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

                                {/* <ListItemAvatar>
                                    <Avatar>
                                    <IconButton aria-label='delete'>
                                    <FolderIcon taskId={task._id} />
                                    </IconButton>
                                    </Avatar>
                                  </ListItemAvatar> */}
                                <ListItemText
                                  disableTypography
                                  className={classes.text}
                                  textOverflow='ellipsis'
                                  overflow='hidden'
                                  primary={<Typography variant="body1" style={{color: 'white'}}>{task.name}</Typography>}
                                  secondary={<Typography variant="body2" style={{color: '#bdbdbdde'}}>{secondary ? task.category : null}</Typography>}
                                />
                                <ListItemSecondaryAction>
                                  <Tooltip title="Open Calendar" placement="right">
                                    <IconButton
                                      edge='end'
                                      type='button'
                                      onClick={handleOpenCal}
                                    >
                                      <EventIcon className={classes.text} />
                                    </IconButton>
                                  </Tooltip>
                                </ListItemSecondaryAction>

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
        </Grid>
      </Grid>
    </Container>
  );
};

export default ScheduleComponent;
