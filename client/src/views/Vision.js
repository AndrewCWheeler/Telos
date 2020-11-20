import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import InfoIcon from '@material-ui/icons/Info';

import SimpleSnackbar from '../components/SimpleSnackBar';
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 840,
    overflow: 'scroll',
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '33ch',
      color: theme.palette.text.primary,
    },
  },
  fab: {
    margin: theme.spacing(2),
    color: theme.palette.primary.main,
  },
  title: {
    marginTop: theme.spacing(4),
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
  visionStyle: {
    maxWidth: 519,
    marginTop: 30,
    marginBottom: 300,
    overflow: 'scroll',
    padding: 9,
  },
}));

const Vision = props => {
  const domRef = useRef();
  const classes = useStyles();
  const { navigatePage } = props;
  const [sessionUser, setSessionUser] = useState('');
  const [openSnack, setOpenSnack] = useState(false);
  const [snack, setSnack] = useState('');
  const [severity, setSeverity] = useState('');
  const [vision, setVision] = useState('');
  const [openVisionDialog, setOpenVisionDialog] = useState(false);

  
  useEffect(() => {
    let isMounted = true;
    axios.get('http://localhost:8000/api/users/one', {withCredentials: true})
    .then(res => {
      if (res.data.message === 'success' && isMounted){
        setSessionUser(res.data.results);
        setVision('');
      }
    }).catch(()=>{navigate('/landing')});
    return () => { isMounted = false };
  }, []);

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

  const handleOpenVisionDialog = () => {
    setOpenVisionDialog(true);
  };
  const handleCloseVisionDialog = () => {
    setOpenVisionDialog(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSubmitHandler(e, "Vision updated!", "success");
    }
  }
  const onSubmitHandler = (e, snack, severity) => {
    if (vision === ''){
      handleOpenSnackBar("You have no vision?", "warning")
      return
    }
    sessionUser.vision = vision;
    axios
      .patch('http://localhost:8000/api/users/one', sessionUser, {
        withCredentials: true,
      })
      .then(res => {
        if(res.data.message === 'success'){
          handleOpenSnackBar(snack, severity);
          setVision('');
        }}).catch();
  };

  return (
    <div>
      <CssBaseline />
      <Grid container direction='row' justify='center' alignItems='center' style={{marginTop: 60}}>
        <Grid item xs={12}>
          <Typography
          className={classes.title}
          variant='h5'>
            Vision 
            <IconButton onClick={e => {handleOpenVisionDialog(e)}}>
              <InfoIcon color="primary"/>
          </IconButton>
          </Typography>
        </Grid>
      </Grid>
      <Grid container direction="row" justify='center' alignItems='center'>
        <Grid item xs={12} className={classes.root}>
          <TextField
            placeholder="I am..."
            id='vision'
            label='Vision here...'
            multiline
            rows={3}
            fullWidth
            variant='outlined'
            onChange={e => {
              setVision(e.target.value);
            }}
            onKeyPress={e => {handleKeyDown(e)}}
            name='vision'
            value={vision}
          />
        </Grid>
      </Grid>
      <Grid container direction="row" justify='center' alignItems='center' style={{marginTop: 12}}>
        <Grid item xs={12} style={{marginBottom: 30}}>
          <Tooltip ref={domRef} title="Add/Update" placement="right">  
            <IconButton
              onClick={e => {onSubmitHandler(e, "Vision updated!", "success")}} 
              className={classes.fab}
            >
              <AddCircleIcon style={{fontSize: 60}}/>
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      <Grid container direction="row" justify='center' alignItems='center' style={{marginTop: 12, marginBottom: 6}}>
        <Grid item item xs={12} className={classes.visionStyle}>
          <Typography 
            variant='h5'
          >
            {sessionUser.vision}
          </Typography>
        </Grid>
      </Grid>
      <Dialog
        open={openVisionDialog}
        onClose={handleCloseVisionDialog}
        aria-labelledby="alert-vision-dialog"
        aria-describedby="alert-vision-explanation"
      >
        <DialogTitle id="VisionDialogTitle">{"Vision"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="VisionDialogAlert">
          Aristotle famously said, "We are what we repeatedly do." What if the reverse were also true? "We do what we repeatedly tell ourselves we are." In other words, we act out of who we perceive ourselves to be. Before you begin creating task lists, take a moment to create your own personal vision statement. Then let this vision influence the <Button role='link' className={classes.link} onClick={e => {navigatePage(e, 'category')}}>categories</Button> you create.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseVisionDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
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

export default Vision;
