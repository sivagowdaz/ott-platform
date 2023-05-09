import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { loginUser } from '../../context/authcontext/apiCalls';
import { AuthContext } from '../../context/authcontext/AuthContext';
import "./login.css"

const Login = () => {
    const [user_cred, setUser] = useState({})
    const {user, dispatch, error, isFetching}  = useContext(AuthContext)

    const handleChange = (e) => {
        e.preventDefault()
        setUser({ ...user_cred, [e.target.name]: e.target.value })
    }

    const handleClick = (e) => {
        e.preventDefault()
        loginUser(dispatch, user_cred)
        
    }
    console.log("the user is", user)
    return (
        <div className="login">
            <div className='login_container'>
                <img src='https://tse2.mm.bing.net/th?id=OIP.jKAMSEvxq2mNNFuxMWMbOAHaHa&pid=Api&P=0&w=153&h=153' alt='admin_logo'></img>
                <p>Admin Login</p>
                <input type='text' placeholder='email' name='email' onChange={(e) => handleChange(e)}></input>
                <input type='password' placeholder='password' name='password' onChange={(e) => handleChange(e)}></input>
                <button onClick={(e) => handleClick(e)}>Login</button>
                {error && <div className='error_messages'>Something went wrong</div>}
            </div>
        </div>

    )
}

export default Login



