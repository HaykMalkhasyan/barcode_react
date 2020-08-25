import React from 'react'
import Popper from '@material-ui/core/Popper'
import CustomButton from "../UI/button/customButton/customButton"


export default function SpringPopper(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'spring-popper' : undefined;

    return (
        <div>
            <CustomButton
                className={props.className}
                ariaDescribedby={id}
                onClick={handleClick}
                type={'button'}
                children={props.label}
            />
            <Popper id={id} open={open} anchorEl={anchorEl} transition>
                {({ TransitionProps }) => (
                        <div className={props.dropWindow}>{props.children}</div>

                )}
            </Popper>
        </div>
    );
}
