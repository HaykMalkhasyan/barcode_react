import React from 'react';
import classes from './section.module.css';
import LeftPanel from "./leftPanel/leftPanel";
import RightPanel from "./rightPanel/rightPanel";
import CustomButton from "../../../../../../components/UI/button/customButton/customButton";
import Icons from "../../../../../../components/Icons/icons";
import TuneIcon from "@material-ui/icons/Tune";

const Section = props => {

    return (
        <div className={classes.flexContainer}>
            <div className={props.filterOpen ? `${classes.flexItemMd3} ${classes.filterOpen}` : classes.flexItemMd3}>
                <LeftPanel
                    groups={props.groups}
                    group={props.group}
                    customSubgroup={props.customSubgroup}
                    collapsed={props.collapsed}
                    collapsedGroup={props.collapsedGroup}
                    advancedSearchConfig={props.advancedSearchConfig}
                    selectedIndex={props.selectedIndex}
                    toggleClassifier={props.toggleClassifier}
                    measurementsFilters={props.measurementsFilters}
                    otherFilters={props.otherFilters}
                    // Methods
                    subCollapsed={props.subCollapsed}
                    subCollapsedGroup={props.subCollapsedGroup}
                    setFiltersValue={props.setFiltersValue}
                    getGroup={props.getGroup}
                    closeClassifierWindow={props.closeClassifierWindow}
                    setGroupValues={props.setGroupValues}
                    setProductValues={props.setProductValues}
                    getSubgroupWithGroupId={props.getSubgroupWithGroupId}
                    getAllGroup={props.getAllGroup}
                />
                <div className={classes.filtersAction}>
                    <CustomButton
                        className={classes.filtersButton}
                        children={<TuneIcon/>}
                        // Methods
                        onClick={props.toggleFilters}
                    />
                    <CustomButton
                        className={classes.filtersSaveButton}
                        children={<Icons type={'save'} className={classes.filtersSaveIcon}/>}
                    />
                </div>
            </div>
            <div className={classes.flexItemMd9}>
                <RightPanel
                    open={props.open}
                    activeTabs={props.activeTabs}
                    tabs={props.tabs}
                    count={props.count}
                    products={props.products}
                    types={props.types}
                    selected_products={props.selected_products}
                    measurements={props.measurements}
                    // Methods
                    getAllProducts={props.getAllProducts}
                    selectProducts={props.selectProducts}
                    setProductValues={props.setProductValues}
                    getProduct={props.getProduct}
                    sortTableTabs={props.sortTableTabs}
                    onClick={props.changeTabsHandler}
                    toggleBackdrop={props.toggleBackdrop}
                />
            </div>
        </div>
    )
};

export default Section;