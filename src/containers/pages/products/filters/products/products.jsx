import React, {Component} from 'react'
import classes from './products.module.css'
import Section from "./section/section";
import {connect} from "react-redux";
import {backFiltersPage, setFiltersValue, sortTableTabs} from "../../../../../Redux/filtersContainer/actions";
import {getAllProducts, getProduct, selectProducts, setProductValues} from "../../../../../Redux/products/actions";
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
                    activeTabs={this.props.activeTabs}
                    tabs={this.props.tabs}
                    count={this.props.count}
                    products={this.props.products}
                    types={this.props.types}
                    selected_products={this.props.selected_products}
                    measurements={this.props.measurements}
                    // Methods
                    getAllProducts={this.props.getAllProducts}
                    selectProducts={this.props.selectProducts}
                    setProductValues={this.props.setProductValues}
                    getProduct={this.props.getProduct}
                    sortTableTabs={this.props.sortTableTabs}
                    changeTabsHandler={this.changeTabsHandler}
                    toggleBackdrop={this.toggleBackdrop}
                    toggleFilters={this.toggleFilters}
                    backFiltersPage={this.props.backFiltersPage}
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
        count: state.products.count,
        products: state.products.products,
        types: state.products.types,
        measurements: state.products.measurements,
        productLoadingStatus: state.products.productLoadingStatus,
        selected_products: state.products.selected_products,
        tabs: state.filters.tabs,
        activeTabs: state.filters.activeTabs,
    }
}

function mapDispatchToProps(dispatch) {

    return {
        getAllProducts: page => dispatch(getAllProducts(page)),
        setFiltersValue: (name, value) => dispatch(setFiltersValue(name, value)),
        selectProducts: (id, type) => dispatch(selectProducts(id, type)),
        setProductValues: (name, value) => dispatch(setProductValues(name, value)),
        getProduct: id => dispatch(getProduct(id)),
        sortTableTabs: (in_index, out_index) => dispatch(sortTableTabs(in_index, out_index)),
        backFiltersPage: () => dispatch(backFiltersPage()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);