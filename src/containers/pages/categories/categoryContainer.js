import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
    categoryActions,
    setModalValues1,
    toggleModal
} from "../../../redux/categories/actions";
import CategoryPage from './categoryPage';


const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            categoryActions,
            setModalValues1,
            toggleModal

        },
        dispatch
    );
};

const mapStateToProps = state => {
    return {
        categories: state.categories.categories,
        category: state.categories.category,
        modal: state.categories.modal,
        perm: state.permission.data.category,
        errors: state.categories.errors,

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);
