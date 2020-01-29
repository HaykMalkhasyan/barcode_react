import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
    getPositions,
    addPosition,
    deletePosition,
    handle,
    setModalValues,
    positionModal
} from "../../../redux/positions/actions";
import PositionPage from './positionPage';


const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getPositions,
            addPosition,
            deletePosition,
            handle,
            positionModal,
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
        positionPerm: state.positions.position.perm,

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PositionPage);
