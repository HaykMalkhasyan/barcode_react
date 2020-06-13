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
    SET_TRANSLATE,
    EDIT_TRANSLATION_FAIL,
    EDIT_TRANSLATION_SUCCESS,
    DELETE_TRANSLATION_REQUEST,
    DELETE_TRANSLATION_FAIL,
    DELETE_TRANSLATION_SUCCESS,
    GET_TRANSLATION_SIZE_REQUEST,
    GET_TRANSLATION_SIZE_FAIL,
    GET_TRANSLATION_SIZE_SUCCESS,
    SET_TRANSLATION_SIZE_COUNT,
    GET_TRANSLATION_PAGE_REQUEST,
    GET_TRANSLATION_PAGE_FAIL,
    GET_TRANSLATION_PAGE_SUCCESS,
    GET_TRANSLATION_LANGUAGE_REQUEST,
    GET_TRANSLATION_LANGUAGE_FAIL,
    GET_TRANSLATION_LANGUAGE_SUCCESS,
    TOGGLE_TRANSLATION_EDITABLE, RESET_ACTIVE_LANGUAGE
} from "./actionTypes";
import SessionStorage from "../../services/SessionStorage";

let col = 'key, value, lang';
const API_URL = process.env.REACT_APP_API_URL;

export const getLanguages = () => {
    return {
        types: [GET_LANGUAGES_REQUEST, GET_LANGUAGES_FAIL, GET_LANGUAGES_SUCCESS],
        promise: (apiClient) => apiClient.gett(`${API_URL}/languages`)
    }
};

export const getTranslations = () => {
    return {
        types: [GET_TRANSLATIONS_REQUEST, GET_TRANSLATIONS_FAIL, GET_TRANSLATIONS_SUCCESS],
        promise: (apiClient) => apiClient.gett(`${API_URL}/translations/?page_size=100000`)
    }
}

export const getTranslationsWithSize = (size, lang, page) => {

    return lang ?
        page ?
            lang === 'all' ?
                {
                    types: [GET_TRANSLATION_SIZE_REQUEST, GET_TRANSLATION_SIZE_FAIL, GET_TRANSLATION_SIZE_SUCCESS],
                    promise: (apiClient) => apiClient.gett(`${API_URL}/translations/?page_size=${size}&page=${page}`)
                }
                :
                {
                    types: [GET_TRANSLATION_SIZE_REQUEST, GET_TRANSLATION_SIZE_FAIL, GET_TRANSLATION_SIZE_SUCCESS],
                    promise: (apiClient) => apiClient.gett(`${API_URL}/translations/?page_size=${size}&page=${page}&lang=${lang}`)
                }
            :
            lang === 'all' ?
                {
                    types: [GET_TRANSLATION_SIZE_REQUEST, GET_TRANSLATION_SIZE_FAIL, GET_TRANSLATION_SIZE_SUCCESS],
                    promise: (apiClient) => apiClient.gett(`${API_URL}/translations/?page_size=${size}&page=${1}`)
                }
                :
                {
                    types: [GET_TRANSLATION_SIZE_REQUEST, GET_TRANSLATION_SIZE_FAIL, GET_TRANSLATION_SIZE_SUCCESS],
                    promise: (apiClient) => apiClient.gett(`${API_URL}/translations/?page_size=${size}&page=${1}&lang=${lang}`)
                }
        :
        page ?
            {
                types: [GET_TRANSLATION_SIZE_REQUEST, GET_TRANSLATION_SIZE_FAIL, GET_TRANSLATION_SIZE_SUCCESS],
                promise: (apiClient) => apiClient.gett(`${API_URL}/translations/?page_size=${size}&page=${page}`)
            }
            :
            {
                types: [GET_TRANSLATION_SIZE_REQUEST, GET_TRANSLATION_SIZE_FAIL, GET_TRANSLATION_SIZE_SUCCESS],
                promise: (apiClient) => apiClient.gett(`${API_URL}/translations/?page_size=${size}&page=${1}`)
            }
}

