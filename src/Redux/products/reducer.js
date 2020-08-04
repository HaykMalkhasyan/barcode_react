import {SET_PRODUCT_VALUES} from "./actionTypes";

const initialState = {
    advancedSearchConfig: {},
    collapsedStatus: [],
    open: false,
    scroll: 'paper',
    classifiersModal: false,
    modalTabs: {
        tabs: [
            'MainTab',
            'ClassifiersTab',
            'CodesTab',
            'PricesTab',
            'EmployeesTab',
            'DescriptionTab',
        ],
        am: [
            {name: 'Հիմնական'},
            {name: 'Դասակարգիչներ'},
            {name: 'Կոդեր'},
            {name: 'Գներ'},
            {name: 'Գործընկերներ'},
            {name: 'Նկարագրություն'},
        ],
        ru: [
            {name: 'Основные'},
            {name: 'Классификаторы'},
            {name: 'Коды'},
            {name: 'Цены'},
            {name: 'Сотрудники'},
            {name: 'Описание'},
        ],
        en: [
            {name: 'Main'},
            {name: 'Classifiers'},
            {name: 'Codes'},
            {name: 'Prices'},
            {name: 'Employees'},
            {name: 'Description'},
        ]
    }
};

export default function productsReducer(state = initialState, action) {

    switch (action.type) {
        case SET_PRODUCT_VALUES:
            return {
                ...state, [action.name]: action.value
            };
        default: return {...state}
    }
}