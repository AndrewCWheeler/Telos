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
import Fab from '@material-ui/core/Fab';
import { green } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import AddIcon from '@material-ui/icons/Add';
import InfoIcon from '@material-ui/icons/Info';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import UpdateIcon from '@material-ui/icons/Update';

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
  dialogStyle: {
    backgroundColor: theme.palette.background.paper,
  },
  extraLarge: {
    fontSize: 32,
  },
  fab: {
    position: 'sticky',
    bottom: theme.spacing(9),
    right: theme.spacing(3),
    color: theme.palette.common.white,
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[600],
    },
  },
  icon: {
    margin: theme.spacing(2),
    color: theme.palette.primary.main,
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
  layout: {
    flexGrow: 1,
    overflow: 'scroll',
    padding: theme.spacing(0, 3),
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  neutralIconStyle: {
    fontSize:24,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  submit: {
    margin: theme.spacing(2),
    color: theme.palette.primary.main,
  },
  visionStyle: {
    maxWidth: 519,
    marginTop: 30,
    marginBottom: 300,
    overflow: 'scroll',
    padding: 9,
  },
  formControl: {
    maxWidth: 300,
  },
  error: {
    color: theme.palette.error.main,
  },
}));

const Vision = props => {
  const { navValue, setNavValue, navigatePage } = props;
  const domRef = useRef();
  const classes = useStyles();
  const [sessionUser, setSessionUser] = useState({});
  const [load, setLoad] = useState(0);
  const [openSnack, setOpenSnack] = useState(false);
  const [snack, setSnack] = useState('');
  const [severity, setSeverity] = useState('');
  const [openVisionInfo, setOpenVisionInfo] = useState(false);
  const [openVisionCreate, setOpenVisionCreate] = useState(false);

  useEffect(() => {
    let isMounted = true;
    if (navValue !== 'vision'){
      setNavValue('vision');
    }
    axios.get('http://localhost:8000/api/users/one', { withCredentials: true })
      .then(response => {
        if (response.data.message === 'success' && isMounted) {
          setSessionUser(response.data.results);
        }
      })
      .catch(()=> {
        navigate('/');
      });
      return () => { isMounted = false }
  }, [load]);

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

  const handleOpenVisionInfo = () => {
    setOpenVisionInfo(true);
  };
  const handleCloseVisionInfo = () => {
    setOpenVisionInfo(false);
  };

  const handleOpenVisionCreate = () => {
    setOpenVisionCreate(true);
  }
  const handleCloseVisionCreate = () => {
    setOpenVisionCreate(false);
  }

  const onChangeHandler = (e) => {
    setSessionUser({
      ...sessionUser,
      [e.target.name]: e.target.value,
    })
    console.log(sessionUser);
  }

  const handleKeyDown = (e, snack, severity) => {
    if (e.key === 'Enter') {
      onSubmitHandler(e, snack, severity);
    }
  }
  const onSubmitHandler = (e, snack, severity) => {
    if (sessionUser.vision === ''){
      handleOpenSnackBar("You have no vision?", "warning")
      return
    }
    axios
      .patch('http://localhost:8000/api/users/one', sessionUser, {
        withCredentials: true,
      })
      .then(res => {
        if(res.data.message === 'success'){
          handleOpenSnackBar(snack, severity);
          handleCloseVisionCreate();
        }}).catch();
  };

  return (
    <div>
      <CssBaseline />
      <div style={{marginTop: 90}}>
        <Typography
        className={classes.title}
        variant='h5'>
          Vision
          <IconButton onClick={e => {handleOpenVisionInfo(e)}}>
            <InfoIcon color="primary"/>
          </IconButton>
        </Typography>
      </div>
      <Tooltip ref={domRef} title="Add/Update" placement="right">  
        <Fab className={classes.fab} onClick={handleOpenVisionCreate}>
          {sessionUser.vision === '' ? (
            <AddIcon className={classes.extraLarge}/>
          ) : (
            <UpdateIcon className={classes.extraLarge}/>
          )}
        </Fab>
      </Tooltip>
      <Grid container direction="row" justify='center' alignItems='center' style={{marginTop: 12, marginBottom: 6}}>
        <Grid item item xs={12} className={classes.visionStyle}>
          <Typography 
            variant='h5'
          >
            {sessionUser.vision}
          </Typography>
        </Grid>
      </Grid>
      {/* Create / Update Vision Dialog */}
      <Dialog
        ref={domRef}
        aria-labelledby='vision-modal-create'
        className={classes.modal}
        open={openVisionCreate}
        onClose={handleCloseVisionCreate}
        fullWidth
      >
        <DialogTitle className={classes.title}>{"Vision"}</DialogTitle>
        <DialogContent className={classes.dialogStyle}>
          <TextField
            style={{marginTop: 6}}
            fullWidth
            label='Vision...'
            variant='outlined'
            multiline
            rows={4}
            rowsMax={8}
            onChange={e => {
              onChangeHandler(e);
            }}
            onKeyPress={e => {handleKeyDown(e, "Vision Updated!", "success")}}
            name='vision'
            value={sessionUser.vision}
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseVisionCreate}
            color="secondary"
            >
            Cancel
          </Button>
          <Button
            className={classes.submit}
            onClick={e => {
              onSubmitHandler(e, "Vision Updated!", "success");
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      {/* Vision Explanation Dialog */}
      <Dialog
        open={openVisionInfo}
        onClose={handleCloseVisionInfo}
        aria-labelledby="alert-vision-info"
        aria-describedby="alert-vision-explanation"
        fullWidth
      >
        <DialogTitle id="VisionDialogTitle">{"Vision"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="VisionDialogAlert">
          Aristotle famously said, "We are what we repeatedly do." What if the reverse were also true? "We do what we repeatedly tell ourselves we are." In other words, we act out of who we perceive ourselves to be. Before you begin creating task lists, take a moment to create your own personal vision statement. This is your vision of you. Who do you repeatedly tell yourself you are? Then let this vision influence the <Button role='link' className={classes.link} onClick={e => {navigatePage(e, 'category')}}>categories</Button> you create.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseVisionInfo} color="secondary">
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
