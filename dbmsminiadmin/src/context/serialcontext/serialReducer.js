export const serialReducer = (state, action) => {
    switch (action.type) {
        case "GET_SERIALS_START": return {
            serials: [],
            isFetching: true,
            error: false
        };
        case "GET_SERIAL_SUCCESS":
            console.log("the payload is", action.payload)
            return {
            serials: action.payload,
            isFetching: true,
            error: false
        };
        case "GET_SERIAL_FAILURE": return {
            serials: [],
            isFetching: false,
            error: true
        };
        case "DELETE_SERIAL_START":
            return {
                ...state,
                isFetching: true,
                error: false,
            };
        case "DELETE_SERIAL_SUCCESS":
            console.log("the action payload is action.payload", action.payload)
            return {
                serials: state.serials.filter((serial) => serial.cont_id !== action.payload),
                isFetching: false,
                error: false,
            };
        case "DELETE_SERIAL_FAILURE":
            return {
                ...state,
                isFetching: false,
                error: true,
            };
        default:
            return { ...state };

    }
}