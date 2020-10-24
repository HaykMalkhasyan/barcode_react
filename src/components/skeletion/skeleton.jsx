import React from "react";
import classes from './sceleton.module.css';
import Skeleton from "@material-ui/lab/Skeleton";

const SkeletonUI = props => {

    return (
        <div className={classes.main}>
            <div className={classes.groupSkeleton}>
                <div className={classes.icon}><Skeleton height={30} /></div>
                <div className={classes.text}><Skeleton height={30} /></div>
            </div>
            <div className={classes.groupSkeleton}>
                <div className={classes.icon}><Skeleton height={30} /></div>
                <div className={classes.text}><Skeleton height={30} /></div>
            </div>
            <div className={classes.groupSkeleton}>
                <div className={classes.icon}><Skeleton height={30} /></div>
                <div className={classes.text}><Skeleton height={30} /></div>
            </div>
            <div className={classes.groupSkeleton}>
                <div className={classes.icon}><Skeleton height={30} /></div>
                <div className={classes.text}><Skeleton height={30} /></div>
            </div>
            <div className={classes.groupSkeleton}>
                <div className={classes.icon}><Skeleton height={30} /></div>
                <div className={classes.text}><Skeleton height={30} /></div>
            </div>
            <div className={classes.groupSkeleton}>
                <div className={classes.icon}><Skeleton height={30} /></div>
                <div className={classes.text}><Skeleton height={30} /></div>
            </div>
        </div>
    )
}

export default SkeletonUI