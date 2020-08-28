import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
import DumpComponent from '../components/DumpComponent';
import AllDumpedList from '../components/AllDumpedList';
import CssBaseline from '@material-ui/core/CssBaseline';
import BottomNavComponent from '../components/BottomNavComponent';
// import { createMuiTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

// import ChunkComponent from '../components/ChunkComponent';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
    color: theme.palette.primary.main,
  },
}));

const DumpAndChunk = () => {
  const classes = useStyles();
  // const theme = createMuiTheme(theme => ({
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
  // }));
  const [task, setTask] = useState({
    name: '',
    category: '',
    chunked: false,
    // userId: '',
    scheduled: false,
    scheduledAt: '',
    completed: false,
  });
  const [load, setLoad] = useState(0);
  const [allTasks, setAllTasks] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState([]);
  const [sessionUserId, setSessionUserId] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/users/tasks', {
        withCredentials: true,
      })
      .then(response => {
        console.log(response.data.results);
        setAllTasks(response.data.results);
        console.log(response.data.sessionUser._id);
        setSessionUserId(response.data.sessionUser._id);
      })
      .catch(err => {
        console.log(err);
        navigate('/signup');
      });
  }, [load]);

  const removeFromDom = taskId => {
    setAllTasks(allTasks.filter(task => task._id !== taskId));
  };

  const onChangeHandler = e => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const onChunkHandler = (e, i) => {
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

  const onSubmitHandler = e => {
    e.preventDefault();
    axios
      .post('http://localhost:8000/api/tasks', task, { withCredentials: true })
      .then(res => {
        setTask({
          name: '',
          category: '',
          chunked: false,
          scheduled: false,
          scheduledAt: '',
          completed: false,
          owner: sessionUserId,
        });
        let count = load;
        if (count >= 0) {
          count++;
          setLoad(count);
        }
        console.log(load);
        navigate('/');
      })
      .catch(err => {
        console.log(err);
      });
  };

  const onPatchHandler = (e, i) => {
    e.preventDefault();
    task.chunked = true;
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
  };

  return (
    <div>
      <CssBaseline />
      <div className='center'>
        <h1 className={classes.title}>{'\u03C4\u03AD\u03BB\u03BF\u03C2'}</h1>
      </div>
      <DumpComponent
        onChangeHandler={onChangeHandler}
        onSubmitHandler={onSubmitHandler}
        data={task}
        setData={setTask}
      />
      {/* <ChunkComponent
        allTasks={allTasks}
        setAllTasks={setAllTasks}
        data={task}
        setData={setTask}
        removeFromDom={removeFromDom}
        onChangeHandler={onChangeHandler}
        onPatchHandler={onPatchHandler}
        onChunkHandler={onChunkHandler}
      /> */}
      <AllDumpedList
        onChangeHandler={onChangeHandler}
        // onSubmitHandler={onSubmitHandler}
        data={task}
        setData={setTask}
        allTasks={allTasks}
        setAllTasks={setAllTasks}
        removeFromDom={removeFromDom}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        onChunkHandler={onChunkHandler}
        onPatchHandler={onPatchHandler}
      />
      <BottomNavComponent />
    </div>
  );
};

export default DumpAndChunk;
