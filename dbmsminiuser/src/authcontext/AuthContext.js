import React from 'react';
import { createContext, useReducer, useEffect } from 'react';
import { authReducer } from './AuthReducer';

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    is_fetching: false,
    error: false
}

export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, INITIAL_STATE)

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(state.user))
    }, [state.user])

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                is_fetching: state.is_fetching,
                error: state.error,
                dispatch
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}