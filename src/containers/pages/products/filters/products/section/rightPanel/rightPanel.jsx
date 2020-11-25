import React from 'react'
import classes from './rightPanel.module.css'
import ResizableDragTable from "../../../../../../../components/resizableDragTable/resizableDragTable"
import { Pagination } from '@material-ui/core';
import { PaginationItem } from '@material-ui/core';
import CustomButton from "../../../../../../../components/UI/button/customButton/customButton";
import Icons from "../../../../../../../components/Icons/icons";
import Header from "../../header/header";

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
            <Header
                open={props.open}
                activeTabs={props.activeTabs}
                tabs={props.tabs}
                products={props.products}
                // Methods
                onClick={props.onClick}
                toggleBackdrop={props.toggleBackdrop}
                backFiltersPage={props.backFiltersPage}
            />
            {
                props.products && props.products.length ?
                    <>
                        <ResizableDragTable
                            activeTabs={props.activeTabs}
                            tabs={props.tabs}
                            products={props.products}
                            types={props.types}
                            selected_products={props.selected_products}
                            in_data_1={props.types}
                            in_data_2={props.measurements}
                            // Methods
                            selectData={props.selectProducts}
                            setValues={props.setProductValues}
                            getData={props.getProduct}
                            sortTableTabs={props.sortTableTabs}
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