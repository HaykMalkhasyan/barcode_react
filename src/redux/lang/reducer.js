import {
    GET_LANGUAGES_REQUEST,
    GET_LANGUAGES_FAIL,
    GET_LANGUAGES_SUCCESS,
    GET_TRANSLATIONS_REQUEST,
    GET_TRANSLATIONS_FAIL,
    GET_TRANSLATIONS_SUCCESS,
    SET_ACTIVE_LANGUAGE,
    SET_MODAL_LANGUAGE,
    TOGGLE_MODAL_LANGUAGE,
    SET_TRANSLATIONS_REQUEST,
    SET_TRANSLATIONS_FAIL,
    SET_TRANSLATIONS_SUCCESS,
    TOGGLE_TRANSLATION_MODAL,
    SET_TRANSLATION_MODAL,
    GET_TRANSLATION_REQUEST,
    GET_TRANSLATION_FAIL,
    GET_TRANSLATION_SUCCESS,
    EDIT_TRANSLATION_REQUEST,
    EDIT_TRANSLATION_FAIL,
    EDIT_TRANSLATION_SUCCESS,
    DELETE_TRANSLATION_REQUEST,
    DELETE_TRANSLATION_FAIL, DELETE_TRANSLATION_SUCCESS
} from "./actionTypes";
import SessionStorage from "../../services/SessionStorage";
import {ChangeTranslation, IsRequiredField, IsRequiredFields, Push, RemoveItem} from '../../utility/utils';
// import {SET_GROUP_MODAL} from "../group/actionTypes";
const INIT_STATE = {
    languages: [],
    modalLang: SessionStorage.get("lang") ? SessionStorage.get("lang") : 'am',
    translations: {},
    translation: {},
    active: SessionStorage.get("lang") ? SessionStorage.get("lang") : 'am',
    changeWord: [],
    modal: {},
    loading: false,
    success: false,
    fail: false,
    errors: {},
    required:["value"],
    status: false
};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_LANGUAGES_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
                errors: {},
            };
        case GET_LANGUAGES_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,
            };
        case GET_LANGUAGES_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                languages: action.result.results,
                errors: {},
            };
        case GET_TRANSLATIONS_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
                errors: {},
            };
        case GET_TRANSLATIONS_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,
            };
        case GET_TRANSLATIONS_SUCCESS:
            return {
                ...state,
                translations: action.result.results,
                status: true,
                loading: false,
                success: true,
                fail: false,
                errors: {}
            };
        case SET_TRANSLATIONS_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
                errors: {},
            };
        case SET_TRANSLATIONS_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,
            };
        case SET_TRANSLATIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                translations: Push(state.translations, action.result),
                errors: {},
                status: false
            }
        case SET_ACTIVE_LANGUAGE:
            return {
                ...state,
                active: action.lang,
            };
        case SET_MODAL_LANGUAGE:
            return {
                ...state,
                modalLang: action.lang,
            };
        case  TOGGLE_MODAL_LANGUAGE:
            return {
                ...state,
                modalLang: state.active,
            }
            /*---------------------------------------------------*/
        case TOGGLE_TRANSLATION_MODAL:
            state.modal[action.modalType] = !state.modal[action.modalType];

            if (action.obj) {
                if (action.modalType === 'edit') {
                    state.translation[action.obj.key] = action.obj.value;
                } else {
                    state.translation = action.obj
                }
            }
            return {
                ...state, errors: {}
            };
        case SET_TRANSLATION_MODAL:
            state.translation[action.key] = action.value;
            return {
                ...state,
                errors: IsRequiredField(state.required,action,state.errors)
            }
        case GET_TRANSLATION_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
                errors: {}
            }
        case GET_TRANSLATION_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,
            }
        case GET_TRANSLATION_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                translation: action.result,
                errors: {},
            }
        case EDIT_TRANSLATION_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
                modal: {},
                errors:IsRequiredFields(state.required,state.translation,state.errors)
            }
        case EDIT_TRANSLATION_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,
            }
        case EDIT_TRANSLATION_SUCCESS:
            console.log('EDIT_TRANSLATION_SUCCESS', action.result)
            return {
                ...state,
                translations: ChangeTranslation(state.translations, action.result),
                loading: false,
                success: true,
                fail: false,
                modal: {},
                translation: {}
            }
        case DELETE_TRANSLATION_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
                modal: {},
            }
        case DELETE_TRANSLATION_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,
            }
        case DELETE_TRANSLATION_SUCCESS:
            return {
                ...state,
                translations: RemoveItem(state.translations, action.result),
                loading: false,
                success: true,
                fail: false,
                modal: {},
                datas: {}
            }
        default:
            return {...state};
    }
};
