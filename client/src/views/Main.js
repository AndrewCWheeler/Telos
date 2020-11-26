import React, {useState, useEffect} from 'react';
import { Router, navigate } from '@reach/router';
import axios from 'axios';
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
  const [navValue, setNavValue] = useState('');
  
  const navigatePage = (e, navValue) => {
    setNavValue(navValue);
    handleDrawerClose();
    if (navValue === 'dump') {
      navigate('/dump');
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

  const logoutUser = (e) => {
    axios
      .get('http://localhost:8000/api/users/logout', { withCredentials: true })
      .then(res => {
        if (res.data.message === 'success') {
          navigate('/signin');
        }
      })
      .catch(navigate('/'));
  };

  return (
    <div className='center'>
      <CssBaseline />
      <Router>
        <Vision
          path='/vision'
          navValue={navValue}
          setNavValue={setNavValue}
          navigatePage={navigatePage}
          logoutUser={logoutUser}
        />
        <Category
          path='/category'
          navValue={navValue}
          setNavValue={setNavValue}
          logoutUser={logoutUser}
        />
        <DumpAndChunk
          path='/dump'
          navValue={navValue}
          setNavValue={setNavValue}
          logoutUser={logoutUser}
        />
        <Schedule 
          path='/schedule'
          navValue={navValue}
          setNavValue={setNavValue}
          logoutUser={logoutUser}
        />
        <Do 
          path='/do'
          navValue={navValue}
          setNavValue={setNavValue}
          logoutUser={logoutUser}
        />
        <Trajectory
          path='/trajectory'
          navValue={navValue}
          setNavValue={setNavValue}
          logoutUser={logoutUser}
        />
        <Profile
          path='/profile'
          navValue={navValue}
          setNavValue={setNavValue}
          logoutUser={logoutUser}
        />
      </Router>
      <BottomNavComponent
        navigatePage={navigatePage}
        navValue={navValue}
        setNavValue={setNavValue}
        position="fixed"
      />
      <PersistentDrawer
        navigatePage={navigatePage}
        navValue={navValue}
        setNavValue={setNavValue}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
        open={open}
        setOpen={setOpen}
        toggleDarkMode={toggleDarkMode}
        logoutUser={logoutUser}
      />
    </div>
  );
};

export default Main;
