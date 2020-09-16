import React from 'react'
import classes from './pricesTab.module.css'
import CustomSelect from "../../../../../../../../../components/UI/input/customSelect/customSelect";
import {connect} from "react-redux";
import {setPriceValue} from "../../../../../../../../../Redux/price/actions";

const PricesTab = props => {

    const toggleFocus = name => {
        if (props.focus === props.open) {
            props.setPriceValue('focus', null)
        } else {
            props.setPriceValue('focus', name)
        }
    };

    const toggle = name => {
        props.setPriceValue('open', name)
    };

    return (
        <div className={classes.pricesTab}>
            <div className={classes.content}>
                <p className={classes.information}>
                    Այս բաժնում կարող եք փոփոխել ապրանքի գները և տեսնել գների պատմությունը։
                </p>
                <div className={classes.filters}>
                    <div>
                        <CustomSelect
                            open={props.open}
                            focus={props.focus}
                            name={'warehouse'}
                            inputLabel={'Պահեստ'}
                            // Methods
                            toggleFocus={toggleFocus}
                            toggle={toggle}
                        />
                    </div>
                    <div>
                        <CustomSelect
                            open={props.open}
                            focus={props.focus}
                            name={'price_type'}
                            inputLabel={'Գնի տեսակ'}
                            // Methods
                            toggleFocus={toggleFocus}
                            toggle={toggle}
                        />
                    </div>
                </div>
                <div className={classes.priceContent}>
                    <section>
                        <div className={classes.gridContainer}>
                            <div className={`${classes.secondItem} ${classes.mobileSecondItem}`}>
                                <div className={`${classes.contentItem} ${classes.noBorder}`}>
                                    <div style={{height: 27}} className={classes.mainGrid}/>
                                    <ul className={classes.paramList}>
                                        <li>Մատակարարի գին</li>
                                        <li>Առքի գին</li>
                                        <li>Վաճառքի գին</li>
                                        <li>Մեծածախ</li>
                                        <li>Մեծածախ 2</li>
                                    </ul>
                                </div>
                            </div>
                            <div className={classes.warehouseContent}>
                                <div className={classes.secondItem}>
                                    <div className={classes.contentItem}>
                                        <div className={classes.mainGrid}>Պահեստ</div>
                                        <ul className={classes.warehouseList}>
                                            <li>
                                                <span className={classes.active}>486060930</span>
                                            </li>
                                            <li>
                                                <span>486060930</span>
                                            </li>
                                            <li>
                                                <span>486060930</span>
                                            </li>
                                            <li>
                                                <span>486060930</span>
                                            </li>
                                            <li>
                                                <span>486060930</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className={classes.secondItem}>
                                    <div className={classes.contentItem}>
                                        <div className={classes.mainGrid}>Պահեստ</div>
                                        <ul className={classes.warehouseList}>
                                            <li>
                                                <span>486060930</span>
                                            </li>
                                            <li>
                                                <span>486060930</span>
                                            </li>
                                            <li>
                                                <span>486060930</span>
                                            </li>
                                            <li>
                                                <span>486060930</span>
                                            </li>
                                            <li>
                                                <span>486060930</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className={classes.secondItem}>
                                    <div className={classes.contentItem}>
                                        <div className={classes.mainGrid}>Պահեստ</div>
                                        <ul className={classes.warehouseList}>
                                            <li>
                                                <span>486060930</span>
                                            </li>
                                            <li>
                                                <span>486060930</span>
                                            </li>
                                            <li>
                                                <span>486060930</span>
                                            </li>
                                            <li>
                                                <span>486060930</span>
                                            </li>
                                            <li>
                                                <span>486060930</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className={classes.secondItem}>
                                    <div className={classes.contentItem}>
                                        <div className={classes.mainGrid}>Պահեստ</div>
                                        <ul className={classes.warehouseList}>
                                            <li>
                                                <span>486060930</span>
                                            </li>
                                            <li>
                                                <span>486060930</span>
                                            </li>
                                            <li>
                                                <span>486060930</span>
                                            </li>
                                            <li>
                                                <span>486060930</span>
                                            </li>
                                            <li>
                                                <span>486060930</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className={classes.secondItem}>
                                    <div className={classes.contentItem}>
                                        <div className={classes.mainGrid}>Պահեստ</div>
                                        <ul className={classes.warehouseList}>
                                            <li>
                                                <span>486060930</span>
                                            </li>
                                            <li>
                                                <span>486060930</span>
                                            </li>
                                            <li>
                                                <span>486060930</span>
                                            </li>
                                            <li>
                                                <span>486060930</span>
                                            </li>
                                            <li>
                                                <span>486060930</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
};

function mapStateToProps(state) {

    return {
        open: state.price.open,
        focus: state.price.focus,
    }
}

function mapDispatchToProps(dispatch) {

    return {
        setPriceValue: (name, value) => dispatch(setPriceValue(name, value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PricesTab);