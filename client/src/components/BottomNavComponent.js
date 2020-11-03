import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Grid from '@material-ui/core/Grid';
import { navigate } from '@reach/router';
import AddIcon from '@material-ui/icons/Add';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import SettingsIcon from '@material-ui/icons/Settings';
// import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  root: {
    width: 752,
    justifyContent: 'center',
  },
});

const BottomNavComponent = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState('dump');

  const navigatePage = (event, newValue) => {
    setValue(newValue);
    if (newValue === 'dump') {
      navigate('/');
    } else if (newValue === 'schedule') {
      navigate('/schedule');
    } else if (newValue === 'do') {
      navigate('/do');
    } else if (newValue === 'categories') {
      navigate('/categories');
    }
  };

  return (
    <Grid container direction='row' justify='center'>
      <BottomNavigation
        value={value}
        onChange={navigatePage}
        className={classes.root}
        >
        <BottomNavigationAction
          label='Dump/Chunk'
          value='dump'
          icon={<AddIcon />}
        />
        <BottomNavigationAction
          label='Schedule'
          value='schedule'
          icon={<CalendarTodayIcon />}
        />
        <BottomNavigationAction
          label='Do'
          value='do'
          icon={<CheckCircleIcon />}
        />
        <BottomNavigationAction
          label='Categories'
          value='categories'
          icon={<SettingsIcon />}
        />
      </BottomNavigation>
    </Grid>
  );
};

export default BottomNavComponent;
