import { FormControl, InputLabel, MenuItem, Select as MuiSelect ,FormHelperText} from '@material-ui/core';
import React from 'react';

function Select(props) {

  const { name, value, label,error=null, onChange, options } = props
  console.log(props, 'select');
  return (
    <FormControl variant="outlined"
    {...(error && {error:true})}
    >
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        label={label}
        name={name}
        value={value}
        onChange={onChange}
      >
        <MenuItem value="" >None </MenuItem>
        {
          options.map((item, index) => {
            return <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
          })
        }
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}

export default Select;

