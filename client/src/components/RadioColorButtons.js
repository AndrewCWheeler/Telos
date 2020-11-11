import React from 'react';
import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import PaletteIcon from '@material-ui/icons/Palette';
import { Typography } from '@material-ui/core';


const PrimaryLight = withStyles(theme => ({
  root: {
    color: theme.palette.primary.light,
    '&$checked': {
      color: theme.palette.primary.light,
    },
  },
  checked: {},
}))((props) => <Radio color="default" {...props} />);

const SecondaryLight = withStyles(theme => ({
  root: {
    color: theme.palette.secondary.light,
    '&$checked': {
      color: theme.palette.secondary.light,
    },
  },
  checked: {},
}))((props) => <Radio color="default" {...props} />);

const ErrorLight = withStyles(theme => ({
  root: {
    color: theme.palette.error.light,
    '&$checked': {
      color: theme.palette.error.light,
    },
  },
  checked: {},
}))((props) => <Radio color="default" {...props} />);

const WarningLight = withStyles(theme => ({
  root: {
    color: theme.palette.warning.light,
    '&$checked': {
      color: theme.palette.warning.light,
    },
  },
  checked: {},
}))((props) => <Radio color="default" {...props} />);

const InfoLight = withStyles(theme => ({
  root: {
    color: theme.palette.info.light,
    '&$checked': {
      color: theme.palette.info.light,
    },
  },
  checked: {},
}))((props) => <Radio color="default" {...props} />);

const SuccessLight = withStyles(theme => ({
  root: {
    color: theme.palette.success.light,
    '&$checked': {
      color: theme.palette.success.light,
    },
  },
  checked: {},
}))((props) => <Radio color="default" {...props} />);

const PrimaryDark = withStyles(theme => ({
  root: {
    color: theme.palette.primary.dark,
    '&$checked': {
      color: theme.palette.primary.dark,
    },
  },
  checked: {},
}))((props) => <Radio color="default" {...props} />);

const SecondaryDark = withStyles(theme => ({
  root: {
    color: theme.palette.secondary.dark,
    '&$checked': {
      color: theme.palette.secondary.dark,
    },
  },
  checked: {},
}))((props) => <Radio color="default" {...props} />);

const ErrorDark = withStyles(theme => ({
  root: {
    color: theme.palette.error.dark,
    '&$checked': {
      color: theme.palette.error.dark,
    },
  },
  checked: {},
}))((props) => <Radio color="default" {...props} />);

const WarningDark = withStyles(theme => ({
  root: {
    color: theme.palette.warning.dark,
    '&$checked': {
      color: theme.palette.warning.dark,
    },
  },
  checked: {},
}))((props) => <Radio color="default" {...props} />);

const InfoDark = withStyles(theme => ({
  root: {
    color: theme.palette.info.dark,
    '&$checked': {
      color: theme.palette.info.dark,
    },
  },
  checked: {},
}))((props) => <Radio color="default" {...props} />);

const SuccessDark = withStyles(theme => ({
  root: {
    color: theme.palette.success.dark,
    '&$checked': {
      color: theme.palette.success.dark,
    },
  },
  checked: {},
}))((props) => <Radio color="default" {...props} />);


const RadioColorButtons = props => {
  const { selectedColor, setSelectedColor, handleChangeColor } = props;

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">
        <PaletteIcon
          style={{color: selectedColor}}
        />
        <Typography
          style={{color: selectedColor}}
          variant='h6'
        >
          Choose Category Color:
        </Typography>
      </FormLabel>
      <RadioGroup row aria-label="color" name="color">
        <PrimaryLight
          checked={selectedColor === '#a6d4fa'}
          onChange={handleChangeColor}
          value="#a6d4fa"
          name="color"
          inputProps={{ 'aria-label': '#a6d4fa' }}
        />
        <SecondaryLight
          checked={selectedColor === '#f6a5c0'}
          onChange={handleChangeColor}
          value="#f6a5c0"
          name="color"
          inputProps={{ 'aria-label': '#f6a5c0' }}
        />
        <ErrorLight
          checked={selectedColor === '#e57373'}
          onChange={handleChangeColor}
          value="#e57373"
          name="color"
          inputProps={{ 'aria-label': '#e57373' }}
        />
        <WarningLight
          checked={selectedColor === '#ffb74d'}
          onChange={handleChangeColor}
          value="#ffb74d"
          name="color"
          inputProps={{ 'aria-label': '#ffb74d' }}
        />
        <InfoLight
          checked={selectedColor === '#64b5f6'}
          onChange={handleChangeColor}
          value="#64b5f6"
          name="color"
          inputProps={{ 'aria-label': '#64b5f6' }}
        />
        <SuccessLight
          checked={selectedColor === '#81c784'}
          onChange={handleChangeColor}
          value="#81c784"
          name="color"
          inputProps={{ 'aria-label': '#81c784' }}
        />
        <PrimaryDark
          checked={selectedColor === '#648dae'}
          onChange={handleChangeColor}
          value="#648dae"
          name="color"
          inputProps={{ 'aria-label': '#648dae' }}
        />
        <SecondaryDark
          checked={selectedColor === '#aa647b'}
          onChange={handleChangeColor}
          value="#aa647b"
          name="color"
          inputProps={{ 'aria-label': '#aa647b' }}
        />
        <ErrorDark
          checked={selectedColor === '#d32f2f'}
          onChange={handleChangeColor}
          value="#d32f2f"
          name="color"
          inputProps={{ 'aria-label': '#d32f2f' }}
        />
        <WarningDark
          checked={selectedColor === '#f57c00'}
          onChange={handleChangeColor}
          value="#f57c00"
          name="color"
          inputProps={{ 'aria-label': '#f57c00' }}
        />
        <InfoDark
          checked={selectedColor === '#1976d2'}
          onChange={handleChangeColor}
          value="#1976d2"
          name="color"
          inputProps={{ 'aria-label': '#1976d2' }}
        />
        <SuccessDark
          checked={selectedColor === '#388e3c'}
          onChange={handleChangeColor}
          value="#388e3c"
          name="color"
          inputProps={{ 'aria-label': '#388e3c' }}
        />
      </RadioGroup>
    </FormControl>
  );
}

export default RadioColorButtons;
