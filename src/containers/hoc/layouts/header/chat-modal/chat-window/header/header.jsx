import React from 'react'
import classes from './header.module.css'
import MessageOwner from "./message-owner/message-owner";
import Controllers from "./controllers/controllers";
import CustomButton from "../../../../../../../components/UI/button/customButton/customButton";
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import PeopleIcon from '@material-ui/icons/People';

const Header = props => {

    return (
        <header className={`background-fff ${classes.header}`}>
            <div className={classes.headerFirst}>
                <CustomButton
                    className={`color-024059 background-transparent ${props.interlocutorWindow ? `${classes.peopleWindow} ${classes.interlocutorWindowOpen}` : classes.peopleWindow}`}
                    children={
                        props.interlocutorWindow ?
                            <PeopleIcon/>
                            :
                            <PeopleOutlineIcon/>
                    }
                    // Methods
                    onClick={() => props.togglePeople(!props.interlocutorWindow)}
                />
                <MessageOwner
                    owner={props.owner}
                    image={props.image}
                />
            </div>
            <Controllers
                // Methods
                toggleChat={props.toggleChat}
            />
        </header>
    )
};

export default Header;