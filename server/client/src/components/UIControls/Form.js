import React, { useState } from 'react';
import { useStyles } from '../../assets/styles/formStyles'


export function useForms(initialFieldValues) {

  const [values, setValues] = useState(initialFieldValues)
  const [errors,setErrors]=useState({})

  const handleChange = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleChange
  }
}

export function Form(props) {
  const classes = useStyles()
  return (
    <form className={classes.root} autoComplete='off' >
      {props.children}
    </form>
  );
}

