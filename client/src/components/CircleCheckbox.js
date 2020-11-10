import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  checkBoxStyle: {
    container: {
      display: 'block',
      position: 'relative',
      paddingLeft: 35,
      marginBottom: 15,
      cursor: 'pointer',
      fontSize: 18,
      userSelect: 'none',
    },
    container: {
      input: {
        position: 'absolute',
        opacity: 0,
        cursor: 'pointer',
        height: 0,
        width: 0,
        '&:checked':{
          checkmark:{
            '&:after':{
              display: 'block',
            }
          }
        }
      },
      '&:hover':{
        border: '2px solid' + theme.palette.primary.main,
      },
      checkmark: {
        '&:after': {
          left: 5,
          top: 2,
          width: 6,
          height: 9,
          border: `solid ${theme.palette.primary.main}`,
          borderWidth: '0 1px 1px 0',
          rotate: '45deg',
        }
      }

    },
    checkmark: {
      position: 'absolute',
      top: 0,
      left: 0,
      height: 18,
      width: 18,
      backgroundColor: 'transparent',
      border: `1px solid ${theme.palette.primary.main}`,
      borderRadius: 15,
      '&:after': {
        content: '',
        position: 'absolute',
        display: 'none',
      },
    },
    
  },
}));

const CircleCheckbox = () => {
  const classes = useStyles();
  return (
    <div className={classes.checkBoxStyle}>
      <label className="container">
        <input type="checkbox" />
        <span className="checkmark"></span>
      </label>
    </div>
  )
}

export default CircleCheckbox;



