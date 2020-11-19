import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router';
// Material-ui core components / styles:
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
// Material-ui icons:
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';
import UndoIcon from '@material-ui/icons/Undo';
// My components:
import SimpleSnackbar from '../components/SimpleSnackBar';
// Material-ui pro-react components:
import GridContainer from '../components/Grid/GridContainer';
import GridItem from '../components/Grid/GridItem';
// Moment and date resources:
import 'date-fns';
import Moment from 'react-moment';
import 'moment-timezone';
// Assets:
import landingBackground from '../images/landingBackground.jpg';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 840,
    // flexGrow: 1,
  },
  card: {
    maxWidth: 519,
    marginTop: 90,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  fab: {
    margin: theme.spacing(2),
    color: theme.palette.primary.main,
  },
  rootList: {
    width: '100%',
    maxWidth: 752,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialogStyle: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  subtitle: {
    margin: theme.spacing(-1, 0, 0),
    color: theme.palette.primary.main,
  },
  text: {
    color: theme.palette.text.primary,
    display: 'inline-block',
    overflowX: 'scroll',
    overflowY: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    padding: 0,
    margin: '0 5px 0 0',
    width: '120px',
    height: '100%',
  },
  select: {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.main,
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
    "&:active": {
      color: theme.palette.secondary.dark,
    },
    "&:hover": {
      color: theme.palette.info.main,
      textDecoration: 'none',
    }
  },
  list: {
    marginBottom: 90,
    marginTop: 30,
  },
  listItem: {
    maxHeight: '100%',
    width: '100%',
    backgroundColor: theme.palette.background.default,
    borderBottom: '1px solid #e1dfdc',
    paddingLeft: 0,
  },
  primaryIconStyle: {
    fontSize:24,
    color: theme.palette.primary.main,
  },
  secondaryIconStyle: {
    fontSize:24,
    color: theme.palette.secondary.main,
  },
  neutralIconStyle: {
    fontSize:'24px',
    color: theme.palette.text.secondary,
  },
  inline: {
    display: 'inline',
    overflow: 'hidden',
    overflowWrap: 'ellipsis',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  undo: {
    color: theme.palette.secondary.main,
  },
  success: {
    color: theme.palette.success.main,
  },
  cardActionStyle: {
    marginTop: 30,
    float: 'right',
  },
  error: {
    color: theme.palette.error.main,
  },
}));

