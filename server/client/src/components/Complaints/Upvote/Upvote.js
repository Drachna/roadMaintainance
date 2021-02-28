import React, { useContext, useState } from 'react';
import { TextField, Button } from '@material-ui/core'
import { Form, useForms } from '../../Controls/Form'
import { Controls } from '../../Controls/Controls'
import { addUpvote } from '../../../Services/Api/putMethodCalls'
import axios from 'axios'
import { ComplainContext } from '../../../Contexts/Complains/complainsContext';
import { fetchAllComplains } from '../../../Services/Api/getMethodCalls';

const initialFieldValues = {
  email: ''
}

const Upvote = (props) => {
  // const [email, setEmail] = useState('')
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
    // props.addUpvote(email)

    if (validate()) {

      const data = {
        _id: editComplaint._id,
        email: values.email
      }
      const add = await addUpvote(data)
      const allComplains = await fetchAllComplains()
      if (allComplains)
        dispatchComplains({ type: 'FETCH_ALL_COMPLAINS', payload: allComplains })
      setOpenPopUp(false)
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
      <Button
        variant="contained"
        color="primary"
        style={{ marginLeft: '8px' }}
        onClick={handleClick}
      >
        Upvote
    </Button>
    </Form>
  );
};

export default Upvote;