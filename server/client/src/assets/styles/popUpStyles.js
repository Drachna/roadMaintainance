import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
  dialogTitle: {
    background: 'black'
  },
  titleDiv: {
    display: 'flex',
    alignItems: 'center',
    color: 'white'
  },
  title: {
    flexGrow: 1
  },
  closeIcon: {
    background: 'white'
  }
}))
