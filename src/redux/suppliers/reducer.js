import {
    GET_SUPPLIERS_REQUEST,
    GET_SUPPLIERS_FAIL,
    GET_SUPPLIERS_SUCCESS,
    GET_SUPPLIER_REQUEST,
    GET_SUPPLIER_FAIL,
    GET_SUPPLIER_SUCCESS,
    ADD_SUPPLIER_REQUEST,
    ADD_SUPPLIER_FAIL,
    ADD_SUPPLIER_SUCCESS,
    EDIT_SUPPLIER_REQUEST,
    EDIT_SUPPLIER_FAIL,
    EDIT_SUPPLIER_SUCCESS,
    DELETE_SUPPLIER_REQUEST,
    DELETE_SUPPLIER_FAIL,
    DELETE_SUPPLIER_SUCCESS,
    GET_BANKS_REQUEST,
    GET_BANKS_FAIL,
    GET_BANKS_SUCCESS,
    SET_SUPPLIER_MODAL,
    TOGGLE_SUPPLIER_MODAL,
    GET_Currency_REQUEST,
    GET_Currency_FAIL,
    GET_Currency_SUCCESS,
    SUPPLIERS_ADD_MODAL,
    SET_SUPPLIERS_VALUE,
    FETCH_SUPPLIER_REQUEST,
    FETCH_SUPPLIER_FAIL,
    FETCH_SUPPLIER_SUCCESS, SUPPLIERS_OPEN_MODAL, EMPTY_VALUE, SUCCES_VALUE,
} from "./actionTypes";
import {IsRequiredField, IsRequiredFields, Push, Put, RemoveItem} from "../../utility/utils";


