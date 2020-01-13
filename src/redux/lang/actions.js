import { SET_ACTIVE_LANGUAGE } from "./actionTypes";
import { languages } from "./languages";
import { translations } from "./translation";


export const setLanguage = (lang) =>{
    localStorage.setItem('lang', lang)
    return {
        type: SET_ACTIVE_LANGUAGE,
        lang
    }
};
export const getTranslate = (name) =>{
    let activeLanguage = localStorage.getItem('lang');
    let activeIndex = 0;
    // eslint-disable-next-line array-callback-return
    Object.keys(languages).map(function(key, index) {
        if(languages[key]['code']===activeLanguage){
            activeIndex = key;
        }
    });
    return (translations[name])?translations[name][activeIndex]:name;
};