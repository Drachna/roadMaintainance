import React from 'react';
import {useStyles} from '../../../assets/styles/headerStyles'
import { Grid } from '@material-ui/core'


const Header = (props) => {
  const classes = useStyles()
  return (
    <Grid container >
      <Grid item md={12} className={classes.root}>
        {props.title}
      </Grid>
    </Grid>
  );
};

export default Header;