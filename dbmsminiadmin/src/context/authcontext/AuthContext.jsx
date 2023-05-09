import React from "react";
import {useEffect} from "react"
import { createContext, useReducer } from "react";
import {authReducer} from "./authReducer"


let initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    isFetching: false,
    error: false
}

export const AuthContext = createContext(initialState)



const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState)

    useEffect(() => {
       
        localStorage.setItem('user', JSON.stringify(state.user))
        console.log("inside the use effect function ")
        
    }, [state.user])


    return (
        <AuthContext.Provider
            value={{
                user: state.user, 
                isFetching: state.isFetching,
                error: state.error,
                dispatch
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider