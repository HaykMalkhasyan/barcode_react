import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
    productActions,
    setModalValues,
    toggleModal
} from "../../../redux/products/actions";
import ProductPage from './productPage';


const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            productActions,
            toggleModal,
            setModalValues
        },
        dispatch
    );
};

const mapStateToProps = state => {
    return {
        modal: state.products.modal,
        products: state.products.products,
        product: state.products.product,
        perm: state.permission.data.products,

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
