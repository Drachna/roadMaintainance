import React, { useContext, useState } from 'react';
import { TextField, Button, makeStyles } from '@material-ui/core'
import { Form, useForms } from '../Controls/Form'
import { Controls } from '../Controls/Controls'
import axios from 'axios'
import { AuthContext } from '../../Contexts/Authentication/AuthContext';
import { register } from '../../Services/Api/postMethodCalls';
import Header from '../Home/Header';


const useStyles = makeStyles(theme => ({
  root: {

    width: '410px',
    margin: 'auto',
    marginTop: '1%',
    border: 'solid',
    borderRadius: theme.spacing(2),
    padding: theme.spacing(4)


  }
}))
const initialFieldValues = {
  name: '',
  password: '',
  email: '',
  region: '',
  role: 'role1',
  department: ''
}

const roleOptions = [
  { label: "Role1", value: "role1" },
  { label: "Role2", value: "role2" },
  { label: "Role3", value: "role3" }
]
const departmentOptions = [
  { label: "Department1", value: "department1" },
  { label: "Department2", value: "department2" },
  { label: "Department3", value: "department3" },
  { label: "Department4", value: "department4" }
]

const Register = (props) => {
  const { values, setValues, errors, setErrors, handleChange } = useForms(initialFieldValues)
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
      const user_status = await register(values)
      dispatchAuthDetails({ type: 'LOGIN', payload: user_status })
      console.log(props);

      props.history.push('/viewComplains')
    }
    // axios.post('', values)
    //   .then(res => {
    //     props.history.push('/viewComplains')
    //   })
    // props.history.push('/viewComplains')
  }

  return (
    <>
      <Header title="Register Officer"></Header>

      <div className={classes.root}>
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
          <Controls.Input
            name="region"
            value={values.region}
            label="Region"
            onChange={handleChange}
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

          <Button
            variant="contained"
            color="primary"
            onClick={handleuSbmit}
          >
            Register
      </Button>
        </Form>
      </div>
    </>
  );
};

export default Register;