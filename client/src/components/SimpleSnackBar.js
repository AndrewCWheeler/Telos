import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const SimpleSnackbar = props => {
  const {
    openSnack,
    handleOpenSnackBar,
    handleCloseSnackBar,
    snack,
  } = props;

  return (
    <div>
      {/* <Button onClick={handleClick}>Open simple snackbar</Button> */}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={openSnack}
        autoHideDuration={2000}
        onClose={handleCloseSnackBar}
        message={snack}
        key={snack}
        action={
          <React.Fragment>
            {/* <Button color="secondary" size="small" onClick={handleCloseSnackBar}>
              UNDO
            </Button> */}
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnackBar}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}

export default SimpleSnackbar; 