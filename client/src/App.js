import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { Router } from '@reach/router';
import './App.css';
import Main from './views/Main';
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
  // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark');

  // const theme = React.useMemo(
  //   () =>
  //     createMuiTheme({
  //       palette: {
  //         type: prefersDarkMode ? 'dark' : 'light',
  //       },
  //     }),
  //   [prefersDarkMode],
  // );

  return (
    // <ThemeProvider theme={theme}>
      <div className='App'>
        <CssBaseline />
        <Router>
          <SignInSide path='/signin' />
          <SignUp path='/signup' />
          <Main path='/*' />
        </Router>
      </div>
    // </ThemeProvider>
  );
}

export default App;
