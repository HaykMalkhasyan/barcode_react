import React from 'react'
import classes from './barcode-config.module.css'
import RangeSlider from "../../../../../../../../../../../../../components/UI/rangeSlider/rangeSlider";
import SelectUI from "../../../../../../../../../../../../../components/UI/input/selectUI/selectUI";

const BarcodeConfigs = props => {

    return (
        <div className={classes.barcodeWidthWindow}>
            <RangeSlider
                labelStyle={classes.labelStyle}
                root={classes.rangeRoot}
                thumb={classes.thumb}
                label={'Լայնություն'}
                labellebdy={"discrete-slider"}
                marks={true}
                step={0.1}
                min={0.1}
                max={1.9}
                name={'width'}
                value={props.width}
                // Methods
                changeRangeSlider={props.changeWithRangeSlider}
            />
            <RangeSlider
                labelStyle={classes.labelStyle}
                root={classes.rangeRoot}
                thumb={classes.thumb}
                label={'Բարձրություն'}
                labellebdy={"discrete-slider"}
                marks={true}
                step={1}
                min={5}
                max={200}
                name={'height'}
                value={props.height}
                // Methods
                changeRangeSlider={props.changeHeightRangeSlider}
            />
            <SelectUI
                id={'font-id'}
                label={'Տառատեսակ'}
                labelId={'font-family'}
                name={'font'}
                formControl={classes.formControl}
                labelStyle={classes.labelStyle}
                root={classes.selectRoot}
                data={props.font_data}
                value={props.font}
                // Methods
                onChange={props.selectFontHandler}
            />
        </div>
    )
};

export default BarcodeConfigs;