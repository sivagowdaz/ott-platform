import { axiosJWT } from "../../helper";

export const get_series = async (dispatch) => {
    dispatch({
        type: 'GET_SERIES_START'
    })
    let res = await axiosJWT.get("http://localhost:5000/api/content/get_contents/?type=series", {
        headers: {
            authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).tokens.access_token}`
        }
    })
    console.log(res.data)
    dispatch({
        type: 'GET_SERIES_SUCCESS',
        payload: res.data
    })
}

export const create_series = async (dispatch, series) => {
    console.log(series)
}

export const delete_series = async (dispatch, id) => {
    dispatch({
        type: 'DELETE_SERIES_START'
    })
    let res = await axiosJWT.delete("http://localhost:5000/api/content/delete_content/" + id, {
        headers: {
            authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).tokens.access_token}`
        }
    })
    console.log(res.data)
    dispatch({
        type: 'DELETE_SERIES_SUCCESS',
        payload: id
    })
}