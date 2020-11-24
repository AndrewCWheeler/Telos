import React, { useState } from 'react';
// Material-ui core components:
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import List from '@material-ui/core/List';
import Link from '@material-ui/core/Link';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
// Material-ui icons:
import LabelIcon from '@material-ui/icons/Label';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
// My components:
import DeleteComponent from './DeleteComponent';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 840,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialogStyle: {
    backgroundColor: theme.palette.background.paper,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    maxWidth: 840,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(3, 0),
  },
  title: {
    margin: theme.spacing(4, 0, 2),
    color: theme.palette.primary.main,
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
    "&:active": {
      color: theme.palette.info.dark,
    },
    "&:hover": {
      color: theme.palette.info.main,
      textDecoration: 'none',
    }
  },
  name: {
    marginBottom: theme.spacing(2),
  },
  subtitle: {
    margin: theme.spacing(4, 1, 2),
  },
  folderStyle: {
    fontSize:24,
  },
  icon: {
    color: theme.palette.primary.main,
    margin: theme.spacing(0, 1, 0),
  },
  list: {
    marginBottom: 90,
    marginTop: 60,
  },
  listItem: {
    maxHeight: '100%',
    height: 75,
    width: '100%',
    backgroundColor: theme.palette.background.default,
    borderBottom: `.5px solid ${theme.palette.background.paper}`,
  },
  text: {
    color: theme.palette.text.primary,
    display: 'inline-block',
    overflowX: 'scroll',
    overflowY: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '120px',
    height: '100%',
    marginTop: 20,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 250,
  },
}));

const AllDumpedList = props => {
  const {
    task, 
    open,
    handleOpen,
    handleClose,
    allTasks,
    allCategories,
    onChangeChunkHandler,
    onClickHandler,
    removeFromDom,
    onPatchHandler,
    selectedCategory,
    onChangeHandler,
    handleKeyDownEdit,
    onPatchEditNameHandler,
    handleOpenDumpEdit,
    handleCloseDumpEdit,
    openDumpEdit,
    setOpenDumpEdit,
    
  } = props;
  const classes = useStyles();

  return (
    <div>
    <CssBaseline />
    <Grid container direction='row' justify='center' alignItems='center'>
      <Grid className={classes.root} item xs={12}>
        <List dense secondary="true" className={classes.list}>
          {allTasks.map((task, i) =>
            task.chunked ? (
              null
            ) : (
              <ListItem
                className={classes.listItem}
                key={i}
                button="true"
              >
                  <ListItemIcon style={{marginRight: -24, marginTop: -30}} type='button' onClick={e => handleOpen(e, task._id)}>
                    <LabelIcon
                    className={classes.link}
                    style={{fontSize:24}}
                    />
                  </ListItemIcon>
                <ListItemText
                  disableTypography
                  className={classes.text}
                  primary={
                  <Link
                    button="true"
                    onClick={e => handleOpenDumpEdit(e, task._id)}
                    style={{textDecoration:'none'}}
                  >
                    <Typography
                    className={classes.link}
                    noWrap
                    style={{fontSize:15}}
                    >
                      {task.name}
                    </Typography>
                  </Link>
                  }
                  secondary={<Typography style={{fontSize:12}}>{task.category}</Typography>}
                />
                <IconButton className={classes.deleteStyle} edge='end' aria-label='delete'>
                  <DeleteComponent
                    taskId={task._id}
                    successCallback={() => removeFromDom(task._id)}
                  />
                </IconButton>
              </ListItem>
            )
          )}
        </List>
      </Grid>
    </Grid>
    {/* Edit Task Name */}
    <Dialog
      aria-labelledby='dump-modal-title'
      className={classes.modal}
      open={openDumpEdit}
      onClose={handleCloseDumpEdit}
      closeAfterTransition
      fullWidth
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <DialogTitle className={classes.title}>{"Edit Task Name"}</DialogTitle>
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
            onKeyPress={e => {handleKeyDownEdit(e, task._id)}}
            name='name'
            value={task.name}
          />
        {/* </Grid>
      </Grid> */}
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={handleCloseDumpEdit}
          color="primary"
          >
          Cancel
        </Button>
        <IconButton
            className={classes.add}
            onClick={e => {
              onPatchEditNameHandler(e, task._id);
            }}
            >
            <LibraryAddIcon color="primary" style={{fontSize: 24}}/>
        </IconButton>
      </DialogActions>
    </Dialog>
    <Dialog
      aria-labelledby='Chunk-Task-modal'
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <DialogTitle className={classes.title}>{"Chunk"}</DialogTitle>
      <DialogContent className={classes.dialogStyle}>
        <Typography className={classes.name}>
            {task.name}
        </Typography>
        <FormControl
          variant='standard'
          className={classes.formControl}
          >
          <InputLabel
            id='category'
            >
            Chunk...
          </InputLabel>
          <Select
            value={selectedCategory}
            onChange={e => {
              onChangeChunkHandler(e);
            }}
            labelId='category'
            label='Chunk...'
            name='categoryObject'
            >
            <MenuItem aria-label='None' selected value=''><em>None</em></MenuItem>
            {allCategories.map((category, catIdx) => 
              <MenuItem
                key={catIdx}
                value={category}
                placeholder={category.name}
                style={{color:category.color}}
              >
                  <LabelIcon
                    style={{fontSize:18,marginRight:12}}
                  />
                  {category.name}
              </MenuItem>
            )}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={e => {handleClose(e)}}
          color="primary"
          >
          Cancel
        </Button>
        <IconButton
          className={classes.icon}
          aria-label='update task'
          onClick={e => {
            onPatchHandler(e, task._id, selectedCategory, 'Task Chunked!', "success");
          }}
          >
          <LibraryAddIcon />
        </IconButton>
      </DialogActions>
    </Dialog>

    </div>
  );
};
export default AllDumpedList;
