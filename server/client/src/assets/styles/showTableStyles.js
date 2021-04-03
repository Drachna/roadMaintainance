import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  container: {
    width: '100%'
  },
  toolbar: {
    display: 'flex'
  },
  header: {
    float: 'left',
    flexGrow: 1
  },
  searchBox: {
    float: 'right'
  }
})