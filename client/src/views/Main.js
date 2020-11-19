import React, {useState} from 'react';
import { Router, navigate } from '@reach/router';
// My components:
import BottomNavComponent from '../components/BottomNavComponent';
import Category from './Category';
import Do from './Do';
import DumpAndChunk from './DumpAndChunk';
import PersistentDrawer from '../components/PersistentDrawer';
import Profile from './Profile';
import Schedule from './Schedule';
import Trajectory from './Trajectory';
import Vision from './Vision';
// Material-ui components / styles:
import CssBaseline from '@material-ui/core/CssBaseline';
import "../assets/scss/material-kit-pro-react.scss";

const Main = (props) => {
  const { toggleDarkMode } = props;
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
        <Vision 
          navigatePage={navigatePage}
          path='/vision' />
        <Category path='/category' />
        <DumpAndChunk path='/' />
        <Schedule path='/schedule' />
        <Do path='/do' />
        <Trajectory path='/trajectory' />
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
