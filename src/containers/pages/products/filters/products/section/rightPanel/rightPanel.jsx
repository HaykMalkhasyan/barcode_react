import React, {useState} from 'react'
import classes from './rightPanel.module.css'
import ResizableDragTable from "../../../../../../../components/resizableDragTable/resizableDragTable"
import { Pagination } from '@material-ui/core';
import { PaginationItem } from '@material-ui/core';
import CustomButton from "../../../../../../../components/UI/button/customButton/customButton";
import Icons from "../../../../../../../components/Icons/icons";
import Header from "../../header/header";
import {AgGridReact} from "ag-grid-react";
import ProductTable from "../../../../../../../components/table/product-table/product-table";
import {getLanguage} from "../../../../../../../controllers/languages/languages";
import cookie from "../../../../../../../services/cookies";

const RightPanel = props => {
    const [filters, setFilters] = useState(false);

    const changeHandler = (event, page) => {
        props.setProductValues('productLoadingStatus', true);
        props.setProductValues('selected_products', []);
        props.getAllProducts(page)
    };

    const toggleAddModalHandler = (name, value, scrollType) => {
        props.setProductValues(name, value);
        props.setProductValues('scroll', scrollType)
    };

    const columnsRender = (products) => {
        const array = [];
        for (let key of Object.keys(products[0])) {
            if (key === "id") {
                array.push({
                    field: "id",
                    headerCheckboxSelection: true,
                    checkboxSelection: true,
                    pinned: "left",
                    colId: "checkbox",
                    sortable: false,
                    resizable: false,
                    lockPosition: true,
                    cellClass: 'locked-col',
                    width: 50,
                    floatingFilter: false,
                    rowDrag: false,
                    filter: "agTextColumnFilter",
                    suppressMenu: true,
                    rowDragText: function(params, dragItemCount) {
                        if (dragItemCount > 1) {
                            return dragItemCount + ' products';
                        }
                        return params.rowNode.data["item_name"];
                    },
                })
            } else if (key === "item_name") {
                array.push({
                    headerName: getLanguage(cookie.get("language") || "am", key).toUpperCase() || key,
                    field: key,
                    sortable: true,
                    resizable: true,
                    minWidth: 90,
                    suppressMenu: true,
                    lockVisible: true,
                    cellClass: 'locked-visible',
                    filter: 'agTextColumnFilter',
                    floatingFilter: filters,
                })
            } else if (key !== "profile_id") {
                array.push({
                    suppressMenu: true,
                    headerName: getLanguage(cookie.get("language") || "am", key).toUpperCase() || key,
                    field: key,
                    sortable: true,
                    resizable: true,
                    lockVisible: true,
                    hide: props.activeTabs.indexOf(key) !== -1,
                    minWidth: 90,
                    floatingFilter: filters,
                    filter: 'agTextColumnFilter',
                })
            }
        }
        return array;
    }

    const columnDefinition = props.products && props.products.length ? columnsRender(props.products) : [];

    const rowClassRules = {
        'red-row': 'data.id % 2 === 0',
        'green-row': 'data.id % 2 === 1',
    };

    return (
        <div className={classes.rightPanel}>
            <Header
                open={props.open}
                activeTabs={props.activeTabs}
                products={props.products}
                filters={filters}
                // Methods
                setFilters={setFilters}
                onClick={props.onClick}
                toggleBackdrop={props.toggleBackdrop}
                backFiltersPage={props.backFiltersPage}
            />
            {/*{*/}
            {/*    props.products && props.products.length ?*/}
            {/*        <>*/}
            {/*            */}
            {/*            <ResizableDragTable*/}
            {/*                activeTabs={props.activeTabs}*/}
            {/*                tabs={props.tabs}*/}
            {/*                products={props.products}*/}
            {/*                types={props.types}*/}
            {/*                selected_products={props.selected_products}*/}
            {/*                in_data_1={props.types}*/}
            {/*                in_data_2={props.measurements}*/}
            {/*                // Methods*/}
            {/*                selectData={props.selectProducts}*/}
            {/*                setValues={props.setProductValues}*/}
            {/*                getData={props.getProduct}*/}
            {/*                sortTableTabs={props.sortTableTabs}*/}
            {/*            />*/}
            {/*            {*/}
            {/*                props.count ?*/}
            {/*                    props.count > 20 ?*/}
            {/*                        <p className={classes.showCount}>*/}
            {/*                            Ցուցադրված է {props.products.length}-ը {props.count} տողից*/}
            {/*                        </p>*/}
            {/*                        :*/}
            {/*                        <p className={classes.showCount}>*/}
            {/*                            Ցուցադրված է {props.count}-ը {props.count} տողից*/}
            {/*                        </p>*/}
            {/*                    :*/}
            {/*                    null*/}
            {/*            }*/}
            {/*            <div className={classes.paginationWindow}>*/}
            {/*                {*/}
            {/*                    props.count ?*/}
            {/*                        <Pagination*/}
            {/*                            count={Math.ceil(props.count / 20)}*/}
            {/*                            hidePrevButton*/}
            {/*                            hideNextButton*/}
            {/*                            renderItem={*/}
            {/*                                item => <PaginationItem*/}
            {/*                                    classes={{selected: classes.colorSecondary}}  {...item}/>*/}
            {/*                            }*/}
            {/*                            onChange={changeHandler}*/}
            {/*                        />*/}
            {/*                        :*/}
            {/*                        null*/}
            {/*                }*/}
            {/*            </div>*/}
            {/*        </>*/}
            {/*        :*/}
            {/*        <div className={classes.emptyWindow}>*/}
            {/*            <div>*/}
            {/*                <img src={'https://cdn4.iconfinder.com/data/icons/refresh_cl/256/System/Box_Empty.png'}*/}
            {/*                     alt={'product-empty'}/>*/}
            {/*                <h3>"Որոնումը" արդյունք չտվեց, ապրանքացանկը դատարկ է</h3>*/}
            {/*                <CustomButton*/}
            {/*                    className={classes.addProductButton}*/}
            {/*                    children={*/}
            {/*                        <>*/}
            {/*                            <Icons type={'plus'} className={classes.addBtnIcon}/>*/}
            {/*                            <span>Ավելացնել</span>*/}
            {/*                        </>*/}
            {/*                    }*/}
            {/*                    // Methods*/}
            {/*                    onClick={*/}
            {/*                        () => toggleAddModalHandler('open', 'add', 'body')*/}
            {/*                    }*/}
            {/*                />*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*}*/}
            <div className={classes.tableInformation}>
                <span>Դաշտը փոփոխման ենթակա է</span>
                <span>Դաշտը հեռացման ենթակա չէ</span>
                <span>Դաշտը փոփոխման ենթակա չէ</span>
            </div>
            <ProductTable
                tableType={"product"}
                tabs={props.tabs}
                data={props.products}
                columnDefinition={columnDefinition}
                rowSelection="multiple"
                rowClassRules={rowClassRules}
                animateRows={true}
                rowDragManaged={true}
                enableMultiRowDragging={true}
                enableRangeSelection={true}
                enableFillHandle={true}
                // Methods
                clickHandler={props.getProduct}
            />
            <div className={classes.paginationWindow}>
                {
                    props.count ?
                        <Pagination
                            count={Math.ceil(props.count / 20)}
                            // hidePrevButton
                            // hideNextButton
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
        </div>
    )
};

export default RightPanel;