import {SET_EDITOR_VALUES} from "./actionTypes";

const initialState = {
    tool: false,
    profile: [
        {id: 1, name: 'Պիտակ'},
        {id: 2, name: 'Փաստաթուղթ'},
        {id: 3, name: 'Հայտարարություն'},
        {id: 4, name: 'Պայմանագիր'},
    ],
};

export default function editorReducer(state = initialState, action) {

    switch (action.type) {
        case SET_EDITOR_VALUES:
            return {
                ...state, [action.name]: action.value
            };
        default:
            return {...state}
    }
}