import React from 'react';
import { Router } from '@reach/router';
import { Container } from '@material-ui/core';
import DumpAndChunk from './DumpAndChunk';
// import CreateCategories from './CreateCategories';
import CssBaseline from '@material-ui/core/CssBaseline';
import ScheduleComponent from '../components/ScheduleComponent';
import DoComponent from '../components/DoComponent';
import Admin from './Admin';
import BottomNavComponent from '../components/BottomNavComponent';
// import ChunkComponent from '../components/ChunkComponent';
import PersistentDrawer from '../components/PersistentDrawer';
import CategoryComponent from '../components/CategoryComponent';

const Main = (props) => {
  const {theme, toggleDarkMode, useDarkMode} = props;
  return (
    <div className='center'>
      <CssBaseline />
      <Router>
        <DumpAndChunk path='/' />
        <CategoryComponent path='/category' />
        <ScheduleComponent path='/schedule' />
        <DoComponent path='/do' />
        <Admin path='/admin' />
        {/* <ChunkComponent path='/chunk' /> */}
      </Router>
      <BottomNavComponent position="fixed"/>
      <PersistentDrawer toggleDarkMode={toggleDarkMode}/>
    </div>
  );
};

export default Main;
