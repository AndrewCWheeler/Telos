import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { navigate } from '@reach/router';
import clsx from 'clsx';
// Material-ui core components:
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { red } from '@material-ui/core/colors';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
// Material-ui icons:
import AccountCircle from '@material-ui/icons/AccountCircle';
import AddIcon from '@material-ui/icons/Add';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import CompassCalibrationIcon from '@material-ui/icons/CompassCalibration';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import LabelIcon from '@material-ui/icons/Label';
import MenuIcon from '@material-ui/icons/Menu';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    color: theme.palette.text.primary,
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  myTitle: {
    margin: theme.spacing(0,0),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryIcon: {
    color: theme.palette.secondary.main,
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  avatar: {
    backgroundColor: red[500],
    fontSize: 24,
  },
  red: {
    color: red[500],
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
    "&:active": {
      color: theme.palette.secondary.dark,
    },
    "&:hover": {
      color: theme.palette.info.main,
      textDecoration: 'none',
    }
  },
}));

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const PersistentDrawer = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const {toggleDarkMode, navigatePage, handleDrawerOpen, handleDrawerClose, open, setOpen, navValue} = props;
  const [openSnack, setOpenSnack] = useState(false);
  const [sessionUserId, setSessionUserId] = useState('');
  const [sessionUserFirstName, setSessionUserFirstName] = useState('');
  const [firstInitial, setFirstInitial] = useState('');
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

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = (e) => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleProfileMenuNavClose = (e) => {
    handleMenuClose();
    navigatePage(e, 'profile');
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    axios.get('http://localhost:8000/api/users/one', {withCredentials: true})
      .then(res => {
        if (res.data.message === 'success'){
          setSessionUserId(res.data.results._id);
          setSessionUserFirstName(res.data.results.firstName);
          setFirstInitial(res.data.results.firstName.charAt());
        }
      })
      .catch(err => console.log(err));
  }, []);

  const logoutUser = (e, snack) => {
    axios
      .get('http://localhost:8000/api/users/logout', { withCredentials: true })
      .then(res => {
        if (res.data.message === 'success') {
          handleOpenSnackBar(snack);
        }
        navigate('/landing');
      })
      .catch(err => console.log(err));
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfileMenuNavClose}>
          Profile
      </MenuItem>
      <MenuItem>
        <Typography>
          <Link
          className={classes.link}
          onClick={e => {logoutUser(e, "Successfully logged out!")}}
          >
            Logout
          </Link>
        </Typography>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          style={{fontSize: 24}}
        >
          <Avatar aria-label="user" className={classes.avatar}>
            {firstInitial}
          </Avatar>
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem 
          button
          value='vision'
          onClick={e => {navigatePage(e, 'vision')}}
        >
          <ListItemIcon>
            <CompassCalibrationIcon />
          </ListItemIcon>
          <ListItemText primary='Vision' />
        </ListItem>
        <ListItem 
          button
          value='category'
          onClick={e => {navigatePage(e, 'category')}}
        >
          <ListItemIcon>
            <LabelIcon />
          </ListItemIcon>
          <ListItemText primary='Categories' />
        </ListItem>
        <Divider />
        <ListItem 
          button
          value='dump'
          onClick={e => {navigatePage(e, 'dump')}}
        >
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary='Dump' />
        </ListItem>
        <ListItem
          button
          value='schedule'
          onClick={e => {navigatePage(e, 'schedule')}}
        >
          <ListItemIcon>
            <CalendarTodayIcon />
          </ListItemIcon>
          <ListItemText primary='Schedule' />
        </ListItem>
        <ListItem 
          button
          value='do'
          onClick={e => {navigatePage(e, 'do')}}
        >
          <ListItemIcon>
            <CheckCircleIcon />
          </ListItemIcon>
          <ListItemText primary='Do' />
        </ListItem>
        <ListItem 
          button
          value='trajectory'
          onClick={e => {navigatePage(e, 'trajectory')}}
        >
          <ListItemIcon>
            <TrackChangesIcon />
          </ListItemIcon>
          <ListItemText primary='Trajectory' />
        </ListItem>
        <Divider />
        <ListItem
          button
          onClick={toggleDarkMode}
        >
        <ListItemIcon>
          <Brightness4Icon />
        </ListItemIcon>
        Dark Mode
      </ListItem>
      <Divider />
      <ListItem 
        button
        value='profile'
        onClick={e => {navigatePage(e, 'profile')}}
        >
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText primary='Profile' />
      </ListItem>
      <ListItem
        button
        onClick={e => {logoutUser(e, "Successfully logged out!")}}
      >
        <ListItemIcon>
          <ExitToAppIcon
            className={classes.secondaryIcon}
          />
        </ListItemIcon>
        <Typography>
          <Link
          className={classes.link}
          >
            Logout
          </Link>
        </Typography>
      </ListItem>
    </List>
    </div>
  );
  

  return (
    <div className={classes.root}>
      <CssBaseline />
      <div className={classes.grow}>
      <HideOnScroll {...props}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, 
          {
          [classes.appBarShift]: open,
        })}
        style={{background: theme.palette.background.default}}
      >
        <Toolbar>
          <IconButton
            // color="primary"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography 
            variant="h5" 
            noWrap
            className={classes.myTitle}
            >
            {'\u03C4\u03AD\u03BB\u03BF\u03C2'}
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
          <Typography 
            style={{marginTop: 18}}
          >
            {sessionUserFirstName}
          </Typography>
          <IconButton
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
            >
            <Avatar aria-label="user" className={classes.avatar}>
              {firstInitial}
            </Avatar>
          </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      </HideOnScroll>
      {renderMobileMenu}
      {renderMenu}
      </div>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose} 
          >
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        {drawer}
        <Divider />
      </Drawer>
      <Snackbar 
      snack={snack}
      openSnack={openSnack}
      handleOpenSnackBar={handleOpenSnackBar}
      handleCloseSnackBar={handleCloseSnackBar}
      />
    </div>
  );
}

export default PersistentDrawer; 
