import React from "react";
import classes from './imageViewer.module.css';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';

const ImageViewer = props => {

    return (
        <div className={classes.mainWindow}>
            <div className={classes.mainWindowMenu}>
                <button
                    className={classes.closeBtn}
                    onClick={props.onClick}
                >
                    <CancelRoundedIcon style={{fontSize: 50}}/>
                </button>
            </div>
            <img src={URL.createObjectURL(props.image)} alt="classifiers"/>
        </div>
    )
}

export default ImageViewer