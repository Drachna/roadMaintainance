import {makeStyles} from '@material-ui/core'

export  const useStyles = makeStyles(theme => ({
  root: {
    width: '60%',
    margin: 'auto',
    marginTop: '1%',
    border: '1px solid #ccc',
    textAlign:'center',
    borderRadius: theme.spacing(2),
  },
  button:{
    margin:'20px'
  },
  form:{
    paddingTop:'20px'
  }
}))