import React from 'react';
import { useState, useRef } from 'react';
import './register.scss';
import axios from 'axios';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

// export default function Register() {
//     const [email, setEmail] = useState('')
//     const [username, setUserName] = useState('')
//     const [password, setPassword] = useState('')
//     const emailRef = useRef()
//     const passwordRef = useRef()
//     const usernameRef = useRef()
//     const history = useHistory()

   
//     const handleStart = () => {
//         setEmail(emailRef.current.value)
//     }
//     const handleFinish = async (e) => {
//         e.preventDefault()
//         setUserName(usernameRef.current.value)
//         setPassword(passwordRef.current.value)
//         console.log(email, username, password)
//         try {
//             const res = await axios.post('http://localhost:5000/api/auth/register', { email, password, username })
//             console.log(res.data)
//             history.push('/login')
//         } catch (err){
//         console.log(err)
//         }
        

//     }

//     return (
//         <div className='register'>
//             <div className="top">
//                 <div className="wrapper">
//                     <img className='logo' src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png" alt="" />
//                     <Link className='link'>
//                             <button className="loginButton">
//                                 Sigin In
//                         </button>
//                     </Link>
//                 </div>
//             </div>
//             <div className="container">
//                 <h1>
//                     Unlimited Movies Series and Entertainment
//                 </h1>
//                 <h2>
//                     Cancel at Anywhere and any Time
//                 </h2>
//                 <p>ready to watch? Enter your email to register or restart your membership</p>
//                 {
//                     !email ?
//                         (
//                         <div className="input">
//                             <input type="email" placeholder='email address' ref={emailRef} />
//                             <button className="registerButton" onClick={handleStart}>Get Started</button>
//                         </div>
//                         )
//                     :
//                         (
//                             <form className="input">
//                             <input type="text" placeholder="username" ref={usernameRef} />
//                             <input type="password" placeholder="password" ref={passwordRef} />
//                             <button className="registerButton" onClick={(e) => (handleFinish(e))}>
//                                 Start
//                             </button>
//                         </form>
//                         )
                
//                 }
//             </div>
            
//         </div>
//     )
// }

const Register = () => {
    const [user_detail, setUserDetail] = useState({})
    const history = useHistory()

    const handleChange = (e) => {
        e.preventDefault()
        setUserDetail({...user_detail, [e.target.name]:e.target.value})
    }
    const handleClick = async(e) => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', user_detail)
            console.log(res.data)
            history.push('/login')
        } catch (err){
        console.log(err)
        }

    }

    return (
        <div>
            <input type='text' name='email' placeholder='email' onChange={(e) => handleChange(e)}/>
            <input type='text' name='username' placeholder='username' onChange={(e) => handleChange(e)}/>
            <input type='text' name='password' placeholder='password' onChange={(e) => handleChange(e)} />
            <button type='submit' onClick={(e) => handleClick(e)}>Sign Up</button>
        </div>
    )
}

export default Register;