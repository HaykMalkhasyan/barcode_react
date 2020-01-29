import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
    getItems,
    addItem,
    deleteItem,
    setModalValues,
    itemModal
} from "../../../redux/items/actions";
import ItemPage from './itemPage';


const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getItems,
            addItem,
            deleteItem,
            itemModal,
            setModalValues
        },
        dispatch
    );
};

const mapStateToProps = state => {
    return {
        modal: state.items.modal,
        items: state.items.items,
        item: state.items.item,
        perm: state.permission.data.positions,

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemPage);
