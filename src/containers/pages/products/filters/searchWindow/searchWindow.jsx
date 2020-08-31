import React from 'react'
import classes from '../filters/filters.module.css'
import CustomButton from "../../../../../components/UI/button/customButton/customButton"
import ProductModal from "../product/modals/productModal"
import {connect} from "react-redux"
import {closeProductActionModal, setProductValues} from "../../../../../Redux/products/actions"
import Icons from "../../../../../components/Icons/icons"
import CustomSearchWindow from "./customSearchWindow/customSearchWindow";
import AdvancedSearchWindow from "./advancedSearchWindow/advancedSearchWindow";
import {setGroupValues} from "../../../../../Redux/characteristics/actions";

const SearchWindow = props => {

    const toggleAddModalHandler = (name, value, scrollType) => {
        props.setProductValues(name, value);
        props.setProductValues('scroll', scrollType)
    };

    const collapseHandler = () => {
        props.setGroupValues('advancedSearch', !props.advancedSearch);
    };

    return (
        <div className={classes.searchWindow}>
            <div>
                {/* CUSTOM SEARCH */}
                <CustomSearchWindow/>
                {/* ADVANCED SEARCH */}
                <AdvancedSearchWindow
                    open={props.advancedSearch}
                    // Methods
                    collapse={collapseHandler}
                />
            </div>
            <div>
                <div className={classes.finishedButtons}>
                    <CustomButton
                        className={classes.addButton}
                        children={
                            <>
                                <Icons type={'plus'} className={classes.addBtnIcon}/>
                                <span>Ավելացնել</span>
                            </>
                        }
                        // Methods
                        onClick={
                            () => toggleAddModalHandler('open', 'add', 'body')
                        }
                    />
                    <CustomButton
                        className={classes.searchButton}
                        children={
                            <>
                                <Icons type={'search'} width={14.349} height={16.61} className={classes.searchBtnIcon}/>
                                <span>Փնտրել</span>
                            </>
                        }
                    />
                </div>
            </div>

            {/* Modals */}
            <ProductModal
                type={props.open}
                scroll={props.scroll}
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
        </div>
    )
};

function mapStateToProps(state) {

    return {
        open: state.products.open,
        scroll: state.products.scroll,
        modalTabs: state.products.modalTabs,
        advancedSearch: state.characteristics.advancedSearch,
    }
}

function mapDispatchToProps(dispatch) {

    return {
        setProductValues: (name, value) => dispatch(setProductValues(name, value)),
        closeProductActionModal: () => dispatch(closeProductActionModal()),
        setGroupValues: (name, value) => dispatch(setGroupValues(name, value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchWindow)