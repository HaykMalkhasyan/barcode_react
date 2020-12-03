import React from 'react'
import Popper from '@material-ui/core/Popper'
import CustomButton from "../UI/button/customButton/custom-button"


export default function SpringPopper(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(props.open ? null : event.currentTarget);
        props.toggleBackdrop(!props.open)
    };

    // const open = Boolean(anchorEl);
    const id = props.open ? 'spring-popper' : undefined;

    return (
        <div>
            <CustomButton
                className={props.className}
                ariaDescribedby={id}
                onClick={handleClick}
                type={'button'}
                children={props.label}
            />
            <Popper style={{zIndex: 4}} id={id} open={props.open} anchorEl={anchorEl} transition>
                {({ TransitionProps }) => (
                        <div className={props.dropWindow}>{props.children}</div>

                )}
            </Popper>
        </div>
    );
}
