import {SET_GROUP_VALUE} from "./actionTypes";

const initialState = {
    active: 0,
    open: false,
    group: null,
    customGroup: null,
    groups: [{id: 0, name: 'Հիմնական դասակարգիչ', group_type: '1', required_group: true}],
    search: '',
    classifiersSearch: '',
    touched: false,
    searchResult: [],
    subgroup: null,
    customSubgroup: null,
    subgroups: [],
    errors: null,
    changeStatus: true,
    groupType: null,
    modalType: false,
    newGroup: {
        name: '',
        required_group: false,
        group_type: '1'
    },
    newSubgroup: {
        name: '',
        image: []
    },
    error: null,
    allError: null,
    modalGroup: null,
    groupActiveId: null,
    delete: false,
    collapsedModalStatus: [],
    collapsed: [],


    controllerId: null,
    moveElement: null,
    collapsedGroup: [],

    classifierSubgroup: null,
    classifiersCollapsed: [],
    classifiersCollapsedGroup: [],
};

export default function characteristicsReducer(state = initialState, action) {

    switch (action.type) {
        case SET_GROUP_VALUE:
            return {
                ...state, [action.name]: action.value
            };
        default: return {...state}
    }
}