import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
// Material-ui core components:
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
// Material-ui icons:
import EditIcon from '@material-ui/icons/Edit';
import EventIcon from '@material-ui/icons/Event';
import LabelIcon from '@material-ui/icons/Label';
import Undo from '@material-ui/icons/Undo';
// react-beautiful-dnd
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// Date time material components:
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
// Moment imports:
import 'moment-timezone';
// My components and modified material components:
import SimpleSnackbar from '../components/SimpleSnackBar';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 840,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialogStyle: {
    backgroundColor: theme.palette.background.paper,
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
  list: {
    marginBottom: 90,
  },
  listItem: {
    maxHeight: '100%',
    height: 75,
    width: '100%',
    backgroundColor: theme.palette.background.default,
    borderBottom: `.5px solid ${theme.palette.background.paper}`,
  },
  radioStyle: {
    justifyContent: 'center',
    fontSize:18,
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
  textPrimary: {
    color: theme.palette.text.primary,
  },
  neutralIconStyle: {
    fontSize:24,
    color: theme.palette.text.secondary,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 250,
    marginBottom: 60,
  },
  undo: {
    color: theme.palette.secondary.main,
  }
}));

const Schedule = props => {
  const myRef = useRef();
  const classes = useStyles();
  const { navValue, setNavValue, logoutUser} = props;

  // STATES
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
  const [allTasks, setAllTasks] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [sessionUserId, setSessionUserId] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [openCal, setOpenCal] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [snack, setSnack] = useState('');
  const [severity, setSeverity] = useState('');
  const [openEdit, setOpenEdit] = useState(false);
  const [load, setLoad] = useState(0);

  useEffect(() => {
    let isMounted = true;
    if (navValue !== 'schedule'){
      setNavValue('schedule');
    }
    let one = 'http://localhost:8000/api/users/one';
    const requestOne = axios.get(one, { withCredentials: true });
    requestOne
      .then(response => {
        if (response.data.message === 'success' && isMounted) {
          setSessionUserId(response.data.results._id);
        }
      })
      .catch(()=>{
        logoutUser();
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
      .catch();
    let three = 'http://localhost:8000/api/categories/user';
    const requestThree = axios.get(three, {withCredentials: true });
    requestThree
      .then(response => {
        if (isMounted) setAllCategories(response.data.results);
      })
      .catch();
    axios
      .all([requestOne, requestTwo, requestThree])
      .then(
        axios.spread((...responses) => {
          const responseOne = responses[0];
          const responseTwo = responses[1];
          const responseThree = responses[2];
        })
      )
      .catch();
      return () => { isMounted = false }
  }, [load]);

  // DIALOG AND SNACK HANDLERS
  const handleOpenSnackBar = (snack, severity) => {
    setSnack(snack); 
    setSeverity(severity);
    setOpenSnack(true);
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

  // FILTER, SORT, TASK REORDER FUNCTIONS

  // This filter returns a number (arr.length) of tasks that have been chunked but not scheduled within each category:
  const unscheduledTasks = (arr, category) => {
    let filtered = '';
    filtered = arr.filter(t => !t.scheduled && t.category === category && t.chunked);
    if (filtered.length > 0){
      return filtered.length;
    } else return null;
  }

  const FilteredTasks = allTasks.filter(tasks => {
    let found = '';
    if (tasks.chunked && !tasks.scheduled){
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
    assignPriority(items);
    setAllTasks(items);

  };
  // Assign priority to tasks according to DOM state index and update priority property in db:
  const assignPriority = (arr) => {
    
    for (let i=0; i<arr.length; i++){
      arr[i].priority = i;
    }
    axios.put('http://localhost:8000/api/bulk/' + sessionUserId, arr, {withCredentials: true})
    .then()
    .catch(err => {
    });
    return arr;
  }

  const SortedTasks = FilteredTasks.sort((a, b) => a.priority - b.priority);

  // onCHANGE HANDLERS
  const onChangeHandler = e => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeDate = (date, id) => {
    setSelectedDate(date);
    task.scheduledAt = date;
  };

  const removeFromDom = taskId => {
    setAllTasks(allTasks.filter(task => task._id !== taskId));
  };

  const onSelectHandler = e => {
    setSelectedCategory(e.target.value);
  };

  // GET and PATCH axios calls:
  const onClickHandler = (e, id) => {
    axios
      .get(`http://localhost:8000/api/tasks/${id}`, { withCredentials: true })
      .then(res => {
        if (res.data.message === 'success') {
          setTask(res.data.results);
        }
      })
      .catch(()=>{
      });
  };

  const onPatchEditNameHandler = (e, id) => {
    if (e.target.value === ''){
      handleOpenSnackBar("Task cannot be blank!", "error");
      return
    }
    axios
      .patch('http://localhost:8000/api/tasks/' + id, task, {
        withCredentials: true,
      })
      .then(res => {
        if (res.data.message === 'success'){
          // handleOpenSnackBar("Task name updated!", "success");
          load === 1 ? (setLoad(0)) : setLoad(1);
        }
      })
      .catch(()=>{
        handleOpenSnackBar("Something went wrong updating your task.", "error");
      });
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

  const onPatchUnChunkHandler = (e, id, snack, severity) => {
    task.category = '';
    task.chunked = false;
    axios.patch(`http://localhost:8000/api/tasks/${id}`, task, {withCredentials: true})
      .then(res => {
        if (res.data.message === 'success') {
          removeFromDom(id);
          handleCloseEdit();
          handleOpenSnackBar(snack, severity);
          load === 1 ? (setLoad(0)) : setLoad(1);
        }
      })
      .catch();
  };

  const onPatchEditTaskHandler = (e, id, snack, severity) => {
    if (task.name === ''){
      handleOpenSnackBar("Task must have a name!", "error");
      return
    }
    else {
      axios.patch('http://localhost:8000/api/tasks/' + id, task, {withCredentials: true})
      .then(res => {
        if (res.data.message === 'success') {
          handleCloseEdit();
          handleOpenSnackBar(snack, severity);
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
          load === 1 ? (setLoad(0)) : setLoad(1);
        }
      }).catch(() => {
          handleOpenSnackBar("Nothing changed. Please try again or cancel", "warning");
        })
      }
    }

  const onPatchDateHandler = (e, id) => {
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
          handleOpenSnackBar("Task scheduled!", "success");
          load === 1 ? (setLoad(0)) : setLoad(1);
        };
      })
      .catch();
  };

  return (
    <>
      <CssBaseline />
      <div style={{marginTop:'90px'}}>
      <Typography
      className={classes.title} 
      variant='h5'>
        Schedule
      </Typography>
      <Typography
      className={classes.subtitle}
      variant='subtitle2'
      >
        Select a category:
      </Typography>
      </div>
      <Grid container direction='row' justify='center' alignItems='center' wrap="nowrap">
        <Grid item xs={12} className={classes.root}>
          <FormControl component="fieldset" className={classes.formControl}>
            <RadioGroup 
              row aria-label="category" 
              name="category" 
              value={selectedCategory} 
              onChange={e => {
                  onSelectHandler(e);
                }}
              className={classes.radioStyle}
              defaultValue=''>
                {allCategories.map((category, catIdx)=>
                <FormControlLabel
                  key={catIdx}
                  className={classes.textPrimary}
                  value={category.name}
                  label={
                  <Typography style={{fontSize:15}}>
                    {category.name}<br></br>
                    {unscheduledTasks(allTasks, category.name)}
                  </Typography>
                }
                labelPlacement="bottom"
                control={<Radio style={{color:category.color, fontSize:15}}/>}
              />
              )}
            </RadioGroup>
          </FormControl>
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
                      task.category === selectedCategory ? (
                        <Draggable
                        draggableId={task._id}
                        index={i}
                        key={task._id}
                        >
                          {provided => (
                            <ListItem
                              className={classes.listItem}
                              ref={provided.innerRef}
                              id='ScheduleTask'
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              key={task._id}
                              index={i}
                            >
                              <ListItemIcon style={{marginRight: -24, marginTop: -30, cursor: 'pointer'}}
                                onClick={e => {handleOpenCal(e, task._id)}}
                                >
                                <EventIcon className={classes.neutralIconStyle} />
                              </ListItemIcon>
                            {allCategories.map((category, catIdx) => 
                              task.category === category.name ?
                              (
                              <>
                                <ListItemText
                                key={catIdx}
                                className={classes.text}
                                disableTypography
                                textoverflow='ellipsis'
                                overflow='hidden'
                                primary={<Typography style={{fontSize:15}}>{task.name}</Typography>}
                                secondary={<Typography style={{fontSize:12, color:category.color}}>{task.category}</Typography>}
                                />
                                <IconButton
                                  type='button'
                                  edge='end'
                                  onClick={e => {
                                    handleOpenEdit(e, task._id);
                                  }}
                                  >
                                  <EditIcon 
                                  className={classes.neutralIconStyle}
                                  />
                                </IconButton>
                              </>
                              ) : null
                            )}
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
        aria-labelledby='modal-edit-select'
        aria-describedby='choose-edit-category'
        className={classes.modal}
        open={openEdit}
        onClose={handleCloseEdit}
        fullWidth
      >
        <div style={{float: 'left'}}>
          <Tooltip title="Un-chunk" placement="top">
            <Button
            style={{float: 'left'}}
            role='button'
            onClick={e => {onPatchUnChunkHandler(e, task._id, "Task un-chunked!", "success")}}
            >
              <Undo className={classes.undo} />
            </Button>
          </Tooltip>
        </div>
        <DialogTitle className={classes.dialogTitle}>
          {"Edit Task"}
        </DialogTitle>
        <DialogContent
          className={classes.dialogStyle}
        >
          <DialogContentText className={classes.title}>
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
            aria-label='update task'
            onClick={e => {onPatchEditTaskHandler(e, task._id, "Task Updated!", "success")}}
            color="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      {/* Date Assign Dialog */}
      <Dialog
        open={openCal}
        onClose={handleCloseCal}
        fullWidth
      >
          <DialogTitle className={classes.dialogTitle}>
            {"Schedule Task"}
          </DialogTitle>
          <DialogContent
            className={classes.dialogStyle}
          >
          <DialogContentText>
            <Typography variant='body1'>
                {task.name}
            </Typography>
          </DialogContentText>
          <MuiPickersUtilsProvider color="primary" utils={DateFnsUtils}>
            <CssBaseline />
            <KeyboardDatePicker
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
        </DialogContent>
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
              onPatchDateHandler(e, task._id);
            }}
            color="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <SimpleSnackbar
        severity={severity}
        setSeverity={setSeverity}
        snack={snack}
        openSnack={openSnack}
        handleOpenSnackBar={handleOpenSnackBar}
        handleCloseSnackBar={handleCloseSnackBar}
      />
    </>
  );
};

export default Schedule;
