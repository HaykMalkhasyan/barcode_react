import {ACTIVE_MENU} from "./actionTypes";

export function setActiveMenu(menu) {

    return {
        type: ACTIVE_MENU,
        menu
    }
}