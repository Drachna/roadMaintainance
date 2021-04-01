import React, { useContext, useState } from 'react';
import {  Button } from '@material-ui/core'
import {Controls} from '../Controls/Controls'
import {Form,useForms} from '../Controls/Form'
import { AuthContext } from '../../Contexts/Authentication/AuthContext';
import { login } from '../../Services/Api/postMethodCalls';
import { useHistory } from "react-router-dom";

const initialFieldValues = {
  email: '',
  password: ''
}

const Login = (props) => {
  const {values,setValues,errors,setErrors,handleChange}=useForms(initialFieldValues)
  const {authDetails, dispatchAuthDetails}=useContext(AuthContext)
  const history=useHistory()


  const validate=()=>{
    let temp={...errors}
    temp.password = values.password ? "" : "This field is required"
    temp.email = values.email ? (/$^|.+@.+..+/).test(values.email) ? "" : "Enter valid email" : "This field is required"
    setErrors({
      ...temp
    })
    return Object.values(temp).every(x => x === "")
  }

  const handleClick = async() => {

    if (validate()){
      const user_status= await login(values)
      dispatchAuthDetails({type:'LOGIN',payload:user_status})   
      history.push('/viewComplains')
    }
  }

  return (
    <Form>
      <Controls.Input
        name="email"
        label="Email"
        value={values.email}
        onChange={handleChange}    
        error={errors.email}
      />
      <Controls.Input
        name="password"
        value={values.password}
        label="Password"
        onChange={handleChange}
        type="password"
        error={errors.password}
      />
    <br></br>
      <Button
        variant="contained"
        color="primary"
        style={{marginLeft:'8px'}}
        onClick={handleClick}
      >
        Login
      </Button>
    </Form>
  );
};

export default Login;