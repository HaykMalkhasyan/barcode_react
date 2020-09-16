import cookie from "../../services/cookies";
import {SET_LANGUAGE, SET_LANGUAGE_VALUE} from "./actionTypes";

const initialState = {
    open: null,
    lang: {
        am: {id: 1, name: 'Հայերեն', image: 'armenia.svg'},
        ru: {id: 2, name: 'Русский', image: 'russia.svg'},
        en: {id: 3, name: 'English', image: 'united-kingdom.svg'},
    },
    activeLanguage: cookie.get('language') || 'am'
};

export default function languageReducer(state = initialState, action) {

    switch (action.type) {
        case SET_LANGUAGE:
            return {
                ...state, activeLanguage: action.language, open: null
            };
        case SET_LANGUAGE_VALUE:
            return {
                ...state, [action.name]: action.value
            };
        default:
            return {...state}
    }
}