import { makeStyles } from "@material-ui/core";


export const useStyles = makeStyles(theme => ({
  root: {
    padding: '0rem 2.5rem',
    '& .MuiGrid-item': {
    }

  },
  formArea: {
    justifyContent: 'center',
    alignItems: 'center', 
    borderRadius: '1.3rem'
  },
  mapArea:{
    padding:'0.8rem',
    marginTop:'0.6rem',
    height:'38rem',
  },
  formContent:{
margin:'0.8rem 0rem'
  }
}))
