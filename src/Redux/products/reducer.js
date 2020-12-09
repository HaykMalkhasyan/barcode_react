import {
    ADD_NEW_PRODUCT,
    BACK_TO_PRODUCT,
    CLOSE_MODALS,
    CLOSE_PRODUCT_MODAL,
    IMPORT_GROUP_IN_PRODUCT,
    IMPORT_GROUP_IN_PRODUCT_CLOSE,
    ONLY_ADD_PRODUCT,
    SET_ALL_IMAGES, SET_DELETE,
    SET_FILTERS_CONFIG, SET_FILTERS_CONFIG_WITH_TEXT,
    SET_MAIN_IMAGE,
    SET_PRODUCT_ERRORS,
    SET_PRODUCT_MODAL_VALUES,
    SET_PRODUCT_VALUES,
    SET_PRODUCTS,
    SET_SAVE_PRODUCT,
    SET_SELECT_GROUP_ITEM,
    SET_SUBGROUP,
    SET_TAB_VALUE
} from "./actionTypes";
import {SET_PRODUCTS_BARCODE_VALUE} from "../barcode/actionTypes";
import {PROD_GROUP_SET} from "../characteristics/actionTypes";
import AppsIcon from '@material-ui/icons/Apps';
import LayersIcon from '@material-ui/icons/Layers';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import DescriptionIcon from '@material-ui/icons/Description';
import {FaBarcode} from "react-icons/fa";

const initialState = {
    product: null,
    products: [],
    count: null,
    page_count: null,
    product_search: '',
    advancedSearchConfig: {},
    collapsedStatus: [],
    open: false,
    initialOpen: null,
    subgroupsOpen: false,
    scroll: 'paper',
    scrollB: 'paper',
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
                {id: 1, name: 'one', value: 1},
                {id: 2, name: 'two', value: 2},
                {id: 3, name: 'three', value: 3},
                {id: 4, name: 'four', value: 4},
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
                {id: 1, name: 'one', value: 1},
                {id: 2, name: 'two', value: 2},
                {id: 3, name: 'three', value: 3},
                {id: 4, name: 'four', value: 4},
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
                {id: 1, name: 'one', value: 1},
                {id: 2, name: 'two', value: 2},
                {id: 3, name: 'three', value: 3},
                {id: 4, name: 'four', value: 4},
            ]
        }
    ],
    otherFilters: [
        // {id: 1, name: "", label: 'Մուտքը թույլատրված է', value: 1},
        {id: 1, name: "show_in_site", label: 'Ցուցադրել կայքում', value: 1},
        {id: 2, name: "active", label: 'Ակտիվ', value: 0},
    ],
    modalTabs: [
        {id: 1, index: 0, icon: AppsIcon, name: 'main'},
        {id: 2, index: 1, icon: LayersIcon, name: 'classifiers'},
        {id: 3, index: 2, icon: FaBarcode, name: 'codes'},
        {id: 4, index: 3, icon: AttachMoneyIcon, name: 'prices'},
        {id: 5, index: 4, icon: SupervisorAccountIcon, name: 'suppliers'},
        {id: 6, index: 5, icon: DescriptionIcon, name: 'description'},
    ],
    errorFields: [],
    tabErrors: [],
    types: [
        {id: 0, name: 'Ապրանք', value: 0},
        {id: 1, name: 'Ծառայություն', value: 1},
    ],
    measurements: [
        {id: 1, name: 'հատ', value: 1},
        {id: 0, name: 'կիլոգրամ', value: 0},
        {id: 18, name: 'կմ', value: 18},
        {id: 19, name: 'խոր.մ', value: 19},
        {id: 20, name: 'քառ.մ', value: 20},
        {id: 21, name: 'գծ.մ', value: 21},
        {id: 22, name: 'միլիգրամ', value: 22},
        {id: 23, name: 'գրամ', value: 23},
        {id: 25, name: 'ց', value: 25},
        {id: 26, name: 'տ', value: 26},
        {id: 27, name: 'միլիլիտր', value: 27},
        {id: 28, name: 'լիտր', value: 28},
        {id: 29, name: 'դկլ', value: 29},
        {id: 30, name: 'հկլ', value: 30},
        {id: 31, name: 'տուփ', value: 31},
        {id: 17, name: 'մ', value: 17},
        {id: 16, name: 'դմ', value: 16},
        {id: 15, name: 'սմ', value: 15},
        {id: 2, name: 'պարկ', value: 2},
        {id: 3, name: 'փաթեթ', value: 3},
        {id: 4, name: 'կոմպլեկտ', value: 4},
        {id: 5, name: 'շիշ', value: 5},
        {id: 6, name: 'բանկա', value: 6},
        {id: 7, name: 'զույգ', value: 7},
        {id: 8, name: 'տաս հատ', value: 8},
        {id: 9, name: 'հարյուր հատ', value: 9},
        {id: 10, name: 'հազար հատ', value: 10},
        {id: 11, name: 'կվտ/ժ', value: 11},
        {id: 12, name: 'մվտ/ժ', value: 12},
        {id: 13, name: 'արկղ', value: 13},
        {id: 14, name: 'մմ', value: 14},
        {id: 32, name: 'գլուխ', value: 32},
    ],
    main: {
        item_name: '',
        short_name: '',
        product_type: 0,
        unit_id: 1,
        show_in_site: false,
        active: 1,
        can_in: false,
        can_sale: false,
    },
    initialSub: null,
    classifiers: [],
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
    image_path: {},
    images: [],
    pictures: {
        pictures: []
    },
    error: null,
    selected_products: [],
    productLoadingStatus: false,
    activeTab: 0,
};

