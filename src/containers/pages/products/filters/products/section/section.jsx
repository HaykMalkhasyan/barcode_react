import React from 'react';
import classes from './section.module.css';
import RightPanel from "./rightPanel/rightPanel";

const Section = props => {

    return (
        <div className={classes.flexContainer}>
            <RightPanel
                open={props.open}
                screen={props.screen}
                activeTabs={props.activeTabs}
                tabs={props.tabs}
                count={props.count}
                activePage={props.activePage}
                page_count={props.page_count}
                products={props.products}
                types={props.types}
                selected_products={props.selected_products}
                measurements={props.measurements}
                suppliers={props.suppliers}
                advancedSearchConfig={props.advancedSearchConfig}
                // Methods
                getAllProducts={props.getAllProducts}
                selectProducts={props.selectProducts}
                setProductValues={props.setProductValues}
                getProduct={props.getProduct}
                sortTableTabs={props.sortTableTabs}
                onClick={props.changeTabsHandler}
                toggleBackdrop={props.toggleBackdrop}
                unfaltering={props.unfaltering}
                backFiltersPage={props.backFiltersPage}
                toggleAddModal={props.toggleAddModal}
                productChange={props.productChange}
            />
        </div>
    )
};

export default Section;