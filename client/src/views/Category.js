import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {navigate} from '@reach/router';
// Material-ui core components:
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import { green } from '@material-ui/core/colors';
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
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import LabelIcon from '@material-ui/icons/Label';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 840,
    overflow: 'scroll',
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '33ch',
      color: theme.palette.text.primary,
    },
  },
  dialogStyle: {
    backgroundColor: theme.palette.background.paper,
  },
  extraLarge: {
    fontSize: 32,
  },
  fab: {
    position: 'sticky',
    bottom: theme.spacing(9),
    right: theme.spacing(3),
    color: theme.palette.common.white,
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[600],
    },
  },
  submit: {
    margin: theme.spacing(2),
    color: theme.palette.primary.main,
  },
  iconStyle: {
    fontSize:24,
    color: theme.palette.primary.main,
  },
  layout: {
    flexGrow: 1,
    overflow: 'scroll',
    padding: theme.spacing(0, 3),
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  neutralIconStyle: {
    fontSize:24,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  list: {
    marginBottom: 90,
    marginTop: 30,
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
    maxWidth: 300,
  },
  error: {
    color: theme.palette.error.main,
  },
}));

const Category = (props) => {
  const { navValue, setNavValue } = props;
  const classes = useStyles();
  const [category, setCategory] = useState({
    name: '',
    color: '',
  });
  const [openSnack, setOpenSnack] = useState(false);
  const [snack, setSnack] = useState('');
  const [severity, setSeverity] = useState('');
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedColor, setSelectedColor] = useState('');
  const [openDeleteCategory, setOpenDeleteCategory] = useState(false);
  const [openCategorySubmit, setOpenCategorySubmit] = useState(false);
  const [sessionUserId, setSessionUserId] = useState('');
  const [allCategories, setAllCategories] = useState([]);
  const [load, setLoad] = useState(0);

  useEffect(() => {
    let isMounted = true;
    if (navValue !== 'category'){
      setNavValue('category');
    }
    let one = 'http://localhost:8000/api/users/one';
    const requestOne = axios.get(one, { withCredentials: true });
    requestOne
      .then(response => {
        if (response.data.message === 'success' && isMounted) {
          setSessionUserId(response.data.results._id);
        }
      })
      .catch(() => {
        navigate('/');
      });
    let two = 'http://localhost:8000/api/categories/user';
    const requestTwo = axios.get(two, {withCredentials: true });
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
        navigate('/');
      });
      return () => { isMounted = false }
  }, [load]);


  const handleChangeColor = (e) => {
    setSelectedColor(e.target.value);
  };

  const handleOpenEdit = (e, id) => {
    onClickHandler(e, id);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleOpenCategorySubmit = () => {
    setOpenCategorySubmit(true);
  };
  
  const handleCloseCategorySubmit = () => {
    setOpenCategorySubmit(false);
  };

  const handleOpenSnackBar = (snack, severity) => {
    setSnack(snack); 
    setSeverity(severity);
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

  const handleKeyDown = (e, snack, severity) => {
    if (e.key === 'Enter') {
      onSubmitHandler(e, snack, severity);
    }
  };

  const onSubmitHandler = (e, snack, severity) => {
    if (category.name === ''){
      handleOpenSnackBar("Category cannot be blank!", "error")
      return
    }
    axios
      .post(`http://localhost:8000/api/categories/${sessionUserId}`, category, {
        withCredentials: true,
      })
      .then(res => {
        handleOpenSnackBar(snack, severity);
        setCategory({
          name: '',
          color: '',
        });
        load === 1 ? (setLoad(0)) : setLoad(1);
        handleCloseCategorySubmit();
      })
      .catch();
  };
  
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

  const onPutHandler = (e, id, snack, severity) => {
    category.color = selectedColor;
    axios
      .patch('http://localhost:8000/api/categories/color/' + id, category, {
        withCredentials: true,
      })
      .then(res => {
        if (res.data.message === 'success'){
          handleOpenSnackBar(snack, severity);
          handleCloseEdit();
          setCategory({
            name: '',
            color: '',
          });
        }
        load === 1 ? (setLoad(0)) : setLoad(1);
      })
      .catch();
  };

  const deleteCategory = (e, id, snack, severity) => {
    axios
      .delete(`http://localhost:8000/api/categories/${id}`, {
        withCredentials: true,
      })
      .then(res => {
        removeFromDom(id);
        handleCloseDeleteCategory();
        handleOpenSnackBar(snack, severity);
        setCategory({
          name: '',
          color: '',
        });
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
      <Fab className={classes.fab} onClick={handleOpenCategorySubmit}>
        <AddIcon className={classes.extraLarge}/>
      </Fab>
      <Grid container direction='row' justify='center' alignItems='center'>
        <Grid item xs={12} className={classes.root}>
          <List dense secondary="true" className={classes.list}>
            {allCategories.map((category, i) =>
                <ListItem
                  className={classes.listItem}
                  key={i}
                  button="true"
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
                      <DeleteIcon style={{fontSize:24}}/>
                    </IconButton>
                  </Tooltip>
                </ListItem>
            )}
          </List>
        </Grid>
      </Grid>
      {/* Create Category Modal */}
      <Dialog
        aria-labelledby='category-modal-submit'
        className={classes.modal}
        open={openCategorySubmit}
        onClose={handleCloseCategorySubmit}
        fullWidth
      >
        <DialogTitle className={classes.title}>{"Category"}</DialogTitle>
        <DialogContent className={classes.dialogStyle}>
          <TextField
            style={{marginTop: 6}}
            fullWidth
            label='Category...'
            variant='outlined'
            onChange={e => {
              onChangeHandler(e);
            }}
            onKeyPress={e => {handleKeyDown(e, "Category Created!", "success")}}
            name='name'
            value={category.name}
            autoFocus='true'
          />
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleCloseCategorySubmit}
            color="primary"
            >
            Cancel
          </Button>
          <IconButton
              className={classes.submit}
              onClick={e => {
                onSubmitHandler(e, "Category Created!", "success");
              }}
              >
              <LibraryAddIcon style={{fontSize: 24}}/>
          </IconButton>
        </DialogActions>
      </Dialog>
      {/* Edit Category Modal */}
      <Dialog
        aria-labelledby='modal-edit-select'
        aria-describedby='choose-edit-category'
        className={classes.modal}
        open={openEdit}
        fullWidth
        onClose={handleCloseEdit}
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
            fullWidth
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
            onClick={e => {onPutHandler(e, category._id, "Category Updated!", "success")}}
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
        fullWidth
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
            onClick={e => {deleteCategory(e, category._id, "Category successfully deleted.", "success")}}>
            Delete Category
          </Button>
        </DialogActions>
      </Dialog>
      <SimpleSnackbar 
        snack={snack}
        severity={severity}
        setSeverity={setSeverity}
        openSnack={openSnack}
        handleOpenSnackBar={handleOpenSnackBar}
        handleCloseSnackBar={handleCloseSnackBar} 
      />
    </div>
  );
};

export default Category;
