import { axiosJWT } from "../../helper";

export const get_serial = async (dispatch) => {
    dispatch({
        type: 'GET_SERIALS_START'
    })
    let res = await axiosJWT.get("http://localhost:5000/api/content/get_contents/?type=serial", {
        headers: {
            authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).tokens.access_token}`
        }
    })
    console.log("the response is", res.data)
    dispatch({
        type: 'GET_SERIAL_SUCCESS',
        payload: res.data
    })
}

export const create_serial = async (dispatch, serial) => {
    console.log(serial)
}

export const delete_serial = async (dispatch, id) => {
    dispatch({
        type: 'DELETE_SERIAL_START'
    })
    let res = await axiosJWT.delete("http://localhost:5000/api/content/delete_content/" + id, {
        headers: {
            authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).tokens.access_token}`
        }
    })
    console.log(res.data)
    dispatch({
        type: 'DELETE_SERIAL_SUCCESS',
        payload: id
    })
}