export const getTranslationPage = (page, pageSize, lang) => {
    return lang !== 'all' ?
        {
            types: [GET_TRANSLATION_PAGE_REQUEST, GET_TRANSLATION_PAGE_FAIL, GET_TRANSLATION_PAGE_SUCCESS],
            promise: (apiClient) => apiClient.gett(`${API_URL}/translations/?page=${page}&page_size=${pageSize}&lang=${lang}`),
            page
        }
        :
        {
            types: [GET_TRANSLATION_PAGE_REQUEST, GET_TRANSLATION_PAGE_FAIL, GET_TRANSLATION_PAGE_SUCCESS],
            promise: (apiClient) => apiClient.gett(`${API_URL}/translations/?page=${page}&page_size=${pageSize}`),
            page
        }

}

export const getTranslationWithLang = (lang, page, pageSize) => {
    return {
        types: [GET_TRANSLATION_LANGUAGE_REQUEST, GET_TRANSLATION_LANGUAGE_FAIL, GET_TRANSLATION_LANGUAGE_SUCCESS],
        promise: (apiClient) => apiClient.gett(`${API_URL}/translations/?page=${page}&page_size=${pageSize}&lang=${lang}`),
        lang,
        page
    }
}

export const getTranslationAll = (lang, page, pageSize) => {
    return {
        types: [GET_TRANSLATION_LANGUAGE_REQUEST, GET_TRANSLATION_LANGUAGE_FAIL, GET_TRANSLATION_LANGUAGE_SUCCESS],
        promise: (apiClient) => apiClient.gett(`${API_URL}/translations/?page=${page}&page_size=${pageSize}`),
        lang,
        page
    }
}

export const setCount = (pageSize, language, pageNumber) => {

    return dispatch => {
        dispatch(getTranslationsWithSize(pageSize, language, pageNumber));
        dispatch(changeCount(pageSize))
    }
}

export const changeCount = count => {

    return {
        type: SET_TRANSLATION_SIZE_COUNT,
        count
    }
}


export const checkTranslation = object => {

    let index = false;

    return (dispatch, getState) => {

        if (getState().languages.translations.length > 0) {
            for (let item of getState().languages.translations) {
                if (object.key.toLowerCase() === item.key && object.language === item.language) {
                    index = true;
                }
            }
            if (index === false && object.key.length > 0) {
                index = false;
                dispatch(AddTraslationFind(object))
                dispatch(setTranslations(object))
            }
        }
    }
}

export function AddTraslationFind(result) {

    return {
        type: SET_TRANSLATE,
        result
    }
}

export const setTranslations = (data) => {
    console.log(data)
    return {
        types: [SET_TRANSLATIONS_REQUEST, SET_TRANSLATIONS_FAIL, SET_TRANSLATIONS_SUCCESS],
        promise: (apiClient) => apiClient.posttAdd(`${API_URL}/translations/`, data)
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
                promise: (apiClient) => apiClient.gett(`${API_URL}/translations/${data.id}`)
            };
        case 'edit':
            return {
                types: [EDIT_TRANSLATION_REQUEST, EDIT_TRANSLATION_FAIL, EDIT_TRANSLATION_SUCCESS],
                promise: apiClient => apiClient.putt(`${API_URL}/translations/${data.id}`)
            }
        case 'delete':
            return {
                types: [DELETE_TRANSLATION_REQUEST, DELETE_TRANSLATION_FAIL, DELETE_TRANSLATION_SUCCESS],
                promise: apiClient => apiClient.deletee(`${API_URL}/translations/${data.id}`)
            }
        default:
            return;
    }
}

export const translationEditableToggle = () => {

    return {
        type: TOGGLE_TRANSLATION_EDITABLE
    }
}

export const resetActiveTranslationLang = () => {

    return {
        type: RESET_ACTIVE_LANGUAGE
    }
}