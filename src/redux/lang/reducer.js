import { SET_ACTIVE_LANGUAGE } from "./actionTypes";
// import { translations } from './translation';
import { languages } from "./languages";

const INIT_STATE = {
    languages:languages,
    activeLanguage:localStorage.getItem('lang')?localStorage.getItem('lang'):'am'
};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case SET_ACTIVE_LANGUAGE:
            return {
                ...state,
                activeLanguage: action.lang,
            };
        default:
            return {...state};
    }
};
