import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import PopUp from '../Controls/PopUp'
import { homeStyles } from './homeStyles'
import Login from '../Login/Login';


const Home = (props) => {
  const [openPopUp, setOpenPopUp] = useState(false)
  return (
    <div style={homeStyles.main}>
      <AppBar position="static">
        <Toolbar style={homeStyles.toolbar}>
          <Button style={homeStyles.menu} id ="viewComplains" onClick={()=>props.history.push('/viewComplains')}>View All complaints</Button>
          <Button style={homeStyles.menu} id="lodgeComplain" onClick={()=>props.history.push('/lodgeComplain')}>Register A complaint</Button>
          <Button style={homeStyles.login} onClick={()=>setOpenPopUp(true)}>
            Login
            </Button >
        </Toolbar>
      </AppBar>
      <PopUp
        title="Login"
        openPopUp={openPopUp}
        setOpenPopUp={setOpenPopUp}
      >
        <Login/>
      </PopUp>
      <h1 style={homeStyles.heading}>
       Our Roads Are
       <br>
       </br>
       Our Responsibility
        </h1>
    </div>
  );
};

export default Home;