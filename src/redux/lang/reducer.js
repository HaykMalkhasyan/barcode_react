import {
    GET_LANGUAGES_REQUEST, GET_LANGUAGES_FAIL, GET_LANGUAGES_SUCCESS,
    GET_TRANSLATIONS_REQUEST, GET_TRANSLATIONS_FAIL, GET_TRANSLATIONS_SUCCESS,
    SET_ACTIVE_LANGUAGE, SET_MODAL_LANGUAGE, TOGGLE_MODAL_LANGUAGE
} from "./actionTypes";
import SessionStorage from "../../services/SessionStorage";
import {SET_GROUP_MODAL} from "../group/actionTypes";

const INIT_STATE = {
    languages: [],
    modalLang: SessionStorage.get("lang") ? SessionStorage.get("lang") : 'am',
    translations: {},
    active: SessionStorage.get("lang") ? SessionStorage.get("lang") : 'am'
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
                languages: JSON.parse(action.result.data),
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
                loading: false,
                success: true,
                fail: false,
                translations: JSON.parse(action.result.data),
                errors: {},
            };
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
        default:
            return {...state};
    }
};
