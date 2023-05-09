import { createContext, useReducer } from "react";
import React from 'react';
import {movieReducer} from "./movieReducer"

let initialState = {
    movies: [],
    isFetching: false,
    error: false
}

export const movieContext = createContext(initialState)

const MovieContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(movieReducer, initialState)

    return (
        <movieContext.Provider
            value={{
                movies: state.movies,
                isFetching: state.isFetching,
                error: state.error,
                dispatch
        }}>
            {children}
        </movieContext.Provider>
    )
}

export default MovieContextProvider