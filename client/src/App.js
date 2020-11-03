import React from 'react';
import { Router } from '@reach/router';
import './App.css';
import Main from './views/Main';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'fontsource-roboto';
import SignInSide from './views/SignInSide';
import SignUp from './views/SignUp';
import DumpAndChunk from './views/DumpAndChunk';
import CreateCategories from './views/CreateCategories';
import ScheduleComponent from './components/ScheduleComponent';
import DoComponent from './components/DoComponent';
import Admin from './views/Admin';
import ChunkComponent from './components/ChunkComponent';
import BottomNavComponent from './components/BottomNavComponent';

function App() {
  return (
    <div className='App'>
      <CssBaseline />
      <Router>
        <SignInSide path='/signin' />
        <SignUp path='/signup' />
        <Main path='/*' />
      </Router>
    </div>
  );
}

export default App;
