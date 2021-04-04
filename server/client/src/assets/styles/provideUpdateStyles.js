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
    borderRadius: '1.3rem'
  },
  gridItem: {
    border: 'solid',
    borderRadius: '0.5rem',
    borderTopRightRadius:'1.5rem',
    borderTopLeftRadius:'1.5rem'
  },
  actionHistory: {
    border: 'solid',
    borderRadius: '1.5rem'
  },
}))