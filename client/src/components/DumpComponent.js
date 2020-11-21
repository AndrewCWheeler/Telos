import React, {useState} from 'react';
// Material-ui core components:
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import { green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
// Material-ui core icons:
import AddIcon from '@material-ui/icons/Add';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 840,
    width: '100%',
    overflow: 'hidden',
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      maxWidth: '33ch',
      color: theme.palette.text.primary,
    },
  },
  add: {
    margin: theme.spacing(2),
    color: theme.palette.primary.main,
  },
  dialogStyle: {
    backgroundColor: theme.palette.background.paper,
  },
  fab: {
    position: 'sticky',
    bottom: theme.spacing(9),
    right: theme.spacing(3),
    color: theme.palette.common.white,
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[600],
    },
  },
  paper: {
    maxWidth: 500,
    margin: `${theme.spacing(2)}px auto`,
    padding: theme.spacing(3, 0),
  },
  title: {
    margin: theme.spacing(4, 0, 2),
    color: theme.palette.primary.main,
  },
  extraLarge: {
    fontSize: 32,
  },
}));

const DumpComponent = props => {
  
  const classes = useStyles();
  const { openDumpSubmit, setOpenDumpSubmit, handleOpenDumpSubmit, handleCloseDumpSubmit, onChangeHandler, task, handleKeyDown, onSubmitHandler } = props;



  return (
    <div>
      <CssBaseline />
      <Fab className={classes.fab} onClick={handleOpenDumpSubmit}>
        <AddIcon className={classes.extraLarge}/>
      </Fab>
      <Dialog
        aria-labelledby='dump-modal-title'
        className={classes.modal}
        open={openDumpSubmit}
        onClose={handleCloseDumpSubmit}
        closeAfterTransition
        fullWidth
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
      <DialogTitle className={classes.title}>{"Dump"}</DialogTitle>
      <DialogContent className={classes.dialogStyle}>
      {/* <Grid container direction='row' justify='center' alignItems='center'>
        <Grid item xs={12} className={classes.root}> */}
          <TextField
            style={{marginTop: 6}}
            fullWidth
            id='dump'
            label='Dump...'
            variant='outlined'
            onChange={e => {
              onChangeHandler(e);
            }}
            onKeyPress={e => {handleKeyDown(e)}}
            name='name'
            value={task.name}
            autoFocus='true'
          />
        {/* </Grid>
      </Grid> */}
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={handleCloseDumpSubmit}
          color="primary"
          >
          Cancel
        </Button>
        <IconButton
            className={classes.add}
            onClick={e => {
              onSubmitHandler(e);
            }}
            >
            <LibraryAddIcon style={{fontSize: 60}}/>
        </IconButton>
      </DialogActions>
    </Dialog>
    </div>
  );
};

export default DumpComponent;
