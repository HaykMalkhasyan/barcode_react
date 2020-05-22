import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
    userActions,
    toggleModal,
    setModalValues,
} from "../../../redux/users/actions";
import {
    positionActions,
} from "../../../redux/positions/actions";
import UserPage from './userPage';


const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            userActions,
            toggleModal,
            setModalValues,
            positionActions
        },
        dispatch
    );
};

const mapStateToProps = state => {
    return {
        users: state.users.users,
        modal: state.users.modal,
        positions: state.positions.positions,
        perm: state.permission.data.users,
        user: state.users.user,
        errors: state.users.errors,
        sectionFontColor: state.customizer.sidebarSize.sectionFontColor,

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