const Profile = () => {
  const classes = useStyles();
  const [sessionUser, setSessionUser] = useState({});
  const [allTasks, setAllTasks] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  // const [secondary, setSecondary] = useState(true);
  const [firstInitial, setFirstInitial] = useState('');
  const [openDeleteUser, setOpenDeleteUser] = useState(false);
  const [openDeleteTask, setOpenDeleteTask] = useState(false);
  const [task, setTask] = useState({
    name: '',
    category: '',
    chunked: '',
    scheduled: '',
    scheduledAt: '',
    completed: '',
    completedAt: '',
    owner: '',
    priority: 0,
  });
  const [openSnack, setOpenSnack] = useState(false);
  const [snack, setSnack] = useState('');
  
  useEffect(() => {
    let isMounted = true;
    let one = 'http://localhost:8000/api/users/one';
    const requestOne = axios.get(one, { withCredentials: true });
    requestOne
      .then(response => {
        if (isMounted) {
          setSessionUser(response.data.results);
          setFirstInitial(response.data.results.firstName.charAt());
        }
      })
      .catch();
    let two = 'http://localhost:8000/api/tasks/user';
    const requestTwo = axios.get(two, { withCredentials: true });
    requestTwo
      .then(response => {
        if (isMounted) setAllTasks(response.data.results);
      })
      .catch();
    let three = 'http://localhost:8000/api/categories/user';
    const requestThree = axios.get(three, {withCredentials: true });
    requestThree
      .then(response => {
        if (isMounted) setAllCategories(response.data.results);
      }).catch();
    axios
      .all([requestOne, requestTwo, requestThree])
      .then(
        axios.spread((...responses) => {
          const responseOne = responses[0];
          const responseTwo = responses[1];
          const responseThree = responses[2];;
        })
      )
      .catch(() => {navigate('/landing')});
      return () => { isMounted = false };
  }, []);

  const handleOpenSnackBar = (snack) => {
    setOpenSnack(true);
    setSnack(snack);
  };
  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };

  const handleOpenDeleteUser = (e, id) => {
    setOpenDeleteUser(true);
  };

  const handleCloseDeleteUser = () => {
    setOpenDeleteUser(false);
  };

  const handleOpenDeleteTask = (e, id) => {
    onClickHandler(e, id);
    setOpenDeleteTask(true);
  };
  const handleCloseDeleteTask = () => {
    setOpenDeleteTask(false);
  };

  const removeFromDom = taskId => {
    setAllTasks(allTasks.filter(task => task._id !== taskId));
  };


  const onClickHandler = (e, id) => {
    axios
      .get(`http://localhost:8000/api/tasks/${id}`, { withCredentials: true })
      .then(res => {
        if (res.data.message === 'success') {
          setTask(res.data.results);
        }
      })
      .catch();
  };

  const handleUndoComplete = (e,id,snack) => {
    axios.get(`http://localhost:8000/api/tasks/${id}`, {withCredentials: true})
    .then(res => { 
      let completedTask = {};
      completedTask = res.data.results;
      completedTask.completed = false;
      return axios.patch(`http://localhost:8000/api/tasks/${id}`, completedTask, {withCredentials: true})
      .then(res => {
        if (res.data.message === 'success'){
          removeFromDom(id);
          handleOpenSnackBar(snack);
        }
      }).catch();
    }).catch();
  };

  const deleteTask = (e,id, snack) => {
    axios
      .delete(`http://localhost:8000/api/tasks/${id}`,
        {withCredentials: true,
      })
      .then(res => {
        if(res.data.message==='success'){
        handleCloseDeleteTask(snack);
        removeFromDom(id);
        handleOpenSnackBar(snack);
      }
      }).catch();
  };

  const deleteUser = (e, id) => {
    axios
      .delete('http://localhost:8000/api/users/' + id, {
        withCredentials: true,
      })
      .then(res => {
        if (res.data.message === 'success') {
          return axios.get('http://localhost:8000/api/users/logout', { withCredentials: true })
            .then(res => {
              if (res.data.message === 'success') {
                navigate('/landing');
              }
            })
            .catch();
        };
      }).catch();
  };

  return (
    <Container className={classes.root}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={8} md={8}>
          <Card className={classes.card}>
            <CardHeader
              avatar={
                <Avatar aria-label="user" className={classes.avatar}>
                  {firstInitial}
                </Avatar>
              }
              title={<Typography>
                {sessionUser.firstName}&nbsp;{sessionUser.lastName}
              </Typography>}
              subheader={<Typography>
                {sessionUser.email}
              </Typography>}
            />
            <CardMedia
              className={classes.media}
              image={landingBackground}
            />
            <CardContent>
              <Typography variant="subtitle1">
                <Link to="/vision" textDecoration="none" className={classes.link}>
                  My Vision
                </Link>
              </Typography>
              <Typography variant="body2" component="p">
                {sessionUser.vision}
              </Typography>
            </CardContent>
            <CardActions
              className={classes.cardActionStyle}
            >
              <Button
                className={classes.error}
                onClick={handleOpenDeleteUser}
              >
                Delete Account
              </Button>
            </CardActions>
          </Card>
        </GridItem>
      </GridContainer>
      <div style={{marginTop: 30}}>
      <Typography variant='h5'>
        Completed Tasks
      </Typography>
      <List dense secondary = 'true' className={classes.list}>
        {allTasks.map((task, i) =>
        task.completed ?
          (
            <ListItem
              className={classes.listItem}
              key={task._id}
              index={i}
              button
            >
              <Tooltip title="Task completed!" placement="left">
                <IconButton type='button' 
                >
                  <CheckIcon
                  className={classes.success}
                  />
                </IconButton>
              </Tooltip>
              {allCategories.map((category, catIdx) => 
                task.category === category.name ? (
                  <ListItemText
                    key={catIdx}
                    disableTypography
                    className={classes.text}
                    overflow='hidden'
                    primary={<Typography style={{fontSize:15, textDecoration: 'line-through'}}>{task.name}</Typography>}
                    secondary={<Typography style={{fontSize:12, color:category.color}}>{task.category}</Typography>}
                  />
                ) : null
              )}  <ListItemText >
              <ListItemText
                disableTypography
                primary={
                  <Typography style={{fontSize: 15}}>
                    Completed: &nbsp;
                    <Moment format='LL'>
                      {task.completedAt}
                    </Moment>
                  </Typography>}
              >
              </ListItemText>
              </ListItemText>
              <Tooltip title="Undo completed?" placement="left">
                <IconButton 
                  className={classes.secondaryIconStyle} 
                  edge='end' 
                  aria-label='undo completed'
                  onClick={e => {handleUndoComplete(e, task._id, "Task marked incomplete.")}}
                >
                  <UndoIcon></UndoIcon> 
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete Task" placement="right">
                <IconButton 
                  className={classes.deleteStyle} 
                  edge='end' 
                  aria-label='delete'
                  onClick={e => {handleOpenDeleteTask(e, task._id)}}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </ListItem>
          ) : (null)
        )}
      </List>
      </div>
      {/* DELETE USER Dialog */}
      <Dialog
        open={openDeleteTask}
        onClose={handleCloseDeleteTask}
        aria-labelledby="alert-delete-task"
        aria-describedby="alert-are-you-sure?"
      >
        <DialogTitle id="DeleteTaskTitle">{"Delete Task?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="DeleteTaskAlert">
            This action cannot be undone. Your task will be removed from its category, calendar, and trajectory stats. Are you sure you want to delete this task?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteTask} color="primary">
            Cancel
          </Button>
          <Button
            className={classes.error} 
            onClick={e => {deleteTask(e, task._id, "Task deleted successfully.")}}>
            Delete Task
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDeleteUser}
        onClose={handleCloseDeleteUser}
        aria-labelledby="alert-delete-user"
        aria-describedby="alert-are-you-sure?"
      >
        <DialogTitle id="DeleteUserTitle">{"Delete Account?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="DeleteUserAlert">
            This action cannot be undone. All of your data will be permanently removed. Are you sure you want to delete your account?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteUser} color="primary">
            Cancel
          </Button>
          <Button 
            className={classes.error}
            onClick={e => {deleteUser(e, sessionUser._id)}}
          >
            Delete Account
          </Button>
        </DialogActions>
      </Dialog>
      <SimpleSnackbar 
        snack={snack}
        openSnack={openSnack}
        handleOpenSnackBar={handleOpenSnackBar}
        handleCloseSnackBar={handleCloseSnackBar}
      />
    </Container>
  );
};

export default Profile;
