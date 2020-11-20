import React from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import MuiAlert from '@material-ui/lab/Alert';

import CloseIcon from '@material-ui/icons/Close';

const SimpleSnackbar = props => {
  const {
    openSnack,
    handleCloseSnackBar,
    snack,
    severity,
    setSeverity
  } = props;

  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={openSnack}
        autoHideDuration={2000}
        onClose={handleCloseSnackBar}
        key={snack}
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnackBar}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      >
        <Alert onClose={handleCloseSnackBar} severity={severity}>
          {snack}
        </Alert>
      </Snackbar>

    </div>
  );
}

export default SimpleSnackbar; 