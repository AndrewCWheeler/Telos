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
import Typography from '@material-ui/core/Typography';
// Material-ui icons:
import EventIcon from '@material-ui/icons/Event';
import EditIcon from '@material-ui/icons/Edit';
import LabelIcon from '@material-ui/icons/Label';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
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
  radioStyle: {
    fontSize: 30,
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
  select: {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.main,
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.info.main,
    "&:active": {
      color: theme.palette.secondary.dark,
    },
    "&:hover": {
      color: theme.palette.info.main,
      textDecoration: 'none',
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
    // margin: theme.spacing(1),
    // minWidth: 150,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  undo: {
    color: theme.palette.secondary.main,
  }
}));

const Do = props => {
  const classes = useStyles();
  const { navigatePage, navValue, setNavValue, allTasks, setAllTasks, allCategories, sessionUserId, load, setLoad } = props;
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
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dateParameter, setDateParameter] = useState(new Date());
  const [openCal, setOpenCal] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [snack, setSnack] = useState('');
  const [severity, setSeverity] = useState('');
  
  useEffect(() => {
    if (navValue === 'do'){
      load === 1 ? (setLoad(0)) : setLoad(1);
      return
    }
    else if (navValue !== 'do'){
      setNavValue('do');
      load === 1 ? (setLoad(0)) : setLoad(1);
    }
    return
  }, []);

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
      .then()
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
    <div>
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
                id='Selected a date...'
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
                      // button
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
                        <div class='container'>
                          <div className={classes.round}>
                            <input type='checkbox' />
                            <label for='checkbox'></label>
                          </div>
                        </div>
                        {/* <FormControlLabel style={{paddingLeft: -12}}
                          control={
                            <Checkbox style={{marginBottom: 27}}
                              icon={
                                <RadioButtonUncheckedRoundedIcon 
                                className={classes.radioStyle}
                                />
                              }
                              checkedIcon={<CheckCircleRoundedIcon
                                className={classes.radioStyle}
                              />}
                              name="completed"
                            />
                          }
                          label=""
                        /> */}
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
                            <a
                              onMouseOver=''
                              style={{cursor: 'pointer'}}
                              role="button"
                              onClick={e => {handleOpenCal(e, task._id)}}
                              className={classes.link}
                            >
                              <Grid container direction='row' alignItems='center'>
                                <Grid item>
                                  <EventIcon style={{fontSize: 15, marginTop: 3, marginRight: 3, marginLeft: -1}}/>
                                </Grid>
                                <Grid item>
                                  <Moment format='MMM Do' style={{fontSize: 12, textTransform: 'capitalize', marginBottom: 10}}>
                                    {task.scheduledAt}
                                  </Moment>
                                </Grid>
                              </Grid>
                            </a>
                            {task.category}
                          </Typography>
                          }
                        />
                        ) : null
                      )}
                      {/* <ListItemText
                        primary={
                        <Tooltip title="Change Date" placement="right">
                          <Button
                            onClick={e => {handleOpenCal(e, task._id)}}
                            className={classes.link}
                            >
                            <div>
                              <Moment format='dddd' style={{fontSize: '15px', textTransform: 'capitalize', float: 'left'}}>
                                {task.scheduledAt}
                              </Moment>
                            </div>
                          </Button>
                        </Tooltip>
                        }
                      /> */}
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
          <Button
            className={classes.undo}
            role='button'
            onClick={e => {onPatchUnScheduleHandler(e, task._id, "Removed from Calendar!", "success")}}
          >
            <Undo />
            Un-schedule
          </Button>
          <Typography className={classes.title}>
              {task.name}
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
      <Dialog open={openCal} onClose={handleCloseCal}>
        <DialogContent
          className={classes.dialogStyle}
        >
          <Typography variant='h5' className={classes.title}>
              {task.name}
          </Typography>
          <DialogContentText
          color="secondary"
          >
            Please select a date...
          </DialogContentText>
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
            autoFocus 
            onClick={handleCloseCal}
            color="primary"
            >
            Cancel
          </Button>
          <IconButton
            aria-label='add to calendar'
            onClick={e => {
              onPatchDateHandler(e, task._id, "Date Changed!", "success");
            }}
          >
            <LibraryAddIcon />
          </IconButton>
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
