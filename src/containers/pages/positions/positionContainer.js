import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
    getPositions,
    handle,
    setModalValues,
    positionModal
} from "../../../redux/positions/actions";
import PositionPage from './positionPage';


const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getPositions,
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
        pages: state.pages.data,
        perm: state.permission.data.positions,

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PositionPage);
