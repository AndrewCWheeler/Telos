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

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 752,
    justifyContent: 'center',
    fontSize: 10,
    position: 'fixed',
    bottom: 0,
    color: theme.palette.text.primary,
    '&$focused':{
      color: theme.palette.text.secondary,
    }
  }
}));

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
    } else if (newValue === 'category') {
      navigate('/category');
    }
  };

  return (
    <Grid container direction='row' justify='center'>
      <BottomNavigation
        value={value}
        onChange={navigatePage}
        className={classes.root}
        position='fixed'
        >
        <BottomNavigationAction
          label='Dump'
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
          value='category'
          icon={<SettingsIcon />}
        />
      </BottomNavigation>
    </Grid>
  );
};

export default BottomNavComponent;
