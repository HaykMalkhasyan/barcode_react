import React from 'react';
import classes from './tools-component.module.css';
import CollapseUI from "../../../../../../../../../../../../components/UI/collapseUI/collapseUI";
import ColorLensIcon from '@material-ui/icons/ColorLens';
import OpacityIcon from '@material-ui/icons/Opacity';
import PhotoSizeSelectSmallIcon from '@material-ui/icons/PhotoSizeSelectSmall';
import PaperSizes from "./paper-sizes/paper-sizes";
import BarcodeConfigs from "./barcode-config/barcode-config";
import ContentConfig from "./content-config/content-config";

const ToolsComponent = props => {

    const changeWithRangeSlider = value => {
        props.setBarcodeValue('width', value)
    };

    const changeHeightRangeSlider = value => {
        props.setBarcodeValue('height', value)
    };

    const selectFontHandler = event => {
        props.setBarcodeValue(event.target.name, event.target.value)
    };

    const selectContentItem = event => {
        props.setBarcodeValue(event.target.name, event.target.value)
    };

    const changeHandler = event => {
        props.changeElementSizes(event.target.name, event.target.name === "fontWeight" ? parseInt(event.target.value) : event.target.value)
    };

    return (
        <div className={classes.toolsComponent}>
            <CollapseUI
                root={classes.collapseButtonRoot}
                label={
                    <span className={classes.collapseContent}>
                        <PhotoSizeSelectSmallIcon fontSize='small'/>&nbsp;
                        <span>Թղթի չափը</span>
                    </span>
                }
            >
                <PaperSizes
                    data={props.papers}
                    width={props.paper_width}
                    height={props.paper_height}
                    // Methods
                    setPaperSize={props.setPaperSize}
                />
            </CollapseUI>
            <hr className={classes.line}/>
            <CollapseUI
                root={classes.collapseButtonRoot}
                label={
                    <span className={classes.collapseContent}>
                        <ColorLensIcon fontSize='small'/>&nbsp;
                        <span>Շտրիխ կոդի ձևավորում</span>
                    </span>
                }
            >
                <BarcodeConfigs
                    width={props.width}
                    height={props.height}
                    font_data={props.font_data}
                    font={props.font}
                    // Methods
                    changeWithRangeSlider={changeWithRangeSlider}
                    changeHeightRangeSlider={changeHeightRangeSlider}
                    selectFontHandler={selectFontHandler}
                />
            </CollapseUI>
            <hr className={classes.line}/>
            <CollapseUI
                root={classes.collapseButtonRoot}
                label={
                    <span className={classes.collapseContent}>
                        <OpacityIcon fontSize='small'/>&nbsp;
                        <span>Բովանդակության ձևավորում</span>
                    </span>
                }
            >
                <ContentConfig
                    elem_data={props.elem_data}
                    content_data={props.content_data}
                    content={props.content}
                    // Methods
                    selectContentItem={selectContentItem}
                    changeHandler={changeHandler}
                />
            </CollapseUI>
            <hr className={classes.line}/>
        </div>
    )
};

export default ToolsComponent;