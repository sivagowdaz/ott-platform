import { axiosJWT } from "../../helper";

export const get_movies = async(dispatch) => {
    dispatch({
        type: 'GET_MOVIES_START'
    })
    let res = await axiosJWT.get("http://localhost:5000/api/content/get_contents/?type=movie", {
        headers: {
            authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).tokens.access_token}`
        }
    })
    console.log(res.data)
    dispatch({
        type: 'GET_MOVIES_SUCCESS',
        payload: res.data
    })
}

export const create_movie = async (dispatch, movie) => {
    console.log(movie)
}

export const delete_movie = async (dispatch, id) => {
    dispatch({
        type: 'DELETE_MOVIE_START'
    })
    let res = await axiosJWT.delete("http://localhost:5000/api/content/delete_content/" + id, {
        headers: {
            authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).tokens.access_token}`
        }
    })
    console.log(res.data)
    dispatch({
        type: 'DELETE_MOVIE_SUCCESS',
        payload: id
    })
}