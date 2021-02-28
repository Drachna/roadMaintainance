import React from 'react';
import {  Card, CardContent, Typography, CardHeader,makeStyles } from '@material-ui/core';

const useStyles=makeStyles(theme=>({
  complainInfo:{
    paddingTop: theme.spacing(2)
  }
}))

const ShowComplaint = (props) => {
  const classes=useStyles()
  return (
    <Card>
    <CardContent>
      <img align="center" style={{ height: "18rem" }} src={props.complainDetails.image} alt=""></img>
      <Typography component="p" className={classes.complainInfo}>
        Description:
      {props.complainDetails.description}
      </Typography>
      <Typography component="p" className={classes.complainInfo}>
        Total Upvotes:
      {props.complainDetails.upvote.count}
      </Typography>
      <Typography component="p" className={classes.complainInfo}>
        Status:
        {props.complainDetails.status}
      </Typography>
    </CardContent>
  </Card>
  );
};

export default ShowComplaint;