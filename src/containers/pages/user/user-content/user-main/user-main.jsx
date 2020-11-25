import React from "react";
import classes from "./user-main.module.css";
import {Grid} from "@material-ui/core";
import UserInformation from "./user-information/user-information";
import Feedback from "./feedback/feedback";

const UserMain = props => {

    return (
        <div className={classes.main}>
            <Grid container spacing={1}>
                <Grid item xs={12} lg={4}>
                    image
                </Grid>
                <Grid item xs={12} lg={8}>
                    <UserInformation/>
                </Grid>
            </Grid>
            <Feedback
                data={props.feedback}
            />
        </div>
    )
}

export default UserMain