import {SET_ACTIVE_MENU, TOGGLE_CHAT, TOGGLE_NOTIFICATION, TOGGLE_PEOPLE} from "./actionTypes";

// -------------------------------------
export function setActiveMenu(menu) {
    return {
        type: SET_ACTIVE_MENU,
        menu
    }
}

export function toggleChat(status) {

    return {
        type: TOGGLE_CHAT, status
    }
}

export function toggleNotification(status) {

    return {
        type: TOGGLE_NOTIFICATION, status
    }
}

export function togglePeople(status) {

    return {
        type: TOGGLE_PEOPLE, status
    }
}