import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

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
                id="scroll-dialog-title"
            >
                {props.label}
            </DialogTitle>
            <div
                style={{boxSizing: 'border-box', width: '100%',padding: 0, overflow: 'hidden'}}
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
            <DialogActions>
                {props.footer}
            </DialogActions>
        </Dialog>
    );
}
