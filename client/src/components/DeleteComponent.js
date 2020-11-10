import React from 'react';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';

const DeleteComponent = props => {
  const { taskId, successCallback } = props;

  const deleteTask = e => {
    axios
      .delete('http://localhost:8000/api/tasks/' + taskId, {
        withCredentials: true,
      })
      .then(res => {
        successCallback();
      });
  };
  return (
    <DeleteIcon
      aria-hidden='true'
      onClick={deleteTask}
      style={{fontSize:24}}
    />
  );
};

export default DeleteComponent;
