import {
    GET_PERMISSIONS_REQUEST,
    GET_PERMISSIONS_FAIL,
    GET_PERMISSIONS_SUCCESS,
    GET_TOOLS_REQUEST,
    GET_TOOLS_FAIL,
    GET_TOOLS_SUCCESS,
} from "./actionTypes";


const INIT_STATE = {
    data:[],
    tool: [],
    loading: false,
    success: false,
    fail: false,
    errors: {}
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_PERMISSIONS_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
                errors: {},
            };
        case GET_PERMISSIONS_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,
            };
        case GET_PERMISSIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                data: action.result.results,
                errors: {},
            };
            case GET_TOOLS_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
                errors: {},
            };
        case GET_TOOLS_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,
            };
        case GET_TOOLS_SUCCESS:
            console.log('GET_PERMISSIONS_SUCCESS', action.result.results)
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                tool: action.result.results,
                errors: {},
            };

        default:
            return {...state};
    }
};


