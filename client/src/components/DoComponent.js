import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  // KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import BottomNavComponent from './BottomNavComponent';

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
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
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
  paper: {
    maxWidth: 752,
    margin: `${theme.spacing(2)}px auto`,
    // margin: theme.spacing(2, 0),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  list: {
    margin: `${theme.spacing(2)}px auto`,
  },
  item: {
    margin: theme.spacing(0, 2),
    color: theme.palette.primary.contrastText,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    // justify: 'center',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const DoComponent = () => {
  const [load, setLoad] = useState(0);
  const [task, setTask] = useState({
    name: '',
    category: '',
    chunked: '',
    scheduled: '',
    scheduledAt: '',
    complete: '',
  });
  const [allTasks, setAllTasks] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState([]);
  // const [selectedIndexId, setSelectedIndexId] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [dense, setDense] = useState(false);
  const [secondary, setSecondary] = useState(true);
  // const [selectedDate, setSelectedDate] = useState(new Date());
  const [dateParameter, setDateParameter] = useState(new Date());
  const classes = useStyles();

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/tasks', { withCredentials: true })
      .then(response => {
        setAllTasks(response.data.results);
      })
      .catch(err => console.log(err));
  }, [load]);

  const removeFromDom = taskId => {
    setAllTasks(allTasks.filter(task => task._id !== taskId));
  };

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

  const onChunkHandler = (e, i) => {
    console.log(e.target.value);
    let categoryValue = e.target.value;
    axios
      .get('http://localhost:8000/api/tasks/' + i, { withCredentials: true })
      .then(res => {
        if (res.data.message === 'success') {
          let currTask = res.data.results;
          currTask.category = categoryValue;
          setTask(currTask);
        }
      })
      .catch(err => console.log(err));
  };
  console.log(task);

  const onSelectHandler = e => {
    console.log(e.target.value);
    setSelectedCategory(e.target.value);
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

  const handleDateParameter = date => {
    console.log(date);
    setDateParameter(date);
  };

  return (
    <Container>
      <CssBaseline />
      <h1 className={classes.title}>Do Component</h1>
      <Typography variant='h6' className={classes.title}>
        Select Date to Sort and then DO it!
      </Typography>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <CssBaseline />
        <Grid container justify='space-around'>
          <KeyboardDatePicker
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
              {allTasks.map((task, i) =>
                task.chunked && task.scheduled === true ? (
                  <Paper key={i} elevation={5} className={classes.paper}>
                    <ListItem
                      className={classes.list}
                      // button
                      // selected={selectedIndex === 0}
                      // onClick={event => handleListItemClick(event, 0)}
                    >
                      {/* <i className='fa fa-folder-open-o' aria-hidden='true'></i> */}
                      <IconButton
                        edge='start'
                        aria-label='add chunked'
                        onClick={e => {
                          onPatchHandler(e, task._id);
                        }}
                      >
                        <CachedIcon />
                      </IconButton>
                      <FormControl
                        variant='outlined'
                        className={classes.formControl}
                      >
                        <InputLabel className={classes.text} htmlFor='category'>
                          Chunk...
                        </InputLabel>
                        <Select
                          native
                          className={classes.text}
                          value={selectedIndex[i]}
                          onChange={e => {
                            onChunkHandler(e, task._id);
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
                      <ListItemText
                        className={classes.text}
                        primary={task.scheduledAt}
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

                      <IconButton className={classes.text}>
                        <CheckBoxOutlineBlankIcon />
                      </IconButton>

                      <IconButton edge='end' aria-label='delete'>
                        <DeleteComponent
                          taskId={task._id}
                          successCallback={() => removeFromDom(task._id)}
                        />
                      </IconButton>
                    </ListItem>
                  </Paper>
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