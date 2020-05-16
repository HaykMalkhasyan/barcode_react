import React from 'react';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import Translate from "../../Translate";

const useStyles = makeStyles((theme) => ({
    button: {
        margin: 0,
        padding: '0 10px',
        outline: 'none !important'
    },
    input: {
        display: 'none',
    },
}));

export default function UploadButton(props) {
    const classes = useStyles();

    return (
        <>
            <label htmlFor="contained-button-file">
                <Button
                    style={{
                        padding: props.padding,
                        margin: props.margin,
                    }}
                    component="span"
                    variant={props.variant}
                    color={props.color}
                    className={classes.button}
                    startIcon={props.icon}
                    multiple={props.multiple}
                >
                    <Translate name={props.label}/>
                </Button>
            </label>
            <input
                accept={props.accept}
                className={classes.input}
                id="contained-button-file"
                multiple={props.multiple}
                type="file"
                name={props.name}
                value={props.value}
                onChange={event => props.onChange(event)}
            />
        </>
    );
}
