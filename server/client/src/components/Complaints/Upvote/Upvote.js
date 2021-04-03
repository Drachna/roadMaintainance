import React, { useContext, useState } from 'react';
import { Button } from '@material-ui/core'
import { Form, useForms } from '../../UIControls/Form'
import { Controls } from '../../UIControls/Controls'
import { addUpvote } from '../../../Services/Api/putMethodCalls'
import { ComplainContext } from '../../../Contexts/Complains/complainsContext';
import { fetchAllComplains } from '../../../Services/Api/getMethodCalls';
import { FETCH_ALL_COMPLAINS } from '../../../Reducers/actionTypes'

const initialFieldValues = {
  email: ''
}

const Upvote = (props) => {
  const { values, setValues, errors, setErrors, handleChange } = useForms(initialFieldValues)
  const { dispatchComplains } = useContext(ComplainContext)
  const { setOpenPopUp, editComplaint } = props

  const validate = () => {
    let temp = { ...errors }
    temp.email = values.email ? (/$^|.+@.+..+/).test(values.email) ? "" : "Enter valid email" : "This field is required"
    setErrors({
      ...temp
    })
    return Object.values(temp).every(x => x === "")
  }

  const handleClick = async () => {
    if (validate()) {
      const data = {
        _id: editComplaint._id,
        email: values.email
      }
      await addUpvote(data)
      const allComplains = await fetchAllComplains()
      if (allComplains) {
        dispatchComplains({ type: FETCH_ALL_COMPLAINS, payload: allComplains })
        setOpenPopUp(false)
      }
    }
  }
  return (
    <Form>
      <div style={{ margin: '10px' }}>
        <Controls.Input
          name="email"
          label="Email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
        />
        <Button
          variant="contained"
          color="primary"
          style={{ marginLeft: '8px' }}
          onClick={handleClick}
        >
          Upvote
       </Button>
      </div>
    </Form>
  );
};

export default Upvote;