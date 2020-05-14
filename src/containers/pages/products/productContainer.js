import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
    productActions,
    setModalValues,
    toggleModal,
    barcodeActions,
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
    addSearchText
} from "../../../redux/products/actions";
import {
    supplierActions
} from "../../../redux/suppliers/actions";
import {
    groupActions,
    handleOpen,
    selectGroup,
    subGroupActions,
    getSubGroups,
} from "../../../redux/group/actions";
import {
    uploadImages
} from "../../../redux/todo/actions";
import ProductPage from './productPage';


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
            addSearchText
        },
        dispatch
    );
};

const mapStateToProps = state => {
    return {
        modal: state.products.modal,
        products: state.products.products,
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

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
