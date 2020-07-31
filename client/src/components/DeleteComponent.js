import React from 'react';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';

const DeleteComponent = props => {
  const { taskId, successCallback } = props;

  const deleteTask = e => {
    axios.delete('http://localhost:8000/api/tasks/' + taskId).then(res => {
      successCallback();
    });
  };

  return <DeleteIcon aria-hidden='true' onClick={deleteTask} />;
};

export default DeleteComponent;
