import {am} from './langs/am'
import {ru} from './langs/ru'
import {en} from './langs/en'

export function getLanguage(language, name) {

    const languages = {
        am: am,
        ru: ru,
        en: en,
    };

    return languages[language][name]
}