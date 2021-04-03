import React, { useContext, useState } from 'react';
import { Button, Grid } from '@material-ui/core'
import { Form, useForms } from '../UIControls/Form'
import { Controls } from '../UIControls/Controls'
import { AuthContext } from '../../Contexts/Authentication/AuthContext';
import { register } from '../../Services/Api/postMethodCalls';
import Header from '../Layouts/Header/Header';
import { roleOptions, regionOptions, departmentOptions } from '../../assets/data/optionArrays'
import { useStyles } from '../../assets/styles/registerStyles'
import { LOGIN } from '../../Reducers/actionTypes'
import Notification from '../UIControls/Notification';


const initialFieldValues = {
  name: '',
  password: '',
  email: '',
  region: '',
  role: 'Engineer',
  department: ''
}



const Register = (props) => {
  const { values, setValues, errors, setErrors, handleChange } = useForms(initialFieldValues)
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
  const { authDetails, dispatchAuthDetails } = useContext(AuthContext)
  const classes = useStyles()


  const validate = () => {
    let temp = { ...errors }
    temp.name = values.name ? "" : "This field is required"
    temp.password = values.password ? "" : "This field is required"
    temp.email = values.email ? (/$^|.+@.+..+/).test(values.email) ? "" : "Enter valid email" : "This field is required"
    temp.department = values.department.length !== 0 ? "" : "This field is required"
    temp.region = values.region ? "" : "This field is required"
    setErrors({
      ...temp
    })
    return Object.values(temp).every(x => x === "")
  }
  const handleuSbmit = async () => {
    if (validate()) {
      register(values).then(res => {
        if (res.response) {
          setNotify({
            isOpen: true,
            message: res.response.data.message,
            type: 'error'
          })
        }
        else {
          dispatchAuthDetails({ type: LOGIN, payload: res.status })
          props.history.push('/viewComplains')
        }
      })
    }
  }

  return (
    <>
      <div className={classes.root}>
        <Grid container direction='column'>
          <Grid item>
            <Header title="REGISTER OFFICER" />
          </Grid>
          <Grid item className={classes.form}>
            <Form>
              <Controls.Input
                name="name"
                value={values.name}
                label="Name"
                onChange={handleChange}
                error={errors.name}
              />
              <Controls.Input
                name="email"
                value={values.email}
                label="Email"
                onChange={handleChange}
                error={errors.email}
              />
              <Controls.Input
                name="password"
                value={values.password}
                label="Password"
                onChange={handleChange}
                error={errors.password}
                type="password"
              />
              <Controls.Select
                name="region"
                value={values.region}
                label="Region"
                onChange={handleChange}
                options={regionOptions}
                error={errors.region}
              />
              <Controls.RadioButton
                name="role"
                value={values.role}
                label="Role"
                onChange={handleChange}
                options={roleOptions}
              />
              <Controls.Select
                name="department"
                value={values.department}
                label="Department"
                onChange={handleChange}
                options={departmentOptions}
                error={errors.department}
              />
              <br />
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={handleuSbmit}
              >
                Register
              </Button>
            </Form>
            <Notification notify={notify} setNotify={setNotify}></Notification>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Register;