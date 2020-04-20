import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
    toggleModal,
    setModalValue,
    menuActions,
    getPages,
} from "../../../redux/menu/actions";
// import {getPages} from './../../../redux/pages/actions'
import MenuPage from './menuPage';

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            toggleModal,
            setModalValue,
            menuActions,
            getPages
        },
        dispatch
    );
};

const mapStateToProps = state => {
    return {
        dataMenu: state.menu.datas,
        dataMenus: state.menu.data,
        modal: state.menu.modal,
        errors: state.menu.errors,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuPage);
