import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
import DumpComponent from '../components/DumpComponent';
import AllDumpedList from '../components/AllDumpedList';
import CssBaseline from '@material-ui/core/CssBaseline';
import BottomNavComponent from '../components/BottomNavComponent';

// import ChunkComponent from '../components/ChunkComponent';

const DumpAndChunk = () => {
  const [task, setTask] = useState({
    name: '',
    category: '',
    chunked: false,
    scheduled: false,
    scheduledAt: '',
    complete: false,
  });
  const [load, setLoad] = useState(0);
  const [allTasks, setAllTasks] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/tasks')
      .then(response => {
        setAllTasks(response.data.results);
      })
      .catch(err => console.log(err));
  }, [load]);

  const removeFromDom = taskId => {
    setAllTasks(allTasks.filter(task => task._id !== taskId));
  };

  const onChangeHandler = e => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
    console.log(task);
  };

  const onChunkHandler = (e, i) => {
    console.log(e.target.value);
    let categoryValue = e.target.value;
    axios
      .get('http://localhost:8000/api/tasks/' + i)
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

  const onSubmitHandler = e => {
    e.preventDefault();
    axios
      .post('http://localhost:8000/api/tasks', task)
      .then(res => {
        setTask({
          name: '',
          category: '',
          chunked: false,
          scheduled: false,
          scheduledAt: '',
          complete: false,
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
      .patch('http://localhost:8000/api/tasks/' + i, task)
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
    </div>
  );
};

export default DumpAndChunk;
