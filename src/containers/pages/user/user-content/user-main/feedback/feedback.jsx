import React from "react";
import classes from "./feedback.module.css";
import FeedbackItem from "./feedback-item/feedback-item";
import CustomHeader from "../../../../../../components/UI/customHeader/customHeader";

const Feedback = props => {

    return (
        <div className={classes.feedback}>
            <CustomHeader/>
            {
                props.data && props.data.length ?
                    props.data.map(item => {

                        return (
                            <FeedbackItem
                                key={`feedback-item-${item.id}`}
                                feedback={item.feedback}
                                date={item.date}
                            />
                        )
                    })
                    :
                    null
            }
        </div>
    )
}

export default Feedback