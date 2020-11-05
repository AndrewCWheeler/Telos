import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { CssBaseline, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 752,
    flexGrow: 1,
  },
  subtitle: {
    margin: theme.spacing(4, 0, 2),
    color: theme.palette.primary.main,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
    color: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(4),
  },
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(3, 0, 0),
  },
}));

const CategoryComponent = props => {
  const { onChangeHandler, onSubmitHandler, data } = props;
  const classes = useStyles();

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper} style={{marginTop:'100px'}}>
        {/* <Typography
          variant='h2'
          // component='h2'
          className={classes.title}
          >
          {'\u03C4\u03AD\u03BB\u03BF\u03C2'}
        </Typography> */}
        <h3 className={classes.subtitle}>Create 'Life Categories'</h3>
        <form noValidate autoComplete='off' className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name='nameOne'
                label='Category 1'
                variant='standard'
                fullWidth
                value={data.nameOne}
                onChange={e => {
                  onChangeHandler(e);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name='nameTwo'
                label='Category 2'
                variant='standard'
                fullWidth
                value={data.nameTwo}
                onChange={e => {
                  onChangeHandler(e);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name='nameThree'
                label='Category 3'
                variant='standard'
                fullWidth
                value={data.nameThree}
                onChange={e => {
                  onChangeHandler(e);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name='nameFour'
                label='Category 4'
                variant='standard'
                fullWidth
                value={data.nameFour}
                onChange={e => {
                  onChangeHandler(e);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name='nameFive'
                label='Category 5'
                variant='standard'
                fullWidth
                value={data.nameFive}
                onChange={e => {
                  onChangeHandler(e);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name='nameSix'
                label='Category 6'
                variant='standard'
                fullWidth
                value={data.nameSix}
                onChange={e => {
                  onChangeHandler(e);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name='nameSeven'
                label='Category 7'
                variant='standard'
                fullWidth
                value={data.nameSeven}
                onChange={e => {
                  onChangeHandler(e);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name='nameEight'
                label='Category 8'
                variant='standard'
                fullWidth
                value={data.nameEight}
                onChange={e => {
                  onChangeHandler(e);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant='contained'
                fullWidth
                type='submit'
                color='primary'
                className={classes.button}
                startIcon={<SaveIcon />}
                onClick={e => {
                  onSubmitHandler(e);
                }}
                >
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default CategoryComponent;
