import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
    productActions,
    setModalValues,
    toggleModal,
    barcodeActions
} from "../../../redux/products/actions";
import {
    supplierActions
} from "../../../redux/suppliers/actions";
import {
    groupActions,handleOpen,selectGroup
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
            uploadImages
        },
        dispatch
    );
};

const mapStateToProps = state => {
    return {
        modal: state.products.modal,
        products: state.products.products,
        product: state.products.product,
        barcodeTypes: state.products.barcodeTypes,
        suppliers: state.suppliers.suppliers,
        groups: state.group.groups,
        selectedGroups: state.group.selected,
        perm: state.permission.data.products,
        lang: {
            active:state.languages.active
        },
        uploadedImages: state.todo.images,

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
