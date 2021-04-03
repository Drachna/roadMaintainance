import React from 'react';
import { Controls } from '../../UIControls/Controls';
import { Form, useForms } from '../../UIControls/Form';
import { Button } from '@material-ui/core'
import {addAction} from '../../../Services/Api/putMethodCalls'
import { useHistory } from "react-router-dom";
import {priorityOptions,statusOptions} from '../../../assets/data/optionArrays'

const initialFieldValues = {
  actionDescription: '',
  status: '',
  priority: ''
}

const ProvideUpdateForm = (props) => {
  const { values, handleChange } = useForms(initialFieldValues)
  const history = useHistory()
  const handleClick = async (e) => {
    const updatedComplain = await addAction(values, props.id)
    history.push('/')
  }

  return (
    <Form>
      <Controls.Input
        name="actionDescription"
        label="Action Taken"
        value={values.actionDescription}
        onChange={handleChange}
      />
      <Controls.Select
        name="status"
        label="Request Status"
        value={values.status}
        onChange={handleChange}
        options={statusOptions}
      />
      <Controls.Select
        name="priority"
        label="Priority"
        value={values.priority}
        onChange={handleChange}
        options={priorityOptions}
      />
      <br></br>
      <Button onClick={handleClick} variant="contained" color="primary">
        Update
      </Button>
    </Form>
  );
};

export default ProvideUpdateForm;