import React from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio ,makeStyles} from '@material-ui/core';
const useStyles=makeStyles({
  root:{
    // width:'60%',
    margin:'10px',
    // marginLeft:'8px',
    // display:'flex',
    justifyContent: "center",
  },
  label:{
    textAlign:'left'
  }
})
const RadioButton = (props) => {
  const { name, label, value, onChange, options } = props
  const classes=useStyles()
  return (
    <FormControl align="center" className={classes.root} >
      <FormLabel className={classes.label}> {label}</FormLabel>
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