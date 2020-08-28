import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
    flexGrow: 1,
    maxWidth: 752,
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
    backgroundColor: theme.palette.primary.contrastText,
  },
  paper: {
    maxWidth: 752,
    margin: `${theme.spacing(2)}px auto`,
    // margin: theme.spacing(2, 0),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  list: {
    margin: `${theme.spacing(2)}px auto`,
  },
  item: {
    margin: theme.spacing(0, 2),
    color: theme.palette.primary.contrastText,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    // justify: 'center',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const AllDumpedList = props => {
  const {
    allTasks,
    setAllTasks,
    // onChangeHandler,
    onChunkHandler,
    removeFromDom,
    onPatchHandler,
    selectedIndex,
    // setSelectedIndex,
  } = props;
  const classes = useStyles();
  const [dense, setDense] = useState(false);
  const [secondary, setSecondary] = useState(false);

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
                  <Paper key={i} elevation={5} className={classes.paper}>
                    <ListItem
                      className={classes.list}
                      // button
                      // selected={selectedIndex === 0}
                      // onClick={event => handleListItemClick(event, 0)}
                    >
                      {/* <i className='fa fa-folder-open-o' aria-hidden='true'></i> */}

                      <FormControl
                        variant='standard'
                        className={classes.formControl}
                      >
                        <InputLabel className={classes.text} htmlFor='category'>
                          Chunk...
                        </InputLabel>
                        <Select
                          native
                          className={classes.text}
                          value={selectedIndex[i]}
                          onChange={e => {
                            onChunkHandler(e, task._id);
                          }}
                          label='Chunk...'
                          name='category'
                          // inputProps={{
                          //   name: 'category',
                          //   id: 'category',
                          // }}
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
                  </Paper>
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
