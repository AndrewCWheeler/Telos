import React, {useState} from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Router } from '@reach/router';

import './App.css';
import Main from './views/Main';
import 'fontsource-roboto';

import LandingPage from './views/LandingPage/LandingPage';
import SignInSide from './views/SignInSide';
import SignUp from './views/SignUp';

const themeObject = {
  palette: {
    type: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      light: '#f6a5c0',
      main: '#f48fb1',
      contrastText: '#ffcc00',
    },
    error: {
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f',
    },
    warning: {
      light: '#ffb74d',
      main: '#ff9800',
      dark: '#f57c00',
    },
    info: {
      light: '#64b5f6',
      main: '#2196f3',
      dark: '#1976d2',
    },
    success: {
      light: '#81c784',
      main: '#4caf50',
      dark: '#388e3c',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  }
}
const useDarkMode = () => {
  const [theme, setTheme] = useState(themeObject);
  const { palette: { type }} = theme;
  const toggleDarkMode = () => {
    const updatedTheme = {
      theme,
      palette: {
        ...theme.palette,
        type: type === 'light' ? 'dark' : 'light'
      }
    }
    setTheme(updatedTheme)
  }
  return [theme, toggleDarkMode]
}
const App = () => {
  const [theme, toggleDarkMode] = useDarkMode();
  const themeConfig = createMuiTheme(theme);

  return (
    <ThemeProvider theme={themeConfig}>
      <div
      className='App'
      >
        <CssBaseline />
        <Router>
          <LandingPage path='/landing' />
          <SignInSide path='/signin' />
          <SignUp path='/signup' />
          <Main 
            path='/*'
            toggleDarkMode={toggleDarkMode}
          />
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
