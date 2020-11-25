import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {navigate} from '@reach/router';
// Material-ui core components:
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
// Material-ui icons:
import EventIcon from '@material-ui/icons/Event';
import EditIcon from '@material-ui/icons/Edit';
import LabelIcon from '@material-ui/icons/Label';
import Undo from '@material-ui/icons/Undo';
// Date components and dependencies:
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
// react-beautiful-dnd imports:
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// React Moment and moment imports:
import Moment from 'react-moment';
import 'moment-timezone';
import moment from 'moment';
// My modified material components:
import SimpleSnackbar from '../components/SimpleSnackBar';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 840,
  },
  round: {
    position: 'relative',
    '& label': {
      backgroundColor: theme.palette.background.default,
      border: `1px solid ${theme.palette.text.secondary}`,
      borderRadius: '50%',
      cursor: 'pointer',
      height: 21,
      left: 0,
      position: 'absolute',
      top: 0,
      width: 21,

    },
    '& label:after': {
      border: `1px solid ${theme.palette.text.primary}`,
      borderTop: 'none',
      borderRight: 'none',
      content: '',
      height: 6,
      left: 7,
      opacity: 0,
      position: 'absolute',
      top: 8,
      transform: 'rotate(-45deg)',
      width: 12,
    },
    '& input[type=checkbox]': {
      visibility: 'hidden',
    },
    '& input[type=checkbox]:checked + label':{
      backgroundColor: theme.palette.secondary.main,
      borderColor: theme.palette.secondary.main,
    },
    '& input[type=checkbox]:checked + label:after':{
      opacity: 1,
    },
  },  
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialogStyle: {
    backgroundColor: theme.palette.background.paper,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 250,
    marginBottom: 60,
  },
  dialogTitle: {
    color: theme.palette.primary.main,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  subtitle: {
    margin: theme.spacing(-1, 0, 0),
    color: theme.palette.primary.main,
  },
  text: {
    color: theme.palette.text.primary,
    display: 'inline-block',
    overflowX: 'scroll',
    overflowY: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '120px',
    height: '100%',
    marginTop: 12,
  },
  link: {
    background: 'none!important',
    border: 'none',
    padding: '0!important',
    // fontFamily: arial, sansSerif,
    textDecoration: 'none',
    color: theme.palette.info.main,
    "&:active": {
      color: theme.palette.secondary.dark,
    },
    "&:hover": {
      color: theme.palette.info.main,
      textDecoration: 'none',
      cursor: 'pointer',
    }
  },
  list: {
    marginBottom: 90,
    marginTop: 60,
  },
  listItem: {
    maxHeight: '100%',
    height: 75,
    width: '100%',
    backgroundColor: theme.palette.background.default,
    borderBottom: `.5px solid ${theme.palette.background.paper}`,
  },
  primaryColor: {
    color: theme.palette.primary.main,
  },
  primaryIconStyle: {
    fontSize:24,
    color: theme.palette.primary.main,
  },
  neutralIconStyle: {
    fontSize:24,
    color: theme.palette.text.secondary,
  },
  undo: {
    color: theme.palette.secondary.main,
  },
}));

