import React from 'react'
import classes from './pricesTab.module.css'
import SelectUI from "../../../../../../../../../components/UI/input/selectUI/selectUI";

const PricesTab = props => {

    return (
        <div className={classes.pricesTab}>
            <div className={classes.header}>
                <h3>Գներ</h3>
            </div>
            <div className={classes.content}>
                <p className={classes.information}>
                    Այս բաժնում կարող եք փոփոխել ապրանքի գները և տեսնել գների պատմությունը։
                </p>
                <div className={classes.filters}>
                    <div className={classes.filtersName}>
                        <span>Ֆիլտրել</span>
                    </div>
                    <div>
                        <SelectUI
                            labelId={'warehouseLabel'}
                            id={'warehouse'}
                            label={'Պահեստ'}
                            root={classes.selectRoot}
                            formControl={classes.formControl}
                        />
                    </div>
                    <div>
                        <SelectUI
                            labelId={'price-type-label'}
                            id={'price-type'}
                            label={'Գնի տեսակ'}
                            root={classes.selectRoot}
                            formControl={classes.formControl}
                        />
                    </div>
                </div>
                <div className={classes.priceContent}>
                    <section>
                        <div className={classes.gridContainer}>
                            <div className={classes.secondItem}>
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

export default PricesTab;