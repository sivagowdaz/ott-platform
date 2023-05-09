export const userReducer = (state, action) => {
    switch (action.type) {
        case "GET_USERS_START":
            return {
                userList: [],
                isFetching: true,
                error: false,
            };
        case "GET_USERS_SUCCESS":
            return {
                userList: action.payload,
                isFetching: false,
                error: false,
            };
        case "GET_USERS_FAILURE":
            return {
                userList: [],
                isFetching: false,
                error: true,
            };
        case "DELETE_USER_START":
            return {
                ...state,
                isFetching: true,
                error: false,
            };
        case "DELETE_USER_SUCCESS":
            return {
                userList: state.userList.filter((user) => user.email !== action.payload),
                isFetching: false,
                error: false,
            };
        case "DELETE_USER_FAILURE":
            return {
                ...state,
                isFetching: false,
                error: true,
            };
        default:
            return { ...state };
    }
};

