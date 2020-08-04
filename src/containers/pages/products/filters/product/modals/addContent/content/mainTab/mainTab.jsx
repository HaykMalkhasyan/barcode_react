import React from 'react'
import classes from './mainTab.module.css'
import Grid from "@material-ui/core/Grid";
import Gallery from "../../gallery/gallery";
import Data from "../../data/data";

const MainTab = props => {

    return (
        <div className={classes.mainTab}>
            <div className={classes.header}>
                <h3>Հիմնական պարամետրեր</h3>
            </div>
            <div className={classes.content}>
                <Grid container spacing={3}>
                    <Grid item xs={12} lg={5}>
                        <div className={classes.imagesWindow}>
                            <Gallery/>
                        </div>
                    </Grid>
                    <Grid item xs={12} lg={7}>
                        <div className={classes.dataWindow}>
                            <Data/>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
};

export default MainTab;