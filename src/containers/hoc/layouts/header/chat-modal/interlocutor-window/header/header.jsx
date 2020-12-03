import React from 'react'
import classes from './header.module.css'
import ChatOwner from "./chat-owner/chat-owner";
import CustomButton from "../../../../../../../components/UI/button/customButton/custom-button";
import Icons from "../../../../../../../components/Icons/icons";

const Header = props => {

    return (
        <div className={classes.header}>
            <div>
                <ChatOwner
                    owner={'Անուն Ազգանուն'}
                    status={'Կարգավիճակ'}
                />
            </div>
            <div>
                <CustomButton
                    className={classes.dropButton}
                    children={<Icons type={'drop-list'}/>}
                />
            </div>
        </div>
    )
};

export default Header;