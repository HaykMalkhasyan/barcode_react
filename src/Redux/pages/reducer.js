import {SET_ACTIVE_MENU, SET_PAGES_VALUE, TOGGLE_CHAT, TOGGLE_NOTIFICATION, TOGGLE_PEOPLE} from "./actionTypes";

const initialState = {
    activeMenu: null,
    status: false,
    chat_modal: false,
    notification_modal: false,
    interlocutorWindow: false,
    menus: [
        {
            id: 1,
            name: 'Ապրանքներ',
            staticName: 'products',
            subMenus: [
                {id: '1-1', name: 'product_range', url: '/products/filters'},
                {id: '1-2', name: 'prices', url: '/products/prices'},
                {id: '1-3', name: 'characteristics', url: '/products/characteristics'},
                {id: '1-4', name: 'label_editor', url: '/products/editor'},
            ]
        },
        {
            id: 2,
            name: 'Փաստաթղթեր',
            staticName: 'documents',
            subMenus: [
                {id: '2-1', name: 'Հաշիվներ', url: '/documents/accounts'},
                {id: '2-2', name: 'Պայմանագրեր', url: '/documents/contracts'},
                {id: '2-3', name: 'Չեկեր', url: '/documents/checks'}
            ]
        },
        {
            id: 3,
            name: 'Վաճառքներ',
            staticName: 'sales',
            subMenus: [
                {id: '3-1', name: 'Վաճառք բաժին 1', url: '/link_3_1'},
                {id: '3-2', name: 'Վաճառք բաժին 1', url: '/link_3_2'},
                {id: '3-3', name: 'Վաճառք բաժին 2', url: '/link_3_3'},
            ]
        },
        {
            id: 4,
            name: 'Գործընկերներ',
            staticName: 'suppliers',
            subMenus: [
                {id: '4-1', name: 'Գործընկեր բաժին 1', url: '/link_4_1'},
                {id: '4-2', name: 'Գործընկեր բաժին 1', url: '/link_4_2'},
                {id: '4-3', name: 'Գործընկեր բաժին 2', url: '/link_4_3'},
            ]
        },
        {
            id: 5,
            name: 'Աշխատակիցներ',
            staticName: 'workers',
            subMenus: [
                {id: '5-1', name: 'Աշխատակից բաժին 1', url: '/link_5_1'},
                {id: '5-2', name: 'Աշխատակից բաժին 1', url: '/link_5_2'},
                {id: '5-3', name: 'Աշխատակից բաժին 2', url: '/link_5_3'},
            ]
        }
    ],
};

export default function pageReducer(state = initialState, action) {

    switch (action.type) {
        case TOGGLE_NOTIFICATION:
            return {
                ...state, notification_modal: action.status
            };
        case TOGGLE_PEOPLE:
            return {
                ...state, interlocutorWindow: action.status
            };
        case TOGGLE_CHAT:
            return {
                ...state, chat_modal: action.status
            };
        case SET_PAGES_VALUE:
            return {
                ...state, [action.name]: action.value
            };
        case SET_ACTIVE_MENU:
            return {
                ...state, activeMenu: action.menu
            };
        default: return {...state};
    }
}