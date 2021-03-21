import React from 'react';
import { TextField ,makeStyles} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {

    // width:'80%',
    // margin:theme.spacing(1)
    
  }
}))

function Input(props) {
  const classes=useStyles()
  const { name, value, error=null, label, onChange,type="text", ...other } = props
  return (
    <TextField
    className={classes.root}
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