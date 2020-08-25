import React, {useState} from 'react'
import classes from './balanceFilter.module.css'
import CollapseUI from "../../../../../../../../components/UI/collapseUI/collapseUI";
import SelectUI from "../../../../../../../../components/UI/input/selectUI/selectUI";
import InputRange from "../../../../../../../../components/inputRange/inputRange";

const BalanceFilter = props => {
    const [value, setValue] = useState('');

    const prices = [
        {id: 1, name: 'Հայկական դրամ (AMD)', value: 'AMD'},
        {id: 2, name: 'Ռուսական ռուբլի (RUB)', value: 'RUB'},
        {id: 3, name: 'Ամերիկյան դոլլար (USD)', value: 'USD'},
    ];

    return (
        <div className={classes.balanceFilter}>
            <CollapseUI
                root={classes.categoryName}
                label={'Մնացորդ'}
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
                    </div>
                }
            />
        </div>
    )
};

export default BalanceFilter;