import { createContext, useReducer } from "react";
import React from 'react';
import { seriesReducer } from "./seriesReducer"

let initialState = {
    series: [],
    isFetching: false,
    error: false
}

export const seriesContext = createContext(initialState)

const SeriesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(seriesReducer, initialState)

    return (
        <seriesContext.Provider
            value={{
                series: state.series,
                isFetching: state.isFetching,
                error: state.error,
                dispatch
            }}>
            {children}
        </seriesContext.Provider>
    )
}

export default SeriesContextProvider