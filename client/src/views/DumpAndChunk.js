import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
// My components and modified material-ui components:
import AllDumpedList from '../components/AllDumpedList';
import DumpComponent from '../components/DumpComponent';
import SimpleSnackbar from '../components/SimpleSnackBar';
// Material-ui core components:
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 840,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  subtitle: {
    color: theme.palette.primary.main,
  },
}));

const DumpAndChunk = () => {
  const classes = useStyles();

  const [load, setLoad] = useState(0);
  const [allTasks, setAllTasks] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [selectedObject, setSelectedObject] = useState({});
  const [sessionUserId, setSessionUserId] = useState('');
  const [open, setOpen] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [snack, setSnack] = useState('');
  const [task, setTask] = useState({
    name: '',
    category: '',
    chunked: false,
    scheduled: false,
    scheduledAt: '',
    completed: false,
    completedAt: '',
    priority: 0,
    owner: '',
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
        if (isMounted) setAllTasks(response.data.results);
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

  const removeFromDom = taskId => {
    setAllTasks(allTasks.filter(task => task._id !== taskId));
  };

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

  const onChangeHandler = e => {
    setTask({
      ...task,
      owner: sessionUserId,
      priority: 3,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeChunkHandler = (e) => {
    setSelectedObject(e.target.value);
  };

  const onPatchHandler = (e, taskId, cat, snack) => {
    // Assign arguments to applicable targets:
    let catId = '';
    catId = cat._id;
    task.labelIdentity = cat._id;
    task.category = cat.name;
    task.chunked = true;
    // Split up axios calls to update both task component and category component:
    let one = `http://localhost:8000/api/tasks/${taskId}`
    const requestOne = axios.patch(one, task, { withCredentials: true });
    requestOne
      .then(res => {
        if(res.data.message === 'success'){
          handleOpenSnackBar(snack);
          removeFromDom(taskId);
          handleClose();
        }
      })
      .catch();
    let two = `http://localhost:8000/api/categories/${catId}`;
    const requestTwo = axios.patch(two, task, { withCredentials: true});
    requestTwo
      .then(res => {
      }).catch();
    axios
      .all([requestOne, requestTwo])
      .then(
        axios.spread((...responses) => {
          const responseOne = responses[0];
          const responseTwo = responses[1];
        })
      ).catch();
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

  return (
    <div>
      <CssBaseline />
      <div style={{marginTop:'90px'}}>
        <Typography
          className={classes.title}
          variant='h5'
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
        selectedObject={selectedObject}
        setSelectedObject={setSelectedObject}
        onPatchHandler={onPatchHandler}
        onChangeHandler={onChangeHandler}
        onChangeChunkHandler={onChangeChunkHandler}
        onPatchEditNameHandler={onPatchEditNameHandler}
      />
      <SimpleSnackbar 
        snack={snack}
        openSnack={openSnack}
        handleOpenSnackBar={handleOpenSnackBar}
        handleCloseSnackBar={handleCloseSnackBar} 
      />
    </div>
  );
};

export default DumpAndChunk;
