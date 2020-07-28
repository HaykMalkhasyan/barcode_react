import {SET_ACTIVE_MENU} from "./actionTypes";

// -------------------------------------
export function setActiveMenu(menu) {
    return {
        type: SET_ACTIVE_MENU,
        menu
    }
}