import { makeStyles } from '@material-ui/core'
import backGroundImage from '../images/road-984118_1280.jpg'

export const useStyles = makeStyles({
  toolbar: {
    background: 'black'
  },
  login: {
    color: 'white',
    border: '0.1rem solid',
    marginLeft: 'auto',
    fontSize: '0.8rem'
  },
  menuButton: {
    color: 'white',
    border: '0.1rem solid',
    marginRight: '2rem',
    fontSize: '0.8rem'
  },
  main: {
    background: `url(${backGroundImage})`,
    maxWidth: '100%',
    height: '100vh',
    backgroundRepeat: 'no-repeat',
    overflowX: 'hidden',
    backgroundSize: '100% 100%'
  },
  heading: {
    fontSize: '4rem'
  }
})