import axios from 'axios';
import { loginfailure, loginstart, loginsuccess } from './AuthActions';

export const login = async (user, dispatch) => {
    dispatch(loginstart())
    try {
        const res = await axios.post('http://localhost:5000/api/auth/login/', user)
        console.log("the login data is", res.data)
        dispatch(loginsuccess(res.data))
    } catch {
        dispatch(loginfailure())
    }
}




