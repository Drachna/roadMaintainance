import React from 'react';
import { Snackbar,makeStyles } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

const useStyles=makeStyles({
  root:{
    marginTop:'70px'
  }
})

const Notification = (props) => {
  const { notify, setNotify } = props
  // console.log(notify);
  const classes=useStyles()


  const handleClose=()=>{
    setNotify({
      ...notify,
      isOpen:false
    })
  }

  return (
    <Snackbar
    className={classes.root}
    open={notify.isOpen}
    autoHideDuration="1000"
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    onClose={handleClose}
    >
      <Alert
      severity={notify.type}
      onClose={handleClose}
      >
        {notify.message}

      </Alert>

    </Snackbar>
  );
};

export default Notification;