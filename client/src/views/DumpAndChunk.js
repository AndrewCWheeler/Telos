import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
import DumpComponent from '../components/DumpComponent';
import AllDumpedList from '../components/AllDumpedList';
import CssBaseline from '@material-ui/core/CssBaseline';
import BottomNavComponent from '../components/BottomNavComponent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


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

const DumpAndChunk = (props) => {
  const classes = useStyles();

  const [load, setLoad] = useState(0);
  const [allTasks, setAllTasks] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState([]);
  const [sessionUserId, setSessionUserId] = useState('');

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
        navigate('/signup');
      });
  }, [load]);

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

  const onChangeHandler = e => {
    setTask({
      ...task,
      owner: sessionUserId,
      [e.target.name]: e.target.value,
    });
  };

  const onPatchHandler = (e, i) => {
    task.category = e.target.value;
    task.chunked = true;
    axios
      .patch('http://localhost:8000/api/tasks/' + i, task, {
        withCredentials: true,
      })
      .then(res => {
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
      })
      .catch(err => console.log(err));
  };

  const onPatchEditNameHandler = (e, id) => {
    // task.category = e.target.value;
    // task.chunked = true;
    axios
      .patch('http://localhost:8000/api/tasks/' + id, task, {
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


  

  return (
    <div>
      <CssBaseline />
      <div className='center' style={{marginTop:'100px'}}>
        {/* <Typography
          variant='h2'
          className={classes.title}
        >
          {'\u03C4\u03AD\u03BB\u03BF\u03C2'}
        </Typography> */}
        <h1 className={classes.title}>Dump & Chunk</h1>
      </div>
      <DumpComponent
        load={load}
        setLoad={setLoad}
        sessionUserId={sessionUserId}
      />
      <AllDumpedList
        onClickHandler={onClickHandler}
        data={task}
        setData={setTask}
        allTasks={allTasks}
        setAllTasks={setAllTasks}
        removeFromDom={removeFromDom}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        onPatchHandler={onPatchHandler}
        onChangeHandler={onChangeHandler}
        onPatchEditNameHandler={onPatchEditNameHandler}
      />
    </div>
  );
};

export default DumpAndChunk;
