import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
// import { navigate } from '@reach/router';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '35ch',
    },
  },
  paper: {
    maxWidth: 500,
    margin: `${theme.spacing(2)}px auto`,
    padding: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const CategoryComponent = props => {
  const { onChangeHandler, onSubmitHandler, data, setData } = props;
  const classes = useStyles();

  return (
    <Container>
      <Paper className={classes.paper} elevation={3}>
        <h1>Create 'Life Categories'</h1>
        <form className={classes.root} noValidate autoComplete='off'>
          <TextField
            name='nameOne'
            label='Category 1'
            variant='outlined'
            value={data.nameOne}
            onChange={e => {
              onChangeHandler(e);
            }}
          />
          <TextField
            name='nameTwo'
            label='Category 2'
            variant='outlined'
            value={data.nameTwo}
            onChange={e => {
              onChangeHandler(e);
            }}
          />
          <TextField
            name='nameThree'
            label='Category 3'
            variant='outlined'
            value={data.nameThree}
            onChange={e => {
              onChangeHandler(e);
            }}
          />
          <TextField
            name='nameFour'
            label='Category 4'
            variant='outlined'
            value={data.nameFour}
            onChange={e => {
              onChangeHandler(e);
            }}
          />
          <TextField
            name='nameFive'
            label='Category 5'
            variant='outlined'
            value={data.nameFive}
            onChange={e => {
              onChangeHandler(e);
            }}
          />
          <TextField
            name='nameSix'
            label='Category 6'
            variant='outlined'
            value={data.nameSix}
            onChange={e => {
              onChangeHandler(e);
            }}
          />
          <TextField
            name='nameSeven'
            label='Category 7'
            variant='outlined'
            value={data.nameSeven}
            onChange={e => {
              onChangeHandler(e);
            }}
          />
          <TextField
            name='nameEight'
            label='Category 8'
            variant='outlined'
            value={data.nameEight}
            onChange={e => {
              onChangeHandler(e);
            }}
          />
          <Button
            variant='contained'
            type='submit'
            color='primary'
            size='large'
            className={classes.button}
            startIcon={<SaveIcon />}
            onSubmit={e => {
              onSubmitHandler(e);
            }}
          >
            Save
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default CategoryComponent;
