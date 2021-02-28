import { createContext, useReducer } from "react"
import { AuthReducer } from "../../Reducers/AuthReducer"

export const AuthContext = createContext()

export default function AuthContextProvider  (props)  {
  const [authState, dispatchAuthDetails] = useReducer(AuthReducer,'NOT_LOGGED_IN')
  return (
    <AuthContext.Provider value={{ authState, dispatchAuthDetails }}>
      {props.children}
    </AuthContext.Provider>
  )

}