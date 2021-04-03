import React, { useContext, useState } from 'react';
import { Button, Grid } from '@material-ui/core'
import { Form, useForms } from '../../UIControls/Form'
import { Controls } from '../../UIControls/Controls'
import Map from '../../Maps/map2'
import Header from '../../Layouts/Header/Header'
import Notification from '../../UIControls/Notification'
import { ComplainContext } from '../../../Contexts/Complains/complainsContext';
import { createComplain } from '../../../Services/Api/postMethodCalls'
import { useStyles } from '../../../assets/styles/userComplaintFormStyles'
import { ADD_COMPLAIN } from '../../../Reducers/actionTypes'
import {severityOption} from '../../../assets/data/optionArrays'

const initialFieldValues = {
  name: '',
  email: '',
  description: '',
  registrationDate: new Date(),
  lat: 15.21,
  lng: 73.98,
  imageToAdd: null,
  severity: 'low',
}

export default function Complaint(props) {
  const classes = useStyles()
  const { values, setValues, errors, setErrors, handleChange } = useForms(initialFieldValues)
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
  const { dispatchComplains } = useContext(ComplainContext)

  const validate = () => {
    let temp = { ...errors }
    temp.name = values.name ? values.name.length > 3 ? "" : "Length must be 3" : "This field is required"
    temp.email = values.email ? (/$^|.+@.+..+/).test(values.email) ? "" : "Enter valid email" : "This field is required"
    temp.description = values.description ? "" : "This field is required"
    temp.imageToAdd = values.imageToAdd ? "" : "Upload image"
    setErrors({
      ...temp
    })

    return Object.values(temp).every(x => x === "")
  }

  const images = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.files[0]
    })
  }
  const setLatLng = (lat, lng) => {
    setValues({
      ...values,
      lat: lat,
      lng: lng

    })
  }

  const handleuSbmit = async (e) => {
    e.preventDefault()
    if (validate()) {
      const formData = new FormData()
      formData.append('name', values.name)
      formData.append('email', values.email)
      formData.append('description', values.description)
      formData.append('registrationDate', values.registrationDate)
      formData.append('imageToAdd', values.imageToAdd)
      formData.append('lat', values.lat)
      formData.append('lng', values.lng)

      createComplain(formData).then(res => {
        if (res.response) {
          setNotify({
            isOpen: true,
            message: res.response.data.message,
            type: 'error'
          })
        }
        else {
          dispatchComplains({ type: ADD_COMPLAIN, payload: res.data })
          setNotify({
            isOpen: true,
            message: res.message,
            type: 'success'
          })
          setValues(initialFieldValues)
          setTimeout(() => props.history.push('/viewComplains'), 3000)
        }
      })
    }
  }

  return (
    <>
      <Grid container className={classes.root}>
        <Grid className={classes.formArea} align="center" item md={6} sm={12}>
          <Form align="center">
            <Header title="REGISTER COMPLAINT" />
            <div className={classes.formContent}>
              <Controls.Input
                name="name"
                label="Name"
                value={values.name}
                onChange={handleChange}
                error={errors.name}
              />
              <Controls.Input
                name="email"
                label="Email"
                value={values.email}
                onChange={handleChange}
                error={errors.email}
              />
              <Controls.Input
                name="description"
                label="Description"
                value={values.description}
                onChange={handleChange}
                error={errors.description}
              />
              <Controls.RadioButton
                name="severity"
                label="Severity"
                value={values.severity}
                onChange={handleChange}
                options={severityOption}
              />
              <Controls.Input
                name="lat"
                label="Latitude"
                value={values.lat}
                onChange={handleChange}
              />

              <Controls.Input
                name="lng"
                label="Longitude"
                value={values.lng}
                onChange={handleChange}
              />
              <br />
              <Button
                variant="contained"
                component="label"
                color="primary"
              >
                Upload Image
              <input
                  type="file"
                  hidden
                  name="imageToAdd"
                  onChange={images}
                  error={errors.imageToAdd}
                />
              </Button>
              {errors.imageToAdd}
              <Button
                variant="contained"
                color="primary"
                style={{ marginLeft: '15px' }}
                onClick={handleuSbmit}>
                submit
          </Button>
            </div>
          </Form>
        </Grid>
        <Grid item md={6} xs={12} className={classes.mapArea}>
          <Map setLatLng={setLatLng} />
        </Grid>
        <Notification notify={notify} setNotify={setNotify}></Notification>
      </Grid>
    </>
  );
};

