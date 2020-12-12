import React from 'react'
import classes from '../filters.module.css'
import CustomButton from "../../../../../components/UI/button/customButton/custom-button"
import {connect} from "react-redux"
import {getAllProducts, setProductValues} from "../../../../../Redux/products/actions"
import AdvancedSearchWindow from "./advancedSearchWindow/advancedSearchWindow";
import {searchHandler, setGroupValues} from "../../../../../Redux/characteristics/actions";
import {setFiltersValue} from "../../../../../Redux/filtersContainer/actions";
import {withRouter} from "react-router-dom";

const SearchWindow = props => {

    const toggleAddModalHandler = (name, value, scrollType) => {
        props.setProductValues(name, value);
        props.setProductValues('scroll', scrollType)
    };

    const collapseHandler = () => {
        props.setGroupValues('advancedSearch', !props.advancedSearch);
    };

    const productsSearchHandler =  async () => {
        props.history.push("/products/search")
        if (Object.keys(props.advancedSearchConfig).length === 0) {
            await props.getAllProducts(1, {});
        } else {
            await props.getAllProducts(1, {...props.advancedSearchConfig});
        }
    };

    return (
        <div className={classes.searchWindow}>
            {/* ADVANCED SEARCH */}
            <AdvancedSearchWindow
                mainFilters={props.mainFilters}
                open={props.advancedSearch}
                // Methods
                collapse={collapseHandler}
            />
            <div className={classes.finishedButtons}>
                <CustomButton
                    className={classes.addButton}
                    children={'նոր ապրանք'}
                    // Methods
                    onClick={
                        () => toggleAddModalHandler('open', 'add', 'body')
                    }
                />
                <CustomButton
                    className={classes.searchButton}
                    children={'Փնտրել'}
                    // Methods
                    onClick={productsSearchHandler}
                />
            </div>
        </div>
    )
};

function mapStateToProps(state) {

    return {
        searchResult: state.characteristics.searchResult,
        classifiersCollapsed: state.characteristics.classifiersCollapsed,
        group: state.characteristics.group,
        customSubgroup: state.characteristics.customSubgroup,
        subgroupsOpen: state.products.subgroupsOpen,
        mainFilters: state.products.mainFilters,
        initialSub: state.products.initialSub,
        advancedSearch: state.characteristics.advancedSearch,
        advancedSearchConfig: state.products.advancedSearchConfig,

    }
}

function mapDispatchToProps(dispatch) {

    return {
        getAllProducts: (page, param) => dispatch(getAllProducts(page, param)),
        setProductValues: (name, value) => dispatch(setProductValues(name, value)),
        searchHandler: (name, value) => dispatch(searchHandler(name, value)),
        setGroupValues: (name, value) => dispatch(setGroupValues(name, value)),
        setFiltersValue: (name, value) => dispatch(setFiltersValue(name, value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchWindow))