import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton
} from '@material-ui/core'
import { GrClose } from "react-icons/gr";
import { useStyles } from '../../assets/styles/popUpStyles'


function PopUp(props) {
  const { title, children, openPopUp, setOpenPopUp } = props
  const classes = useStyles()
  return (
    <Dialog open={openPopUp}>
      <DialogTitle className={classes.dialogTitle} >
        <div className={classes.titleDiv}>
          <Typography variant="h6" component="div" className={classes.title}>
            {title}
          </Typography>
          <IconButton>
            <GrClose className={classes.closeIcon} onClick={() => setOpenPopUp(false)} />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent dividers>
        {children}
      </DialogContent>
    </Dialog>
  );
}

export default PopUp;