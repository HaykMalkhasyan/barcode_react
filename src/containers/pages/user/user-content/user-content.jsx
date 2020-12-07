import React from "react";
import classes from "./user-content.module.css";
import CustomHeader from "../../../../components/UI/customHeader/customHeader";

const UserContent = ({component: Component, ...props}) => {

    return (
        <section className={classes.userContent}>
            <CustomHeader
                name={props.active.name}
            />
            <Component {...props}/>
        </section>
    )
}

export default UserContent