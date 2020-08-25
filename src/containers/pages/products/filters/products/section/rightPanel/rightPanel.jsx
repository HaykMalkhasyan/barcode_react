import React from 'react'
import classes from './rightPanel.module.css'
import ProductTable from "./productTable/productTable"
import Pagination from "@material-ui/lab/Pagination"
import PaginationItem from "@material-ui/lab/PaginationItem";
import CustomButton from "../../../../../../../components/UI/button/customButton/customButton";
import Icons from "../../../../../../../components/Icons/icons";

const RightPanel = props => {

    const changeHandler = (event, page) => {
        props.setProductValues('productLoadingStatus', true);
        props.setProductValues('selected_products', []);
        props.getAllProducts(page)
    };

    const toggleAddModalHandler = (name, value, scrollType) => {
        props.setProductValues(name, value);
        props.setProductValues('scroll', scrollType)
    };

    return (
        <div className={classes.rightPanel}>
            {
                props.products && props.products.length ?
                    <>
                        <ProductTable
                            activeTabs={props.activeTabs}
                            tabs={props.tabs}
                            products={props.products}
                            types={props.types}
                            selected_products={props.selected_products}
                            // Methods
                            selectProducts={props.selectProducts}
                        />
                        {
                            props.count ?
                                props.count > 20 ?
                                    <p className={classes.showCount}>
                                        Ցուցադրված է {props.products.length}-ը {props.count} տողից
                                    </p>
                                    :
                                    <p className={classes.showCount}>
                                        Ցուցադրված է {props.count}-ը {props.count} տողից
                                    </p>
                                :
                                null
                        }
                        <div className={classes.paginationWindow}>
                            {
                                props.count ?
                                    <Pagination
                                        count={Math.ceil(props.count / 20)}
                                        hidePrevButton
                                        hideNextButton
                                        renderItem={
                                            item => <PaginationItem
                                                classes={{selected: classes.colorSecondary}}  {...item}/>
                                        }
                                        onChange={changeHandler}
                                    />
                                    :
                                    null
                            }
                        </div>
                    </>
                    :
                    <div className={classes.emptyWindow}>
                        <div>
                            <img src={'https://cdn4.iconfinder.com/data/icons/refresh_cl/256/System/Box_Empty.png'}
                                 alt={'product-empty'}/>
                            <h3>"Որոնումը" արդյունք չտվեց, ապրանքացանկը դատարկ է</h3>
                            <CustomButton
                                className={classes.addProductButton}
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
                        </div>
                    </div>
            }
        </div>
    )
};

export default RightPanel;