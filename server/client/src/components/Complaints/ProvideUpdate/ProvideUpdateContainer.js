import React, { useContext } from 'react';
import { Grid, Paper, makeStyles, } from '@material-ui/core';
import Map from '../../Maps/map2';
// import { ComplainContext } from '../../../Contexts/Complains/complainsContext';
import ComplainHistory from '../ShowComplaints/ShowComplaintHistory'
import ProvideUpdateForm from './ProvideUpdateForm'
import ShowComplaint from '../ShowComplaints/ShowComplaintCard'
import { AuthContext } from '../../../Contexts/Authentication/AuthContext';
import Header from '../../Home/Header';


const useStyles = makeStyles(theme => ({
  root: {
    // background: 'blue',
    padding: theme.spacing(4)
  },
  complainInfo: {
    paddingTop: theme.spacing(2)
  },
  heading: {
    padding: theme.spacing(2)
  },
  complainHistory: {
    height: '480px',
    overflow: 'auto'
  },
  paper: {
    maxHeight: '100%',
    overflow: 'auto'
  },
  card:{
    border:'solid',
    borderRadius:'10px'
  }
  

}))


function ProvideUpdate(props) {
  const classes = useStyles()
  const { complainDetails } = props.location.state
  const { authState } = useContext(AuthContext)
  const coordinates={
    lng:complainDetails.lng,
    lat:complainDetails.lat,
    zoom:14
  }

  return (
    <>
      <Header title={authState==='NOT_LOGGED_IN'?'View Details':'Take Action'}></Header>
      <Grid container className={classes.root} spacing={3}>
        <Grid item container spacing={3}>
          <Grid item md={6} sm={6} >
            <Paper className={classes.card}>
              <ShowComplaint complainDetails={complainDetails} />
            </Paper>
          </Grid>
          <Grid item md={6}>
            <Map coordinates={coordinates}/>
          </Grid>


        </Grid>
      </Grid>
      <Grid container className={classes.root} spacing={3}>
        {/* <Grid item md={1}>
          fdgsdf
        </Grid> */}
        {authState === 'NOT_LOGGED_IN' ? null :
          <Grid
            align="center"
            item md={5}>
            <Paper className={classes.card}>
              <h1>Take Action</h1>
              <ProvideUpdateForm id={complainDetails._id} />
            </Paper>
          </Grid>
        }
        {/* <Grid
          align="center"
          item md={5}>
          <Paper >
            <h1>Take Action</h1>
            <ProvideUpdateForm id={complainDetails._id} />
          </Paper>
        </Grid> */}

        <Grid item md={5}>
          <Grid  >
            <Paper align="left" className={classes.card}>
              <h3>Action history</h3>
              <ComplainHistory actionHistory={complainDetails.ActionArray}></ComplainHistory>
            </Paper>
          </Grid>
        </Grid>

      </Grid>

    </>
  );
}

export default ProvideUpdate;