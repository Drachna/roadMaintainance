import React, { useContext } from 'react';
import { Grid, Paper, } from '@material-ui/core';
import Map from '../../Maps/map2';
import ComplainHistory from '../ShowComplaints/ShowComplaintHistory'
import ProvideUpdateForm from './ProvideUpdateForm'
import ShowComplaint from '../ShowComplaints/ShowComplaintCard'
import { AuthContext } from '../../../Contexts/Authentication/AuthContext';
import Header from '../../Layouts/Header/Header';
import {useStyles} from '../../../assets/styles/provideUpdateStyles'


function ProvideUpdate(props) {
  const classes = useStyles()
  const { complainDetails } = props.location.state
  const { authState } = useContext(AuthContext)
  const coordinates = {
    lng: complainDetails.lng,
    lat: complainDetails.lat,
    zoom: 14
  }

  return (
    <>
      <Header title={authState === 'NOT_LOGGED_IN' ? 'VIEW DETAILS' : 'TAKE ACTION'}></Header>

      <Grid container className={classes.root} spacing={3}>
        <Grid item container >
          <Grid item lg={6} md={6} xs={12}>
            <Paper className={classes.gridItem}>
            <Header title="COMPLAINT DETAILS" />
              <ShowComplaint complainDetails={complainDetails} />
            </Paper>
          </Grid>
          <Grid item  md={6} xs={12} style={{height:'480px'}}>
            <Map  coordinates={coordinates} />
          </Grid>
        </Grid>
      </Grid>
      <Grid container className={classes.root} spacing={3}>
        {authState === 'NOT_LOGGED_IN' ? null :
          <Grid
            align="center"
            item md={6} xs={12}>
            <Paper className={classes.card}>
              <ProvideUpdateForm id={complainDetails._id} />
            </Paper>
          </Grid>
        }

        <Grid item md={6} xs={12}>
          <Grid  >
            <Paper align="left" className={classes.actionHistory}>
              <Header title="ACTION HISTORY" />
              <ComplainHistory actionHistory={complainDetails.ActionArray}></ComplainHistory>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default ProvideUpdate;