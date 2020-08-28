import React from 'react';
// import axios from 'axios';
// import { navigate } from '@reach/router';
import {
  Container,
  Grid,
  // Paper,
  TextField,
  makeStyles,
  Tooltip,
  Fab,
  // Accordion,
  // AccordionSummary,
  // AccordionDetails,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CssBaseline from '@material-ui/core/CssBaseline';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '48ch',
    },
  },
  fab: {
    margin: theme.spacing(2),
  },
  layout: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
  paper: {
    maxWidth: 500,
    margin: `${theme.spacing(2)}px auto`,
    padding: theme.spacing(3, 0),
  },
}));

const DumpComponent = props => {
  const { onChangeHandler, onSubmitHandler, data, setData } = props;

  const classes = useStyles();

  return (
    <Container className={classes.layout}>
      <CssBaseline />
      {/* <Paper className={classes.paper} elevation={3}> */}
      <form className={classes.root} noValidate autoComplete='off'>
        <Grid container direction='row' justify='center' alignItems='center'>
          <TextField
            id='dump'
            label='Dump...'
            multiline
            rowsMax={2}
            size='medium'
            variant='outlined'
            onChange={e => {
              onChangeHandler(e);
            }}
            name='name'
            value={data.name}
          />
        </Grid>
        <Grid container direction='row' justify='center' alignItems='center'>
          {/* <Tooltip title='Add' aria-label='add'> */}
          <Fab color='primary' className={classes.fab}>
            <AddIcon
              onClick={e => {
                onSubmitHandler(e);
              }}
            />
          </Fab>
          {/* </Tooltip> */}
        </Grid>
      </form>
      {/* </Paper> */}
    </Container>
  );
};

export default DumpComponent;
