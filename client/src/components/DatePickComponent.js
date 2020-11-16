// import 'date-fns';
// import React from 'react';
// import Grid from '@material-ui/core/Grid';
// import DateFnsUtils from '@date-io/date-fns';
// import {
//   MuiPickersUtilsProvider,
//   KeyboardTimePicker,
//   KeyboardDatePicker,
// } from '@material-ui/pickers';
// import { makeStyles, withTheme } from '@material-ui/core/styles';
// import { createMuiTheme } from '@material-ui/core/styles';
// import CssBaseline from '@material-ui/core/CssBaseline';

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
// const useStyles = makeStyles(theme => ({
//   root: {
//     flexGrow: 1,
//     maxWidth: 752,
//   },
//   demo: {
//     backgroundColor: theme.palette.background.paper,
//   },
//   title: {
//     margin: theme.spacing(4, 0, 2),
//     color: theme.palette.primary.main,
//   },
//   text: {
//     color: theme.palette.primary.contrastText,
//   },
//   subtitle: {
//     color: theme.palette.secondary.light,
//   },
//   paper: {
//     maxWidth: 752,
//     margin: `${theme.spacing(2)}px auto`,
//     // margin: theme.spacing(2, 0),
//     backgroundColor: theme.palette.primary.main,
//     color: theme.palette.primary.contrastText,
//   },
//   list: {
//     margin: `${theme.spacing(2)}px auto`,
//   },
//   item: {
//     margin: theme.spacing(0, 2),
//     color: theme.palette.primary.contrastText,
//   },
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120,
//     // justify: 'center',
//   },
//   selectEmpty: {
//     marginTop: theme.spacing(2),
//   },
// }));

// const DatePickComponent = props => {
//   const {
//     selectedDate,
//     setSelectedDate,
//     handleDateChange,
//     taskId,
//     selectedIndexId,
//   } = props;
//   // The first commit of Material-UI

//   const classes = useStyles();

//   return (
//     <MuiPickersUtilsProvider utils={DateFnsUtils}>
//       <CssBaseline />
//       <Grid container justify='space-around'>
//         <KeyboardDatePicker
//           className={classes.text}
//           margin='normal'
//           id={selectedIndexId}
//           label='Date picker dialog'
//           format='MM/dd/yyyy'
//           value={selectedDate}
//           onChange={e => {
//             handleDateChange(e, taskId);
//           }}
//           KeyboardButtonProps={{
//             'aria-label': 'change date',
//           }}
//         />
//       </Grid>
//     </MuiPickersUtilsProvider>
//   );
// };

// export default DatePickComponent;
