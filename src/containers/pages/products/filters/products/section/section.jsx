import React from 'react'
import Grid from "@material-ui/core/Grid";
import LeftPanel from "./leftPanel/leftPanel";
import RightPanel from "./rightPanel/rightPanel";

const Section = props => {

    return (
        <Grid container spacing={0}>
            <Grid item lg={3}>
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
            </Grid>
            <Grid item lg={9}>
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
            </Grid>
        </Grid>
    )
};

export default Section;