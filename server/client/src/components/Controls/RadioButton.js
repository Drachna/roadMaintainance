import React from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio ,makeStyles} from '@material-ui/core';
const useStyles=makeStyles({
  root:{
    
    display:'flex',
    justifyContent: "space-between",
  }
})
const RadioButton = (props) => {
  const { name, label, value, onChange, options } = props
  const classes=useStyles()
  return (
    <FormControl className={classes.root}>
      <FormLabel align="left"> {label}</FormLabel>
      <RadioGroup
        row
        name={name}
        value={value}
        onChange={onChange}>
        {
          options.map((option, index) => (
            <FormControlLabel
              key={index}
              value={option.value}
              label={option.label}
              control={<Radio />}
            />
          ))
        }
      </RadioGroup>
    </FormControl>
  );
};

export default RadioButton;