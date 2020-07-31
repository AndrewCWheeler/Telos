import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Router, Link } from '@reach/router';
import { Container } from '@material-ui/core';
import DumpAndChunk from './DumpAndChunk';
import SignInSide from '../components/SignInSide';
import SignUp from '../components/SignUp';
import CreateCategories from './CreateCategories';
// import TelosName from '../images/TelosName.jpg';
import { createMuiTheme } from '@material-ui/core/styles';
import { makeStyles, withTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import BottomNavComponent from '../components/BottomNavComponent';
import ScheduleComponent from '../components/ScheduleComponent';
import DoComponent from '../components/DoComponent';

// import AllDumpedList from '../components/AllDumpedList';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
    color: theme.palette.primary.main,
  },
}));

export default () => {
  const classes = useStyles();
  const [message, setMessage] = useState('Loading...');
  useEffect(() => {
    axios
      .get('http://localhost:8000/api')
      .then(res => setMessage(res.data.message));
  }, []);
  return (
    <Container className='center'>
      <CssBaseline />
      {/* <p>Message from the backend: {message}</p> */}
      <div className='center'>
        <h1 className={classes.title}>{'\u03C4\u03AD\u03BB\u03BF\u03C2'}</h1>
        {/* <img className='mb-5' src={TelosName} alt='Logo' /> */}
      </div>
      {/* <Link to='/signup'>Sign Up</Link> */}
      {/* <Link to='/'>Dump & Chunk</Link> */}
      <Router>
        <DumpAndChunk path='/' />
        <SignInSide path='/signin' />
        <SignUp path='/signup' />
        <CreateCategories path='/categories' />
        <ScheduleComponent path='/schedule' />
        <DoComponent path='/do' />
      </Router>
      <BottomNavComponent />
    </Container>
  );
};
