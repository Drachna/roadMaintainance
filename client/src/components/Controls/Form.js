import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiFormControl-root':{
      width:'80%',
      margin:theme.spacing(1)
    }
  }
}))

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
    <form className={classes.root} autoComplete='off'>
      {props.children}
    </form>
  );
}

