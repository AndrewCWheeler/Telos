import React, { useState, useRef } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
// Material-ui core components:
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import SimpleSnackbar from './SimpleSnackBar';
// Material-ui core icons:
import AddCircleIcon from '@material-ui/icons/AddCircle';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 840,
    width: '100%',
    overflow: 'hidden',
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      maxWidth: '33ch',
      color: theme.palette.text.primary,
    },
  },
  fab: {
    margin: theme.spacing(2),
    color: theme.palette.primary.main,
  },
  paper: {
    maxWidth: 500,
    margin: `${theme.spacing(2)}px auto`,
    padding: theme.spacing(3, 0),
  },
  title: {
    margin: theme.spacing(4, 0, 2),
    color: theme.palette.primary.main,
  },
  extraLarge: {
    fontSize: 32,
  },
}));

const DumpComponent = props => {
  const domRef = useRef();
  const classes = useStyles();
  const { load, setLoad, sessionUserId } = props;
  const [task, setTask] = useState({
    name: '',
    category: '',
    chunked: false,
    scheduled: false,
    scheduledAt: '',
    completed: false,
    completedAt: '',
    owner: '',
    priority: 0,
  });
  const [snack, setSnack] = useState('');
  const [openSnack, setOpenSnack] = useState('');
  const [severity, setSeverity] = useState('');

  const handleOpenSnackBar = (snack, severity) => {
    setOpenSnack(true);
    setSnack(snack);
    setSeverity(severity);
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };

  const onChangeHandler = e => {
    setTask({
      ...task,
      owner: sessionUserId,
      [e.target.name]: e.target.value,
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSubmitHandler(e);
    }
  }
  // Create Task 
  const onSubmitHandler = (e) => {
    if (task.name === ''){
      handleOpenSnackBar("You have to enter something!", "error")
    }
    axios
      .post(`http://localhost:8000/api/tasks/${sessionUserId}`, task, {
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
          completedAt: '',
          owner: '',
        });
        let count = load;
        if (count >= 0) {
          count++;
          setLoad(count);
        }
        navigate('/');
      })
      .catch();
  };

  return (
    <div>
      <CssBaseline />
      <Grid container direction='row' justify='center' alignItems='center'>
        <Grid item xs={12} className={classes.root}>
          <TextField
            style={{marginTop: 6}}
            fullWidth
            id='dump'
            label='Dump...'
            variant='outlined'
            onChange={e => {
              onChangeHandler(e);
            }}
            onKeyPress={e => {handleKeyDown(e)}}
            name='name'
            value={task.name}
          />
        </Grid>
      </Grid>
      <Grid className={classes.dump} container direction='row' justify='center' alignItems='center'>
        <Grid item>
          <Tooltip ref={domRef} title="Add" placement="right">
            <IconButton
              className={classes.fab}
              onClick={e => {
                onSubmitHandler(e);
              }}
              >
              <AddCircleIcon style={{fontSize: 60}}/>
            </IconButton>
          </Tooltip>
        
        </Grid>
      </Grid>
      <SimpleSnackbar
        severity={severity}
        setSeverity={setSeverity}
        snack={snack}
        openSnack={openSnack}
        handleOpenSnackBar={handleOpenSnackBar}
        handleCloseSnackBar={handleCloseSnackBar}
      />
    </div>
  );
};

export default DumpComponent;
