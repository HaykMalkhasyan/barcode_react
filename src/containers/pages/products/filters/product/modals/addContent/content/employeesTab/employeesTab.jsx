import React from 'react'
import classes from './employeesTab.module.css'
import MultiSelectUI from "../../../../../../../../../components/UI/input/multiSelectUI/multiSelectUI";

const EmployeesTab = props => {

    return (
        <div className={classes.employeesTab}>
            <div className={classes.header}>
                <h3>Գործընկերներ</h3>
            </div>
            <div className={classes.content}>
                <p className={classes.information}>
                    Գործընկերոջ ընտրելու կամ փոփոխելու համար անրաժեշտ է սեղմել "Գործընկերներ" տողի վրա և ընտրել համապատասխան գործընկերոջը։
                </p>
                <div className={classes.textFieldWindow}>
                    {/*<header>*/}
                    {/*    Գործընկերների ցանկ*/}
                    {/*</header>*/}
                    <MultiSelectUI
                        root={classes.multiSelect}
                        placeLabel={'Ավելացնել գործընկեր'}
                        withCheckBox={true}
                        variant={"outlined"}
                    />
                </div>
            </div>
        </div>
    )
};

export default EmployeesTab;