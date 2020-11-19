import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
// Material-ui core components:
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
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
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
// Material-ui icons:
import RadioButtonUncheckedRoundedIcon from '@material-ui/icons/RadioButtonUncheckedRounded';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
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
    maxWidth: 640,
    margin: `${theme.spacing(1)}px auto`,
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

const Do = () => {
  const classes = useStyles();
  const [load, setLoad] = useState(0);
  const [task, setTask] = useState({
    name: '',
    category: '',
    chunked: '',
    scheduled: '',
    scheduledAt: '',
    completed: '',
    completedAt: '',
    priority: 0,
    owner: '',
  });
  const [allTasks, setAllTasks] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dateParameter, setDateParameter] = useState(new Date());
  const [sessionUserId, setSessionUserId] = useState('');
  const [openCal, setOpenCal] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [snack, setSnack] = useState('');

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
        }).catch();
      axios
        .all([requestOne, requestTwo, requestThree])
        .then(
          axios.spread((...responses) => {
            const responseOne = responses[0];
            const responseTwo = responses[1];
            const responseThree = responses[2];
          })
        )
        .catch(()=>navigate('/landing'));
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
  
  // Dialog and Snack Handlers:

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
    setLoad(1);
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
        let count = load;
        if (count >= 0) {
          count++;
          setLoad(count);
        }
      })
      .catch();
  };

  const onPatchUnScheduleHandler = (e, id, snack) => {
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
          handleOpenSnackBar(snack);
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
          handleCloseEdit();
        }
      })
      .catch();
  };

  const onPatchDateHandler = (e, id, snack) => {
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
          handleOpenSnackBar(snack);
        };
      })
      .catch();
  };

  const onCompleteHandler = (e,id,snack) => {
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
          handleOpenSnackBar(snack);
        }
      }).catch();
    }).catch();
  };

  return (
    <Container className={classes.root}>
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
                  button
                  ref={provided.innerRef}
                  id='DoTask'
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  key={task._id}
                  index={i}
                >
                  <ListItemIcon
                  onClick={e => onCompleteHandler(e,task._id,"Task Completed!")}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          icon={<RadioButtonUncheckedRoundedIcon 
                            fontSize="small" 
                          />}
                          checkedIcon={<CheckCircleRoundedIcon 
                            fontSize="small"
                          />}
                          name="completed"
                        />
                      }
                      label=""
                    />
                  </ListItemIcon>
                  {allCategories.map((category, catIdx) => 
                    task.category === category.name ? (
                    <ListItemText
                      key={catIdx}
                      disableTypography
                      className={classes.text}
                      overflow='hidden'
                      primary={<Typography style={{fontSize:15}}>{task.name}</Typography>}
                      secondary={<Typography style={{fontSize:12, color:category.color}}>{task.category}</Typography>}
                    />
                    ) : null
                  )}
                  <ListItemText
                    primary={
                    <Tooltip title="Change Date" placement="right">
                      <Button
                        onClick={e => {handleOpenCal(e, task._id)}}
                        className={classes.itemWhite}
                        >
                        <div>
                          <Moment format='dddd' style={{fontSize: '15px', textTransform: 'capitalize', float: 'left'}}>
                            {task.scheduledAt}
                          </Moment>
                        </div>
                      </Button>
                    </Tooltip>
                    }
                  />
                  <div>
                    <Tooltip title="Edit Task" placement="right">
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
          <Tooltip title="Un-schedule" placement="top">
            <IconButton 
            className={classes.undo}
            role='button'
            onClick={e => {onPatchUnScheduleHandler(e, task._id, "Removed from Calendar!")}}
            >
              <Undo />
            </IconButton>
          </Tooltip>
          <Typography variant='h5' className={classes.title}>
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
            name='name'
            value={task.name}
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
              className={classes.textMain}
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
              onPatchDateHandler(e, task._id, "Date Changed!");
            }}
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
    </Container>
  );
};

export default Do;
