import React from "react";
import classes from './contentItem.module.css';
import CustomButton from "../../../../../components/UI/button/customButton/custom-button";

const PageContentItem = props => {

    return (
        <div className={classes.pageContentItem}>
            <div className={classes.rowContainerContent}>
                <div className={classes.imageWindow}>
                    <img src={props.url} alt={props.alt}/>
                </div>
                <div className={classes.rowContainerTextContent}>
                    <div>
                        <span className={classes.companyName}>
                            {props.name}
                        </span>
                    </div>
                    <div className={classes.otherContnet}>
                            <span className={classes.companyNumber}>
                                {props.hvhh}
                            </span>
                        <span className={classes.companyBank}>
                            {props.bank}
                        </span>
                    </div>
                </div>
                <div className={classes.controllers}>
                    <CustomButton
                        className={classes.controllersBtn}
                        children={
                            <svg width={16} height={16} viewBox="0 0 21.555 21.614">
                                <defs>
                                    <style>{".a{fill:#092f70;}"}</style>
                                </defs>
                                <g transform="translate(0)">
                                    <path
                                        className={classes.editIcon}
                                        d="M21.441,21.387v7.227a2.032,2.032,0,0,1-2.026,2.026H4.926A2.032,2.032,0,0,1,2.9,28.614V14.126A2.032,2.032,0,0,1,4.926,12.1h7.227a.675.675,0,0,1,0,1.351H4.926a.677.677,0,0,0-.675.675V28.614a.677.677,0,0,0,.675.675H19.414a.677.677,0,0,0,.675-.675V21.387a.675.675,0,1,1,1.351,0Z"
                                        transform="translate(-2.9 -9.027)"
                                    />
                                    <path
                                        className={classes.editIcon}
                                        d="M39.348,3.878a3.1,3.1,0,0,0-4.323,0L33.674,5.229h0l-1.486,1.52h0l-.2.2h0l-4.39,4.39a.805.805,0,0,0-.2.371l-.709,4.053a.712.712,0,0,0,.2.608.667.667,0,0,0,.473.2h.1l4.053-.709a.805.805,0,0,0,.371-.2l4.39-4.39h0l.2-.2h0l1.486-1.486h0l1.351-1.351a3.038,3.038,0,0,0,.878-2.161A2.78,2.78,0,0,0,39.348,3.878ZM31.108,14.55l-2.9.507.507-2.9L32.492,8.37l2.4,2.4Zm5.4-5.4-.675.675-2.4-2.4.675-.675.068-.068,2.4,2.4ZM38.4,7.221l-.912.912-2.4-2.4.878-.912a1.918,1.918,0,0,1,1.25-.473,1.533,1.533,0,0,1,1.182.507,1.786,1.786,0,0,1,.507,1.182A1.584,1.584,0,0,1,38.4,7.221Z"
                                        transform="translate(-18.646 -3)"
                                    />
                                </g>
                            </svg>
                        }
                    />
                    <CustomButton
                        className={classes.controllersBtn}
                        children={
                            <svg width={16} height={16} viewBox="0 0 20.09 21.339">
                                <g transform="translate(0)">
                                    <path
                                        className={classes.deleteIcon}
                                        d="M18.128,4.187V18.435a2.925,2.925,0,0,1-2.9,2.9H5.365a2.882,2.882,0,0,1-2.9-2.9V4.187H.908a.675.675,0,0,1,0-1.351H5.635V2.093A2.1,2.1,0,0,1,7.729,0h5.132a2.1,2.1,0,0,1,2.093,2.093v.743h4.727a.675.675,0,0,1,0,1.351ZM6.986,2.836H13.6V2.093a.749.749,0,0,0-.743-.743H7.729a.749.749,0,0,0-.743.743ZM3.812,4.187V18.435a1.528,1.528,0,0,0,1.553,1.553h9.859a1.571,1.571,0,0,0,1.553-1.553V4.187Z"
                                        transform="translate(-0.25)"
                                    />
                                    <path
                                        className={classes.deleteIcon}
                                        d="M97,105.908a.675.675,0,0,1,1.351,0v8.576a.675.675,0,0,1-1.351,0Z"
                                        transform="translate(-90.467 -98.143)"
                                    />
                                    <path
                                        className={classes.deleteIcon}
                                        d="M181,105.908a.675.675,0,0,1,1.351,0v8.576a.675.675,0,0,1-1.351,0Z"
                                        transform="translate(-168.794 -98.143)"
                                    />
                                    <path
                                        className={classes.deleteIcon}
                                        d="M139,105.908a.675.675,0,0,1,1.351,0v8.576a.675.675,0,0,1-1.351,0Z"
                                        transform="translate(-129.631 -98.143)"
                                    />
                                </g>
                            </svg>
                        }
                    />
                </div>
            </div>
        </div>
    )
}

export default PageContentItem