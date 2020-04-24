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
    EDIT_TRANSLATION_SUCCESS, DELETE_TRANSLATION_REQUEST, DELETE_TRANSLATION_FAIL, DELETE_TRANSLATION_SUCCESS
} from "./actionTypes";
import SessionStorage from "../../services/SessionStorage";

let col = 'key, value, lang';

export const getLanguages = () => {
    return {
        types: [GET_LANGUAGES_REQUEST, GET_LANGUAGES_FAIL, GET_LANGUAGES_SUCCESS],
        promise: (apiClient) => apiClient.gett(`languages`)
    }
};

export const getTranslations = () => {
    return {
        types: [GET_TRANSLATIONS_REQUEST, GET_TRANSLATIONS_FAIL, GET_TRANSLATIONS_SUCCESS],
        promise: (apiClient) => apiClient.gett(`translations/?page_size=100000`)
    }
}

export const checkTranslation = object => {

    let index = false;

    return (dispatch, getState) => {
        if (getState().languages.status === true) {
            if (getState().languages.translations.length > 0) {
                for (let item of getState().languages.translations) {
                    if (object.key.toLowerCase() === item.key && object.language === item.language) {
                        index = true;
                    }
                }
                if (index === false && object.key.length > 0) {
                    index = false;
                    dispatch(setTranslations(object))
                }
            }
        }
    }
}

export const setTranslations = (data) => {
    console.log('DATA', data)
    return {
        types: [SET_TRANSLATIONS_REQUEST, SET_TRANSLATIONS_FAIL, SET_TRANSLATIONS_SUCCESS],
        promise: (apiClient) => apiClient.posttAdd(`translations/`, data, {col})
    }
}

export const setLanguage = (lang) => {
    SessionStorage.set("lang", lang)
    return {
        type: SET_ACTIVE_LANGUAGE,
        lang
    }
};

export const setModalLanguage = (lang) => {
    return {
        type: SET_MODAL_LANGUAGE,
        lang
    }
};

export const toggleModalLanguage = () => {
    return {
        type: TOGGLE_MODAL_LANGUAGE,
    }
};

export const toggleTranslationModal = (modalType, id) => {
    let obj = {"id": id};
    return {
        type: TOGGLE_TRANSLATION_MODAL,
        modalType,
        obj
    }
}

export const setTranslationsModal = (key, value) => {

    return {
        type: SET_TRANSLATION_MODAL,
        key,
        value
    }
}

export const translationActions = (type, data) => {

    switch (type) {
        case 'get':
            return {
                types: [GET_TRANSLATION_REQUEST, GET_TRANSLATION_FAIL, GET_TRANSLATION_SUCCESS],
                promise: (apiClient) => apiClient.gett(`translations/${data.id}`, {col})
            };
        case 'edit':
            return {
                types: [EDIT_TRANSLATION_REQUEST, EDIT_TRANSLATION_FAIL, EDIT_TRANSLATION_SUCCESS],
                promise: apiClient => apiClient.putt(`translations/${data.id}`, data, {col})
            }
        case 'delete':
            return {
                types: [DELETE_TRANSLATION_REQUEST, DELETE_TRANSLATION_FAIL, DELETE_TRANSLATION_SUCCESS],
                promise: apiClient => apiClient.deletee(`translations/${data.id}`, data, {col})
            }
        default:
            return;
    }
}
