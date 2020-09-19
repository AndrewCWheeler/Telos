import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
// import Avatar from '@material-ui/core/Avatar';
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
// import FolderIcon from '@material-ui/icons/Folder';
import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// import { createMuiTheme } from '@material-ui/core/styles';
import AddBoxIcon from '@material-ui/icons/AddBox';
import CssBaseline from '@material-ui/core/CssBaseline';
import { shadows } from '@material-ui/system';

// import BottomNavComponent from './BottomNavComponent';

// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       light: '#757ce8',
//       main: '#3f50b5',
//       dark: '#002884',
//       contrastText: '#fff',
//     },
//     secondary: {
//       light: '#ff7961',
//       main: '#f44336',
//       dark: '#ba000d',
//       contrastText: '#000',
//     },
//   },
// });
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 752,
    flexGrow: 1,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
    color: theme.palette.primary.main,
  },
  text: {
    color: theme.palette.primary.contrastText,
  },
  select: {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.main,
  },

  paper: {
    maxWidth: 640,
    margin: `${theme.spacing(1)}px auto`,
    // margin: theme.spacing(2, 0),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  paper2: {
    backgroundColor: theme.palette.primary.main,
    border: `2px solid ${theme.palette.primary.contrastText}`,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  list: {
    margin: `${theme.spacing(1)}px auto`,
    height: '100%',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    boxShadow: theme.shadows[10],
    borderRadius: 10,
  },
  item: {
    margin: theme.spacing(1, 2),
    color: theme.palette.primary.contrastText,
    oveflow: 'hidden',
    textOverflow: 'ellipsis',
    // color: theme.palette.primary.main,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    backgroundColor: theme.palette.background.main,
    // justify: 'center',
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
    // onChunkChangeHandler,
    removeFromDom,
    onPatchHandler,
    selectedIndex,
    setSelectedIndex,
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
          <Typography variant='h6' className={classes.title}>
            Select Chunk Category, then Add to Confirm...
          </Typography>
          <div>
            <List dense={dense}>
              {allTasks.map((task, i) =>
                task.chunked ? (
                  ''
                ) : (
                  // <Paper key={i} elevation={5} className={classes.paper}>
                  <ListItem
                    className={classes.list}
                    key={i}
                    disableRipple

                    // button
                    // selected={selectedIndex === 0}
                    // onClick={event => handleListItemClick(event, 0)}
                  >
                    {/* <i className='fa fa-folder-open-o' aria-hidden='true'></i> */}
                    <IconButton type='button' onClick={handleOpen}>
                      <FolderOpenIcon className={classes.text} />
                    </IconButton>
                    <Modal
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
                      <Fade in={open}>
                        <Grid className={classes.paper2}>
                          <FormControl
                            variant='standard'
                            className={classes.formControl}
                          >
                            <InputLabel
                              className={classes.text}
                              htmlFor='category'
                            >
                              Chunk...
                            </InputLabel>
                            <Select
                              native
                              className={classes.text}
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
                              <option aria-label='None' value='' />
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
                        </Grid>
                        {/* <div className={classes.paper}>
                            <h2 id='spring-modal-title'>Spring modal</h2>
                            <p id='spring-modal-description'>
                              react-spring animates me.
                            </p>
                          </div> */}
                      </Fade>
                    </Modal>

                    {/* <ListItemAvatar>
                        <Avatar>
                          <IconButton aria-label='delete'>
                            <FolderIcon taskId={task._id} />
                          </IconButton>
                        </Avatar>
                      </ListItemAvatar> */}
                    <ListItemText
                      className={classes.item}
                      primary={task.name}
                      secondary={secondary ? task.category : null}
                    />
                    <IconButton
                      edge='start'
                      aria-label='add chunked'
                      onClick={e => {
                        onPatchHandler(e, task._id);
                      }}
                    >
                      <AddBoxIcon className={classes.text} />
                    </IconButton>
                    <IconButton edge='end' aria-label='delete'>
                      <DeleteComponent
                        taskId={task._id}
                        successCallback={() => removeFromDom(task._id)}
                      />
                    </IconButton>
                  </ListItem>
                  // </Paper>
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
