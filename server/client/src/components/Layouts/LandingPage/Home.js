import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import PopUp from '../../UIControls/PopUp'
import Login from '../../Login/Login';
import { useStyles } from '../../../assets/styles/homeStyles'

const Home = (props) => {
  const [openPopUp, setOpenPopUp] = useState(false)
  const classes = useStyles()
  return (
    <div className={classes.main}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Button className={classes.menuButton} id="viewComplains" onClick={() => props.history.push('/viewComplains')}>View All complaints</Button>
          <Button className={classes.menuButton} id="lodgeComplain" onClick={() => props.history.push('/lodgeComplain')}>Register A complaint</Button>
          <Button className={classes.login} onClick={() => setOpenPopUp(true)}>
            Login
            </Button >
        </Toolbar>
      </AppBar>
      <PopUp
        title="Login"
        openPopUp={openPopUp}
        setOpenPopUp={setOpenPopUp}
      >
        <Login />
      </PopUp>
      <h1 className={classes.heading}>
        Our Roads Are
       <br>
        </br>
       Our Responsibility
        </h1>
    </div>
  );
};

export default Home;