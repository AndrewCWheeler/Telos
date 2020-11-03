import React, { useState } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link, navigate } from '@reach/router';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

// function Copyright() {
//   return (
//     <Typography variant='body2' color='textSecondary' align='center'>
//       {'Copyright © '}
//       <Link color='inherit' to='https://material-ui.com/'>
//         Telos.com
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    margin: theme.spacing(3, 0),
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  bottom: {
    margin: theme.spacing(3),
  },
  title: {
    margin: theme.spacing(4, 0, 8),
    color: theme.palette.primary.main,
  },
  subtitle: {
    color: theme.palette.secondary.main,
  },
}));

const SignInSide = () => {
  const classes = useStyles();
  const [userLogin, setUserLogin] = useState({
    email: '',
    password: '',
  });
  const onChangeHandler = e => {
    setUserLogin({
      ...userLogin,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    axios
      .post('http://localhost:8000/api/login', userLogin, {
        withCredentials: true,
      })
      .then(response => {
        // validate here...
        setUserLogin({
          email: '',
          password: '',
        });
        navigate('/');
      })
      .catch(err => {
      });
    navigate('/signup');
  };

  return (
    <Grid container component='main' className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography variant='h2' gutterBottom className={classes.title}>
            {'\u03C4\u03AD\u03BB\u03BF\u03C2'}
          </Typography>
          <i className='fa fa-2x fa-sign-in' aria-hidden='true'></i>
          <form
            className={classes.form}
            onSubmit={e => {
              onSubmitHandler(e);
            }}
            noValidate
          >
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
              onChange={e => {
                onChangeHandler(e);
              }}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              onChange={e => {
                onChangeHandler(e);
              }}
            />
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to='#' variant='body2'>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to='/' variant='body2'>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            {/* <Box mt={5}>
              <Copyright />
            </Box> */}
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default SignInSide;