const Do = props => {
  const myRef = useRef();
  const editModalRef = useRef();
  const doRef = useRef();
  const classes = useStyles();
  const { navValue, setNavValue } = props;
  const [task, setTask] = useState({
    name: '',
    category: '',
    chunked: '',
    scheduled: '',
    scheduledAt: '',
    completed: '',
    completedAt: '',
    owner: '',
    priority: 0,
  });
  const [sessionUserId, setSessionUserId] = useState('');
  const [allTasks, setAllTasks] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [load, setLoad] = useState(0);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dateParameter, setDateParameter] = useState(new Date());
  const [openCal, setOpenCal] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [snack, setSnack] = useState('');
  const [severity, setSeverity] = useState('');
  
  useEffect(() => {
    let isMounted = true;
    if (navValue !== 'do'){
      setNavValue('do');
    }
    let one = 'http://localhost:8000/api/users/one';
    const requestOne = axios.get(one, { withCredentials: true });
    requestOne
      .then(response => {
        if (response.data.message === 'success' && isMounted) {
          setSessionUserId(response.data.results._id);
        }
      })
      .catch(()=> {
        navigate('/');
      });
    let two = 'http://localhost:8000/api/tasks/user';
    const requestTwo = axios.get(two, { withCredentials: true });
    requestTwo
      .then(response => {
        if (response.data.message === 'success' && isMounted){
          let orderedTasks = response.data.results;
          orderedTasks.sort((a,b) => a.priority - b.priority)
          setAllTasks(orderedTasks);
        }
      })
      .catch(()=> {
        navigate('/');
      });
    let three = 'http://localhost:8000/api/categories/user';
    const requestThree = axios.get(three, {withCredentials: true });
    requestThree
      .then(response => {
        if (isMounted) setAllCategories(response.data.results);
      })
      .catch(()=> {
        navigate('/');
      });
    axios
      .all([requestOne, requestTwo, requestThree])
      .then(
        axios.spread((...responses) => {
          const responseOne = responses[0];
          const responseTwo = responses[1];
          const responseThree = responses[2];
        })
      )
      .catch(()=> {
        navigate('/');
      });
      return () => { isMounted = false }
  }, [load]);

  // Filter, sort, reorder task functions:
  const FilteredTasks = allTasks.filter(tasks => {
    let found = '';
    if (
      moment(moment(tasks.scheduledAt)).isSame(dateParameter, 'day') === true
      && tasks.completed === false
      ) {
      found = tasks;
    }
    return found;
  });

  const reorder = (FilteredTasks, startIndex, endIndex) => {
    const result = Array.from(FilteredTasks);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
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
      FilteredTasks,
      result.source.index,
      result.destination.index
    );
    setAllTasks(items);
  };
      
  // Assign priority to tasks according to DOM state index and update priority property in db:
  const assignPriority = (arr) => {
    for (let i=0; i<arr.length; i++){
      arr[i].priority = i;
    }
    axios.put('http://localhost:8000/api/bulk/' + sessionUserId, arr, {withCredentials: true})
    .then()
    .catch();
    return arr;
  }
    
  const SortedTasks = assignPriority(FilteredTasks).sort((a, b) => a.priority - b.priority);
  
  // Dialog and Snack Handlers:

  const handleOpenSnackBar = (snack, severity) => {
    setOpenSnack(true);
    setSnack(snack); 
    setSeverity(severity)
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };

  const handleOpenCal = (e, id) => {
    onClickHandler(e, id);
    setOpenCal(true);
  };
  const handleCloseCal = () => {
    setOpenCal(false);
  };
  
  const handleOpenEdit = (e, id) => {
    onClickHandler(e, id);
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  // onChange functions:
  const onChangeHandler = e => {
    setTask({
      ...task,
      owner: sessionUserId,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeDate = (date, id) => {
    setSelectedDate(date);
    task.scheduledAt = date;
  };

  const handleDateParameter = date => {
    setDateParameter(date);
    load === 1 ? (setLoad(0)) : setLoad(1);
  };

  const removeFromDom = taskId => {
    setAllTasks(allTasks.filter(task => task._id !== taskId));
  };

  // Get and Patch axios db calls:
  const onClickHandler = (e, id) => {
    axios
      .get(`http://localhost:8000/api/tasks/${id}`, { withCredentials: true })
      .then(res => {
        if (res.data.message === 'success') {
          setTask(res.data.results);
        }
      })
      .catch();
  };

  const onPatchEditNameHandler = (e, id) => {
    axios
      .patch('http://localhost:8000/api/tasks/' + id, task, {
        withCredentials: true,
      })
      .then(res => {
      })
      .catch();
  };

  const onPatchUnScheduleHandler = (e, id, snack, severity) => {
    task.scheduledAt = '';
    task.scheduled = false;
    axios
      .patch('http://localhost:8000/api/tasks/' + id, task, {
        withCredentials: true,
      })
      .then(res => {
        if (res.data.message === 'success') {
          removeFromDom(id);
          handleCloseEdit();
          handleOpenSnackBar(snack, severity);
        }
      })
      .catch();
  };

  const onPatchEditChunkHandler = (e, id) => {
    task.category = e.target.value;
    task.chunked = true;
    axios
      .patch('http://localhost:8000/api/tasks/' + id, task, {
        withCredentials: true,
      })
      .then(res => {
        if (res.data.message === 'success'){
          removeFromDom(id);
          handleCloseEdit();
          handleOpenSnackBar("Task re-chunked!", "success");
        }
        load === 1 ? (setLoad(0)) : setLoad(1);
      })
      .catch();
  };

  const onPatchEditTaskHandler = (e, id, snack, severity) => {
    if (task.name === '' || task.category === ''){
      handleOpenSnackBar("Task must have a name and category!", "error");
      return
    }
    else {
      axios.patch('http://localhost:8000/api/tasks' + id, task, {withCredentials: true})
      .then(res => {
        if (res.data.message === 'success') {
          handleOpenSnackBar(snack, severity);
          handleCloseEdit();
          setTask({
            name: '',
            category: '',
            chunked: '',
            scheduled: '',
            scheduledAt: '',
            completed: '',
            completedAt: '',
            owner: '',
            priority: 0,
          });
        }
      }).catch(err => {
        handleOpenSnackBar("Nothing changed. Please try again or cancel", "warning");
      })
    }
  }

  const onPatchDateHandler = (e, id, snack, severity) => {
    task.scheduledAt = selectedDate;
    task.scheduled = true;
    axios
      .patch(`http://localhost:8000/api/tasks/${id}`, task, {
        withCredentials: true,
      })
      .then(res => {
        if(res.data.message === 'success') {
          removeFromDom(id);
          handleCloseCal();
          handleOpenSnackBar(snack, severity);
        }
      })
      .catch();
  };

  const onCompleteHandler = (e,id,snack,severity) => {
    axios.get(`http://localhost:8000/api/tasks/${id}`, {withCredentials: true})
    .then(res => {
      let completedTask = {};
      completedTask = res.data.results;
      completedTask.completed = true;
      completedTask.completedAt = new Date();
      return axios.patch(`http://localhost:8000/api/tasks/${id}`, completedTask, {withCredentials: true})
      .then(res => {
        if (res.data.message === 'success'){
          removeFromDom(id);
          handleOpenSnackBar(snack, severity);
        }
      }).catch();
    }).catch();
  };

  return (
    <div ref={doRef}>
      <CssBaseline />
      <div style={{marginTop:'90px'}}>
        <Typography 
          className={classes.title}
          variant='h5'>
          Do
        </Typography>
        <Typography
          className={classes.subtitle} 
          variant='subtitle2'
        >
          Select a date:
        </Typography>
      </div>
      <Grid container direction='row' justify='center' alignItems='center'>
        <Grid item xs={12} className={classes.root}>
          <MuiPickersUtilsProvider 
            utils={DateFnsUtils}
            style={{width:160}} 
          >
            <CssBaseline />
            <Grid container justify='space-around'>
              <KeyboardDatePicker
                className={classes.primaryIconStyle}
                margin='normal'
                id='Select a date...'
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
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable 
            droppableId='droppable'
            >
              {provided => (
                <List
                ref={provided.innerRef}
                {...provided.droppableProps}
                dense
                secondary="true"
                className={classes.list}
                >
                {SortedTasks.map((task, i) =>
                  task.chunked && task.scheduled ? (
                  <Draggable
                    draggableId={task._id}
                    index={i}
                    key={task._id}
                  >
                  {provided => (
                    <ListItem
                      className={classes.listItem}
                      ref={provided.innerRef}
                      id='DoTask'
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      key={task._id}
                      index={i}
                    >
                      <ListItemIcon style={{marginRight: -24, marginTop: -30}}
                      onClick={e => onCompleteHandler(e,task._id,"Task Completed!", "success")}
                      >
                        <div className='container'>
                          <div className={classes.round}>
                            <input type='checkbox' />
                            <label htmlFor='checkbox'></label>
                          </div>
                        </div>
                      </ListItemIcon>
                      {allCategories.map((category, catIdx) => 
                        task.category === category.name ? (
                        <ListItemText
                          key={catIdx}
                          disableTypography
                          className={classes.text}
                          primary={<Typography style={{fontSize:15}}>{task.name}</Typography>}
                          secondary={
                          <Typography 
                            style={{fontSize:12, color:category.color}}
                          >
                            <button
                              onClick={e => {handleOpenCal(e, task._id)}}
                              className={classes.link}
                            >
                              <EventIcon style={{fontSize: 15, marginTop: 3, marginRight: 3, marginLeft: -1}}/>
                              <Moment format='MMM Do' style={{fontSize: 12, textTransform: 'capitalize', marginBottom: 10}}>
                                {task.scheduledAt}
                              </Moment>
                            </button>
                            <br></br>
                              {task.category}
                          </Typography>
                          }
                        />
                        ) : null
                      )}
                      <div>
                        <IconButton
                        edge="end"
                        aria-label="edit-task"
                        type='button'
                        onClick={e => handleOpenEdit(e, task._id)} 
                        >
                          <EditIcon 
                          className={classes.neutralIconStyle}
                          />
                        </IconButton>
                      </div>
                    </ListItem>
                  )}
                </Draggable>
                ) : (null)
              )}
              {provided.placeholder}
              </List>
              )}
            </Droppable>
          </DragDropContext>
        </Grid>
      </Grid>
      {/* Edit Task Dialog */}
      <Dialog
        ref={editModalRef}
        aria-labelledby='modal-edit-select'
        aria-describedby='choose-edit-category'
        fullWidth
        className={classes.modal}
        open={openEdit}
        onClose={handleCloseEdit}
      >
        <div style={{float: 'left'}}>
          <Tooltip title="Un-schedule" placement="top">
              <Button
                role='button'
                onClick={e => {onPatchUnScheduleHandler(e, task._id, "Removed from Calendar!", "success")}}
                >
                <Undo
                className={classes.undo}/>
              </Button>
          </Tooltip>
        </div>
        <DialogTitle className={classes.dialogTitle}>
          {"Edit Task"}
        </DialogTitle>
        <DialogContent
          className={classes.dialogStyle}
        >
          <DialogContentText>
            {task.name}
          </DialogContentText>
          <FormControl
          variant='standard'
          className={classes.formControl}
          >
            <TextField
              inputRef={myRef}
              autoFocus
              id='dump'
              label='Edit task here...'
              onChange={e => {
                onChangeHandler(e);
              }}
              onBlur={e => {
                onPatchEditNameHandler(e, task._id);
              }}
              placeholder={task.name}
              name='name'
              value={task.name}
            />
          </FormControl>
          <FormControl
            variant='standard'
            className={classes.formControl}
          >
            <InputLabel
              htmlFor='category'
            >
                Chunk...
            </InputLabel>
            <Select
              value={task.category}
              onChange={e => {
                onPatchEditChunkHandler(e, task._id);
              }}
              label='Chunk...'
              name='category'
            >
              <MenuItem aria-label='None' value=''><em>None</em></MenuItem>
              {allCategories.map((category, catIdx) => 
                <MenuItem key={catIdx} value={category.name}
                style={{color:category.color}}
              >
                  <LabelIcon 
                    style={{fontSize:18,marginRight:12}}
                  />
                  {category.name}
                </MenuItem>
              )}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleCloseEdit}
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            aria-label='confirm-update-task'
            onClick={e => {onPatchEditTaskHandler(e, task._id, "Task Updated!", "success")}}
            color="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog 
        open={openCal} 
        onClose={handleCloseCal}
        fullWidth
      >
        <DialogTitle className={classes.dialogTitle}>{"Select a date..."}</DialogTitle>
        <DialogContent
          className={classes.dialogStyle}
        >
          <Typography variant='body1'>
              {task.name}
          </Typography>
        </DialogContent>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <CssBaseline />
          <KeyboardDatePicker
            color="primary"
            key={task.scheduledAt}
            margin='normal'
            InputAdornmentProps={{
              position: 'start',
            }}
            id='date-picker-dialog'
            format='MM/dd/yyyy'
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
        </MuiPickersUtilsProvider>
        <DialogActions>
        <Button
            onClick={handleCloseCal}
            color="secondary"
            >
            Cancel
          </Button>
          <Button
            aria-label='add to calendar'
            onClick={e => {
              onPatchDateHandler(e, task._id, "Date Changed!", "success");
            }}
            color="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <SimpleSnackbar 
        snack={snack}
        severity={severity}
        setSeverity={setSeverity}
        openSnack={openSnack}
        handleOpenSnackBar={handleOpenSnackBar}
        handleCloseSnackBar={handleCloseSnackBar} 
      />
    </div>
  );
};

export default Do;
