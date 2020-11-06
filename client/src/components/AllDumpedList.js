import React, { useState } from 'react';
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


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 752,
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
    color: theme.palette.primary.main,
  },
  text: {
    color: theme.palette.primary.contrastText,
  },
  textModal: {
    color: theme.palette.primary.main,
  },
  icon: {
    color: theme.palette.primary.main,
    margin: theme.spacing(2, 1, 0),
  },
  list: {
    marginBottom: '60px',
  },
  listItem: {
    margin: theme.spacing(1,0,0),
    maxHeight: '100%',
    width: '100%',
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
    color: theme.palette.primary.contrastText,
    boxShadow: theme.shadows[10],
    borderRadius: 3,
  },
  item: {
    margin: theme.spacing(1, 2),
    width: 250,
    color: theme.palette.primary.contrastText,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 250,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });
  Fade.propTypes = {
    children: PropTypes.element,
    in: PropTypes.bool.isRequired,
    onEnter: PropTypes.func,
    onExited: PropTypes.func,
  };
  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

const AllDumpedList = props => {
  const {
    allTasks,
    setAllTasks,
    onClickHandler,
    onChunkHandler,
    removeFromDom,
    onPatchHandler,
    selectedIndex,
    setSelectedIndex,
    onChangeHandler,
    onPatchEditNameHandler,
  } = props;
  const classes = useStyles();
  const [dense, setDense] = useState(false);
  const [secondary, setSecondary] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Container className={classes.root}>
      <CssBaseline />
      <Grid container direction='row' justify='center'>
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
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          {/* <Typography variant='h6' className={classes.title}>
            Select Chunk Category, then Add to Confirm...
          </Typography> */}
          <div>
            <List dense={dense} className={classes.list}>
              {allTasks.map((task, i) =>
                task.chunked ? (
                  ''
                ) : (
                  <ListItem
                    className={classes.listItem}
                    key={i}
                    disableRipple
                  >
                    <Tooltip title="Chunk task" placement="left">
                      <IconButton type='button' onClick={e => handleOpen(e)}>
                        <FolderOpenIcon 
                        edge="start"
                        className={classes.text} 
                        disableRipple
                        />
                      </IconButton>
                    </Tooltip>
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
                        id='dump'
                        label='Edit task here...'
                        multiline
                        rowsMax={2}
                        size='medium'
                        variant='outlined'
                        onChange={e => {
                          onChangeHandler(e);
                        }}
                        onClick={e => {
                          onClickHandler(e, task._id);
                        }}
                        onBlur={e => {
                          onPatchEditNameHandler(e, task._id);
                        }}
                        placeholder={task.name}
                        name='name'
                        value={selectedIndex[i]}
                        />
                        <FormControl
                          variant='standard'
                          className={classes.formControl}
                        >
                          <InputLabel
                            className={classes.textModal}
                            htmlFor='category'
                          >
                            Chunk...
                          </InputLabel>
                          <Select
                            native
                            className={classes.textModal}
                            value={selectedIndex[i]}
                            onClick={e => {
                              onClickHandler(e, task._id);
                            }}
                            onChange={e => {
                              onPatchHandler(e, task._id);
                            }}
                            label='Chunk...'
                            name='category'
                          >
                            <option aria-label='None' value=''/>
                            <option value='Home'>Home</option>
                            <option value='Health'>Health</option>
                            <option value='Family'>Family</option>
                            <option value='Friends'>Friends</option>
                            <option value='Finance'>Finance</option>
                            <option value='Creative'>Creative</option>
                            <option value='Spiritual'>Spiritual</option>
                            <option value='Social'>Social</option>
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
                          onClick={handleClose}
                          >
                          <LibraryAddIcon />
                        </IconButton>
                      </DialogActions>
                    </Dialog>
                    <ListItemText
                      className={classes.text}
                      primary={task.name}
                      secondary={secondary ? task.category : null}
                    />
                    <Tooltip title="Delete Task" placement="right">
                      <IconButton edge='end' aria-label='delete'>
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
    </Container>
  );
};

export default AllDumpedList;
