import React from "react";
import {connect} from "react-redux";


function Translate(props) {
    return (
        <span>
            {props.translations[props.name]?props.translations[props.name]:props.name}
        </span>
    );
}


const mapStateToProps = state => {
    return {
        translations: state.languages.translations,
    }
};

export default connect( mapStateToProps )(Translate);