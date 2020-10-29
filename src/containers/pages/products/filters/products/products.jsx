import React, {Component} from 'react'
import classes from './products.module.css'
import Section from "./section/section";
import {connect} from "react-redux";
import {
    getActionById,
    getAllGroup,
    getSubgroupWithGroupId,
    setGroupValues
} from "../../../../../Redux/characteristics/actions";
import {closeClassifierWindow, setFiltersValue, sortTableTabs} from "../../../../../Redux/filtersContainer/actions";
import {
    closeProductActionModal,
    getAllProducts,
    getProduct,
    selectProducts,
    setProductValues
} from "../../../../../Redux/products/actions";
import ProductModal from "../product/modals/productModal";
import LinearSpinner from "../../../../../components/UI/spinners/linearSpiner/linearSpinner";
import Backdrop from "../../../../../components/UI/backdrop/backdrop";
import CustomButton from "../../../../../components/UI/button/customButton/customButton";
import TuneIcon from '@material-ui/icons/Tune';

class Products extends Component{
    constructor(props) {
        super(props);
        this.state = {
            open : false,
            filter_open: false
        };
        this.props.getAllGroup();
        this.props.getAllProducts(1)
    }

    toggleBackdrop = anchor => {
        this.setState({
            open: anchor
        })
    };

    changeTabsHandler = (id) => {
        const activeTabs = [...this.props.activeTabs];

        if (id !== 1 && id !== 4) {
            if (activeTabs.indexOf(id) === -1) {
                activeTabs.push(id)
            } else {
                activeTabs.splice(activeTabs.indexOf(id), 1)
            }
            localStorage.setItem('activeTabs', JSON.stringify(activeTabs));
            this.props.setFiltersValue('activeTabs', activeTabs)
        }
    };

    toggleFilters = () => {
        this.setState({filter_open: !this.state.filter_open})
    };

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
                {
                    this.props.productLoadingStatus ?
                        <LinearSpinner
                            progres={classes.progress}
                            barColorPrimary={classes.barColorPrimary}
                            progresBgColor={classes.progressBgColor}
                        />
                        :
                        null
                }
                <Section
                    filterOpen={this.state.filter_open}
                    open={this.state.open}
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
                    measurements={this.props.measurements}
                    measurementsFilters={this.props.measurementsFilters}
                    otherFilters={this.props.otherFilters}
                    // Methods
                    subCollapsed={this.props.subCollapsed}
                    subCollapsedGroup={this.props.subCollapsedGroup}
                    setFiltersValue={this.props.setFiltersValue}
                    getActionById={this.props.getActionById}
                    closeClassifierWindow={this.props.closeClassifierWindow}
                    getAllProducts={this.props.getAllProducts}
                    selectProducts={this.props.selectProducts}
                    setProductValues={this.props.setProductValues}
                    getProduct={this.props.getProduct}
                    sortTableTabs={this.props.sortTableTabs}
                    setGroupValues={this.props.setGroupValues}
                    getSubgroupWithGroupId={this.props.getSubgroupWithGroupId}
                    getAllGroup={this.props.getAllGroup}
                    changeTabsHandler={this.changeTabsHandler}
                    toggleBackdrop={this.toggleBackdrop}
                    toggleFilters={this.toggleFilters}
                />
                <ProductModal
                    root={classes.root}
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
        measurements: state.products.measurements,
        productLoadingStatus: state.products.productLoadingStatus,
        selected_products: state.products.selected_products,
        advancedSearchConfig: state.products.advancedSearchConfig,
        selectedIndex: state.filters.selectedIndex,
        toggleClassifier: state.filters.toggleClassifier,
        tabs: state.filters.tabs,
        activeTabs: state.filters.activeTabs,
        measurementsFilters: state.products.measurementsFilters,
        otherFilters: state.products.otherFilters,
    }
}

function mapDispatchToProps(dispatch) {

    return {
        getAllGroup: () => dispatch(getAllGroup()),
        getAllProducts: page => dispatch(getAllProducts(page)),
        getActionById: (requestType, memory, param, id) => dispatch(getActionById(requestType, memory, param, id)),
        setFiltersValue: (name, value) => dispatch(setFiltersValue(name, value)),
        closeClassifierWindow: (index, id) => dispatch(closeClassifierWindow(index, id)),
        selectProducts: (id, type) => dispatch(selectProducts(id, type)),
        setProductValues: (name, value) => dispatch(setProductValues(name, value)),
        closeProductActionModal: () => dispatch(closeProductActionModal()),
        getProduct: id => dispatch(getProduct(id)),
        sortTableTabs: (in_index, out_index) => dispatch(sortTableTabs(in_index, out_index)),

        setGroupValues: (name, value) => dispatch(setGroupValues(name, value)),
        getSubgroupWithGroupId: id => dispatch(getSubgroupWithGroupId(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);