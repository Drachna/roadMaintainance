import React from 'react';
import {makeStyles} from '@material-ui/core'

const useStyles=makeStyles({
  root:{
    // marginTop:'15px',
    background:'black',
    color:'white',
    height:'70px',
    textAlign:'center',
    fontSize:'40px'

  }
})
const Header = (props) => {
  const classes=useStyles()
  return (
    <div className={classes.root}>
      {props.title}
    </div>
  );
};

export default Header;