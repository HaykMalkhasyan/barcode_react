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
                    TabScrollRoot={classes.TabScrollRoot}
                    scrollButtonsDesktop={classes.scrollButtonsDesktop}
                    root={classes.root}
                    tabPanelRoot={classes.tabPanelRoot}
                    indicator={classes.indicator}
                    tabs={props.modalTabs.am}
                    gallery={props.gallery}
                    imageData={props.imageData}
                    type={props.type}
                    activeTab={props.activeTab}
                    tabContent={[MainTab, ClassifiersTab, CodesTab, PricesTab, EmployeesTab, DescriptionTab]}
                    // Methods
                    addPhotoHandler={props.addPhotoHandler}
                    setTabValue={props.setTabValue}
                    deleteImageHandler={props.deleteImageHandler}
                    deleteUploadImagesHandler={props.deleteUploadImagesHandler}
                />
            </div>
        </>
    )
};

export default AddContent