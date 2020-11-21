import React from "react";
import classes from "./user-header.module.css";
import {Grid} from "@material-ui/core";
import UserHeaderImage from "./user-header-image/user-header-image";
import UserHeaderContent from "./user-header-content/user-header-content";
import {connect} from "react-redux";

const UserHeader = props => {

    return (
        <header className={classes.header}>
            <Grid container spacing={1}>
                <Grid item xs={12} lg={2}>
                    <UserHeaderImage/>
                </Grid>
                <Grid item xs={12} lg={10}>
                    <UserHeaderContent
                        user={props.user}
                    />
                </Grid>
            </Grid>
        </header>
    )
}

function mapStateToProps( state) {

    return {
        user: state.auth.user,
    }
}

export default connect(mapStateToProps)(UserHeader)