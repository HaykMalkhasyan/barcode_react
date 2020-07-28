import React from 'react'
import classes from './addContent.module.css'
import Grid from "@material-ui/core/Grid";
import Data from "./data/data";
import Gallery from "./gallery/gallery";

const AddContent = props => {

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} lg={7}>
                <div className={classes.imagesWindow}>
                    <Gallery/>
                </div>
            </Grid>
            <Grid item xs={12} lg={5}>
                <div className={classes.dataWindow}>
                    <Data/>
                </div>
            </Grid>
            <Grid item xs={12}>bottom</Grid>
        </Grid>
    )
}

export default AddContent