export default function productsReducer(state = initialState, action) {

    switch (action.type) {
        case SET_DELETE:
            return {
                ...state,
                products: action.products,
                initialOpen: null,
                errorFields: [],
                tabErrors: [],
                main: {
                    item_name: '',
                    short_name: '',
                    product_type: 0,
                    unit_id: 1,
                    show_in_site: false,
                    active: 1,
                    can_in: false,
                    can_sale: false
                },
                description: {
                    description: '',
                },
                classifiers: [],
                workers: {
                    workers: ''
                },
                images: [],
                pictures: {
                    pictures: []
                },
                open: false
            }
        case SET_SAVE_PRODUCT:
            return {
                ...state, products: action.data, open: "edit"
            }
        case SET_FILTERS_CONFIG_WITH_TEXT:
            return {
                ...state, advancedSearchConfig: action.data, product_search: action.text
            }
        case SET_FILTERS_CONFIG:
            return {
                ...state, advancedSearchConfig: action.data
            }
        case SET_ALL_IMAGES:
            return {
                ...state, images: action.images, pictures: action.pictures
            }
        case SET_MAIN_IMAGE:
            return {
                ...state, image_path: action.image_path
            }
        case SET_PRODUCT_ERRORS:
            return {
                ...state, errorFields: action.errorFields, tabErrors: action.tabErrors
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
                    product_type: 0,
                    unit_id: 1,
                    show_in_site: false,
                    active: 1,
                    can_in: false,
                    can_sale: false
                },
                description: {
                    description: '',
                },
                classifiers: [],
                workers: {
                    workers: ''
                },
                images: [],
                pictures: {
                    pictures: []
                },
                errorFields: [],
                tabErrors: [],
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
                open: 'edit',
                product: action.data,
                main: action.main,
                classifiers: action.classifiers,
                productLoadingStatus: false,
            };
        case SET_PRODUCTS:
            return {
                ...state,
                products: action.products,
                page_count: action.page_count,
                count: action.count,
                productLoadingStatus: false
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
                tabErrors: [],
                main: {
                    item_name: '',
                    short_name: '',
                    product_type: 0,
                    unit_id: 1,
                    show_in_site: false,
                    active: 1,
                    can_in: false,
                    can_sale: false
                },
                description: {
                    description: '',
                },
                classifiers: [],
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
                product: null,
                products: action.products,
                main: {
                    item_name: '',
                    short_name: '',
                    product_type: 0,
                    unit_id: 1,
                    show_in_site: false,
                    active: 1,
                    can_in: false,
                    can_sale: false
                },
                description: {
                    description: '',
                },
                classifiers: [],
                workers: {
                    workers: ''
                },
                images: [],
                errorFields: [],
                tabErrors: [],
                open: false,
                pictures: {
                    pictures: []
                },
            };
        case ONLY_ADD_PRODUCT:
            return {
                ...state,
                product: action.products,
            };
        default:
            return {...state}
    }
}