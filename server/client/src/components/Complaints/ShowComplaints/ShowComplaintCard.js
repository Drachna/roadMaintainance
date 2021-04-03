import React from 'react';
import moment from 'moment'
import { Card, CardContent, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  complainInfo: {
    paddingTop: theme.spacing(2)
  }
}))

const ShowComplaint = (props) => {
  const classes = useStyles()
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
        <Typography component="p" className={classes.complainInfo}>
          Locality:
        {props.complainDetails.locality}
        </Typography>
        <Typography component="p" className={classes.complainInfo}>
          Registered On:
        {moment(props.complainDetails.regDate).calendar()}
        </Typography>
        <Typography component="p" className={classes.complainInfo}>
          Approximate Location:
        </Typography>
        <ol>
            {props.complainDetails.address.map((loc,ind)=>{
              return  <li key={ind}>
                          <div>
                              {loc.location}
                          </div>
                          <div>
                              Distance:
                              {loc.distance}
                          </div>                 
                      </li>
            })}
        </ol>
      </CardContent>
    </Card>
  );
};

export default ShowComplaint;