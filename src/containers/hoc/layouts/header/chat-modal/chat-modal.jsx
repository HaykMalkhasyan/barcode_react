import React from 'react'
import classes from './chat-modal.module.css'
import Backdrop from "../../../../../components/UI/backdrop/backdrop";
import InterlocutorWindow from "./interlocutor-window/interlocutor-window";
import ChatWindow from "./chat-window/chat-window";

const ChatModal = props => {

    return (
        <>
            <Backdrop
                className={classes.backdrop}
                // Methods
                onClick={() => props.toggleChat(false)}
            />
            <div className={classes.chatModalWindow}>
                {
                    props.interlocutorWindow ?
                        <Backdrop
                            className={classes.peopleBackdrop}
                            // Methods
                            onClick={() => props.togglePeople(false)}
                        />
                        :
                        null
                }
                <div className={classes.flexContainer}>
                    <div className={props.interlocutorWindow ? `${classes.colXs3} ${classes.interlocutorWindowOpen}` : classes.colXs3}>
                        <InterlocutorWindow/>
                    </div>
                    <div className={classes.colXs9}>
                        <ChatWindow
                            interlocutorWindow={props.interlocutorWindow}
                            owner={'haysell minimarket'}
                            image={"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"}
                            // Methods
                            toggleChat={props.toggleChat}
                            togglePeople={props.togglePeople}
                        />
                    </div>
                </div>
            </div>
        </>
    )
};

export default ChatModal;