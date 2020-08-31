import {
    ADD_NEW_PRODUCT,
    CLOSE_PRODUCT_MODAL,
    ONLY_ADD_PRODUCT,
    SET_PRODUCT_MODAL_VALUES,
    SET_PRODUCT_VALUES,
    SET_PRODUCTS
} from "./actionTypes";

const initialState = {
    product: null,
    products: [],
    count: null,
    advancedSearchConfig: {
        classifiers: null
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
        {id: 1, name: 'հատ', value: 1},
        {id: 2, name: 'կիլոգրամ', value: 2},
        {id: 3, name: 'գրամ', value: 3},
        {id: 4, name: 'միլիգրամ', value: 4},
        {id: 5, name: 'լիտր', value: 'l'},
        {id: 6, name: 'միլիլիտր', value: 5},
    ],
    main: {
        name: '',
        short_name: '',
        product_type: '',
        unit_id: '',
        active: false,
        can_in: false,
        can_sale: false
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
    images: [],
    pictures: {
        pictures: []
    },
    error: null,
    selected_products: [],
    productLoadingStatus: true,
};

export default function productsReducer(state = initialState, action) {

    switch (action.type) {
        case SET_PRODUCT_MODAL_VALUES:
            return {
                ...state,
                product: action.data,
                main: action.main,
                description: action.description,
                pictures: action.pictures,
                open: 'edit',
                productLoadingStatus: false,
                images: action.images
            };
        case SET_PRODUCTS:
            return {
                ...state, products: action.products, count: action.count, productLoadingStatus: false
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
                    unit_id: '',
                    active: false,
                    can_in: false,
                    can_sale: false
                },
                description: {
                    description: '',
                },
                classifiers: {
                    classifiers: []
                },
                workers: {
                    workers: ''
                },
                images: [],
                pictures: {
                    pictures: []
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
                    unit_id: '',
                    active: false,
                    can_in: false,
                    can_sale: false
                },
                description: {
                    description: '',
                },
                classifiers: {
                    classifiers: []
                },
                workers: {
                    workers: ''
                },
                images: [],
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