import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
import DumpComponent from '../components/DumpComponent';
import AllDumpedList from '../components/AllDumpedList';
import CssBaseline from '@material-ui/core/CssBaseline';
import BottomNavComponent from '../components/BottomNavComponent';
// import { createMuiTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

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

  const [load, setLoad] = useState(0);
  const [allTasks, setAllTasks] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState([]);
  const [sessionUserId, setSessionUserId] = useState('');

  useEffect(() => {
    let one = 'http://localhost:8000/api/users/one';
    const requestOne = axios.get(one, { withCredentials: true });
    requestOne
      .then(response => {
        console.log(response.data.results);
        setSessionUserId(response.data.results._id);
      })
      .catch(error => {
        console.log(error);
      });
    let two = 'http://localhost:8000/api/tasks/user';
    const requestTwo = axios.get(two, { withCredentials: true });
    requestTwo
      .then(response => {
        console.log(response.data.results);
        setAllTasks(response.data.results);
      })
      .catch(error => {
        console.log(error);
      });
    axios
      .all([requestOne, requestTwo])
      .then(
        axios.spread((...responses) => {
          const responseOne = responses[0];
          const responseTwo = responses[1];
          console.log(responseOne, responseTwo);
        })
      )
      .catch(errors => {
        console.log(errors);
        navigate('/signup');
      });
  }, [load]);

  console.log('This is the sessionUserId: ');
  console.log(sessionUserId);

  const [task, setTask] = useState({
    name: '',
    category: '',
    chunked: false,
    owner: '',
    scheduled: false,
    scheduledAt: '',
    completed: false,
  });

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
  console.log(task);

  // const onChunkChangeHandler = (e, id) => {
  //   let categoryValue = e.target.value;
  //   let one = `http://localhost:8000/api/tasks/${id}`;
  //   const requestOne = axios.get(one, { withCredentials: true });
  //   requestOne
  //     .then(res => {
  //       if (res.data.message === 'success') {
  //         let currTask = res.data.results;
  //         currTask.category = categoryValue;
  //         currTask.chunked = true;
  //         setTask(currTask);
  //         console.log(currTask);
  //         console.log(task);
  //       }
  //     })
  //     .catch(err => console.log(err));
  //   let two = `http://localhost:8000/api/tasks/${id}`;
  //   task.chunked = true;
  //   const requestTwo = axios.patch(two, task, { withCredentials: true });
  //   requestTwo
  //     .then(res => {
  //       console.log(res.data.results);
  //       setTask({
  //         name: '',
  //         category: '',
  //         chunked: false,
  //         scheduled: false,
  //         scheduledAt: '',
  //         completed: false,
  //         owner: '',
  //       });
  //       let count = load;
  //       if (count >= 0) {
  //         count++;
  //         setLoad(count);
  //       }
  //       console.log(load);
  //     })
  //     .catch(err => console.log(err));
  //   axios
  //     .all([requestOne, requestTwo])
  //     .then(
  //       axios.spread((...responses) => {
  //         const responseOne = responses[0];
  //         const responseTwo = responses[1];
  //         console.log(responseOne, responseTwo);
  //       })
  //     )
  //     .catch(errors => {
  //       console.log(errors);
  //     });
  // };

  const onPatchHandler = (e, i) => {
    task.category = e.target.value;
    task.chunked = true;
    axios
      .patch('http://localhost:8000/api/tasks/' + i, task, {
        withCredentials: true,
      })
      .then(res => {
        console.log(res.data.results);
        setTask({
          name: '',
          category: '',
          chunked: false,
          scheduled: false,
          scheduledAt: '',
          completed: false,
          owner: '',
        });
        let count = load;
        if (count >= 0) {
          count++;
          setLoad(count);
        }
        console.log(load);
      })
      .catch(err => console.log(err));
  };

  // const onSubmitHandler = e => {
  //   e.preventDefault();
  //   console.log('This is the task just before going to post...');
  //   console.log(task);
  //   axios
  //     .post(`http://localhost:8000/api/tasks/${sessionUserId}`, task, {
  //       withCredentials: true,
  //     })
  //     .then(res => {
  //       console.log(res.data.message);
  //       console.log(res.data.results);
  //       setTask({
  //         name: '',
  //         category: '',
  //         chunked: false,
  //         scheduled: false,
  //         scheduledAt: '',
  //         completed: false,
  //         owner: '',
  //       });
  //       let count = load;
  //       if (count >= 0) {
  //         count++;
  //         setLoad(count);
  //       }
  //       console.log(load);
  //       navigate('/');
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  return (
    <div>
      <CssBaseline />
      <div className='center'>
        <Typography
          variant='h2'
          // component='h2'
          gutterBottom
          className={classes.title}
        >
          {'\u03C4\u03AD\u03BB\u03BF\u03C2'}
        </Typography>
      </div>
      <DumpComponent
        // onClickHandler={onClickHandler}
        // onSubmitHandler={onSubmitHandler}
        load={load}
        setLoad={setLoad}
        sessionUserId={sessionUserId}
      />
      {/* <ChunkComponent
        allTasks={allTasks}
        setAllTasks={setAllTasks}
        data={task}
        setData={setTask}
        removeFromDom={removeFromDom}
        onClickHandler={onClickHandler}
        onPatchHandler={onPatchHandler}
        onChunkHandler={onChunkHandler}
      /> */}
      <AllDumpedList
        onClickHandler={onClickHandler}
        // onSubmitHandler={onSubmitHandler}
        data={task}
        setData={setTask}
        allTasks={allTasks}
        setAllTasks={setAllTasks}
        removeFromDom={removeFromDom}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        // onChunkHandler={onChunkHandler}
        // onChunkChangeHandler={onChunkChangeHandler}
        onPatchHandler={onPatchHandler}
      />
      <BottomNavComponent />
    </div>
  );
};

export default DumpAndChunk;
