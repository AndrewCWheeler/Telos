import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
// Material-ui core components / styles:
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
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
import UndoIcon from '@material-ui/icons/Undo';
// My components:
import DeleteComponent from '../components/DeleteComponent';
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
}));

const Profile = () => {
  const classes = useStyles();
  const [load, setLoad] = useState(0);
  const [sessionUser, setSessionUser] = useState({});
  const [allTasks, setAllTasks] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [secondary, setSecondary] = useState(true);
  const [firstInitial, setFirstInitial] = useState('');
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

  const removeFromDom = taskId => {
    setAllTasks(allTasks.filter(task => task._id !== taskId));
  };

  useEffect(() => {
    let one = 'http://localhost:8000/api/users/one';
    const requestOne = axios.get(one, { withCredentials: true });
    requestOne
      .then(response => {
        setSessionUser(response.data.results);
        setFirstInitial(response.data.results.firstName.charAt());
      })
      .catch(error => {
        console.log(error);
      });
    let two = 'http://localhost:8000/api/tasks/user';
    const requestTwo = axios.get(two, { withCredentials: true });
    requestTwo
      .then(response => {
        setAllTasks(response.data.results);
      })
      .catch(error => {
        console.log(error);
      });
    let three = 'http://localhost:8000/api/categories/user';
    const requestThree = axios.get(three, {withCredentials: true });
    requestThree
      .then(response => {
        setAllCategories(response.data.results);
      }).catch(error => {
        console.log(error);
      });
    axios
      .all([requestOne, requestTwo, requestThree])
      .then(
        axios.spread((...responses) => {
          const responseOne = responses[0];
          const responseTwo = responses[1];
          const responseThree = responses[2];
          console.log(responseOne, responseTwo, responseThree);
        })
      )
      .catch(errors => {
        navigate('/landing');
      });
  }, [load]);

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
      }).catch(err=> console.log(err));
    }).catch(err => console.log(err));
  };

  const deleteUser = (e, id) => {
    axios
      .delete('http://localhost:8000/api/users/' + id, {
        withCredentials: true,
      })
      .then(response => {
        if (response.data.message === 'success') {
          let count = load;
          if (count >= 0) {
            count++;
            setLoad(count);
          }
        }
      })
      .catch(err => console.log(err));
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
              <Typography variant="body1" color="textPrimary" component="p">
                My Vision:
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {sessionUser.vision} I am a child of the living God. Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste accusantium esse dolores eos corrupti recusandae, magnam, incidunt asperiores inventore impedit laboriosam eaque optio perferendis molestias nihil ipsum voluptatem adipisci cupiditate!
              </Typography>
            </CardContent>
          </Card>
        </GridItem>
      </GridContainer>
      {/* <Button
        onClick={(e, id) => {
          deleteUser(e, sessionUser._id);
        }}
      >
        Delete
      </Button> */}
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
              key={i}
              disableRipple
              button
            >
              <Tooltip title="Task completed!" placement="left">
                <IconButton type='button' 
                >
                  <CheckIcon
                  className={classes.success}
                  disableRipple
                  />
                </IconButton>
              </Tooltip>
              {allCategories.map((category, catIdx) => 
                task.category === category.name ? (
                  <ListItemText
                    disableTypography
                    className={classes.text}
                    textOverflow='ellipsis'
                    overflow='hidden'
                    primary={<Typography style={{fontSize:15, textDecoration: 'line-through'}}>{task.name}</Typography>}
                    secondary={<Typography key={catIdx} style={{fontSize:12, color:category.color}}>{secondary ? task.category : null}</Typography>}
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
                  onClick={e => {handleUndoComplete(e, task._id, "Task marked imcomplete.")}}
                >
                  <UndoIcon></UndoIcon> 
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete Task" placement="right">
                <IconButton className={classes.deleteStyle} edge='end' aria-label='delete'>
                  <DeleteComponent
                    taskId={task._id}
                    successCallback={() => removeFromDom(task._id)}
                  />
                </IconButton>
              </Tooltip>
            </ListItem>
          ) : (null)
        )}
      </List>
      </div>
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
