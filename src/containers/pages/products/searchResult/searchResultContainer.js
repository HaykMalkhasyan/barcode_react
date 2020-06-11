import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
    addProductStatus,
    addSearchText,
    barcodeActions,
    changePageSize,
    classifiersToggleModal,
    createClassifiers,
    deleteUploadImage,
    deleteUploadImages,
    editabledProduct,
    productActions,
    removeBarcode,
    removeSelectedClassifier,
    selectClassifiersGroup,
    selectGroupsNode,
    setMainImage,
    setMeasurementValue,
    setModalValues,
    setPointsValue,
    setSearchProductValue,
    SetUploadImages,
    subGroupCollapses,
    testFetchNewProduct,
    toggleCheckBoxValue,
    toggleModal,
    toggleSwitchValue,
    toggleClassifierState
} from "../../../../redux/products/actions";
import {
    getPages
} from '../../../../redux/pages/actions'
import {supplierActions} from "../../../../redux/suppliers/actions";
import {getSubGroups, groupActions, handleOpen, selectGroup, subGroupActions,} from "../../../../redux/group/actions";
import {uploadImages} from "../../../../redux/todo/actions";
import SearchResult from './searchResult';


const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            productActions,
            toggleModal,
            barcodeActions,
            setModalValues,
            supplierActions,
            groupActions,
            handleOpen,
            selectGroup,
            uploadImages,
            subGroupActions,
            getSubGroups,
            removeBarcode,
            setMeasurementValue,
            setPointsValue,
            SetUploadImages,
            deleteUploadImages,
            setMainImage,
            setSearchProductValue,
            selectClassifiersGroup,
            selectGroupsNode,
            createClassifiers,
            classifiersToggleModal,
            removeSelectedClassifier,
            toggleSwitchValue,
            toggleCheckBoxValue,
            changePageSize,
            addSearchText,
            editabledProduct,
            /*------------*/
            testFetchNewProduct,
            subGroupCollapses,
            deleteUploadImage,
            addProductStatus,
            getPages,
            toggleClassifierState
        },
        dispatch
    );
};

const mapStateToProps = state => {
    return {
        collapsedStatus: state.products.collapsedStatus,
        active: state.products.active,
        isOpen: state.products.isOpen,
        modal: state.products.modal,
        status: state.products.status,
        severity: state.products.severity,
        text: state.products.text,
        images: state.products.images,
        products: state.products.products,
        editabledStatus: state.products.editabledStatus,
        product: state.products.product,
        group: state.products.group,
        advancedSearchText: state.products.advancedSearchText,
        advancedSearchConfig: state.products.advancedSearchConfig,
        createError: state.products.createError,
        classifiersModal: state.products.classifiersModal,
        searchProduct: state.products.searchProduct,
        searchProductResult: state.products.searchProductResult,
        searchErrorName: state.products.searchErrorName,
        types: state.products.types,
        measurementData: state.products.measurementData,
        barcodeTypes: state.products.barcodeTypes,
        suppliers: state.suppliers.suppliers,
        groups: state.group.groups,
        subGroups: state.group.subGroups,
        selectedGroups: state.group.selected,
        productGroups: state.group.productGroups,
        perm: state.permission.data.products,
        lang: {
            active:state.languages.active
        },
        uploadedImages: state.todo.images,
        sectionFontColor: state.customizer.sidebarSize.sectionFontColor,

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);
