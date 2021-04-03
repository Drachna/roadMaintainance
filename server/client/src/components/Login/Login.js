import React, { useContext, useState } from 'react';
import { Button } from '@material-ui/core'
import { Controls } from '../UIControls/Controls'
import { Form, useForms } from '../UIControls/Form'
import { AuthContext } from '../../Contexts/Authentication/AuthContext';
import { login } from '../../Services/Api/postMethodCalls';
import { useHistory } from "react-router-dom";
import {LOGIN} from '../../Reducers/actionTypes'
import Notification from '../UIControls/Notification';

const initialFieldValues = {
  email: '',
  password: ''
}

const Login = (props) => {
  const { values, setValues, errors, setErrors, handleChange } = useForms(initialFieldValues)
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
  const { authDetails, dispatchAuthDetails } = useContext(AuthContext)
  const history = useHistory()


  const validate = () => {
    let temp = { ...errors }
    temp.password = values.password ? "" : "This field is required"
    temp.email = values.email ? (/$^|.+@.+..+/).test(values.email) ? "" : "Enter valid email" : "This field is required"
    setErrors({
      ...temp
    })
    return Object.values(temp).every(x => x === "")
  }

  const handleClick = async () => {

    if (validate()) {
      login(values).then(response => {
        if (response.response) {
          setNotify({
            isOpen: true,
            message: response.response.data.message,
            type: 'error'
          })
        }
        else {
          dispatchAuthDetails({ type: LOGIN, payload: response.status })
          history.push('/viewComplains')
        }
      })
    }
  }

  return (
    <Form >
      <div style={{ margin: '10px' }}>
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
          style={{ marginLeft: '8px' }}
          onClick={handleClick}
        >
          Login
      </Button>
      </div>
      <Notification notify={notify} setNotify={setNotify}></Notification>
    </Form>
  );
};

export default Login;