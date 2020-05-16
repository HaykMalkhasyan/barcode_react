import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {makeStyles} from '@material-ui/core/styles';
import Translate from "../../Translate";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function CustomizedSnackbars(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Snackbar open={props.open} autoHideDuration={6000} onClose={props.handleClose}>
                <Alert onClose={props.handleClose} severity={props.severity}>
                    <Translate name={props.text}/>
                </Alert>
            </Snackbar>
        </div>
    );
}