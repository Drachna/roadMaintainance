import React from 'react';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnUtils from '@date-io/date-fns'

function DatePicker(props) {
  const {name, value, label, onChange} = props

  const convertDefault = (name, value) => ({
    target: {
      name, value
    }
  })

  return (
    <MuiPickersUtilsProvider utils={DateFnUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        inputVariant="outlined"
        label={label}
        format="MMM/dd/yyyy"
        name={name}
        value={value}
        onChange={date=>onChange(convertDefault(name,date))}
      />
    </MuiPickersUtilsProvider>
  );
}
export default DatePicker;