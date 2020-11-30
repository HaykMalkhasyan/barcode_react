import React from 'react'
import classes from './chat-search.module.css'
import CustomInput from "../../../../../../../components/UI/input/customInput/customInput";
import Icons from "../../../../../../../components/Icons/icons";

const ChatSearch = props => {

    return (
        <div className={classes.chatSearch}>
            <CustomInput
                inputType={'inner'}
                classNameLabel={classes.labelStyle}
                classNameInput={classes.inputStyle}
                label={
                    <span className={classes.searchIcon}>
                        <Icons type={'search'}/>
                    </span>
                }
            />
        </div>
    )
};

export default ChatSearch;