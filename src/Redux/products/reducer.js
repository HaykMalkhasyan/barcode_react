import {ADD_NEW_PRODUCT, CLOSE_PRODUCT_MODAL, ONLY_ADD_PRODUCT, SET_PRODUCT_VALUES, SET_PRODUCTS} from "./actionTypes";

const initialState = {
    product: null,
    products: [],
    count: null,
    advancedSearchConfig: {
        classifiers: []
    },
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
    },
    errorFields: [],
    types: [
        {id: 1, name: 'Ապրանք', value: 1},
        {id: 2, name: 'Ծառայություն', value: 2},
        {id: 3, name: 'Հայտարարություն', value: 3},
    ],
    measurements: [
        {id: 1, name: 'հատ', value: 'item'},
        {id: 2, name: 'կիլոգրամ', value: 'kg'},
        {id: 3, name: 'գրամ', value: 'g'},
        {id: 4, name: 'միլիգրամ', value: 'mg'},
        {id: 5, name: 'լիտր', value: 'l'},
        {id: 6, name: 'միլիլիտր', value: 'ml'},
    ],
    main: {
        name: '',
        short_name: '',
        product_type: '',
        measurement: '',
        active: false,
        access_in: false,
        access_sale: false
    },
    classifiers: {
        classifiers: []
    },
    description: {
        description: '',
    },
    workers: {
        workers: ''
    },
    pictures: {
        pictures: []
    },
    error: null,
    selected_products: []
};

export default function productsReducer(state = initialState, action) {

    switch (action.type) {
        case SET_PRODUCTS:
            return {
                ...state, products: action.products, count: action.count
            };
        case SET_PRODUCT_VALUES:
            return {
                ...state, [action.name]: action.value
            };
        case CLOSE_PRODUCT_MODAL:
            return {
                ...state,
                main: {
                    name: '',
                    short_name: '',
                    product_type: '',
                    measurement: '',
                    active: false,
                    access_in: false,
                    access_sale: false
                },
                description: {
                    description: '',
                },
                errorFields: [],
                open: false
            };
        case ADD_NEW_PRODUCT:
            return {
                ...state,
                products: action.products,
                main: {
                    name: '',
                    short_name: '',
                    product_type: '',
                    measurement: '',
                    active: false,
                    access_in: false,
                    access_sale: false
                },
                description: {
                    description: '',
                },
                errorFields: [],
                open: false,
                pictures: {
                    pictures: []
                },
            };
        case ONLY_ADD_PRODUCT:
            return {
                ...state,
                products: action.products,
            };
        default: return {...state}
    }
}