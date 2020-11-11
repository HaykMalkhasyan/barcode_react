import React from 'react';
import classes from './section.module.css';
import RightPanel from "./rightPanel/rightPanel";

const Section = props => {

    return (
        <div className={classes.flexContainer}>
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
    )
};

export default Section;