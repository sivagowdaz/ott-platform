import axios from 'axios';


export const loginUser = (dispatch, user) => {
    axios.post('http://localhost:5000/api/auth/login/', user)
        .then((res) => res.data)
        .then((data) => {
            console.log("the user data is", data)
            if (data.user.is_admin === '1') {
                dispatch({
                    type: "LOGIN",
                    payload: data
                })
            } else {
                dispatch({
                    type: "LOGIN_FAILURE"
                })
                setTimeout(() => {
                    console.log("inside the set timeout function")
                    dispatch({
                        type: "SET_TO_DEFAULT"
                    })
                }, 3000)
                console.log("you are not the admin")
            }
            
        })
}