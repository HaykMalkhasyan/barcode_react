import React from 'react'
import classes from './supplierFilter.module.css'
import SelectUI from "../../../../../../../../components/UI/input/selectUI/selectUI";
import CollapseUI from "../../../../../../../../components/UI/collapseUI/collapseUI";

const SupplierFilter = props => {

    return (
        <div className={classes.supplierFilter}>
            <CollapseUI
                root={classes.categoryName}
                label={'Մատակարար'}
                children={
                    <div className={classes.filterWindow}>
                        <div>
                            <SelectUI
                                labelId={'supplier-label'}
                                id={'supplier'}
                                label={'Մատակարար'}
                                formControl={classes.selectRoot}
                                data={null}
                                name={'supplier'}
                                // Methods
                                onChange={event => ''}
                            />
                        </div>
                    </div>
                }
            />
        </div>
    )
};

export default SupplierFilter;