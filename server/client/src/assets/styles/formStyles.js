import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
  root: {
    border: '1px solid #ccc',
    borderRadius:'1.3rem',
    marginTop:'0.8rem',
    '& .MuiFormControl-root':{
      width:'80%',
      margin:'10px',
      fontSize:'2rem',
    }
  }
}))