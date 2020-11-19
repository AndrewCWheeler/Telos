import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
// Material-ui core components:
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
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
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
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
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  subtitle: {
    margin: theme.spacing(-1, 0, 0),
    color: theme.palette.primary.main,
  },
  select: {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.main,
  },
  list: {
    marginBottom: '90px',
  },
  listItem: {
    maxHeight: '100%',
    width: '100%',
    backgroundColor: theme.palette.background.default,
    borderBottom: '1px solid #e1dfdc',
    paddingLeft: 0,
  },
  primaryIconStyle: {
    fontSize:24,
    color: theme.palette.primary.main,
  },
  radioStyle: {
    justifyContent: 'center',
    fontSize:18,
  },
  textPrimary: {
    color: theme.palette.text.primary,
  },
  secondaryIconStyle: {
    fontSize:24,
    color: theme.palette.secondary.main,
  },
  neutralIconStyle: {
    fontSize:24,
    color: theme.palette.text.secondary,
  },
  inline: {
    display: 'inline',
    overflow: 'hidden',
    overflowWrap: 'ellipsis',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 250,
    marginBottom: 60,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  undo: {
    color: theme.palette.secondary.main,
  }
}));

const Schedule = () => {
  const classes = useStyles();
  const domRef = useRef();
  // STATES
  const [load, setLoad] = useState(0);
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
  const [selectedIndex, setSelectedIndex] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [sessionUserId, setSessionUserId] = useState('');
  const [openCal, setOpenCal] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [snack, setSnack] = useState('');
  const [openEdit, setOpenEdit] = useState(false);

  useEffect(() => {
    let isMounted = true;
    let one = 'http://localhost:8000/api/users/one';
    const requestOne = axios.get(one, { withCredentials: true });
    requestOne
      .then(response => {
        if (isMounted) setSessionUserId(response.data.results._id);
      })
      .catch();
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
      .catch(errors => {
        navigate('/landing');
      });
      return () => { isMounted = false }
  }, [load]);

  // DIALOG AND SNACK HANDLERS
  const handleOpenSnackBar = (snack) => {
    setOpenSnack(true);
    setSnack(snack); 
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

  // This filter returns a number (arr.length) of tasks that have not yet been scheduled within each category:
  const unscheduledTasks = (arr, category) => {
    let filtered = '';
    filtered = arr.filter(t => t.scheduled !== true && t.category === category);
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
    setAllTasks(items);
  };
  // Assign priority to tasks according to DOM state index and update priority property in db:
  const assignPriority = (arr) => {
    if(load === 0){
      return arr;
    }
    else {
    for (let i=0; i<arr.length; i++){
      arr[i].priority = i;
    }
    axios.put('http://localhost:8000/api/bulk/' + sessionUserId, arr, {withCredentials: true})
    .then(response => {
    })
    .catch();
    return arr;
  }
  }
  const SortedTasks = assignPriority(FilteredTasks).sort((a, b) => a.priority - b.priority);

  // onCHANGE HANDLERS
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

  const removeFromDom = taskId => {
    setAllTasks(allTasks.filter(task => task._id !== taskId));
  };

  const onSelectHandler = e => {
    setSelectedCategory(e.target.value);
    setLoad(1);
  };

  // GET and PATCH axios calls:
  const onClickHandler = (e, id) => {
    axios
      .get(`http://localhost:8000/api/tasks/${id}`, { withCredentials: true })
      .then(res => {
        if (res.data.message === 'success') {
          setTask(res.data.results);
          setSelectedIndex(res.data.results);
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
        let count = load;
        if (count >= 0) {
          count++;
          setLoad(count);
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
        }
      })
      .catch();
  };

  const onPatchUnChunkHandler = (e, id) => {
    task.category = '';
    task.chunked = false;
    axios
      .patch('http://localhost:8000/api/tasks/' + id, task, {
        withCredentials: true,
      })
      .then(res => {
        if (res.data.message === 'success') {
          removeFromDom(id);
          handleCloseEdit();
        }
      })
      .catch();
  };

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
          handleOpenSnackBar("Task scheduled!");
        };
      })
      .catch();
  };

  return (
    <div>
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
      <Grid container direction='row' justify='center' alignItems='center'>
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
                              button
                              ref={provided.innerRef}
                              id='ScheduleTask'
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              key={task._id}
                              index={i}
                            >
                              <Tooltip 
                                ref={domRef}
                                title="Open Calendar" 
                                placement="left">
                                  <IconButton
                                    // edge='start'
                                    type='button'
                                    onClick={e => {handleOpenCal(e, task._id)}}
                                  >
                                    <EventIcon className={classes.neutralIconStyle} />
                                  </IconButton>
                              </Tooltip>
                              {allCategories.map((category, catIdx) => 
                                task.category === category.name ?
                                (
                              <ListItemText
                              key={catIdx}
                              disableTypography
                              textoverflow='ellipsis'
                              overflow='hidden'
                              primary={<Typography style={{fontSize:15}}>{task.name}</Typography>}
                              secondary={<Typography style={{fontSize:12, color:category.color}}>{task.category}</Typography>}
                              />
                              ) : null
                              )}
                              <div>
                              <Tooltip title="Edit Task" placement="right">
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
                              </Tooltip>
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
        {/* Edit Task Dialog */}
        </Grid>
      </Grid>
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

            onBlur={e => {
              onPatchEditNameHandler(e, task._id);
            }}
            placeholder={task.name}
            name='name'
            value={task.name}
          />
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
          autoFocus 
          onClick={handleCloseEdit}
          color="primary"
        >
          Cancel
        </Button>
          <IconButton
            aria-label='update task'
            onClick={handleCloseEdit}
            color="primary"
          >
            <LibraryAddIcon />
          </IconButton>
        </DialogActions>
      </Dialog>

      {/* Date Assign Dialog */}
      <Dialog open={openCal} onClose={handleCloseCal}>
        <DialogContent
          className={classes.dialogStyle}
        >
          <Typography variant='h5' className={classes.title}>
              {task.name}
          </Typography>
          <DialogContentText 
          color="secondary">
            Please select a date...
          </DialogContentText>
        </DialogContent>
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
        <DialogActions>
          <Button
            autoFocus
            onClick={handleCloseCal}
            color="primary"
            >
            Cancel
          </Button>
          <IconButton
            aria-label='add to calendar'
            onClick={e => {
              onPatchDateHandler(e, task._id);
            }}
            color="primary"
          >
            <LibraryAddIcon />
          </IconButton>
        </DialogActions>
      </Dialog>
      <SimpleSnackbar 
        snack={snack}
        openSnack={openSnack}
        handleOpenSnackBar={handleOpenSnackBar}
        handleCloseSnackBar={handleCloseSnackBar} 
      />
    </div>
  );
};

export default Schedule;
