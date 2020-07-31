import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
import DumpComponent from '../components/DumpComponent';
// import AllDumpedList from '../components/AllDumpedList';
import ChunkComponent from '../components/ChunkComponent';

const DumpAndChunk = () => {
  const [task, setTask] = useState({
    name: '',
    chunkCategory: '',
    chunked: false,
    scheduled: false,
    scheduledAt: '',
    complete: false,
  });
  const [load, setLoad] = useState(0);
  const [allTasks, setAllTasks] = useState([]);

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

  const onChunkHandler = e => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    axios
      .post('http://localhost:8000/api/tasks', task)
      .then(res => {
        setTask({
          name: '',
          chunkCategory: '',
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
    axios.patch('http://localhost:8000/api/tasks/' + i).then(res => {
      console.log(res.data.results);
    });
  };

  return (
    <div>
      <DumpComponent
        onChangeHandler={onChangeHandler}
        onSubmitHandler={onSubmitHandler}
        data={task}
        setData={setTask}
      />
      <ChunkComponent
        allTasks={allTasks}
        setAllTasks={setAllTasks}
        data={task}
        setData={setTask}
        removeFromDom={removeFromDom}
        onChangeHandler={onChangeHandler}
        onPatchHandler={onPatchHandler}
        onChunkHandler={onChunkHandler}
      />
      {/* <AllDumpedList
        allTasks={allTasks}
        setAllTasks={setAllTasks}
        removeFromDom={removeFromDom}
      /> */}
    </div>
  );
};

export default DumpAndChunk;
