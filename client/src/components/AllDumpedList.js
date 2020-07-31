import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import DeleteComponent from './DeleteComponent';
import FolderIcon from '@material-ui/icons/Folder';

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
  },
  paper: {
    maxWidth: 400,
    margin: `${theme.spacing(2)}px auto`,
    padding: theme.spacing(2),
  },
  list: {
    margin: `${theme.spacing(2)}px auto`,
  },
}));

// function generate(element) {
//   return [0, 1, 2].map(value =>
//     React.cloneElement(element, {
//       key: value,
//     })
//   );
// }

const AllDumpedList = props => {
  const { allTasks, setAllTasks, removeFromDom } = props;
  const classes = useStyles();
  const [dense, setDense] = useState(false);
  const [secondary, setSecondary] = useState(false);

  // const [selectedIndex, setSelectedIndex] = React.useState(1);

  // const handleListItemClick = (event, index) => {
  //   setSelectedIndex(index);
  // };

  return (
    <Container className={classes.root}>
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
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <Typography variant='h6' className={classes.title}>
            Avatar with text and icon
          </Typography>
          <div className={classes.demo}>
            <List dense={dense}>
              {allTasks.map((task, i) =>
                task.chunked ? (
                  ''
                ) : (
                  <Paper key={i} elevation={3}>
                    <ListItem
                      className={classes.list}
                      // button
                      // selected={selectedIndex === 0}
                      // onClick={event => handleListItemClick(event, 0)}
                    >
                      <ListItemAvatar>
                        <Avatar>
                          <IconButton aria-label='delete'>
                            <FolderIcon taskId={task._id} />
                          </IconButton>
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={task.name}
                        secondary={secondary ? task.category : null}
                      />
                      <ListItemSecondaryAction>
                        <IconButton edge='end' aria-label='delete'>
                          <DeleteComponent
                            taskId={task._id}
                            successCallback={() => removeFromDom(task._id)}
                          />
                        </IconButton>
                      </ListItemSecondaryAction>
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
