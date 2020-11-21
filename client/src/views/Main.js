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
  const [allTasks, setAllTasks] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [load, setLoad] = useState(0);
  const [navValue, setNavValue] = useState('');
  
  useEffect(() => {
    let isMounted = true;
    let one = 'http://localhost:8000/api/users/one';
    const requestOne = axios.get(one, { withCredentials: true });
    requestOne
      .then(response => {
        if (response.data.message === 'success' && isMounted) {
          setSessionUserId(response.data.results._id);
          setSessionUser(response.data.results);
          setFirstInitial(response.data.results.firstName.charAt());
          setSessionUserFirstName(response.data.results.firstName);
        }
      })
      .catch(() => {
        navigate('/');
      });
    let two = 'http://localhost:8000/api/tasks/user';
    const requestTwo = axios.get(two, { withCredentials: true });
    requestTwo
      .then(response => {
        if (response.data.message === 'success' && isMounted){
          let orderedTasks = response.data.results;
          orderedTasks.sort((a,b) => a.priority - b.priority)
          setAllTasks(orderedTasks);
        }
      })
      .catch();
    let three = 'http://localhost:8000/api/categories/user';
    const requestThree = axios.get(three, {withCredentials: true });
    requestThree
      .then(response => {
        if (isMounted) setAllCategories(response.data.results);
      })
      .catch();
    axios
      .all([requestOne, requestTwo, requestThree])
      .then(
        axios.spread((...responses) => {
          const responseOne = responses[0];
          const responseTwo = responses[1];
          const responseThree = responses[2];
        })
      )
      .catch(() => {
        navigate('/');
      });
      return () => { isMounted = false }
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
          navigatePage={navigatePage}
          navValue={navValue}
          setNavValue={setNavValue}
          sessionUser={sessionUser}
        />
        <Category
          path='/category'
          navigatePage={navigatePage}
          navValue={navValue}
          setNavValue={setNavValue}
          sessionUserId={sessionUserId}
          allCategories={allCategories}
          setAllCategories={setAllCategories}
          load={load}
          setLoad={setLoad}
        />
        <DumpAndChunk
          path='/dump'
          navigatePage={navigatePage}
          navValue={navValue}
          setNavValue={setNavValue}
          allTasks={allTasks}
          setAllTasks={setAllTasks}
          allCategories={allCategories}
          sessionUserId={sessionUserId}
          load={load}
          setLoad={setLoad}
        />
        <Schedule 
          path='/schedule'
          navigatePage={navigatePage}
          navValue={navValue}
          setNavValue={setNavValue}
          allTasks={allTasks}
          setAllTasks={setAllTasks}
          allCategories={allCategories}
          sessionUserId={sessionUserId}
          load={load}
          setLoad={setLoad}
        />
        <Do 
          path='/do'
          navigatePage={navigatePage}
          navValue={navValue}
          setNavValue={setNavValue}
          allTasks={allTasks}
          setAllTasks={setAllTasks}
          allCategories={allCategories}
          sessionUserId={sessionUserId}
          load={load}
          setLoad={setLoad}
        />
        <Trajectory
          path='/trajectory'
          navigatePage={navigatePage}
          navValue={navValue}
          setNavValue={setNavValue}
          allTasks={allTasks}
          allCategories={allCategories}
          load={load}
          setLoad={setLoad}
        />
        <Profile
          path='/profile'
          navigatePage={navigatePage}
          navValue={navValue}
          setNavValue={setNavValue}
          allTasks={allTasks}
          setAllTasks={setAllTasks}
          allCategories={allCategories}
          sessionUser={sessionUser}
          firstInitial={firstInitial}
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
