import {SET_LANGUAGE, SET_LANGUAGE_VALUE} from "./actionTypes";
import cookie from "../../services/cookies";

export function changeLanguage(language) {

    return dispatch => {
        cookie.set('language', language);
        dispatch(setLanguage(language));
    }
}

export function setLanguage(language) {

    return {
        type: SET_LANGUAGE, language
    }
}

export function setLanguageValue(name, value) {

    return {
        type: SET_LANGUAGE_VALUE, name, value
    }
}