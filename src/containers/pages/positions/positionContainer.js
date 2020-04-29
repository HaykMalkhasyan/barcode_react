import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
    positionActions,
    handle,
    setModalValues,
    toggleModal
} from "../../../redux/positions/actions";
import PositionPage from './positionPage';


const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            positionActions,
            handle,
            toggleModal,
            setModalValues
        },
        dispatch
    );
};

const mapStateToProps = state => {
    return {
        modal: state.positions.modal,
        positions: state.positions.positions,
        position: state.positions.position,
        pages: state.pages.data,
        perm: state.permission.data.positions,
        errors: state.positions.errors,
        tools: state.permission.tool

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PositionPage);
