import React from 'react'
import classes from './chat-window.module.css'
import Header from "./header/header";
import Footer from "./footer/footer";
import Content from "./content/content";

const ChatWindow = props => {

    return (
        <div className={classes.chatWindow}>
            <Header
                interlocutorWindow={props.interlocutorWindow}
                owner={props.owner}
                image={props.image}
                // Methods
                toggleChat={props.toggleChat}
                togglePeople={props.togglePeople}
            />
            <Content/>
            <Footer/>
        </div>
    )
};

export default ChatWindow;