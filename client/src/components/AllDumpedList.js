import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import List from '@material-ui/core/List';
import LabelIcon from '@material-ui/icons/Label';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import Typography from '@material-ui/core/Typography';
import DeleteComponent from './DeleteComponent';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import AddBoxIcon from '@material-ui/icons/AddBox';
import CssBaseline from '@material-ui/core/CssBaseline';
import { shadows } from '@material-ui/system';
import MenuItem from '@material-ui/core/MenuItem';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Link from '@material-ui/core/Link';
// import CategoryList from './CategoryList';


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 840,
    // flexGrow: 1,
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
  title: {
    margin: theme.spacing(4, 0, 2),
    color: theme.palette.primary.main,
  },
  subtitle: {
    margin: theme.spacing(4, 1, 2),
    // color: theme.palette.primary.main,
  },
  folderStyle: {
    fontSize:24,
    // color: theme.palette.primary.main,
  },
  // text: {
  //   color: theme.palette.primary.contrastText,
  // },
  textModal: {
    // color: theme.palette.primary.main,
  },
  icon: {
    color: theme.palette.primary.main,
    margin: theme.spacing(0, 1, 0),
  },
  deleteStyle: {
    // color: theme.palette.secondary.main,
  },
  list: {
    marginBottom: '90px',
  },
  listItem: {
    // margin: theme.spacing(1,0,0),
    maxHeight: '100%',
    width: '100%',
    backgroundColor: theme.palette.background.default,
    // '&:hover': {
    //   backgroundColor: theme.palette.primary.dark,
    // },
    // color: theme.palette.primary.contrastText,
    // boxShadow: theme.shadows[10],
    // borderRadius: 3,
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
    // selectedCategoryIdx,
    // setSelectedCategoryIdx,
    // passCategoryIdx,
    task, 
    setTask,
    open,
    handleOpen,
    handleClose,
    allTasks,
    allCategories,
    setAllTasks,
    onClickHandler,
    onChangeChunkHandler,
    removeFromDom,
    onPatchHandler,
    selectedObject,
    setSelectedObject,
    onChangeHandler,
    onPatchEditNameHandler,

  } = props;
  const classes = useStyles();
  const [dense, setDense] = useState(true);
  const [secondary, setSecondary] = useState(true);

  return (
    <Container className={classes.root}>
      <CssBaseline />
      {/* <Grid container direction='row' justify='center'>
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={dense}
                onChange={event => setDense(event.target.checked)}
              />
            }
            label='Enable dense'
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={secondary}
                onChange={event => setSecondary(event.target.checked)}
              />
            }
            label='Enable secondary text'
          />
        </FormGroup>
      </Grid> */}
      <Grid container spacing={1}>
        <Grid item xs={12}>
          {/* <Typography variant='h6' className={classes.title}>
            Select Chunk Category, then Add to Confirm...
          </Typography> */}
          <div>
            <List dense secondary className={classes.list}>
              {allTasks.map((task, i) =>
                task.chunked ? (
                  ''
                ) : (
                  <ListItem
                    className={classes.listItem}
                    key={i}
                    disableRipple
                    button
                  >
                    <Tooltip title="Chunk task" placement="left">
                      <IconButton type='button' onClick={e => handleOpen(e, task._id)}>
                        <LabelIcon
                        className={classes.folderStyle}
                        // edge="start" 
                        disableRipple
                        />
                      </IconButton>
                    </Tooltip>
                    <ListItemText
                      disableTypography
                      primary={
                      <Link
                        button
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
                      secondary={<Typography style={{fontSize:12}}>{secondary ? task.category : null}</Typography>}
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
          </div>
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
          // onClick={e => {
            //   onClickHandler(e, task._id);
            // }}
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
              // className={classes.textModal}
              id='category'
              >
              Chunk...
            </InputLabel>
            <Select
              // native
              // className={classes.textModal}
              value={selectedObject}
              onChange={e => {
                onChangeChunkHandler(e);
              }}
              labelId='category'
              label='Chunk...'
              name='categoryObject'
              >
              <MenuItem aria-label='None' value=''><em>None</em></MenuItem>
              {allCategories.map((category, catIdx) => 
                <MenuItem
                  key={catIdx}
                  value={category}
                  placeholder={category.name}
                  style={{color:category.color}}
                  // onChange={e => {passCategoryIdx(e, category.name)}}
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
              onPatchHandler(e, task._id, selectedObject, 'Task Chunked!');
            }}
            >
            <LibraryAddIcon />
          </IconButton>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AllDumpedList;
