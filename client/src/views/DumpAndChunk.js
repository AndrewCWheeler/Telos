import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
import DumpComponent from '../components/DumpComponent';
import AllDumpedList from '../components/AllDumpedList';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import SimpleSnackbar from '../components/SimpleSnackBar';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 840,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
    // color: theme.palette.primary.main,
  },
  subtitle: {
    color: theme.palette.primary.main,
  },

}));

const DumpAndChunk = (props) => {
  const classes = useStyles();

  const [load, setLoad] = useState(0);
  const [allTasks, setAllTasks] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState([]);
  const [sessionUserId, setSessionUserId] = useState('');
  const [open, setOpen] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [snack, setSnack] = useState('');
  const [task, setTask] = useState({
    name: '',
    category: '',
    chunked: false,
    owner: '',
    scheduled: false,
    scheduledAt: '',
    completed: false,
  });

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

  const handleOpen = (e, id) => {
    onClickHandler(e, id);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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

  const removeFromDom = taskId => {
    setAllTasks(allTasks.filter(task => task._id !== taskId));
  };

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

  const onChangeHandler = e => {
    setTask({
      ...task,
      owner: sessionUserId,
      [e.target.name]: e.target.value,
    });
  };

  const onPatchHandler = (e, id, snack) => {
    task.category = e.target.value;
    task.chunked = true;
    axios
      .patch('http://localhost:8000/api/tasks/' + id, task, {
        withCredentials: true,
      })
      .then(res => {
        if (res.data.message = 'success'){
          handleOpenSnackBar(snack);
          removeFromDom(id);
          handleClose();
        }
      })
      .catch(err => console.log(err));
  };

  const onPatchEditNameHandler = (e, id) => {
    axios
      .patch('http://localhost:8000/api/tasks/' + id, task, {
        withCredentials: true,
      })
      .then(res => {
        console.log(res.data.results);
        let count = load;
        if (count >= 0) {
          count++;
          setLoad(count);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <CssBaseline />
      <div style={{marginTop:'90px'}}>
        {/* <Typography
          variant='h2'
          className={classes.title}
        >
          {'\u03C4\u03AD\u03BB\u03BF\u03C2'}
        </Typography> */}
        <Typography
          className={classes.title}
          variant='h5'
          // className={classes.subtitle}
        >
          Dump & Chunk
        </Typography>
      </div>
      <DumpComponent
        load={load}
        setLoad={setLoad}
        sessionUserId={sessionUserId}
      />
      <AllDumpedList
        open={open}
        setOpen={setOpen}
        handleOpen={handleOpen}
        handleClose={handleClose}
        onClickHandler={onClickHandler}
        task={task}
        setTask={setTask}
        allTasks={allTasks}
        setAllTasks={setAllTasks}
        allCategories={allCategories}
        removeFromDom={removeFromDom}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        onPatchHandler={onPatchHandler}
        onChangeHandler={onChangeHandler}
        onPatchEditNameHandler={onPatchEditNameHandler}
      />
      <SimpleSnackbar 
      snack={snack}
      openSnack={openSnack}
      handleOpenSnackBar={handleOpenSnackBar}
      handleCloseSnackBar={handleCloseSnackBar} />
    </div>
  );
};

export default DumpAndChunk;
