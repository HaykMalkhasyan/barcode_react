import React from 'react'
import classes from './interlocutor-window.module.css'
import Header from "./header/header";
import ChatSearch from "./chat-search/chat-search";
import Interlocutor from "./interlocutor/interlocutor";

const InterlocutorWindow = props => {

    return (
        <div className={`background-fff ${classes.interlocutorWindow}`}>
            <Header/>
            <ChatSearch/>
            <Interlocutor/>
        </div>
    )
};

export default InterlocutorWindow;