const INIT_STATE = {
    suppliers: [],
    supplier: {},
    banks: [],
    currency: [],
    modal: {},
    required: [
        "name",
    ],
    loading: false,
    success: false,
    fail: false,
    errors: {},
    tin: {},
    /*---------------------------------*/
    isOpen: false,
    modalType: '',
    setSupplier: {
        name: '',
        hh: '',
        hvhh: '',
        address: '',
        tin: [],
        director: '',
        phone: [],
        active: 0,
        type: 0
    },
    errorMessage: null,
    checkValueStatus: {
        name: false,
        hh: false,
        hvhh: false,
        address: false,
        director: false,
        bank_id: false,
        currency_id: false,
        tin_value: false,
        phone: false
    },
};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_SUPPLIERS_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                modal: {},
                fail: false,
                errors: {},
            };
        case GET_SUPPLIERS_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                modal: {},
                fail: true,
            };
        case GET_SUPPLIERS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                suppliers: action.result.results,
                modal: {},
                errors: {},
            };
        case GET_SUPPLIER_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
                errors: {},
            };
        case GET_SUPPLIER_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,
            };
        case GET_SUPPLIER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                setSupplier: action.result,
                errors: {},
            };
        case ADD_SUPPLIER_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
                errors: IsRequiredFields(state.required, state.supplier, state.errors)
            }
        case ADD_SUPPLIER_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,

            };
        case ADD_SUPPLIER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                modal: {},
                suppliers: {
                    ...JSON.parse(action.result.data),
                    ...state.suppliers,
                }
            };
        case EDIT_SUPPLIER_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
                errors: IsRequiredFields(state.required, state.supplier, state.errors)
            }
        case EDIT_SUPPLIER_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,

            };
        case EDIT_SUPPLIER_SUCCESS:
            console.log('action.result',action.result)
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                modal: {},
                isOpen: false,
                setSupplier: {
                    name: '',
                    hh: '',
                    hvhh: '',
                    address: '',
                    tin: [],
                    director: '',
                    phone: [],
                    active: 0,
                    type: 0
                },
                suppliers: Put(state.suppliers, action.result)
            };
        case DELETE_SUPPLIER_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
            }
        case DELETE_SUPPLIER_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,

            };
        case DELETE_SUPPLIER_SUCCESS:
            return {
                ...state,
                suppliers: RemoveItem(state.suppliers, action.data),
                modal: {},
                loading: false,
                success: true,
                fail: false,
                supplier: {}
            };
        case GET_BANKS_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                modal: {},
                fail: false,
                errors: {},
            };
        case GET_BANKS_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                modal: {},
                fail: true,
            };
        case GET_BANKS_SUCCESS:
            return {
                ...state,
                banks: action.result.results,
                modal: {},
                loading: false,
                success: true,
                fail: false,
                errors: {},
            };
        case GET_Currency_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                modal: {},
                fail: false,
                errors: {},
            };
        case GET_Currency_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                modal: {},
                fail: true,
            };
        case GET_Currency_SUCCESS:
            return {
                ...state,
                currency: action.result.results,
                modal: {},
                loading: false,
                success: true,
                fail: false,
                errors: {},
            };
        case SET_SUPPLIER_MODAL:
            if (typeof action.index !== 'undefined') {
                if (!state.supplier[action.key]) {
                    state.supplier[action.key] = []
                }
                if (typeof action.add === 'undefined') {
                    state.supplier[action.key][action.index] = action.value;
                } else if (action.add) {
                    state.supplier[action.key][action.index + 1] = action.value;
                } else {
                    state.supplier[action.key].splice(action.index, 1);
                }
            } else {
                state.supplier[action.key] = action.value;
            }
            return {
                ...state,
                errors: IsRequiredField(state.required, action, state.errors)
            };
        case TOGGLE_SUPPLIER_MODAL:
            state.modal[action.modalType] = !state.modal[action.modalType];

            if (action.obj) {
                if (action.modalType === "edit") {
                    state.supplier[action.obj.key] = action.obj.value
                } else {
                    state.supplier = action.obj
                }
            }

            return {
                ...state,
                errors: {}
            }
        /*---------------------------------*/
        case SUPPLIERS_ADD_MODAL:
            return {
                ...state,
                isOpen: !state.isOpen,
                modalType: action.text,
                setSupplier: action.cleanSuppliers,
                checkValueStatus: action.cleanValueStatus,
            }
        case  SUPPLIERS_OPEN_MODAL:
            return {
                ...state,
                isOpen: !state.isOpen,
                modalType: action.text
            }
        case SET_SUPPLIERS_VALUE:
            return {
                ...state, setSupplier: action.setSupplier
            }
        case FETCH_SUPPLIER_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false
            }
        case FETCH_SUPPLIER_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,

            };
        case FETCH_SUPPLIER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                isOpen: false,
                suppliers: Push(state.suppliers, action.result),
                setSupplier: action.cleanSuppliers
            };
        case EMPTY_VALUE:
            let newCheckValueStatusError = state.checkValueStatus;
            switch (action.name) {
                case `bank_id`:
                case 'currency_id':
                case 'tin_value':
                case 'phone':{
                    if (newCheckValueStatusError[action.name] === false) {
                        let obj = [];
                        obj[action.index] = action.text;
                        newCheckValueStatusError[action.name] = obj
                    } else {
                        newCheckValueStatusError[action.name][action.index] = action.text
                    }
                    break;
                }
                default: {
                    newCheckValueStatusError[action.name] = action.text;
                    break;
                }
            }

            return {
                ...state,
                checkValueStatus: newCheckValueStatusError
            }
        case SUCCES_VALUE:
            let newCheckValueStatusSuccess = state.checkValueStatus;
            switch (action.name) {
                case `bank_id`:
                case 'currency_id':
                case 'tin_value':
                case 'phone': {
                    if (newCheckValueStatusSuccess[action.name] !== false) {
                        newCheckValueStatusSuccess[action.name][action.index] = false;
                    }
                    break;
                }
                default: {
                    newCheckValueStatusSuccess[action.name] = false;
                    break;
                }
            }
            return {
                ...state,
                checkValueStatus: newCheckValueStatusSuccess
            }
        default:
            return {...state};
    }
};


