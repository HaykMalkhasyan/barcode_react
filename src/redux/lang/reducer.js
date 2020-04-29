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
    SET_TRANSLATE,
    TOGGLE_TRANSLATION_MODAL,
    SET_TRANSLATION_MODAL,
    GET_TRANSLATION_REQUEST,
    GET_TRANSLATION_FAIL,
    GET_TRANSLATION_SUCCESS,
    EDIT_TRANSLATION_REQUEST,
    EDIT_TRANSLATION_FAIL,
    EDIT_TRANSLATION_SUCCESS,
    DELETE_TRANSLATION_REQUEST,
    DELETE_TRANSLATION_FAIL,
    DELETE_TRANSLATION_SUCCESS,
    GET_TRANSLATION_SIZE_REQUEST,
    GET_TRANSLATION_SIZE_FAIL,
    GET_TRANSLATION_SIZE_SUCCESS,
    SET_TRANSLATION_SIZE_COUNT, GET_TRANSLATION_PAGE_REQUEST, GET_TRANSLATION_PAGE_FAIL, GET_TRANSLATION_PAGE_SUCCESS
} from "./actionTypes";
import SessionStorage from "../../services/SessionStorage";
import {ChangeTranslation, IsRequiredField, IsRequiredFields, Push, RemoveItem, changeAddedTranslations} from '../../utility/utils';
// import {SET_GROUP_MODAL} from "../group/actionTypes";
const INIT_STATE = {
    languages: [],
    modalLang: SessionStorage.get("lang") ? SessionStorage.get("lang") : 'am',
    translations: {},
    translation: {},
    translationsSize: [],
    itemsCountPerPage: 10,
    totalItemsCount: 0,
    pageRangeDisplayed: 5,
    activePage: 1,
    active: SessionStorage.get("lang") ? SessionStorage.get("lang") : 'am',
    changeWord: [],
    modal: {},
    loading: false,
    success: false,
    fail: false,
    errors: {},
    required:["value"],
    status: false,
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
            let actionData = action.result.results;
            actionData.push({id: 1000, key: 'for test', value: 'for test', language: 'am'})
            actionData.push({id: 1001, key: 'for test', value: 'for test', language: 'ru'})
            actionData.push({id: 1002, key: 'for test', value: 'for test', language: 'en'})
            return {
                ...state,
                translations: actionData,
                status: !!action.result.results.length,
                loading: false,
                success: true,
                fail: false,
                errors: {}
            };
        case GET_TRANSLATION_SIZE_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
                errors: {},
            };
        case GET_TRANSLATION_SIZE_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,
            };
        case GET_TRANSLATION_SIZE_SUCCESS:
            return {
                ...state,
                translationsSize: action.result.results,
                totalItemsCount: action.result.count,
                status: !!action.result.results.length,
                loading: false,
                success: true,
                fail: false,
                errors: {}
            };
            case GET_TRANSLATION_PAGE_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
                errors: {},
            };
        case GET_TRANSLATION_PAGE_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,
            };
        case GET_TRANSLATION_PAGE_SUCCESS:
            return {
                ...state,
                activePage: action.page,
                translationsSize: action.result.results,
                status: !!action.result.results.length,
                loading: false,
                success: true,
                fail: false,
                errors: {}
            };
        case SET_TRANSLATION_SIZE_COUNT:
            return {
                ...state,
                itemsCountPerPage: action.count
            };
        case SET_TRANSLATIONS_REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                fail: false,
                errors: {},
                status: false
            };
        case SET_TRANSLATIONS_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                fail: true,
                status: false
            };
        case SET_TRANSLATIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                fail: false,
                translations: changeAddedTranslations(state.translations, action.result),
                errors: {},
                status: true
            }
            case SET_TRANSLATE:
            return {
                ...state,
                translations: Push(state.translations, action.result),
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
            return {
                ...state,
                translations: ChangeTranslation(state.translations, action.result),
                translationsSize: ChangeTranslation(state.translationsSize, action.result),
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
                translationsSize: RemoveItem(state.translationsSize, action.result),
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
