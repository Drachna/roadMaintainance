import React from 'react';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import {Paper,Typography} from '@material-ui/core'
import moment from 'moment'



const ComplainHistory = (props) => {
  const {actionHistory}=props
  console.log(actionHistory);
  return (
    <Timeline align="left">
      {actionHistory.map((action,i)=>{
        return <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color="primary"/>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent style={{flex:80}}>
          <Paper>
            <Typography component="p">
          {moment(action.actionDate).calendar()}
          </Typography>
          {action.status}
          </Paper>
        </TimelineContent>
      </TimelineItem>
      })}

    </Timeline>
  );
  
};

export default ComplainHistory;


