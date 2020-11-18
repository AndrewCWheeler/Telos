import React from 'react';
// Material-ui core components:
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
// Material-ui icons:
import AddIcon from '@material-ui/icons/Add';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';

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
  const { navValue, navigatePage } = props;

  return (
    <Grid container direction='row' justify='center'>
      <BottomNavigation
        value={navValue}
        onChange={navigatePage}
        className={classes.root}
        position='fixed'
        showLabels
        >
        <BottomNavigationAction
          label={<Typography 
            style={{fontSize:15}}>
            Dump/Chunk
          </Typography>}
          value='dump'
          icon={<AddIcon 
            style={{fontSize:24}}
          />}
        />
        <BottomNavigationAction
          label={<Typography 
            style={{fontSize:15}}>
            Schedule
          </Typography>}
          value='schedule'
          icon={<CalendarTodayIcon 
            style={{fontSize:24}}
          />}
        />
        <BottomNavigationAction
          label={<Typography 
            style={{fontSize:15}}>
            Do
          </Typography>}
          value='do'
          icon={<CheckCircleIcon
            style={{fontSize:24}}
          />}
        />
        <BottomNavigationAction
          label={<Typography 
            style={{fontSize:15}}>
            Trajectory
          </Typography>}
          value='trajectory'
          icon={<TrackChangesIcon 
          style={{fontSize:24}}
          />}
        />
      </BottomNavigation>
    </Grid>
  );
};

export default BottomNavComponent;
