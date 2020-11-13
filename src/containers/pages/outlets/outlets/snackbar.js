import React from 'react';
// import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

export default function PositionedSnackbar(props) {



  const handleClose = () => {
    props.setOpen({ ...props.open, open: false });
  };



  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={props.open.open}
        autoHideDuration={1900}
        onClose={handleClose}
        key={{ vertical: 'top', horizontal: 'right' }}
      >
          <MuiAlert elevation={6} variant="filled"  onClose={handleClose} severity={props.open.status}>
            {props.open.message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}
