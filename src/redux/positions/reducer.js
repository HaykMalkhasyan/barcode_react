import {
    GET_POSITIONS_REQUEST,GET_POSITIONS_FAIL,GET_POSITIONS_SUCCESS,
    GET_POSITION_REQUEST,GET_POSITION_FAIL,GET_POSITION_SUCCESS,
    ADD_POSITION_REQUEST,ADD_POSITION_FAIL,ADD_POSITION_SUCCESS,
    EDIT_POSITION_REQUEST,EDIT_POSITION_FAIL,EDIT_POSITION_SUCCESS,
    DELETE_POSITION_REQUEST,DELETE_POSITION_FAIL,DELETE_POSITION_SUCCESS,
    ADD_MODAL, DELETE_MODAL, EDIT_MODAL, SET_MODAL_VALUES,
    HANDLE
} from "./actionTypes";

const INIT_STATE = {
    positions: [],
    position: {
        name:"",
        perm:{}
    },
    modal: {},
    loading: false,
    success: false,
    fail: false,
    errors: {}
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_POSITIONS_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
                errors: {},
            };
        case GET_POSITIONS_FAIL:
            // fakeObj{
            let data1 = [
               {id:1,name:"admin"}, {id:2,name:"user"},
            ]

            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                positions: data1,
                errors: {},
            };
            //}

            return {
                ...state,
                loading: false,
                success: false,
                fail: true,
            };
        case GET_POSITIONS_SUCCESS:
            
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                positions: JSON.parse(action.result.data),
                errors: {},
            };
        case GET_POSITION_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
                errors: {},
            };
        case GET_POSITION_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,
            };
        case GET_POSITION_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                position: JSON.parse(action.result.data)[0],
                errors: {},
            };
        case ADD_POSITION_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
            }
        case ADD_POSITION_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,

            };
        case ADD_POSITION_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                modal: false,
                positons: [
                    ...state.positions,
                    JSON.parse(action.result.data)[0]

                ]
            };
        case EDIT_POSITION_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
            }
        case EDIT_POSITION_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,

            };
        case EDIT_POSITION_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                modal: false,
                position: {},
                positions: JSON.parse(action.result.data)
            };
        case DELETE_POSITION_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
            }
        case DELETE_POSITION_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,

            };
        case DELETE_POSITION_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                modal: false,
                position: {},
                positions: JSON.parse(action.result.data)
            };
        case ADD_MODAL:
            return {
                ...state,
                modal:{
                    add: action.modal,
                    edit: false,
                    delete: false
                },
                // user: {}
            };
        case EDIT_MODAL:
            return {
                ...state,
                modal:{
                    add: false,
                    edit: action.modal,
                    delete: false
                },
            };
        case DELETE_MODAL:
            return {
                ...state,
                modal:{
                    add: false,
                    edit: false,
                    delete: action.modal
                },
                // user: {}
            };
        case SET_MODAL_VALUES:
            state.position[action.key]=action.value
            return {
                ...state,
            };
        case HANDLE:
            let perm = state.position.perm;
            if(action.parent){

                if(perm[action.parent]){
                    let index = perm[action.parent].indexOf(action.name);
                    if (index !== -1) {
                        perm[action.parent].splice(index, 1);
                        if(perm[action.parent].length===0){
                            delete perm[action.parent];
                        }
                    }else{
                        perm[action.parent].push( action.name )
                    }
                }else{
                    perm[action.parent] = [ action.name ]
                }
            }else{
                if(perm[action.name]){
                    delete perm[action.name];
                }else {
                    perm[action.name] = [];
                }
            }
            console.log(state.position)
            return {
                ...state,
                position:{
                    ...state.position.name,
                    perm:perm
                }
            }
        default:
            return {...state};
    }
};


