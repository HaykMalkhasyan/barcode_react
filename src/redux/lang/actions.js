import {
    GET_LANGUAGES_REQUEST, GET_LANGUAGES_FAIL, GET_LANGUAGES_SUCCESS,
    GET_TRANSLATIONS_REQUEST, GET_TRANSLATIONS_FAIL, GET_TRANSLATIONS_SUCCESS,
    SET_ACTIVE_LANGUAGE,SET_MODAL_LANGUAGE,TOGGLE_MODAL_LANGUAGE
} from "./actionTypes";
import SessionStorage from "../../services/SessionStorage";

export const getLanguages = () => {
    return {
        types: [GET_LANGUAGES_REQUEST,GET_LANGUAGES_FAIL,GET_LANGUAGES_SUCCESS],
        promise: (apiClient) => apiClient.get(`Translations/Languages`)
    }
};

export const getTranslations = () => {
    return {
        types: [GET_TRANSLATIONS_REQUEST,GET_TRANSLATIONS_FAIL,GET_TRANSLATIONS_SUCCESS],
        promise: (apiClient) => apiClient.get(`Translations/Translations`)
    }
}

export const setLanguage = (lang) =>{
    SessionStorage.set("lang" ,lang)
    return {
        type: SET_ACTIVE_LANGUAGE,
        lang
    }
};

export const setModalLanguage = (lang) =>{
    return {
        type: SET_MODAL_LANGUAGE,
        lang
    }
};

export const toggleModalLanguage = () =>{
    return {
        type: TOGGLE_MODAL_LANGUAGE,
    }
};
