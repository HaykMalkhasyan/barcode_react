import {SET_EDITOR_VALUES} from "./actionTypes";

/*-------------------------------------------------------------------------------------------------*/

export function setEditorValues(name, value) {

    return {
        type: SET_EDITOR_VALUES, name, value
    }
}