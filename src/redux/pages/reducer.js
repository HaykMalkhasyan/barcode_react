import {
    GET_PAGES_REQUEST,GET_PAGES_FAIL,GET_PAGES_SUCCESS,
} from "./actionTypes";
import {saveSession} from "../../utility/session";


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
            // fakeObj{
            let data1 = {
                    1: {
                        name: 'users',
                        value: [
                            {name: 'add'},
                            {name: 'edit'},
                            {name: 'delete'}
                        ],
                    },
                    2:{
                        name:"positions",
                        value: [
                            {name: 'add'},
                            {name: 'edit'},
                            {name: 'delete'}
                        ],
                    },
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


