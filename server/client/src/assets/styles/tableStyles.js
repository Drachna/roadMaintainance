import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
  table: {
    minWidth:'500px',
    maxWidth: '100%',
    '& thead th': {
      fontWeight: '600',
      color: 'white',
      backgroundColor: 'black',
    },
    '& .MuiTableSortLabel-root:hover': {
      color: '#967573',
      cursor: 'pointer',
    },
    '& tbody td': {
      fontWeight: '300',
    },
    '& .MuiTableSortLabel-active ': {
      color: '#967573'
    },
    '& tbody tr:hover': {
      backgroundColor: '#fffbf2',
      cursor: 'pointer',
    },
  },
}))
