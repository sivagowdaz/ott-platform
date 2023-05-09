import React from "react";
import { createContext, useReducer } from "react";
import {userReducer} from './userReducer'

let initialState = {
    userList :[],
    isFetching: false,
    error: false
}

export const userContext = createContext(initialState)

const UserContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState)


    return (
        <userContext.Provider
            value={{
                userList: state.userList,
                isFetching : state.isFetching,
                error: state.error,
                dispatch
            }}>
            {children}
            
       </userContext.Provider>
    )
        
    
}
export default UserContextProvider