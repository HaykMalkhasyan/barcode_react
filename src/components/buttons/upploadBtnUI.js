import React from 'react';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import ImageIcon from '@material-ui/icons/Image';

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
                    component="span"
                    variant={props.variant}
                    color={props.color}
                    className={classes.button}
                    startIcon={<ImageIcon/>}
                    multiple
                >
                    Upload
                </Button>
            </label>
            <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                name={props.name}
                value={props.value}
                onChange={event => props.onChange(event)}
            />
        </>
    );
}
