import React from 'react';
import { Router } from '@reach/router';
import { Container } from '@material-ui/core';
import DumpAndChunk from './DumpAndChunk';
import SignInSide from '../components/SignInSide';
import SignUp from '../components/SignUp';
import CreateCategories from './CreateCategories';
// import TelosName from '../images/TelosName.jpg';
// import { createMuiTheme } from '@material-ui/core/styles';
// import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import ScheduleComponent from '../components/ScheduleComponent';
import DoComponent from '../components/DoComponent';
import Admin from './Admin';

// import AllDumpedList from '../components/AllDumpedList';

// const useStyles = makeStyles(theme => ({
//   root: {
//     flexGrow: 1,
//     maxWidth: 752,
//   },
//   title: {
//     margin: theme.spacing(4, 0, 2),
//     color: theme.palette.primary.main,
//   },
// }));

export default () => {
  // const classes = useStyles();
  return (
    <Container className='center'>
      <CssBaseline />
      <Router>
        <DumpAndChunk path='/' />
        <SignInSide path='/signin' />
        <SignUp path='/signup' />
        <CreateCategories path='/categories' />
        <ScheduleComponent path='/schedule' />
        <DoComponent path='/do' />
        <Admin path='/admin' />
      </Router>
    </Container>
  );
};
