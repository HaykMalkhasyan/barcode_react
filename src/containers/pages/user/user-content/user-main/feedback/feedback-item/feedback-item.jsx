import React from "react";
import classes from "./feedback-item.module.css";

const FeedbackItem = props => {

    return (
        <div className={classes.feedbackItem}>
            <p>
                {props.feedback}
            </p>
            <span>
                {props.date}
            </span>
        </div>
    )
}

export default FeedbackItem