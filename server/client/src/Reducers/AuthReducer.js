import {LOGIN} from './actionTypes'
const initialField={
  authState:'NOT_LOGGED_IN'
}

export const AuthReducer=(state,action)=>{
  switch (action.type) {
    case LOGIN:
      return{
        authState:action.payload
      }
    default:
      return state
  }
}