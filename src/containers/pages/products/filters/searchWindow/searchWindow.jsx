import React from 'react'
import classes from '../filters/filters.module.css'
import CustomButton from "../../../../../components/UI/button/customButton/customButton"
import ProductModal from "../product/modals/productModal"
import {connect} from "react-redux"
import {
    backToProduct,
    closeProductActionModal,
    closeProductAndSubgroupModals,
    selectSubs,
    setProductValues
} from "../../../../../Redux/products/actions"
import CustomSearchWindow from "./customSearchWindow/customSearchWindow";
import AdvancedSearchWindow from "./advancedSearchWindow/advancedSearchWindow";
import {searchHandler, setGroupValues} from "../../../../../Redux/characteristics/actions";
import ModalUI from "../../../../../components/modalUI/modalUI";
import SubgroupsTreeModal from "../product/modals/subgroupsTreeModal/subgroupsTreeModal";
import {setFiltersValue} from "../../../../../Redux/filtersContainer/actions";

const SearchWindow = props => {

    const toggleAddModalHandler = (name, value, scrollType) => {
        props.setProductValues(name, value);
        props.setProductValues('scroll', scrollType)
    };

    const collapseHandler = () => {
        props.setGroupValues('advancedSearch', !props.advancedSearch);
    };

    const productsSearchHandler = () => {
        if (Object.keys(props.advancedSearchConfig).length === 1 && props.advancedSearchConfig.classifiers === null) {
            props.setFiltersValue('type', 'products')
        }
    };

    return (
        <div className={classes.searchWindow}>
            {/* CUSTOM SEARCH */}
            <div className={classes.desktopSearch}>
                <CustomSearchWindow/>
            </div>
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
            {/* Modals */}
            <ProductModal
                root={classes.root}
                scroll={props.scrollB}
                open={props.open}
                paper={classes.paper}
                modalTabs={props.modalTabs}
                // Methods
                handleClose={
                    () => {
                        props.closeProductActionModal()
                    }
                }
            />
            <ModalUI
                open={props.subgroupsOpen}
                className={classes.subgroupsModal}
            >
                <SubgroupsTreeModal
                    group={props.group}
                    customSubgroup={props.customSubgroup}
                    collapsed={props.classifiersCollapsed}
                    searchResult={props.searchResult}
                    initialSub={props.initialSub}
                    // Methods
                    searchHandler={props.searchHandler}
                    subCollapsed={props.subCollapsed}
                    onBack={props.backToProduct}
                    onClose={props.closeProductAndSubgroupModals}
                    select={props.setProductValues}
                    onClick={props.selectSubs}
                />
            </ModalUI>
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
        open: state.products.open,
        mainFilters: state.products.mainFilters,
        initialSub: state.products.initialSub,
        scrollB: state.products.scrollB,
        modalTabs: state.products.modalTabs,
        advancedSearch: state.characteristics.advancedSearch,
        advancedSearchConfig: state.products.advancedSearchConfig,
    }
}

function mapDispatchToProps(dispatch) {

    return {
        setProductValues: (name, value) => dispatch(setProductValues(name, value)),
        closeProductActionModal: () => dispatch(closeProductActionModal()),
        searchHandler: (name, value) => dispatch(searchHandler(name, value)),
        setGroupValues: (name, value) => dispatch(setGroupValues(name, value)),
        setFiltersValue: (name, value) => dispatch(setFiltersValue(name, value)),
        backToProduct: () => dispatch(backToProduct()),
        closeProductAndSubgroupModals: () => dispatch(closeProductAndSubgroupModals()),
        selectSubs: () => dispatch(selectSubs()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchWindow)