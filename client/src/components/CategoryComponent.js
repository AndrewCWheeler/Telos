import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Backdrop from '@material-ui/core/Backdrop';

import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DeleteCategoryComponent from './DeleteCategoryComponent';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import { navigate } from '@reach/router';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CssBaseline from '@material-ui/core/CssBaseline';
import SimpleSnackbar from './SimpleSnackBar';


const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '30ch',
      color: theme.palette.text.primary,
    },
    width: '100%',
    maxWidth: 840,
  },
  fab: {
    margin: theme.spacing(2),
    color: theme.palette.primary.main,
  },
  folderStyle: {
    fontSize:24,
    color: theme.palette.primary.main,
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
  title: {
    margin: theme.spacing(4, 0, 2),
    color: theme.palette.primary.main,
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

const CategoryComponent = props => {
  const classes = useStyles();
  const [sessionUserId, setSessionUserId] = useState('');
  const [category, setCategory] = useState({
    name: '',
    color: '',
  });
  const [allCategories, setAllCategories] = useState([]);
  const [load, setLoad] = useState(0);
  const [open, setOpen] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [snack, setSnack] = useState('');
  
  const handleOpenSnackBar = (snack) => {
    setSnack(snack); 
    setOpenSnack(true);
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack(false);
  };

  const handleOpen = (e, id) => {
    onClickHandler(e, id);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  const onChangeHandler = e => {
    setCategory({
      ...category,
      owner: sessionUserId,
      [e.target.name]: e.target.value,
    });
    console.log(category);
  };

  const handleKeyDown = (e, snack) => {
    if (e.key === 'Enter') {
      console.log('Enter Key Pressed!')
      onSubmitHandler(e, snack);
    }
  };

  const onSubmitHandler = (e, snack) => {
    e.preventDefault();
    console.log('This is the category just before going to post...');
    console.log(category);
    axios
      .post(`http://localhost:8000/api/categories/${sessionUserId}`, category, {
        withCredentials: true,
      })
      .then(res => {
        handleOpenSnackBar(snack);
        console.log(res.data.message);
        console.log(res.data.results);
        setCategory({
          name: '',
          color: '',
        });
        let count = load;
        if (count >= 0) {
          count++;
          setLoad(count);
        }
        console.log(load);
        navigate('/category');
      })
      .catch(err => {
        console.log(err);
      });
  };
  
  useEffect(() => {
    let one = 'http://localhost:8000/api/users/one';
    const requestOne = axios.get(one, { withCredentials: true });
    requestOne
      .then(response => {
        setSessionUserId(response.data.results._id);
      })
      .catch(error => {
        console.log(error);
      });
    let two = 'http://localhost:8000/api/categories/user';
    const requestTwo = axios.get(two, { withCredentials: true });
    requestTwo
      .then(response => {
        setAllCategories(response.data.results);
      })
      .catch(error => {
        console.log(error);
      });
    axios
      .all([requestOne, requestTwo])
      .then(
        axios.spread((...responses) => {
          const responseOne = responses[0];
          const responseTwo = responses[1];
          console.log(responseOne, responseTwo);
        })
      )
      .catch(errors => {
        navigate('/signup');
      });
  }, [load]);

  const removeFromDom = categoryId => {
    setAllCategories(allCategories.filter(category => category._id !== categoryId));
  };

  const onClickHandler = (e, id) => {
    axios
      .get(`http://localhost:8000/api/categories/${id}`, { withCredentials: true })
      .then(res => {
        if (res.data.message === 'success') {
          setCategory(res.data.results);
        }
      })
      .catch(err => console.log(err));
  };

  const onPatchHandler = (e, id, snack) => {
    category.name = e.target.value;
    axios
      .patch('http://localhost:8000/api/categories/' + id, category, {
        withCredentials: true,
      })
      .then(res => {
        if (res.data.message = 'success'){
          handleOpenSnackBar(snack);
          // removeFromDom(id);
          handleClose();
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <CssBaseline />
      <div style={{marginTop:'90px'}}>
        {/* <Typography
          variant='h2'
          // component='h2'
          className={classes.title}
          >
          {'\u03C4\u03AD\u03BB\u03BF\u03C2'}
        </Typography> */}
        <Typography
        className={classes.title}
        variant='h5'>
          Categories
        </Typography>
      </div>
      <div className={classes.paper}>
        <form className={classes.root} noValidate autoComplete='off'>
          <Grid className={classes.dump} container direction='row' justify='center' alignItems='center'>
            <Grid item>
              <TextField
                id='category'
                label='Add Category...'
                multiline
                rowsMax={2}
                size='medium'
                variant='outlined'
                onChange={e => {
                  onChangeHandler(e);
                }}
                onKeyPress={e => {handleKeyDown(e, "Category Created!")}}
                name='name'
                value={category.name}
              />
            </Grid>
          </Grid>
          <Grid className={classes.dump} container direction='row' justify='center' alignItems='center'>
            <Grid item>
              <Tooltip title="Add" placement="right">
                <IconButton
                  className={classes.fab}
                  onClick={e => {
                    onSubmitHandler(e, "Category Created!");
                  }}
                  >
                  <AddCircleIcon fontSize='large' />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </form>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            {/* <Typography variant='h6' className={classes.title}>
              Select Chunk Category, then Add to Confirm...
            </Typography> */}
            <div>
              <List dense secondary className={classes.list}>
                {allCategories.map((category, i) =>
                    <ListItem
                      className={classes.listItem}
                      key={i}
                      disableRipple
                      button
                    >
                      <Tooltip title="Color category" placement="left">
                        <IconButton type='button' 
                        // onClick={e => handleOpen(e, category._id)}
                        >
                          <FolderOpenIcon
                          className={classes.folderStyle}
                          // edge="start" 
                          disableRipple
                          />
                        </IconButton>
                      </Tooltip>
                      <ListItemText
                        disableTypography
                        primary={<Typography style={{fontSize:15}}>{category.name}</Typography>}
                        // secondary={<Typography style={{fontSize:12}}>{secondary ? task.category : null}</Typography>}
                      />
                      <Tooltip title="Delete Category" placement="right">
                        <IconButton className={classes.deleteStyle} edge='end' aria-label='delete'>
                          <DeleteCategoryComponent
                            categoryId={category._id}
                            successCallback={() => removeFromDom(category._id)}
                          />
                        </IconButton>
                      </Tooltip>
                    </ListItem>
                )}
              </List>
            </div>
          </Grid>
        </Grid>
      </div>
      <SimpleSnackbar 
      snack={snack}
      openSnack={openSnack}
      handleOpenSnackBar={handleOpenSnackBar}
      handleCloseSnackBar={handleCloseSnackBar} 
      />
    </div>
  );
};

export default CategoryComponent;
