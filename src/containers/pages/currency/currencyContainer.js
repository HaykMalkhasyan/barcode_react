import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import CurrencyContainer from './currencyPage';
import {
    getAllCurrency,
    toggleModal,
    editCurrency,
    setCurrencyValue,
    checkCurrencyValue,
    fetchCurrency,
    getItemCurrency,
    currencyEditabkeToggle
} from '../../../redux/currency/actions';


const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getAllCurrency,
            toggleModal,
            editCurrency,
            setCurrencyValue,
            checkCurrencyValue,
            fetchCurrency,
            getItemCurrency,
            currencyEditabkeToggle
        },
        dispatch
    );
};

const mapStateToProps = state => {
    return {
        currency: state.currency.currency,
        editabledStatus: state.currency.editabledStatus,
        setCurrency: state.currency.setCurrency,
        isOpen: state.currency.isOpen,
        formValidate: state.currency.formValidate,
        sectionFontColor: state.customizer.sidebarSize.sectionFontColor,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyContainer);
