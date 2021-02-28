import { createContext, useReducer } from "react";
import  {ComplainReducer}  from '../../Reducers/ComplainReducer'

export const ComplainContext = createContext()

export default function ComplainContextProvider  (props)  {

  const [complains, dispatchComplains] = useReducer(ComplainReducer, [])
  return (
    <ComplainContext.Provider value={{ complains, dispatchComplains }}>
      {props.children}
    </ComplainContext.Provider>
  )

}