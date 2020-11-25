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
  const [firstInitial, setFirstInitial] = useState('');
  const [sessionUser, setSessionUser] = useState({});
  const [sessionUserId, setSessionUserId] = useState('');
  const [sessionUserFirstName, setSessionUserFirstName] = useState('');
  const [load, setLoad] = useState(0);
  const [navValue, setNavValue] = useState('');
  
  useEffect(() => {
    axios.get('http://localhost:8000/api/users/one', { withCredentials: true })
      .then(response => {
        if (response.data.message === 'success') {
          setSessionUserId(response.data.results._id);
          setSessionUser(response.data.results);
          setFirstInitial(response.data.results.firstName.charAt());
          setSessionUserFirstName(response.data.results.firstName);
        }
      })
      .catch(()=> {
        navigate('/');
      });
  }, [load]);
  
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

  return (
    <div className='center'>
      <CssBaseline />
      <Router>
        <Vision
          path='/vision'
          navValue={navValue}
          setNavValue={setNavValue}
          navigatePage={navigatePage}
        />
        <Category
          path='/category'
          navValue={navValue}
          setNavValue={setNavValue}
        />
        <DumpAndChunk
          path='/dump'
          navValue={navValue}
          setNavValue={setNavValue}
        />
        <Schedule 
          path='/schedule'
          navValue={navValue}
          setNavValue={setNavValue}
        />
        <Do 
          path='/do'
          navValue={navValue}
          setNavValue={setNavValue}
        />
        <Trajectory
          path='/trajectory'
          navValue={navValue}
          setNavValue={setNavValue}
        />
        <Profile
          path='/profile'
          navValue={navValue}
          setNavValue={setNavValue}
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
        firstInitial={firstInitial}
        sessionUserFirstName={sessionUserFirstName}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
        open={open}
        setOpen={setOpen}
        setNavValue={setNavValue}
        toggleDarkMode={toggleDarkMode}
      />
    </div>
  );
};

export default Main;
