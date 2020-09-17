import {CLOSE_CLASSIFIERS_WINDOW, SET_FILTERS_VALUE} from "./actionTypes";

const initialState = {
    type: 'products',
    selectedIndex: 0,
    toggleClassifier: false,
    activeTabs: JSON.parse(localStorage.getItem('activeTabs')) || [1, 2, 3, 4, 5, 6, 7, 8],
    tabs: JSON.parse(localStorage.getItem('table_place')) || [
        {id: 1, key_name: 'id', type: 'checkbox', name: 'Նշատուփը', required: true},
        {id: 3, key_name: 'sku', type: 'string', name: 'ապմ', required: false},
        {id: 4, key_name: 'name', type: 'string', name: 'անվանում', required: true},
        {id: 5, key_name: 'price', type: 'array', name: 'գին', required: false},
        {id: 6, key_name: 'barcode', type: 'array', key: 'barcode', name: 'բարկոդ', required: false},
        {id: 7, key_name: 'supplier', type: 'object', name: 'մատակարար', required: false}, // poxel array erb vor Arseny dzi
        {id: 8, key_name: 'category', type: 'array', name: 'կատեգորիա', required: false},
        {id: 9, key_name: 'short_name', type: 'string', name: 'կարճ անվանում', required: false},
        {id: 10, key_name: 'product_type', type: 'in_string', in_data: 1, name: 'տեսակ', required: false},
        {id: 11, key_name: 'unit_id', type: 'in_string', in_data: 2, name: 'չափման միավոր', required: false},
        {id: 12, key_name: 'active', type: 'boolean', name: 'ակտիվ', required: false},
        {id: 13, key_name: 'can_in', type: 'boolean', name: 'մուտքը թույլատրելի է', required: false},
        {id: 14, key_name: 'can_sale', type: 'boolean', name: 'վաճառքը թույլատրելի է', required: false},
        {id: 15, key_name: 'co-workers', type: 'array', name: 'գործընկերներ', required: false},
        {id: 16, key_name: 'description', type: 'string', name: 'նկարագրություն', required: false},
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