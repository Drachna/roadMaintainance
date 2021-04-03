import { makeStyles } from "@material-ui/core";


export const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  complainInfo: {
    paddingTop: theme.spacing(2)
  },
  heading: {
    padding: theme.spacing(2)
  },
  complainHistory: {
    height: '30rem',
    overflow: 'auto'
  },
  paper: {
    maxHeight: '100%',
    overflow: 'auto'
  },
  card: {
    border: 'solid',
    borderRadius: '0.8rem'
  }
}))