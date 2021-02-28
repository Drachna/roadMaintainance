import React from 'react';
import { Controls } from '../../Controls/Controls';
import { Form, useForms } from '../../Controls/Form';
import { Button } from '@material-ui/core'
import {addAction} from '../../../Services/Api/putMethodCalls'
import { useHistory } from "react-router-dom";

const initialFieldValues = {
  actionDescription: '',
  status: '',
  priority: ''
}

const priorityOptions = () => ([
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'Low' },
])

const statusOptions = () => ([
  { value: 'Request Acknowledged', label: 'Request Acknowledged' },
  { value: 'Processing Request', label: 'Processing Request' },
  { value: 'Completed', label: 'Completed' },
])


const ProvideUpdateForm = (props) => {
  const { values, setValues, handleChange } = useForms(initialFieldValues)
  const history = useHistory()
  const handleClick = async (e) => {
    const updatedComplain = await addAction(values, props.id)
    console.log(updatedComplain);
    // dispatchComplains({type:'ADD_ACTION',payload:updatedComplain})
    console.log(props);
    console.log(values);
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
        options={statusOptions()}
      />

      <Controls.Select
        name="priority"
        label="Priority"
        value={values.priority}
        onChange={handleChange}
        options={priorityOptions()}
      />
      <br></br>
      <Button onClick={handleClick} variant="contained" color="primary">
        Update
      </Button>
    </Form>
  );
};

export default ProvideUpdateForm;