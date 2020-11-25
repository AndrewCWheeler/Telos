import React from 'react';
// Material-ui core components:
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
  const { inputRef, dumpRef, openDumpSubmit, handleOpenDumpSubmit, handleCloseDumpSubmit, onChangeHandler, task, handleKeyDown, onSubmitHandler } = props;

  return (
    <div ref={dumpRef}>
      <CssBaseline />
      <Fab className={classes.fab} onClick={handleOpenDumpSubmit}>
        <AddIcon className={classes.extraLarge}/>
      </Fab>
      <Dialog
        aria-labelledby='dump-modal-title'
        className={classes.modal}
        open={openDumpSubmit}
        onClose={handleCloseDumpSubmit}
        fullWidth
      >
      <DialogTitle className={classes.title}>{"Dump"}</DialogTitle>
      <DialogContent className={classes.dialogStyle}>
        <TextField
          autoFocus
          inputRef={inputRef}
          style={{marginTop: 6}}
          fullWidth
          id='dump'
          label='Dump...'
          onChange={e => {
            onChangeHandler(e);
          }}
          onKeyPress={e => {handleKeyDown(e)}}
          name='name'
          value={task.name}
          type="text"
        />
      </DialogContent>
      <DialogActions>
        <Button
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
            <LibraryAddIcon style={{fontSize: 24}}/>
        </IconButton>
      </DialogActions>
    </Dialog>
    </div>
  );
};

export default DumpComponent;
