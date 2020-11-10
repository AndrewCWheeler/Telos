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
    type: 'light',
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#648dae',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#f6a5c0',
      main: '#f48fb1',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
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
          />
        </Router>
      </Container>
    </ThemeProvider>
  );
}

export default App;
