import React from 'react'
import classes from '../filters.module.css'
import CustomInput from "../../../../../components/UI/input/customInput/customInput"
import CustomButton from "../../../../../components/UI/button/customButton/customButton"
import ProductModal from "../product/modals/productModal";
import {connect} from "react-redux";
import {setProductValues} from "../../../../../Redux/products/actions";
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
                                <svg width={20} height={13} viewBox="0 0 20.634 13.084">
                                    <defs>
                                        <style>{".text{fill:none;stroke:#000;stroke-width:0.5px;}"}</style>
                                    </defs>
                                    <g transform="translate(0.25 0.25)">
                                        <g transform="translate(0 0)">
                                            <path
                                                className="text"
                                                d="M14.067,9H5.258A1.259,1.259,0,0,0,4,10.258v1.888a1.258,1.258,0,1,0,2.517,0v-.629H8.4v7.55H7.775a1.258,1.258,0,0,0,0,2.517H11.55a1.258,1.258,0,0,0,0-2.517h-.629v-7.55h1.888v.629a1.258,1.258,0,1,0,2.517,0V10.258A1.259,1.259,0,0,0,14.067,9Z"
                                                transform="translate(-4 -9)"
                                            />
                                        </g>
                                        <g transform="translate(13.842 0)">
                                            <path
                                                className="text"
                                                d="M20.033,11.517H16.258a1.258,1.258,0,0,1,0-2.517h3.775a1.258,1.258,0,0,1,0,2.517Z"
                                                transform="translate(-15 -9)"
                                            />
                                        </g>
                                        <g transform="translate(13.842 5.033)">
                                            <path
                                                className="text"
                                                d="M20.033,15.517H16.258a1.258,1.258,0,0,1,0-2.517h3.775a1.258,1.258,0,0,1,0,2.517Z"
                                                transform="translate(-15 -13)"
                                            />
                                        </g>
                                        <g transform="translate(13.842 10.067)">
                                            <path
                                                className="text"
                                                d="M20.033,19.517H16.258a1.258,1.258,0,0,1,0-2.517h3.775a1.258,1.258,0,0,1,0,2.517Z"
                                                transform="translate(-15 -17)"
                                            />
                                        </g>
                                    </g>
                                </svg>
                            }
                        />
                        <CustomButton
                            className={classes.specBtn}
                            children={
                                <svg width={20} height={13} viewBox="0 0 19.005 13.084">
                                    <defs>
                                        <style>{".barcode{fill:none;stroke:#757575;stroke-width:0.5px;}"}</style>
                                    </defs>
                                    <g transform="translate(0.25 0.25)">
                                        <g transform="translate(0 0)">
                                            <path
                                                className="barcode"
                                                d="M21.3,17.7a.607.607,0,0,0-.6.6V29.68a.6.6,0,0,0,1.208,0V18.3A.607.607,0,0,0,21.3,17.7Z"
                                                transform="translate(-17.155 -17.7)"
                                            />
                                            <path
                                                className="barcode"
                                                d="M36.754,17.7h-1.87a.586.586,0,0,0-.584.584V29.7a.586.586,0,0,0,.584.584h1.87a.586.586,0,0,0,.584-.584V18.284A.574.574,0,0,0,36.754,17.7Z"
                                                transform="translate(-28.106 -17.7)"
                                            />
                                            <path
                                                className="barcode"
                                                d="M57.9,17.7a.607.607,0,0,0-.6.6V29.68a.6.6,0,0,0,1.208,0V18.3A.6.6,0,0,0,57.9,17.7Z"
                                                transform="translate(-46.625 -17.7)"
                                            />
                                            <path
                                                className="barcode"
                                                d="M71.6,17.7a.607.607,0,0,0-.6.6V29.68a.6.6,0,0,0,1.208,0V18.3A.607.607,0,0,0,71.6,17.7Z"
                                                transform="translate(-57.657 -17.7)"
                                            />
                                            <path
                                                className="barcode"
                                                d="M86.528,17.7H85.184a.586.586,0,0,0-.584.584V29.7a.586.586,0,0,0,.584.584h1.344a.586.586,0,0,0,.584-.584V18.284A.574.574,0,0,0,86.528,17.7Z"
                                                transform="translate(-68.608 -17.7)"
                                            />
                                            <path
                                                className="barcode"
                                                d="M4.019,17.7H3.084a.586.586,0,0,0-.584.584V29.7a.586.586,0,0,0,.584.584h.935A.586.586,0,0,0,4.6,29.7V18.284A.586.586,0,0,0,4.019,17.7Z"
                                                transform="translate(-2.5 -17.7)"
                                            />
                                        </g>
                                    </g>
                                </svg>
                            }
                        />
                        <CustomButton
                            className={classes.specBtn}
                            children={
                                <svg width={20} height={13} viewBox="0 0 15.158 13.087">
                                    <defs>
                                        <style>{".code{fill:none;stroke:#757575;stroke-width:0.5px;}"}</style>
                                    </defs>
                                    <g transform="translate(0.33 0.253)">
                                        <g transform="translate(0 0)">
                                            <path
                                                className="code"
                                                d="M57.221,58.578a1.069,1.069,0,0,1-.755-1.825l1.581-1.584-1.581-1.584a1.069,1.069,0,1,1,1.512-1.512l2.339,2.34a1.069,1.069,0,0,1,0,1.512l-2.339,2.34A1.064,1.064,0,0,1,57.221,58.578Z"
                                                transform="translate(-46.053 -48.547)"
                                            />
                                            <path
                                                className="code"
                                                d="M38.3,58.584a1.072,1.072,0,0,1-.757-.313l-2.339-2.344a1.07,1.07,0,0,1,0-1.51l2.339-2.337a1.069,1.069,0,0,1,1.512,1.512l-1.584,1.581,1.584,1.587a1.069,1.069,0,0,1-.757,1.825Z"
                                                transform="translate(-34.895 -48.551)"
                                            />
                                            <path
                                                className="code"
                                                d="M46.191,57.583a1.067,1.067,0,0,1-1.035-1.337L47.878,45.8a1.069,1.069,0,1,1,2.068.539L47.224,56.782A1.07,1.07,0,0,1,46.191,57.583Z"
                                                transform="translate(-40.262 -44.999)"
                                            />
                                        </g>
                                    </g>
                                </svg>
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
                                <svg width={12.997} height={12.997} viewBox="0 0 12.997 12.997">
                                    <g transform="translate(12.497 0.5) rotate(90)">
                                        <g transform="translate(0 5.759)">
                                            <g transform="translate(0 0)">
                                                <path
                                                    className={classes.addBtnIcon}
                                                    d="M.261.479A.251.251,0,0,1,0,.24.251.251,0,0,1,.261,0H11.736A.251.251,0,0,1,12,.24a.251.251,0,0,1-.261.24Z"
                                                    transform="translate(0 0)"
                                                />
                                            </g>
                                        </g>
                                        <g transform="translate(6.238 0) rotate(90)">
                                            <g transform="translate(0)">
                                                <path
                                                    className={classes.addBtnIcon}
                                                    d="M.261.479A.251.251,0,0,1,0,.24.251.251,0,0,1,.261,0H11.736A.251.251,0,0,1,12,.24a.251.251,0,0,1-.261.24Z"
                                                />
                                            </g>
                                        </g>
                                    </g>
                                </svg>
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
                                <svg width={14.349} height={16.61} viewBox="0 0 14.349 16.61">
                                    <path
                                        className={classes.searchBtnIcon}
                                        d="M260.887,202.2a5.857,5.857,0,1,0-5.857-5.857A5.863,5.863,0,0,0,260.887,202.2Zm0-10.905a5.048,5.048,0,1,1-5.048,5.048A5.054,5.054,0,0,1,260.887,191.3Z"
                                        transform="translate(-255.03 -190.488)"
                                    />
                                    <rect
                                        className={classes.searchBtnIcon}
                                        width={0.808}
                                        height={1.82}
                                        transform="translate(10.733 11.472) rotate(142.971)"
                                    />
                                    <path
                                        className={classes.searchBtnIcon}
                                        d="M219.571,360.132a1.01,1.01,0,0,0,.806-1.618l-2.67-3.541a1.01,1.01,0,0,0-1.613,1.216l2.67,3.541A1.009,1.009,0,0,0,219.571,360.132Z"
                                        transform="translate(-206.232 -343.522)"
                                    />
                                </svg>
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
                        props.setProductValues('open', false)
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
        setProductValues: (name, value) => dispatch(setProductValues(name, value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchWindow)