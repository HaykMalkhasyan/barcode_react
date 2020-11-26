import React from "react";
import classes from "./header-content.module.css";
import CustomButton from "../../../../../../../components/UI/button/customButton/customButton";
import Icons from "../../../../../../../components/Icons/icons";
import CloseButton from "../../../../../../../components/UI/button/closeButton/closeButton";

const HeaderContent = props => {

    return (
        <header className={`background-fff ${classes.header}`}>
            <CustomButton
                className={`background-F8FAFF ${classes.backButton}`}
                children={<Icons type={'back-page'} className={`fill-666 ${classes.backButtonIcon}`}/>}
                // Methods
                onClick={props.backPageHandler}
            />
            <div className={classes.forOf}>
                <h3 className="color-49525E font-size-18">Դասակարգչի խմբագրում</h3>
            </div>
            <div>
                <CloseButton onClick={props.handleClose}/>
            </div>
        </header>
    )
}

export default HeaderContent