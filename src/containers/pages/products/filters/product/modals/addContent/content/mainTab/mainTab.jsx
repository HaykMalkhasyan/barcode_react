import React from 'react'
import classes from './mainTab.module.css'
import Grid from "@material-ui/core/Grid";
import Gallery from "../../gallery/gallery";
import Data from "../../data/data";
import {connect} from "react-redux";
import {setMainData, setProductValues} from "../../../../../../../../../Redux/products/actions";

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
                            <Gallery
                                gallery={props.gallery}
                                product={props.product}
                                type={props.type}
                                // Methods
                                addPhoto={props.addPhotoHandler}
                                deleteImageHandler={props.deleteImageHandler}
                                deleteUploadImagesHandler={props.deleteUploadImagesHandler}
                                setProductValues={props.setProductValues}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12} lg={7}>
                        <div className={classes.dataWindow}>
                            <Data
                                data={props.main}
                                types={props.types}
                                measurements={props.measurements}
                                errorFields={props.errorFields}
                                // Methods
                                setMainData={props.setMainData}
                                setProductValues={props.setProductValues}
                            />
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
};

function mapStateToProps(state) {

    return {
        main: state.products.main,
        types: state.products.types,
        product: state.products.product,
        measurements: state.products.measurements,
        errorFields: state.products.errorFields,
    }
}

function mapDispatchToProps(dispatch) {

    return {
        setMainData: (name, value) => dispatch(setMainData(name, value)),
        setProductValues: (name, value) => dispatch(setProductValues(name, value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainTab);