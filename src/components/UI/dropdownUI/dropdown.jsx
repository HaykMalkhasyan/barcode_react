import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import Fade from '@material-ui/core/Fade';

export default function FadeMenu(props) {

    return (
        <div style={{position: 'relative'}}>
            <Button classes={{root: props.buttonRoot}} aria-controls="fade-menu" aria-haspopup="true" onClick={props.handleClick}>
                {props.label}
            </Button>
            <Menu
                id="fade-menu"
                anchorEl={props.open}
                keepMounted
                open={Boolean(props.open)}
                onClose={props.handleClose}
                TransitionComponent={Fade}
            >
                {props.children}
            </Menu>
        </div>
    );
}
