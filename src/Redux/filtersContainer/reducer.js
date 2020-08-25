import {CLOSE_CLASSIFIERS_WINDOW, SET_FILTERS_VALUE} from "./actionTypes";

const initialState = {
    type: 'products',
    selectedIndex: 0,
    toggleClassifier: false,
    activeTabs: [1, 2, 3, 4, 5, 6, 7, 8],
    tabs: [
        {id: 1, type: 'checkbox', name: 'Checkbox', required: true},
        {id: 2, type: 'name', name: 'QR', required: false},
        {id: 3, type: 'name', name: 'ապմ', required: false},
        {id: 4, type: 'name', name: 'անվանում', required: true},
        {id: 5, type: 'name', name: 'գին', required: false},
        {id: 6, type: 'name', name: 'բարկոդ', required: false},
        {id: 7, type: 'name', name: 'մատակարար', required: false},
        {id: 8, type: 'name', name: 'կատեգորիա', required: false},
        {id: 9, type: 'name', name: 'կարճ անվանում', required: false},
        {id: 10, type: 'name', name: 'տեսակ', required: false},
        {id: 11, type: 'name', name: 'չափման միավոր', required: false},
        {id: 12, type: 'name', name: 'ակտիվ', required: false},
        {id: 13, type: 'name', name: 'մուտքը թույլատրելի է', required: false},
        {id: 14, type: 'name', name: 'վաճառքը թույլատրելի է', required: false},
        {id: 15, type: 'name', name: 'գործընկերներ', required: false},
        {id: 16, type: 'name', name: 'նկարագրություն', required: false},
    ]
};

export default function filtersReducer(state = initialState, action) {

    switch (action.type) {
        case CLOSE_CLASSIFIERS_WINDOW:
            return {
                ...state, selectedIndex: action.index, toggleClassifier: false
            };
        case SET_FILTERS_VALUE:
            return {
                ...state, [action.name]: action.value
            };
        default: return {...state};
    }
}