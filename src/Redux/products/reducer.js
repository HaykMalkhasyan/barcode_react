import {
    ADD_NEW_PRODUCT,
    BACK_TO_PRODUCT,
    CLOSE_MODALS,
    CLOSE_PRODUCT_MODAL,
    IMPORT_GROUP_IN_PRODUCT,
    IMPORT_GROUP_IN_PRODUCT_CLOSE,
    ONLY_ADD_PRODUCT,
    SET_PRODUCT_MODAL_VALUES,
    SET_PRODUCT_VALUES,
    SET_PRODUCTS,
    SET_SELECT_GROUP_ITEM, SET_SUBGROUP,
    SET_TAB_VALUE
} from "./actionTypes";
import {SET_DELETE_BARCODE, SET_PRODUCTS_BARCODE_VALUE} from "../barcode/actionTypes";
import {PROD_GROUP_SET} from "../characteristics/actionTypes";
import {BACK_FILTERS} from "../filtersContainer/actionTypes";

const initialState = {
    product: null,
    products: [],
    count: null,
    advancedSearchConfig: {
        classifiers: null
    },
    collapsedStatus: [],
    open: false,
    initialOpen: null,
    subgroupsOpen: false,
    scroll: 'paper',
    scrollB: 'paper',
    measurementsFilters: [
        {id: 0, name: {am: 'Բոլորը', ru: 'все', eng: 'all'}},
        {id: 1, name: {am: 'Քաշային', ru: 'по весу', eng: 'by weight'}},
        {id: 2, name: {am: 'Հատային', ru: 'по количеству', eng: 'by weight'}},
    ],
    mainFilters: [
        {
            id: 1,
            label: {am: 'Մնացորդի ֆիլտր', ru: 'Балансный фильтр', eng: 'Balance filter'},
            input_label: {am: 'Պահեստ', ru: 'Склад', eng: 'Warehouse'},
            name: 'warehouse',
            min: {am: 'Սկսած', ru: 'начало', eng: 'from'},
            max: {am: 'Մինչև', ru: 'до', eng: 'to'},
            minName: 'warehouse-min',
            maxName: 'warehouse-max',
            data: [
                {id: 1,name: 'one', value: 1},
                {id: 2,name: 'two', value: 2},
                {id: 3,name: 'three', value: 3},
                {id: 4,name: 'four', value: 4},
            ]
        },
        {
            id: 2,
            label: {am: 'Գնի ֆիլտր', ru: 'Ценовой фильтр', eng: 'Price filter'},
            input_label: {am: 'Գնի տեսակ', ru: 'Тип цены', eng: 'Price type'},
            name: 'price',
            min: {am: 'Սկսած', ru: 'начало', eng: 'from'},
            max: {am: 'Մինչև', ru: 'до', eng: 'to'},
            minName: 'price-min',
            maxName: 'price-max',
            data: [
                {id: 1,name: 'one', value: 1},
                {id: 2,name: 'two', value: 2},
                {id: 3,name: 'three', value: 3},
                {id: 4,name: 'four', value: 4},
            ]
        },
        {
            id: 3,
            label: {am: 'Մատակարարի ֆիլտր', ru: 'Фильтр поставщиков', eng: 'Supplier filter'},
            input_label: {am: 'Մատակարար', ru: 'Поставщик', eng: 'Supplier'},
            name: 'supplier',
            min: {am: 'Սկսած', ru: 'начало', eng: 'from'},
            max: {am: 'Մինչև', ru: 'до', eng: 'to'},
            minName: 'supplier-min',
            maxName: 'supplier-max',
            data: [
                {id: 1,name: 'one', value: 1},
                {id: 2,name: 'two', value: 2},
                {id: 3,name: 'three', value: 3},
                {id: 4,name: 'four', value: 4},
            ]
        }
    ],
    otherFilters: [
        {id: 1, name: {am: 'Մուտքը թույլատրված է', ru: 'Доступ разрешен', eng: 'Access is allowed'}},
        {id: 2, name: {am: 'Ցուցադրել կայքում', ru: 'Показать на сайте', eng: 'Show on site'}},
        {id: 2, name: {am: 'Ակտիվ', ru: 'Активный', eng: 'Active'}},
    ],
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
        {id: 0, name: 'Ապրանք', value: 0},
        {id: 1, name: 'Ծառայություն', value: 1},
    ],
    measurements: [
        {id: 0, name: 'հատ', value: 0},
        {id: 1, name: 'կիլոգրամ', value: 1},
        {id: 2, name: 'գրամ', value: 2},
        {id: 3, name: 'միլիգրամ', value: 3},
        {id: 4, name: 'լիտր', value: 4},
        {id: 5, name: 'միլիլիտր', value: 5},
    ],
    main: {
        item_name: '',
        short_name: '',
        product_type: '',
        unit_id: '',
        active: false,
        can_in: false,
        can_sale: false
    },
    initialSub: null,
    classifiers: {},
    roads: [],
    groups: {
        groups: []
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
    activeTab: 0,
};

export default function productsReducer(state = initialState, action) {

    switch (action.type) {
        case BACK_FILTERS:
            return {
                ...state,
                advancedSearchConfig: {
                    classifiers: null
                },
            }
        case SET_SUBGROUP:
            return {
                ...state,
                classifiers: action.classifiers,
            }
        case PROD_GROUP_SET:
            return {
                ...state,
                classifiers: action.classifiers
            }
        case SET_DELETE_BARCODE:
            return {
                ...state, [action.name]: action.products_barcode
            };
        case SET_PRODUCTS_BARCODE_VALUE:
            return {
                ...state, [action.name]: action.value
            };
        case CLOSE_MODALS:
            return {
                ...state,
                open: false,
                initialOpen: null,
                initialSub: null,
                roads: [],
                subgroupsOpen: false,
                main: {
                    item_name: '',
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
            };
        case BACK_TO_PRODUCT:
            return {
                ...state, open: action.initialOpen, initialOpen: null, subgroupsOpen: false, initialSub: false
            };
        case SET_SELECT_GROUP_ITEM:
            return {
                ...state, initialOpen: action.open, open: false, subgroupsOpen: true
            };
        case SET_TAB_VALUE:
            return {
                ...state, activeTab: action.value
            };
        case IMPORT_GROUP_IN_PRODUCT_CLOSE:
            return {
                ...state, open: action.condition, initialOpen: null
            };
        case IMPORT_GROUP_IN_PRODUCT:
            return {
                ...state, initialOpen: action.condition, open: false
            };
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
                initialOpen: null,
                errorFields: [],
                main: {
                    item_name: '',
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
                classifiers: {},
                workers: {
                    workers: ''
                },
                images: [],
                pictures: {
                    pictures: []
                },
                open: false
            };
        case ADD_NEW_PRODUCT:
            return {
                ...state,
                products: action.products,
                main: {
                    item_name: '',
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
                classifiers: {},
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