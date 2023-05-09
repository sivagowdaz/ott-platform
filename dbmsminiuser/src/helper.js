import axios from 'axios';
import jwt_decode from 'jwt-decode';




export async function set_access_token() {
    let old_user = JSON.parse(localStorage.getItem('user'))
    let old_refresh_token = old_user.tokens.refresh_token
    let res = await axios.post('http://localhost:5000/api/auth/refresh_token/', {
        refresh_token: old_refresh_token
    })
    let { access_token, refresh_token } = await res.data
    console.log("the response data is", await res.data)
    let user = JSON.parse(localStorage.getItem('user'))
    let newUser = {
        tokens: {
            access_token,
            refresh_token
        },
        user: {
            ...user.user
        }
    }
    console.log("the new user is ", newUser)
    localStorage.setItem('user', JSON.stringify(newUser))

}


export const axiosJWT = axios.create()

axiosJWT.interceptors.request.use(
    async (config) => {
        let currentDate = new Date();
        let old_access_token = JSON.parse(localStorage.getItem('user')).tokens.access_token
        const decodedToken = jwt_decode(old_access_token);
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
            const data = await set_access_token();
            let refresh_token = JSON.parse(localStorage.getItem('user')).tokens.refresh_token
            config.headers["authorization"] = "Bearer " + refresh_token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);