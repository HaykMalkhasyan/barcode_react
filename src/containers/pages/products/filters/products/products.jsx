import React, {Component} from 'react'
import classes from './products.module.css'
import Section from "./section/section";
import {connect} from "react-redux";
import {setFiltersValue, sortTableTabs} from "../../../../../Redux/filtersContainer/actions";
import {
    getAllProducts,
    getProduct, productChange,
    selectProducts,
    setProductValues, toggleAddModal,
    unfaltering
} from "../../../../../Redux/products/actions";
import Backdrop from "../../../../../components/UI/backdrop/backdrop";
import CustomButton from "../../../../../components/UI/button/customButton/custom-button";
import TuneIcon from '@material-ui/icons/Tune';
import {getSuppliers} from "../../../../../Redux/suppliers/action";
import {withRouter} from "react-router-dom";

class Products extends Component{
    constructor(props) {
        super(props);
        this.state = {
            open : false,
            filter_open: false
        };
        this.props.getAllProducts(1, {...props.advancedSearchConfig})
        props.getSuppliers()
    }

    toggleBackdrop = anchor => {
        this.setState({
            open: anchor
        })
    };

    changeTabsHandler = (item) => {
        const activeTabs = [...this.props.activeTabs];

        if (item !== "item_name" && item !== "id") {
            if (activeTabs.indexOf(item) === -1) {
                activeTabs.push(item)
            } else {
                activeTabs.splice(activeTabs.indexOf(item), 1)
            }
            localStorage.setItem('activeTabs', JSON.stringify(activeTabs));
            this.props.setFiltersValue('activeTabs', activeTabs)
        }
    };

    toggleFilters = () => {
        this.setState({filter_open: !this.state.filter_open})
    };

    backFiltersPage = () => {
        this.props.history.push("/products/filters")
    }

    render() {

        return (
            <div className={classes.products}>
                {
                    this.state.open ?
                        <Backdrop
                            className={classes.backDrop}
                            // Methods
                            onClick={() => this.setState({open: false})}
                        />
                        :
                        null
                }
                <Section
                    filterOpen={this.state.filter_open}
                    open={this.state.open}
                    screen={this.props.screen}
                    activeTabs={this.props.activeTabs}
                    tabs={this.props.tabs}
                    count={this.props.count}
                    activePage={this.props.activePage}
                    page_count={this.props.page_count}
                    products={this.props.products}
                    types={this.props.types}
                    selected_products={this.props.selected_products}
                    measurements={this.props.measurements}
                    suppliers={this.props.suppliers}
                    advancedSearchConfig={this.props.advancedSearchConfig}
                    // Methods
                    backFiltersPage={this.backFiltersPage}
                    changeTabsHandler={this.changeTabsHandler}
                    toggleBackdrop={this.toggleBackdrop}
                    toggleFilters={this.toggleFilters}
                    getAllProducts={this.props.getAllProducts}
                    selectProducts={this.props.selectProducts}
                    setProductValues={this.props.setProductValues}
                    getProduct={this.props.getProduct}
                    sortTableTabs={this.props.sortTableTabs}
                    unfaltering={this.props.unfaltering}
                    toggleAddModal={this.props.toggleAddModal}
                    productChange={this.props.productChange}
                />
                <CustomButton
                    className={classes.filtersButton}
                    children={<TuneIcon/>}
                    // Methods
                    onClick={this.toggleFilters}
                />
            </div>
        )
    }
}

function mapStateToProps(state) {

    return {
        screen: state.products.screen,
        count: state.products.count,
        activePage: state.products.activePage,
        page_count: state.products.page_count,
        products: state.products.products,
        types: state.products.types,
        measurements: state.products.measurements,
        selected_products: state.products.selected_products,
        tabs: state.filters.tabs,
        activeTabs: state.filters.activeTabs,
        suppliers: state.suppliers.suppliers,
        advancedSearchConfig: state.products.advancedSearchConfig,
    }
}

function mapDispatchToProps(dispatch) {

    return {
        getAllProducts: (page, param) => dispatch(getAllProducts(page, param)),
        setFiltersValue: (name, value) => dispatch(setFiltersValue(name, value)),
        selectProducts: (id, type) => dispatch(selectProducts(id, type)),
        setProductValues: (name, value) => dispatch(setProductValues(name, value)),
        getProduct: id => dispatch(getProduct(id)),
        sortTableTabs: (in_index, out_index) => dispatch(sortTableTabs(in_index, out_index)),
        getSuppliers: () => dispatch(getSuppliers()),
        unfaltering: () => dispatch(unfaltering()),
        toggleAddModal: (name, value, scrollType) => dispatch(toggleAddModal(name, value, scrollType)),
        productChange: (progressStatus, selectedProducts, activePage) => dispatch(productChange(progressStatus, selectedProducts, activePage)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Products));