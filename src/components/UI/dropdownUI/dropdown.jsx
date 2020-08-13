import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';

export default function FadeMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div style={{position: 'relative'}}>
            <Button classes={{root: props.buttonRoot}} aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>
                {props.label}
            </Button>
            <Menu
                id="fade-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <MenuItem onClick={handleClose}>Կոդ ЕАН-13</MenuItem>
                <MenuItem onClick={handleClose}>Կոդ ЕАН-8</MenuItem>
                <MenuItem onClick={handleClose}>Կշեռքչ կոդ</MenuItem>
            </Menu>
        </div>
    );
}
