export const seriesReducer = (state, action) => {
    switch (action.type) {
        case "GET_SERIES_START": return {
            series: [],
            isFetching: true,
            error: false
        };
        case "GET_SERIES_SUCCESS": return {
            series: action.payload,
            isFetching: true,
            error: false
        };
        case "GET_SERIES_FAILURE": return {
            series: [],
            isFetching: false,
            error: true
        };
        case "DELETE_SERIES_START":
            return {
                ...state,
                isFetching: true,
                error: false,
            };
        case "DELETE_SERIES_SUCCESS":
            console.log("the action payload is action.payload", action.payload)
            return {
                series: state.series.filter((seri) => seri.cont_id !== action.payload),
                isFetching: false,
                error: false,
            };
        case "DELETE_SERIES_FAILURE":
            return {
                ...state,
                isFetching: false,
                error: true,
            };
        default:
            return { ...state };

    }
}