import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
    addUser,
    deleteUser,
    getUser,
    getUsers,
    setModalValues,
    userModal
} from "../../../redux/users/actions";
import {
    getPositions,
} from "../../../redux/positions/actions";
import UserPage from './userPage';


const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
        //     getUsers,
        //     getUser,
        //     addUser,
        //     getPositions,
        //     userModal,
        //     setModalValues,
        //     deleteUser
        },
        dispatch
    );
};

const mapStateToProps = state => {
    return {
        // users: state.users.users,
        // modal: state.users.modal,
        // positions: state.positions.positions,
        // perm: state.permission.data.users,
        // user: state.users.user

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
