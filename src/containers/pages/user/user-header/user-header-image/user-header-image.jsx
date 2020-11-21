import React from "react";
import classes from "./user-header-image.module.css";

const UserHeaderImage = props => {

    return (
        <div className={classes.imageWindow}>
            <img
                className={classes.image}
                src="https://m.economictimes.com/thumb/msid-69037337,width-1200,height-900,resizemode-4,imgsize-144736/oldrich-muller.jpg"
                alt="user"
            />
        </div>
    )
}

export default UserHeaderImage