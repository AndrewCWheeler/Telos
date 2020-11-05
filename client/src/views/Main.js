import React from 'react';
import { Router } from '@reach/router';
import { Container } from '@material-ui/core';
import DumpAndChunk from './DumpAndChunk';
import CreateCategories from './CreateCategories';
import CssBaseline from '@material-ui/core/CssBaseline';
import ScheduleComponent from '../components/ScheduleComponent';
import DoComponent from '../components/DoComponent';
import Admin from './Admin';
import BottomNavComponent from '../components/BottomNavComponent';
import ChunkComponent from '../components/ChunkComponent';
import ResponsiveDrawer from '../components/ResponsiveDrawer';

export default () => {
  return (
    <Container className='center'>
      <CssBaseline />
      <Router>
        <DumpAndChunk path='/' />
        <CreateCategories path='/categories' />
        <ScheduleComponent path='/schedule' />
        <DoComponent path='/do' />
        <Admin path='/admin' />
        <ChunkComponent path='/chunk' />
        <ResponsiveDrawer path='/drawer' />
      </Router>
      <BottomNavComponent />
      <ResponsiveDrawer />
    </Container>
  );
};
