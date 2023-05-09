import React from 'react'
import { useState, useRef, useContext } from 'react'
import { login } from '../../authcontext/apiCalls'
import { AuthContext } from '../../authcontext/AuthContext'
import './login.scss'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { dispatch } = useContext(AuthContext)
    
    const handleClick = (e) => {
        e.preventDefault()
        login({email, password}, dispatch)
    }

    return (
        <div className='login'>
            <div className="top">
                <div className="wrapper">
                    <p className='website_title'>Movies Today</p>
                    <button className="loginButton">
                        Sign Up
                    </button>
                </div>
            </div>
            <div className="container">
                <form action="#">
                    <h1>Sign In</h1>
                    <input type= 'email' placeholder='email address or phone number' onChange={(e) => (setEmail(e.target.value))}></input>
                    <input type='password' placeholder='password' onChange={(e) => (setPassword(e.target.value))} />
                    <button className="loginButton" onClick={(e) => (handleClick(e))}>
                        Sign In
                    </button>
                    <span>
                        new to MoviesToday?<b>Sign up now</b>
                    </span>
                    <small>
                        this page is protected from google CAPTCHA in order make sure you are not bot.
                        <b>Learn More</b>
                    </small>
                </form>
                
            </div>
            
        </div>
    )
}
