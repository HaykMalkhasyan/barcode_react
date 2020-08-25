import React from 'react'
import classes from '../filters/filters.module.css'
import CustomInput from "../../../../../components/UI/input/customInput/customInput"
import CustomButton from "../../../../../components/UI/button/customButton/customButton"
import ProductModal from "../product/modals/productModal";
import {connect} from "react-redux";
import {closeProductActionModal, setProductValues} from "../../../../../Redux/products/actions";
import Icons from "../../../../../components/Icons/icons";

const SearchWindow = props => {

    const toggleAddModalHandler = (name, value, scrollType) => {
        props.setProductValues(name, value);
        props.setProductValues('scroll', scrollType)
    };

    return (
        <div className={classes.searchWindow}>
            <div>
                <span className={classes.forWhat}>Այստեղ կարող եք փնտրել, ավելացնել և խմբագրել գոյություն ունեցող ապրանքատեսականին</span>
                <img src={process.env.PUBLIC_URL + '/images/674561.png'} className={classes.searchImage}
                     alt='search-logotype'/>
                <div className={classes.searchBorder}>
                    <div className={classes.searchSpanIcon}>
                        <Icons type={'search'}/>
                    </div>
                    <CustomInput
                        classNameInput={classes.searchInput}
                        type={'text'}
                    />
                    <div className={classes.searchSpecific}>
                        <CustomButton
                            className={classes.specBtn}
                            children={
                                <Icons type={'text'}/>
                            }
                        />
                        <CustomButton
                            className={classes.specBtn}
                            children={
                                <Icons type={'barcode'}/>
                            }
                        />
                        <CustomButton
                            className={classes.specBtn}
                            children={
                                <Icons type={'code'}/>
                            }
                        />
                    </div>
                </div>
                <div className={classes.searchCollapseWindow}>
                    <div className={classes.searchCollapseWindowHeader}>
                        <CustomButton
                            className={classes.advancedSearchBtn}
                            children={
                                <>
                                    <svg width={11.275} height={6.039} viewBox="0 0 11.275 6.039">
                                        <path
                                            d="M27.591,993.328a.6.6,0,0,0,.332-.163l5.011-4.81a.6.6,0,1,0-.827-.871l-4.6,4.416-4.6-4.416a.6.6,0,1,0-.827.871l5.011,4.81A.6.6,0,0,0,27.591,993.328Z"
                                            transform="translate(-21.872 -987.294)"
                                        />
                                    </svg>
                                    <span>Ընդլայնված որոնում</span>
                                </>
                            }
                        />
                    </div>
                </div>
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
        modalTabs: state.products.modalTabs
    }
}

function mapDispatchToProps(dispatch) {

    return {
        setProductValues: (name, value) => dispatch(setProductValues(name, value)),
        closeProductActionModal: () => dispatch(closeProductActionModal())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchWindow)