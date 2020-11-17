import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Backdrop from '@material-ui/core/Backdrop';
import ColorizeIcon from '@material-ui/icons/Colorize';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import EditIcon from '@material-ui/icons/Edit';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DeleteCategoryComponent from '../components/DeleteCategoryComponent';

import LabelIcon from '@material-ui/icons/Label';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
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

import PaletteIcon from '@material-ui/icons/Palette';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CssBaseline from '@material-ui/core/CssBaseline';
import SimpleSnackbar from '../components/SimpleSnackBar';
import InputLabel from '@material-ui/core/InputLabel';

import { green } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';
import RadioColorButtons from '../components/RadioColorButtons';


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
  iconStyle: {
    fontSize:24,
    color: theme.palette.primary.main,
  },
  layout: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
  neutralIconStyle: {
    fontSize:24,
    // color: theme.palette.text.secondary,
  },
  paper: {
    maxWidth: 840,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(3, 0),
  },
  title: {
    marginTop: theme.spacing(4),
    // color: theme.palette.primary.main,
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
    // margin: theme.spacing(1),
    maxWidth: 300,
  },
}));

const Category = props => {
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
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedColor, setSelectedColor] = useState('');

  const handleChangeColor = (e) => {
    setSelectedColor(e.target.value);
    onChangeHandler(e);
  };

  const handleOpenEdit = (e, id) => {
    onClickHandler(e, id);
    setOpenEdit(true);
  };
  console.log(category);

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  
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
    console.log("Category inside onChangeHandler: ")
    console.log(category);
  };
  console.log("Category outside onChangeHandler: ")
  console.log(category);

  const handleKeyDown = (e, snack) => {
    if (e.key === 'Enter') {
      console.log('Enter Key Pressed!')
      onSubmitHandler(e, snack);
    }
  };

  const onSubmitHandler = (e, snack) => {
    // e.preventDefault();
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
        navigate('/landing');
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
    // category.name = e.target.value;
    axios
      .patch('http://localhost:8000/api/categories/' + id, category, {
        withCredentials: true,
      })
      .then(res => {
        if (res.data.message = 'success'){
          handleOpenSnackBar(snack);
          // removeFromDom(id);
          handleCloseEdit();
        }
        let count = load;
        if (count >= 0) {
          count++;
          setLoad(count);
        }
        console.log(load);
        navigate('/category');
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
      <div 
      className={classes.paper}
      >
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
                      <Tooltip title="Edit" placement="left">
                      <IconButton
                        type='button'
                        edge='end'
                        onClick={e => {
                          handleOpenEdit(e, category._id);
                        }}
                      >
                        <LabelIcon
                        className={classes.neutralIconStyle}
                        style={{color:category.color}}
                        />
                      </IconButton>
                      </Tooltip>
                      <ListItemText
                        disableTypography
                        primary={<Typography style={{fontSize:15, color: category.color, marginLeft: 9}}>{category.name}</Typography>}
                      />
                      <Tooltip title="Delete Category?" placement="right">
                        <IconButton edge='end' aria-label='delete'>
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
      <Dialog
        aria-labelledby='modal-edit-select'
        aria-describedby='choose-edit-category'
        className={classes.modal}
        open={openEdit}
        onClose={handleCloseEdit}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <DialogContent
          className={classes.dialogStyle}
        >
          {/* <Tooltip title="Unchunk" placement="top">
            <IconButton 
            className={classes.undo}
            role='button'
            onClick={e => {onPatchUnChunkHandler(e, category._id)}}
            >
              <Undo />
            </IconButton>
          </Tooltip> */}
          <Typography 
            variant='h5' 
            className={classes.title}
            style={{color:selectedColor}}  
          >
            {category.name}
          </Typography>
          <TextField
            id='dump'
            label='Edit category here...'
            multiline
            rowsMax={2}
            size='medium'
            variant='outlined'
            onChange={e => {
              onChangeHandler(e);
            }}
            // onClick={e => {
            //   onClickHandler(e, category._id);
            // }}
            // onBlur={e => {
            //   onPatchEditNameHandler(e, category._id);
            // }}
            placeholder={category.name}
            name='name'
            value={category.name}
          />
          <div className={classes.formControl}>
            <RadioColorButtons
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              handleChangeColor={e => {handleChangeColor(e)}}
            />
        </div>
        </DialogContent>
        <DialogActions>
        <Button 
          autoFocus 
          onClick={handleCloseEdit}
          color="primary"
        >
          Cancel
        </Button>
          <IconButton
            onClick={e => {onPatchHandler(e, category._id, "Category Updated!")}}
            aria-label='update category'
            // onClick={handleCloseEdit}
            color="primary"
          >
            <LibraryAddIcon />
          </IconButton>
        </DialogActions>
      </Dialog>
      <SimpleSnackbar 
      snack={snack}
      openSnack={openSnack}
      handleOpenSnackBar={handleOpenSnackBar}
      handleCloseSnackBar={handleCloseSnackBar} 
      />
    </div>
  );
};

export default Category;
