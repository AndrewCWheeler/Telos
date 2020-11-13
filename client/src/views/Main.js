import React, {useState} from 'react';
import {navigate} from '@reach/router';
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
// import CategoryList from '../components/CategoryList';



const Main = (props) => {
  const {theme, toggleDarkMode, useDarkMode} = props;
  const [navValue, setNavValue] = useState('dump');
  const navigatePage = (e, navValue) => {
    setNavValue(navValue);
    if (navValue === 'dump') {
      navigate('/');
    } else if (navValue === 'schedule') {
      navigate('/schedule');
    } else if (navValue === 'do') {
      navigate('/do');
    } else if (navValue === 'category') {
      navigate('/category');
    }
  };
  return (
    <div className='center'>
      <CssBaseline />
      <Router>
        <DumpAndChunk path='/' />
        <CategoryComponent path='/category' />
        <ScheduleComponent path='/schedule' />
        <DoComponent path='/do' />
        <Admin path='/admin' />
        {/* <CategoryList path='/categorylist' /> */}
        {/* <ChunkComponent path='/chunk' /> */}
      </Router>
      <BottomNavComponent
      navigatePage={navigatePage}
      navValue={navValue}
      setNavValue={setNavValue}
      position="fixed"/>
      <PersistentDrawer 
      navigatePage={navigatePage}
      navValue={navValue}
      setNavValue={setNavValue}
      toggleDarkMode={toggleDarkMode}/>
    </div>
  );
};

export default Main;
