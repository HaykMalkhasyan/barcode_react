import React from 'react'
import classes from './user.module.css'
import {Redirect, withRouter} from "react-router-dom"
import {connect} from "react-redux"
import UserHeader from "./user-header/user-header";

const User = props => {
    if (props && +props.location.pathname.split('/')[props.location.pathname.split('/').length-1] !== props.user.user_id) {
        return (
            <Redirect to='/'/>
        )
    } else {
        return (
            <div className={classes.user}>
                <UserHeader/>
            </div>
        )
    }
};

function mapStateToProps(state) {

    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(withRouter(User))