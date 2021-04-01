import React from 'react';
import {Grid, makeStyles} from '@material-ui/core'

const useStyles=makeStyles({
  root:{
    
    background:'black',
    width:'100%',
    color:'white',
    height:'70px',
    // textAlign:'center',
    fontSize:'29px',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    borderTopLeftRadius:'13px',
    borderTopRightRadius:'13px'
  
  }
})
const Header = (props) => {
  const classes=useStyles()
  return (
    
    <Grid container >
      <Grid item md={12} className={classes.root}>
      {props.title}
      </Grid>
     
    </Grid>
  );
};

export default Header;