import React from "react";
import classes from "./user-header-content.module.css";
import CustomButton from "../../../../../components/UI/button/customButton/custom-button";
import EditIcon from '@material-ui/icons/Edit';
import NavigationContent from "./navigation-content/navigation-content";
import cookie from "../../../../../services/cookies";

const UserHeaderContent = props => {

    return (
        <div className={classes.contentWindow}>
            <div className={classes.contentWindowHeader}>
                <h1 className={classes.userName}>
                    {
                        `${cookie.get("user").firstName} ${cookie.get("user").lastName}`
                    }
                </h1>
                <CustomButton
                    className={classes.editProfileButton}
                    children={
                        <><span>Խմբագրել պրոֆիլը</span> <EditIcon className={classes.editIcon}/></>
                    }
                />
            </div>
            <NavigationContent
                data={props.navigation_data}
                active={props.active}
                // Methods
                selectTab={props.selectTabHandler}
            />
        </div>
    )
}

export default UserHeaderContent