import React, { useState } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
// Material-ui core components:
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
// Material-ui core icons:
import AddCircleIcon from '@material-ui/icons/AddCircle';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '30ch',
      color: theme.palette.text.primary,
    },
  },
  fab: {
    margin: theme.spacing(2),
    color: theme.palette.primary.main,
  },
  layout: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
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
}));

const DumpComponent = props => {
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
  const onSubmitHandler = e => {
    e.preventDefault();
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
      .catch(err => {
      });
  };

  return (
    <Container className={classes.layout}>
      <CssBaseline />
      <form className={classes.root} noValidate autoComplete='off'>
        <Grid className={classes.dump} container direction='row' justify='center' alignItems='center'>
          <Grid item>
            <TextField
              id='dump'
              label='Dump...'
              multiline
              rowsMax={2}
              size='medium'
              variant='outlined'
              onChange={e => {
                onChangeHandler(e);
              }}
              onKeyPress={handleKeyDown}
              name='name'
              value={task.name}
            />
          </Grid>
        </Grid>
        <Grid className={classes.dump} container direction='row' justify='center' alignItems='center'>
          <Grid item>
            <Tooltip title="Add" placement="right">
              <IconButton
                className={classes.fab}
                onClick={e => {
                  onSubmitHandler(e);
                }}
                >
                <AddCircleIcon fontSize='large' />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default DumpComponent;
