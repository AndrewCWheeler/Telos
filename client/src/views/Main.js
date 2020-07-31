import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Router, Link } from '@reach/router';
import { Container } from '@material-ui/core';
import DumpAndChunk from './DumpAndChunk';
import SignInSide from '../components/SignInSide';
import SignUp from '../components/SignUp';
import CreateCategories from './CreateCategories';
// import AllDumpedList from '../components/AllDumpedList';

export default () => {
  const [message, setMessage] = useState('Loading...');
  useEffect(() => {
    axios
      .get('http://localhost:8000/api')
      .then(res => setMessage(res.data.message));
  }, []);
  return (
    <Container className='text-center'>
      <p>Message from the backend: {message}</p>
      <Link to='/signup'>Sign Up</Link> |&nbsp;
      <Link to='/'>Dump & Chunk</Link>
      <Router>
        <DumpAndChunk path='/' />
        <SignInSide path='/signin' />
        <SignUp path='/signup' />
        <CreateCategories path='/categories' />
      </Router>
    </Container>
  );
};
