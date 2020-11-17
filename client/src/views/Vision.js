import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import {
  Container,
  Grid,
  // Paper,
  TextField,
  makeStyles,
  Tooltip,
  Fab,
  Typography,
  // Accordion,
  // AccordionSummary,
  // AccordionDetails,
} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import SimpleSnackbar from '../components/SimpleSnackBar';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 840,
      // flexGrow: 1,
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '48ch',
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
    // color: theme.palette.primary.main,
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.info.light,
    "&:active": {
      color: theme.palette.secondary.dark,
    },
    "&:hover": {
      color: theme.palette.info.main,
      textDecoration: 'none',
      
    },
    
  },
}));

const Vision = props => {
  const { navigatePage } = props;
  const classes = useStyles();
  const [load, setLoad] = useState('');
  const [sessionUser, setSessionUser] = useState('');
  const [openSnack, setOpenSnack] = useState(false);
  const [snack, setSnack] = useState('');
  
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

  useEffect(() => {
    axios.get('http://localhost:8000/api/users/one', {withCredentials: true})
    .then(res => {
      if (res.data.message === 'success'){
        setSessionUser(res.data.results);
        // setVision(res.data.results.vision);
      }
    }).catch(err => {
      console.log(err);
      navigate('/landing')
    })
  }, []);

  const onChangeHandler = e => {
    setSessionUser({
      ...sessionUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      console.log('Enter Key Pressed!')
      onSubmitHandler(e);
    }
  }
  // Update User with Vision
  const onSubmitHandler = (e, snack) => {
    e.preventDefault();
    console.log('This is the vision just before going to patch...');
    console.log(sessionUser);
    axios
      .patch('http://localhost:8000/api/users/one', sessionUser, {
        withCredentials: true,
      })
      .then(res => {
        if(res.data.message === 'success'){
          console.log(res.data.results);
        }}).catch(err => {
        console.log(err);
      });
  };

  return (
    <Container className={classes.root}>
      <CssBaseline />
      <div style={{marginTop:'90px'}}>
      <Typography 
      className={classes.title}
      variant='h3'>
        Vision
      </Typography>
      <Typography
        variant="body1"
      >
        Aristotle famously said, "We are what we repeatedly do." What if the reverse were also true? "We do what we repeatedly tell ourselves we are." In other words, we act out of who we perceive ourselves to be. Before you begin creating task lists, take a moment to create your own personal vision statement. Then let this vision influence the <a className={classes.link} onmouseover='' style={{cursor: 'pointer'}} onClick={e => {navigatePage(e, 'category')}}>categories</a> you create.
      </Typography>
      </div>
      <form className={classes.root} noValidate autoComplete='off'>
        <Grid className={classes.dump} container direction='row' justify='center' alignItems='center'>
          <Grid item>
            <TextField
              rows={4}
              defaultValue="Default Value"
              id='vision'
              label='Vision here...'
              multiline
              rowsMax={6}
              size='medium'
              variant='outlined'
              onChange={e => {
                onChangeHandler(e);
              }}
              onKeyPress={handleKeyDown}
              name='vision'
              // value={sessionUser.vision}
            />
          </Grid>
        </Grid>
        <Grid className={classes.dump} container direction='row' justify='center' alignItems='center'>
          <Grid item>
            <Tooltip title="Add" placement="right">
              <IconButton
                className={classes.fab}
                onClick={e => {
                  onSubmitHandler(e, "Vision updated!");
                }}
                >
                <AddCircleIcon fontSize='large' />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </form>
      <Grid container justify="center">
        <Grid item>
          <Typography 
            variant='h5'
          >
            {sessionUser.vision}
          </Typography>
        </Grid>
      </Grid>
      <SimpleSnackbar 
      snack={snack}
      openSnack={openSnack}
      handleOpenSnackBar={handleOpenSnackBar}
      handleCloseSnackBar={handleCloseSnackBar} />
    </Container>
  );
};

export default Vision;
