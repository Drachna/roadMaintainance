import React from 'react';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@material-ui/core';
import { useStyles } from '../../assets/styles/radioButtonStyles'


const RadioButton = (props) => {
  const { name, label, value, onChange, options } = props
  const classes = useStyles()
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