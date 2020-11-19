import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
// Material-ui core components:
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import SimpleSnackbar from '../components/SimpleSnackBar';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
// My components:
// import DeleteCategoryComponent from '../components/DeleteCategoryComponent';
import RadioColorButtons from '../components/RadioColorButtons';
// Material-ui icons:
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import LabelIcon from '@material-ui/icons/Label';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';

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
  },
  paper: {
    maxWidth: 840,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(3, 0),
  },
  title: {
    marginTop: theme.spacing(4),
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
    maxWidth: 300,
  },
  error: {
    color: theme.palette.error.main,
  },
}));

const Category = () => {
  const classes = useStyles();
  const [sessionUserId, setSessionUserId] = useState('');
  const [category, setCategory] = useState({
    name: '',
    color: '',
  });
  const [allCategories, setAllCategories] = useState([]);
  const [load, setLoad] = useState(0);
  const [openSnack, setOpenSnack] = useState(false);
  const [snack, setSnack] = useState('');
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedColor, setSelectedColor] = useState('');
  const [openDeleteCategory, setOpenDeleteCategory] = useState(false);


  const handleChangeColor = (e) => {
    setSelectedColor(e.target.value);
    // onChangeHandler(e);
  };

  const handleOpenEdit = (e, id) => {
    onClickHandler(e, id);
    setOpenEdit(true);
  };

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

  const handleOpenDeleteCategory = (e, id) => {
    onClickHandler(e, id);
    setOpenDeleteCategory(true);
  };
  const handleCloseDeleteCategory = () => {
    setOpenDeleteCategory(false);
  };

  const onChangeHandler = e => {
    setCategory({
      ...category,
      owner: sessionUserId,
      [e.target.name]: e.target.value,
    });
  };

  const handleKeyDown = (e, snack) => {
    if (e.key === 'Enter') {
      onSubmitHandler(e, snack);
    }
  };

  const onSubmitHandler = (e, snack) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8000/api/categories/${sessionUserId}`, category, {
        withCredentials: true,
      })
      .then(res => {
        handleOpenSnackBar(snack);
        setCategory({
          name: '',
          color: '',
        });
        let count = load;
        if (count >= 0) {
          count++;
          setLoad(count);
        }
        navigate('/category');
      })
      .catch();
  };
  
  useEffect(() => {
    let isMounted = true;
    let one = 'http://localhost:8000/api/users/one';
    const requestOne = axios.get(one, { withCredentials: true });
    requestOne
      .then(response => {
        if (isMounted) setSessionUserId(response.data.results._id);
      })
      .catch();
    let two = 'http://localhost:8000/api/categories/user';
    const requestTwo = axios.get(two, { withCredentials: true });
    requestTwo
      .then(response => {
        if (isMounted) setAllCategories(response.data.results);
      })
      .catch();
    axios
      .all([requestOne, requestTwo])
      .then(
        axios.spread((...responses) => {
          const responseOne = responses[0];
          const responseTwo = responses[1];
        })
      )
      .catch(() => {
        navigate('/landing');
      });
      return () => { isMounted = false };
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
      .catch();
  };

  const onPutHandler = (e, id, snack) => {
    category.color = selectedColor;
    axios
      .patch('http://localhost:8000/api/categories/color/' + id, category, {
        withCredentials: true,
      })
      .then(res => {
        if (res.data.message === 'success'){
          handleOpenSnackBar(snack);
          handleCloseEdit();
        }
        let count = load;
        if (count >= 0) {
          count++;
          setLoad(count);
        }
        navigate('/category');
      })
      .catch();
  };

  const deleteCategory = (e, id, snack) => {
    axios
      .delete(`http://localhost:8000/api/categories/${id}`, {
        withCredentials: true,
      })
      .then(res => {
        removeFromDom(id);
        handleCloseDeleteCategory();
        handleOpenSnackBar(snack);
      }).catch();
  };

  return (
    <div>
      <CssBaseline />
      <div style={{marginTop:'90px'}}>
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
            <div>
              <List dense secondary="true" className={classes.list}>
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
                        <IconButton edge='end' aria-label='delete' onClick={e => {handleOpenDeleteCategory(e, category._id)}}>
                          <DeleteIcon />
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
            placeholder={category.name}
            name='name'
            value={category.name}
          />
          <div className={classes.formControl}>
            <RadioColorButtons
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              handleChangeColor={handleChangeColor}
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
            onClick={e => {onPutHandler(e, category._id, "Category Updated!")}}
            aria-label='update category'
            color="primary"
          >
            <LibraryAddIcon />
          </IconButton>
        </DialogActions>
      </Dialog>
      {/* DELETE CATEGORY Dialog */}
      <Dialog
        open={openDeleteCategory}
        onClose={handleCloseDeleteCategory}
        aria-labelledby="alert-delete-category"
        aria-describedby="alert-are-you-sure?"
      >
        <DialogTitle id="DeleteCategoryTitle">{"Delete Category?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="DeleteCategoryAlert">
            Once your category is removed, all tasks linked to it will be suspended in the ether. To see these tasks again, simply re-create the category. 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteCategory} color="primary">
            Cancel
          </Button>
          <Button
            className={classes.error} 
            onClick={e => {deleteCategory(e, category._id, "Category successfully deleted.")}}>
            Delete Category
          </Button>
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
