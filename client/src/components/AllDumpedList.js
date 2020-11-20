import React, { useState } from 'react';
// Material-ui core components:
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import List from '@material-ui/core/List';
import Link from '@material-ui/core/Link';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
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
    marginBottom: '90px',
  },
  listItem: {
    maxHeight: '100%',
    width: '100%',
    backgroundColor: theme.palette.background.default,
    borderBottom: '1px solid #e1dfdc',
    paddingLeft: 0,
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
    removeFromDom,
    onPatchHandler,
    selectedCategory,
    onChangeHandler,
    onPatchEditNameHandler,

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
              ''
            ) : (
              <ListItem
                className={classes.listItem}
                key={i}
                button="true"
              >
                <Tooltip title="Chunk task" placement="left">
                  <IconButton type='button' onClick={e => handleOpen(e, task._id)}>
                    <LabelIcon
                    className={classes.folderStyle}
                    />
                  </IconButton>
                </Tooltip>
                <ListItemText
                  disableTypography
                  primary={
                  <Link
                    button="true"
                    onClick={e => handleOpen(e, task._id)}
                    style={{textDecoration:'none'}}
                  >
                    <Typography
                      style={{fontSize:15}}
                      color="textPrimary"
                      >
                      {task.name}
                    </Typography>
                  </Link>
                  }
                  secondary={<Typography style={{fontSize:12}}>{task.category}</Typography>}
                />
                <Tooltip title="Delete Task" placement="right">
                  <IconButton className={classes.deleteStyle} edge='end' aria-label='delete'>
                    <DeleteComponent
                      taskId={task._id}
                      successCallback={() => removeFromDom(task._id)}
                    />
                  </IconButton>
                </Tooltip>
              </ListItem>
            )
          )}
        </List>
      </Grid>
    </Grid>
    <Dialog
      aria-labelledby='spring-modal-title'
      aria-describedby='spring-modal-description'
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <DialogContent className={classes.dialogStyle}>
        <Typography className={classes.title}>
          <h2>
            {task.name}
          </h2>
        </Typography>
        <TextField
          inputProps={{ autoFocus: true }}
          id='dump'
          label='Edit task here...'
          multiline
          rowsMax={2}
          size='medium'
          variant='outlined'
          onChange={e => {
            onChangeHandler(e);
          }}
          onBlur={e => {
            onPatchEditNameHandler(e, task._id);
          }}
          placeholder={task.name}
          name='name'
          value={task.name}
          />
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
          onClick={handleClose}
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
