import React from 'react';
import { TextField } from '@material-ui/core'

function Input(props) {
  const { name, value, error=null, label, onChange,type="text", ...other } = props
  return (
    <TextField
      name={name}
      value={value}
      label={label}
      onChange={onChange}
      variant="outlined"
      type={type}
      {...other}
      {...(error && {error:true,helperText:error})}
    />
  );
}

export default Input;