import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import CurrencyContainer from './currencyPage';
import {
    getAllCurrency,
    toggleModal,
    editCurrency,
    setCurrencyValue,
    checkCurrencyValue,
    fetchCurrency
} from '../../../redux/currency/actions';


const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getAllCurrency,
            toggleModal,
            editCurrency,
            setCurrencyValue,
            checkCurrencyValue,
            fetchCurrency
        },
        dispatch
    );
};

const mapStateToProps = state => {
    return {
        currency: state.currency.currency,
        setCurrency: state.currency.setCurrency,
        isOpen: state.currency.isOpen,
        formValidate: state.currency.formValidate,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyContainer);
