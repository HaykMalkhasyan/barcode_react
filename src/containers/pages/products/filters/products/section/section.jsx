import React from 'react'
import Grid from "@material-ui/core/Grid";
import LeftPanel from "./leftPanel/leftPanel";
import RightPanel from "./rightPanel/rightPanel";

const Section = props => {

    return (
        <Grid container spacing={0}>
            <Grid item lg={2}>
                <LeftPanel
                    groups={props.groups}
                    group={props.group}
                    customSubgroup={props.customSubgroup}
                    collapsed={props.collapsed}
                    collapsedGroup={props.collapsedGroup}
                    advancedSearchConfig={props.advancedSearchConfig}
                    selectedIndex={props.selectedIndex}
                    toggleClassifier={props.toggleClassifier}
                    // Methods
                    subCollapsed={props.subCollapsed}
                    subCollapsedGroup={props.subCollapsedGroup}
                    setFiltersValue={props.setFiltersValue}
                    getGroup={props.getGroup}
                    closeClassifierWindow={props.closeClassifierWindow}
                />
            </Grid>
            <Grid item lg={10}>
                <RightPanel
                    activeTabs={props.activeTabs}
                    tabs={props.tabs}
                    count={props.count}
                    products={props.products}
                    types={props.types}
                    selected_products={props.selected_products}
                    // Methods
                    getAllProducts={props.getAllProducts}
                    selectProducts={props.selectProducts}
                    setProductValues={props.setProductValues}
                />
            </Grid>
        </Grid>
    )
};

export default Section;