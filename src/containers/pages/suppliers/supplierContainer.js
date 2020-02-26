import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
    supplierActions,
    getBanks,
    toggleModal,
    setModalValues,
} from "../../../redux/suppliers/actions";
import SupplierPage from './supplierPage';


const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            supplierActions,
            toggleModal,
            setModalValues,
            getBanks
        },
        dispatch
    );
};

const mapStateToProps = state => {
    return {
        suppliers: state.suppliers.suppliers,
        supplier: state.suppliers.supplier,
        banks: state.suppliers.banks,
        modal: state.suppliers.modal,
        perm: state.permission.data.suppliers,
        errors: state.suppliers.errors

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SupplierPage);
