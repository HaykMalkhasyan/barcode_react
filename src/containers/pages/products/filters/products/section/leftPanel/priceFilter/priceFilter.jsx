import React, {useState} from 'react'
import classes from './priceFilter.module.css'
import CollapseUI from "../../../../../../../../components/UI/collapseUI/collapseUI";
import SelectUI from "../../../../../../../../components/UI/input/selectUI/selectUI";
import RangeSlider from "../../../../../../../../components/UI/rangeSlider/rangeSlider";
import InputRange from "../../../../../../../../components/inputRange/inputRange";

const PriceFilter = props => {
    const [value, setValue] = useState('');

    const prices = [
        {id: 1, name: 'Հայկական դրամ (AMD)', value: 'AMD'},
        {id: 2, name: 'Ռուսական ռուբլի (RUB)', value: 'RUB'},
        {id: 3, name: 'Ամերիկյան դոլլար (USD)', value: 'USD'},
    ];

    return (
        <div className={classes.priceFilter}>
            <CollapseUI
                root={classes.categoryName}
                label={'Գնի տեսակ'}
                children={
                    <div className={classes.filterWindow}>
                        <div>
                            <SelectUI
                                labelId={'exchange-label'}
                                id={'exchange'}
                                label={'Փոխարժեք'}
                                formControl={classes.selectRoot}
                                data={prices}
                                name={'prise_type'}
                                value={value}
                                // Methods
                                onChange={event => setValue(event.target.value)}
                            />
                        </div>
                        <div>
                            <InputRange/>
                        </div>
                        <div>
                            <RangeSlider
                                root={classes.rangeSliderRoot}
                                classes={classes.rangeSlider}
                                label={'Գնի սանդղակ'}
                                labelStyle={classes.labelStyle}
                                min={0}
                                max={1000}
                                step={1}
                            />
                        </div>
                    </div>
                }
            />
        </div>
    )
};

export default PriceFilter;