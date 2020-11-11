import React, {useState} from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Router } from '@reach/router';
import './App.css';
import Main from './views/Main';
import 'fontsource-roboto';
import SignInSide from './views/SignInSide';
import SignUp from './views/SignUp';
import Container from '@material-ui/core/Container';

const themeObject = {
  palette: {
    type: 'dark',
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#90caf9',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#f6a5c0',
      main: '#f48fb1',
      // dark: will be calculated from palette.secondary.main,
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
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
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
      <Container className='App'>
        <CssBaseline />
        <Router>
          <SignInSide path='/signin' />
          <SignUp path='/signup' />
          <Main 
          path='/*'
          toggleDarkMode={toggleDarkMode}
          // themeObject={themeObject}
          />
        </Router>
      </Container>
    </ThemeProvider>
  );
}

export default App;
