import React from 'react'
import classes from './addContent.module.css'
import ScrollableTabsButtonAuto from "../../../../../../../components/tabsUI/tabsUI";
import MainTab from "./content/mainTab/mainTab";
import ClassifiersTab from "./content/classifiersTab/classifiersTab";
import CodesTab from "./content/codesTab/codesTab";
import PricesTab from "./content/pricesTab/pricesTab";
import EmployeesTab from "./content/employeesTab/employeesTab";
import DescriptionTab from "./content/descriptionTab/descriptionTab";

const AddContent = props => {

    return (
        <>
            <div>
                <ScrollableTabsButtonAuto
                    selected={classes.selected}
                    root={classes.root}
                    tabPanelRoot={classes.tabPanelRoot}
                    indicator={classes.indicator}
                    tabs={props.modalTabs.am}
                    tabContent={[MainTab, ClassifiersTab, CodesTab, PricesTab, EmployeesTab, DescriptionTab]}
                />
            </div>
        </>
    )
};

export default AddContent