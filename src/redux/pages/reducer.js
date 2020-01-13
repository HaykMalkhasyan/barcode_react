import {
    GET_PAGES_REQUEST,GET_PAGES_FAIL,GET_PAGES_SUCCESS,
} from "./actionTypes";


const INIT_STATE = {
    data:[],
    loading: false,
    success: false,
    fail: false,
    errors: {}
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_PAGES_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
                errors: {},
            };
        case GET_PAGES_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,
            };
        case GET_PAGES_SUCCESS:
            console.log(action.result.data)
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                data: JSON.parse(action.result.data),
                errors: {},
            };

        default:
            return {...state};
    }
};


