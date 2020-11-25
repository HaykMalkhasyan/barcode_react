import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import classes from './dialogUI.module.css'

export default function DialogUI(props) {

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (props.open) {
            const {current: descriptionElement} = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [props.open]);

    return (
        <Dialog
            disableBackdropClick={props.disableBackdropClick}
            open={!!props.open}
            onClose={props.handleClose}
            scroll={props.scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            maxWidth={props.maxWidth}
            classes={{
                paper: props.paper
            }}
        >
            <DialogTitle
                classes={{root: props.root}}
                id="scroll-dialog-title"
            >
                {props.label}
            </DialogTitle>
            <div
                className={classes.scrollWindow}
                // dividers={props.scroll === 'paper'}
            >
                <div
                    id="scroll-dialog-description"
                    ref={descriptionElementRef}
                    tabIndex={-1}
                >
                    {props.children}
                </div>
            </div>
            <DialogActions classes={{root: classes.dialogRoot}}>
                {props.footer}
            </DialogActions>
        </Dialog>
    );
}
