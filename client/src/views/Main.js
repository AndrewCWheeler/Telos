import React, {useState} from 'react';
import {navigate} from '@reach/router';
import { Router } from '@reach/router';
import { Container } from '@material-ui/core';
import DumpAndChunk from './DumpAndChunk';
// import CreateCategories from './CreateCategories';
import CssBaseline from '@material-ui/core/CssBaseline';
import Schedule from './Schedule';
import Do from './Do';
import Profile from './Profile';
import BottomNavComponent from '../components/BottomNavComponent';
// import ChunkComponent from '../components/ChunkComponent';
import PersistentDrawer from '../components/PersistentDrawer';
import Category from './Category';
import Trajectory from './Trajectory';
// import CategoryList from '../components/CategoryList';

// import "assets/scss/material-kit-pro-react.scss?v=1.9.0";
import "../assets/scss/material-kit-pro-react.scss";
import Vision from './Vision';


const Main = (props) => {
  const {theme, toggleDarkMode, useDarkMode} = props;
  const [open, setOpen] = useState(false);
  const [navValue, setNavValue] = useState('dump');
  const navigatePage = (e, navValue) => {
    setNavValue(navValue);
    handleDrawerClose();
    if (navValue === 'dump') {
      navigate('/');
    } else if (navValue === 'schedule') {
      navigate('/schedule');
    } else if (navValue === 'do') {
      navigate('/do');
    } else if (navValue === 'category') {
      navigate('/category');
    } else if (navValue === 'trajectory') {
      navigate('/trajectory');
    } else if (navValue === 'profile') {
      navigate('/profile');
    } else if (navValue === 'vision') {
      navigate('/vision');
    }
  };
    const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className='center'>
      <CssBaseline />
      <Router>
        <DumpAndChunk path='/' />
        <Schedule path='/schedule' />
        <Do path='/do' />
        <Trajectory path='/trajectory' />
        <Category path='/category' />
        <Vision path='/vision' />
        <Profile path='/profile' />
      </Router>
      <BottomNavComponent
        navigatePage={navigatePage}
        navValue={navValue}
        setNavValue={setNavValue}
        position="fixed"
      />
      <PersistentDrawer 
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
        open={open}
        setOpen={setOpen}
        navigatePage={navigatePage}
        navValue={navValue}
        setNavValue={setNavValue}
        toggleDarkMode={toggleDarkMode}
      />
    </div>
  );
};

export default Main;
