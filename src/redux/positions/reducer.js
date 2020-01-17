import {
    GET_POSITIONS_REQUEST, GET_POSITIONS_FAIL, GET_POSITIONS_SUCCESS,
    HANDLE
} from "./actionTypes";
import {ADD_MODAL, DELETE_MODAL, EDIT_MODAL, SET_MODAL_VALUES} from "../positions/actionTypes";


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
            return {
                ...state,
                // user: {
                //     ...state.user,
                //     ...action.value
                // },

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


