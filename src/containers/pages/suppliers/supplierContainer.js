import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
    supplierActions,
    getBanks,
    getCurrency,
    toggleModal,
    setModalValues,
    /*--------------------------*/
    openSuppliersAddModal,
    setSuppliersAddModalValue,
    reducePhone,
    addPhone,
    fetchSuppliers,
    searchRequisite
} from "../../../redux/suppliers/actions";
import SupplierPage from './supplierPage';


const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            supplierActions,
            toggleModal,
            setModalValues,
            getBanks,
            getCurrency,
            /*-------------------*/
            openSuppliersAddModal,
            setSuppliersAddModalValue,
            reducePhone,
            addPhone,
            fetchSuppliers,
            searchRequisite
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
        errors: state.suppliers.errors,
        /*-----------------------------------*/
        isOpen: state.suppliers.isOpen,
        modalType: state.suppliers.modalType,
        setSupplier: state.suppliers.setSupplier,
        currency: state.suppliers.currency,

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SupplierPage);
