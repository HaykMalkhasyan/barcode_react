import React, {Component} from 'react'
import classes from './products.module.css'
import Header from "./header/header"
import Section from "./section/section";
import {connect} from "react-redux";
import {getAllGroup, getGroup, subCollapsed, subCollapsedGroup} from "../../../../../Redux/characteristics/actions";
import {closeClassifierWindow, setFiltersValue} from "../../../../../Redux/filtersContainer/actions";
import {
    closeProductActionModal,
    getAllProducts,
    selectProducts,
    setProductValues
} from "../../../../../Redux/products/actions";
import ProductModal from "../product/modals/productModal";

class Products extends Component{
    constructor(props) {
        super(props);
        this.props.getAllGroup();
        this.props.getAllProducts(1)
    }

    changeTabsHandler = (id) => {
        const activeTabs = [...this.props.activeTabs];

        if (id !== 1 && id !== 4) {
            if (activeTabs.indexOf(id) === -1) {
                activeTabs.push(id)
            } else {
                activeTabs.splice(activeTabs.indexOf(id), 1)
            }

            this.props.setFiltersValue('activeTabs', activeTabs)
        }
    };

    render() {

        return (
            <div className={classes.products}>
                <Header
                    tabs={this.props.tabs}
                    activeTabs={this.props.activeTabs}
                    products={this.props.products}
                    // Methods
                    onClick={this.changeTabsHandler}
                />
                <Section
                    groups={this.props.groups}
                    group={this.props.group}
                    customSubgroup={this.props.customSubgroup}
                    collapsed={this.props.collapsed}
                    collapsedGroup={this.props.collapsedGroup}
                    advancedSearchConfig={this.props.advancedSearchConfig}
                    selectedIndex={this.props.selectedIndex}
                    toggleClassifier={this.props.toggleClassifier}
                    activeTabs={this.props.activeTabs}
                    tabs={this.props.tabs}
                    count={this.props.count}
                    products={this.props.products}
                    types={this.props.types}
                    selected_products={this.props.selected_products}
                    // Methods
                    subCollapsed={this.props.subCollapsed}
                    subCollapsedGroup={this.props.subCollapsedGroup}
                    setFiltersValue={this.props.setFiltersValue}
                    getGroup={this.props.getGroup}
                    closeClassifierWindow={this.props.closeClassifierWindow}
                    getAllProducts={this.props.getAllProducts}
                    selectProducts={this.props.selectProducts}
                    setProductValues={this.props.setProductValues}
                />
                <ProductModal
                    type={this.props.open}
                    scroll={this.props.scroll}
                    open={this.props.open}
                    paper={classes.paper}
                    modalTabs={this.props.modalTabs}
                    // Methods
                    handleClose={
                        () => {
                            this.props.closeProductActionModal()
                        }
                    }
                />
            </div>
        )
    }
}

function mapStateToProps(state) {

    return {
        open: state.products.open,
        scroll: state.products.scroll,
        modalTabs: state.products.modalTabs,
        groups: state.characteristics.groups,
        group: state.characteristics.group,
        customSubgroup: state.characteristics.customSubgroup,
        collapsed: state.characteristics.collapsed,
        collapsedGroup: state.characteristics.collapsedGroup,
        count: state.products.count,
        products: state.products.products,
        types: state.products.types,
        selected_products: state.products.selected_products,
        advancedSearchConfig: state.products.advancedSearchConfig,
        selectedIndex: state.filters.selectedIndex,
        toggleClassifier: state.filters.toggleClassifier,
        tabs: state.filters.tabs,
        activeTabs: state.filters.activeTabs,
    }
}

function mapDispatchToProps(dispatch) {

    return {
        getAllGroup: () => dispatch(getAllGroup()),
        getAllProducts: page => dispatch(getAllProducts(page)),
        getGroup: id => dispatch(getGroup(id)),
        subCollapsedGroup: id => dispatch(subCollapsedGroup(id)),
        subCollapsed: id => dispatch(subCollapsed(id)),
        setFiltersValue: (name, value) => dispatch(setFiltersValue(name, value)),
        closeClassifierWindow: (index, id) => dispatch(closeClassifierWindow(index, id)),
        selectProducts: (id, type) => dispatch(selectProducts(id, type)),
        setProductValues: (name, value) => dispatch(setProductValues(name, value)),
        closeProductActionModal: () => dispatch(closeProductActionModal())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);