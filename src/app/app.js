// import external modules
import React from "react";
import "react-perfect-scrollbar/dist/css/styles.css";
// import internal(own) modules
import {connect} from 'react-redux';
import Router from "./router";
function App(props) {
    return (
        <Router auth={props.auth.user}/>
    )
}

function mapStateToProps(state) {
    return state;
}

export default connect(
    mapStateToProps,
)(App);
