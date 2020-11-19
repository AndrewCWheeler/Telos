import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import SaveIcon from '@material-ui/icons/Save';

import SimpleSnackbar from '../components/SimpleSnackBar';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 840,
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '39ch',
      color: theme.palette.text.primary,
    },
  },
  myBorder: {
    borderTop: `1px solid ${theme.palette.text.secondary}`,
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
  title: {
    margin: theme.spacing(4, 0, 2),
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
  const classes = useStyles();
  const { navigatePage } = props;
  const [sessionUser, setSessionUser] = useState('');
  const [openSnack, setOpenSnack] = useState(false);
  const [snack, setSnack] = useState('');
  const [vision, setVision] = useState('');
  
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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSubmitHandler(e);
    }
  }
  const onSubmitHandler = (e, snack) => {
    e.preventDefault();
    sessionUser.vision = vision;
    axios
      .patch('http://localhost:8000/api/users/one', sessionUser, {
        withCredentials: true,
      })
      .then(res => {
        if(res.data.message === 'success'){
          handleOpenSnackBar(snack);
          setVision('');
        }}).catch();
  };

  return (
    <Container className={classes.root}>
      <CssBaseline />
      <div style={{marginTop:'90px'}}>
      <Typography 
      className={classes.title}
      variant='h5'>
        Vision
      </Typography>
      <Typography
        variant="body2"
      >
        Aristotle famously said, "We are what we repeatedly do." What if the reverse were also true? "We do what we repeatedly tell ourselves we are." In other words, we act out of who we perceive ourselves to be. Before you begin creating task lists, take a moment to create your own personal vision statement. Then let this vision influence the <Button role='link' className={classes.link} onClick={e => {navigatePage(e, 'category')}}>categories</Button> you create.
      </Typography>
      </div>
      <form noValidate autoComplete='off'>
        <Grid className={classes.dump} container direction='row' justify='center' alignItems='center'>
          <Grid item>
            <TextField
              style={{marginTop: 30}}
              rows={4}
              placeholder="I am..."
              id='vision'
              label='Vision here...'
              multiline
              rowsMax={6}
              size='medium'
              variant='outlined'
              onChange={e => {
                setVision(e.target.value);
              }}
              onKeyPress={handleKeyDown}
              name='vision'
              value={vision}
            />
          </Grid>
        </Grid>
        <Grid className={classes.dump} container direction='row' justify='center' alignItems='center'>
          <Grid item>
            <Tooltip title="Add" placement="right">
              <Button
                onClick={e => {
                  onSubmitHandler(e, "Vision updated!");
                }}
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<SaveIcon />}
              >
                Save
              </Button>
            </Tooltip>
          </Grid>
        </Grid>
      </form>
      <Grid container justify="center">    
        </Grid>
          <Typography 
            variant='h3'
            style={{marginTop:60, marginBottom:9}}
          >
            My Vision
          </Typography>
        <Grid item>
        <Grid 
          item
          className={classes.myBorder}
        >
          <Typography 
            variant='body1'
            style={{marginTop: 30, marginBottom: 300}}
          >
            {sessionUser.vision}
          </Typography>
        </Grid>
      </Grid>
      <SimpleSnackbar 
        snack={snack}
        openSnack={openSnack}
        handleOpenSnackBar={handleOpenSnackBar}
        handleCloseSnackBar={handleCloseSnackBar}
      />
    </Container>
  );
};

export default Vision;
