import React from "react";
import {bindActionCreators} from "redux";
import {getTranslate} from "./redux/lang/actions";
import {connect} from "react-redux";


function Translate(props) {
    return (
        <span>
            {getTranslate(props.name)}
        </span>
    );
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getTranslate
        },
        dispatch
    );
};

// const mapStateToProps = state => {
//     return state
// };

export default connect( mapDispatchToProps)(Translate);