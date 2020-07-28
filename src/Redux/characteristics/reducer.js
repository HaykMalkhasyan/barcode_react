import {SET_GROUP_VALUE} from "./actionTypes";

const initialState = {
    group: null,
    customGroup: null,
    groups: [],
    search: '',
    searchResult: [],
    subgroup: null,
    customSubgroup: null,
    subgroups: [],
    collapsed: [],
    toggleButtons: null,
    errors: null,
    movingStatus: false,
    prevGroup: null,
    nextGroup: null,
    indexKey: null,
    changeStatus: true,
    selectId: null,
    groupType: null,
    modalType: false,
    newGroup: {
        name: '',
        required_group: false,
        image: null
    },
    error: null,
    allError: null,
    modalGroup: false,
    groupActiveId: null,
};

export default function characteristicsReducer(state = initialState, action) {

    switch (action.type) {
        case SET_GROUP_VALUE:
            return {
                ...state, [action.name]: action.value
            }
        default: return {...state}
    }
}