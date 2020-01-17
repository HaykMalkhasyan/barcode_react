import {
    GET_PERMISSIONS_REQUEST,GET_PERMISSIONS_FAIL,GET_PERMISSIONS_SUCCESS,
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
        case GET_PERMISSIONS_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
                errors: {},
            };
        case GET_PERMISSIONS_FAIL:
            // fakeObj{
            let data1 = {
                users:['add'],
                positions:[]
            }

            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                data: data1,
                errors: {},
            };
            //}
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
                data: JSON.parse(action.result.data),
                errors: {},
            };

        default:
            return {...state};
    }
};


