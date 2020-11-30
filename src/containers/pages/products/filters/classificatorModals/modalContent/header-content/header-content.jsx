import React from "react";
import classes from "./header-content.module.css";
import CustomButton from "../../../../../../../components/UI/button/customButton/customButton";
import Icons from "../../../../../../../components/Icons/icons";
import CloseButton from "../../../../../../../components/UI/button/closeButton/closeButton";

const HeaderContent = props => {

    return (
        <header className={classes.header}>
            <CustomButton
                className={classes.backButton}
                children={<Icons type={'back-page'} className={classes.backButtonIcon}/>}
                // Methods
                onClick={props.backPageHandler}
            />
            <div className={classes.forOf}>
                <h3>Դասակարգչի խմբագրում</h3>
            </div>
            <div>
                <CloseButton onClick={props.handleClose}/>
            </div>
        </header>
    )
}

export default HeaderContent