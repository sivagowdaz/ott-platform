import React from 'react';
import { useState, useEffect } from "react";
import Spinner from '../../components/spinner/Spinner';
import { axiosJWT } from '../../helper';
import './createUser.css'



const CreateUser = () => {
    const [user, setUser] = useState({})
    const [creating, setCreating] = useState(false)

    const handleChange = (e) => {
        e.preventDefault()
        setUser({...user, [e.target.name]:e.target.value})
    }
    
    const handleClick = async (e) => {
        setCreating(true)
        e.preventDefault()
        console.log(user)
        let res = await axiosJWT.post('http://localhost:5000/api/auth/register-admin/', user, {
            headers: {
                authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).tokens.access_token}`
            }
        })
       setCreating(false)
    }


    return (
        <div className="create_user">
            <div className='form_div'>
                <input type='email' className='input_box' placeholder='email' name='email' onChange={(e) => handleChange(e)}/>
                <input type='text' className='input_box' placeholder='username' name='username' onChange={(e) => handleChange(e)}/>
                <input type='text' className='input_box' placeholder='password' name='password' onChange={(e) => handleChange(e)} />
                <div className='previladge'>
                    <input type='checkbox' className='input_box' name='is_admin' placeholder='admin' value='1' onChange={(e) => handleChange(e)} /> <p>admin</p>
                </div>
                <div className='previladge'>
                    <input type='checkbox' className='input_box' name='is_staff' value='2' placeholder='staff' onChange={(e) => handleChange(e)} /> <p>staff</p>
                </div>
                <div className='previladge'>
                    <input type='checkbox' className='input_box' name='is_customer' value='3' placeholder='customer' onChange={(e) => handleChange(e)} /> <p>customer</p>
                </div>
                {
                    creating ? <Spinner color='blue' text='creating...'></Spinner>
                        :
                    <button className='submit_button' type='submit' onClick={(e) => handleClick(e)}>Create</button>    
                }
               
            </div>
        </div>
    )
}

export default CreateUser