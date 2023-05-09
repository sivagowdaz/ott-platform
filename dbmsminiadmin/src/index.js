import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from "./App"
import reportWebVitals from './reportWebVitals';
import AuthProvider from "./context/authcontext/AuthContext"
import UserContextProvider from "./context/usercontext/UserContext";
import MovieContextProvider from "./context/moviecontext/MovieContext"
import SeriesContextProvider from "./context/seriescontext/SeriesContext"
import SerialContextProvider from "./context/serialcontext/SerialContext"



ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <UserContextProvider>
        <MovieContextProvider>
          <SeriesContextProvider>
            <SerialContextProvider>
              <App />
            </SerialContextProvider>
          </SeriesContextProvider>
        </MovieContextProvider>
      </UserContextProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
