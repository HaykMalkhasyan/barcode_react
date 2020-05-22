import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
    toggleModal,
    setModalValue,
    menuActions,
    getPages,
} from "../../../redux/pages/actions";
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
        dataMenu: state.pages.datas,
        dataMenus: state.pages.data,
        modal: state.pages.modal,
        errors: state.pages.errors,
        sectionFontColor: state.customizer.sidebarSize.sectionFontColor,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuPage);
