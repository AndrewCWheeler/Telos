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
import LabelIcon from '@material-ui/icons/Label';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import { shadows } from '@material-ui/system';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import EventIcon from '@material-ui/icons/Event';
import EditIcon from '@material-ui/icons/Edit';
import UpdateIcon from '@material-ui/icons/Update';
import Button from '@material-ui/core/Button';
import Meditate from '../images/Meditate.svg';

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
import SimpleSnackbar from './SimpleSnackBar';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 840,
    // flexGrow: 1,
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
    color: theme.palette.primary.main,
  },
  // textMain: {
  //   margin: theme.spacing(2),
  // },
  // text: {
  //   color: theme.palette.primary.contrastText,
  // },
  subtitle: {
    margin: theme.spacing(1, 0, 0),
    color: theme.palette.text.secondary,
  },
  select: {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.main,
  },
  list: {
    marginBottom: '90px',
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
  radioStyle: {
    justifyContent: 'center',
    fontSize:15,
    // margin: theme.spacing(1),
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
  const [allCategories, setAllCategories] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [dense, setDense] = useState(true);
  const [secondary, setSecondary] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [sessionUserId, setSessionUserId] = useState('');
  const [openCal, setOpenCal] = useState(false);
  const [openEditTask, setOpenEditTask] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [snack, setSnack] = useState('');
  const [show, setShow] = useState(true);
  

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
    // let now = moment();
    onClickHandler(e, id);
    setOpenCal(true);
    // setSelectedDate(now);
  };

  const handleCloseCal = () => {
    setOpenCal(false);
  };
  // const handleEditTask = () => {
  //   setOpenEditTask(true);
  // };
  // const handleCloseEditTask = () => {
  //   setOpenEditTask(false);
  // };
  const [openEdit, setOpenEdit] = useState(false);

  const handleOpenEdit = (e, id) => {
    onClickHandler(e, id);
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
      let three = 'http://localhost:8000/api/categories/user';
      const requestThree = axios.get(three, {withCredentials: true });
      requestThree
        .then(response => {
          setAllCategories(response.data.results);
        }).catch(error => {
          console.log(error);
        })
      axios
        .all([requestOne, requestTwo, requestThree])
        .then(
          axios.spread((...responses) => {
            const responseOne = responses[0];
            const responseTwo = responses[1];
            const responseThree = responses[2];
            console.log(responseOne, responseTwo, responseThree);
          })
        )
        .catch(errors => {
          navigate('/signup');
        });
    }, [load]);

    console.log(allCategories);

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

  const reorder = (allTasks, startIndex, endIndex) => {
    const result = Array.from(allTasks);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  // const getCategoryId = (allCategories) => {
  //   let categoryId = [];
  //   let categoryLengths = [];
  //   for (let i = 0; i<allCategories.length; i++){
  //     categoryId.push(allCategories[i]._id);
  //     categoryLengths.push(allCategories[i].tasks.length);
  //   }
  //   return (categoryId, categoryLengths);
  // }
  // console.log(getCategoryId(allCategories));

  const getCategory = (id) => {
    axios.get('http://localhost:8000/api/categories/' + id, {withCredentials: true})
    .then(res => {
      if(res.data.message === 'success'){
        console.log(res.data.results);
      }
    }).catch(err => console.log(err));
  }

  const getCategoryTaskCounts = (allCategories) => {
    let categoryIds = [];
    let categoryList = [];
    for (let i = 0; i<allCategories.length; i++){
      categoryIds.push(allCategories[i]._id);
      categoryList = getCategory(allCategories[i]._id);
    }
    return (categoryIds, categoryList);
  }
  // console.log(getCategoryTaskCounts(allCategories));

  const unscheduledTasks = (arr, category) => {
    let filtered = '';
    // let count = 0;
    filtered = arr.filter(t => t.scheduled !== true && t.category === category);
    console.log(filtered);
    if (filtered.length > 0){
      return filtered.length;
    } else return null; 
  }
  console.log(unscheduledTasks(allTasks));



  // const getTaskCounts = (allCategories) => {
  //   const tasks = [];
  //   for (let i = 0; i<allCategories.length; i++){
  //     tasks.push(allCategories[i].tasks);
  //     console.log(tasks);
  //   }
  //   return tasks;
  // }
  // console.log(getTaskCounts(allCategories));

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
        let count = load;
        if (count >= 0) {
          count++;
          setLoad(count);
        }
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
        if (res.data.message === 'success'){
          removeFromDom(id);
          handleCloseEdit();
        }
        // let count = load;
        // if (count >= 0) {
        //   count++;
        //   setLoad(count);
        // }
        // console.log(load);
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
        if (res.data.message === 'success') {
          console.log(res.data.results);
          removeFromDom(id);
          handleCloseEdit();
        }
        // let count = load;
        // if (count >= 0) {
        //   count++;
        //   setLoad(count);
        // }
        // console.log(load);
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

  const onPatchDateHandler = (e, id) => {
    // setSelectedDate(date);
    task.scheduledAt = selectedDate;
    task.scheduled = true;
    axios
      .patch(`http://localhost:8000/api/tasks/${id}`, task, {
        withCredentials: true,
      })
      .then(res => {
        if(res.data.message = 'success') {
          console.log(res.data.results);
          removeFromDom(id);
          handleCloseCal();
          handleOpenSnackBar("Task scheduled!");
        };
        // let count = load;
        // if (count >= 0) {
        //   count++;
        //   setLoad(count);
        // }
        // console.log(load);
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

  const hideMeditate = (x) => {
    setShow(x);
  }
  // const toUpperCaseFilter = d => {
  //   return d.toUpperCase();
  // };

  return (
    <Container className={classes.root}>
      <CssBaseline />
      <div style={{marginTop:'90px'}}>
      {/* <Typography
        variant='h2'
        // component='h2'
        className={classes.title}
      >
        {'\u03C4\u03AD\u03BB\u03BF\u03C2'}
      </Typography> */}
      <Typography
      className={classes.title} 
      variant='h5'>
        Schedule
      </Typography>
      <Typography
      className={classes.subtitle} 
      variant='subtitle1'>
        Please select a category:
      </Typography>
      </div>
      {/* <DatePicker selected={date} onChange={onDateChange} /> */}
      
      {/* <Grid container spacing={1}>
        <Grid item xs={12}> */}
        <FormControl component="fieldset" className={classes.formControl}>
          {/* <FormLabel component="legend">Category:</FormLabel> */}
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
              value={category.name}
              label={
                <Typography style={{fontSize:15}}>
                  {category.name}<br></br>
                  {unscheduledTasks(allTasks, category.name)}
                  {/* {category.tasks.length !== 0 ? category.tasks.length : (null)} */}
                  
                </Typography>
              }
              labelPlacement="bottom"
              control={<Radio style={{color:category.color, fontSize:15}}/>}
            />
            )}
          </RadioGroup>
        </FormControl>
          {/* <FormControl variant='standard' className={classes.formControl}>
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
              {allCategories.map((category, catIdx) => 
                <MenuItem key={catIdx} value={category.name}
                style={{color:category.color}}
              >
                  {category.name}
                </MenuItem>
              )}
            </Select>
          </FormControl> */}
          {/* <Grid container direction='row' justify='center' style={{marginTop:25}}>
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
          </Grid> */}
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='droppable'>
              {provided => (
                <RootRef
                  rootRef={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <div>
                    <List dense secondary="true"
                    className={classes.list}>
                      {allTasks.map((task, i) =>
                        selectedCategory === task.category &&
                        task.chunked &&
                        !task.scheduled ? (
                          <Draggable
                            draggableId={task._id}
                            index={i}
                            key={task._id}
                          >
                            {provided => (
                              <ListItem
                                className={classes.listItem}
                                button
                                ContainerProps={{ ref: provided.innerRef }}
                                id='Task'
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                innerRef={provided.innerRef}
                                key={i}
                              >
                                <Tooltip title="Open Calendar" placement="left">
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
                                disableTypography
                                textoverflow='ellipsis'
                                overflow='hidden'
                                primary={<Typography style={{fontSize:15}}>{task.name}</Typography>}
                                secondary={<Typography key={catIdx} style={{fontSize:12, color:category.color}}>{secondary ? task.category : null}</Typography>}
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
        {/* </Grid>
      </Grid> */}

      {/* Edit Task Dialog  */}
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
            // onClick={e => {
            //   onClickHandler(e, task._id);
            // }}
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
              // className={classes.textMain}
              htmlFor='category'
            >
              Chunk...
            </InputLabel>
            <Select
              // native
              // className={classes.textMain}
              value={task.category}
              // onClick={e => {
              //   onClickHandler(e, task._id);
              // }}
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
            // className={classes.icon}
            aria-label='update task'
            onClick={handleCloseEdit}
            color="primary"
          >
            <LibraryAddIcon />
          </IconButton>
        </DialogActions>
      </Dialog>

      {/* Second Dialog */}
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
          {/* <Grid container justify='space-around'> */}
          <KeyboardDatePicker
            key={task.scheduledAt}
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
          <Button
            autoFocus
            onClick={handleCloseCal}
            color="primary"
            >
            Cancel
          </Button>
          <IconButton
            // className={classes.icon}
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
      handleCloseSnackBar={handleCloseSnackBar} />
    </Container>
  );
};

export default ScheduleComponent;
