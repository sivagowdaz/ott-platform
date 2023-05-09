import { createContext, useReducer } from "react";
import React from 'react';
import { serialReducer } from "./serialReducer"

let initialState = {
    serials: [],
    isFetching: false,
    error: false
}

export const serialContext = createContext(initialState)

const SerialContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(serialReducer, initialState)

    return (
        <serialContext.Provider
            value={{
                serials: state.serials,
                isFetching: state.isFetching,
                error: state.error,
                dispatch
            }}>
            {children}
        </serialContext.Provider>
    )
}

export default SerialContextProvider