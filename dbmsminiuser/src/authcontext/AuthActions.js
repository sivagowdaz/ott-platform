export const loginstart = () => ({
    type: "LOGIN_START"
})

export const loginsuccess = (user) => ({
    type: "LOGIN_SUCESS",
    payload: user
})

export const loginfailure = () => ({
    type: "LOGIN_FAILURE"
})

export const logout = () => (
    {
        type: 'LOGOUT'
    }
)