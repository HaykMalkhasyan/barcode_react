import React, {useState} from 'react'
import classes from './rightPanel.module.css'
import {Pagination, PaginationItem} from '@material-ui/core';
import CustomButton from "../../../../../../../components/UI/button/customButton/custom-button";
import Icons from "../../../../../../../components/Icons/icons";
import Header from "../../header/header";
import ProductTable from "../../../../../../../components/table/product-table/product-table";
import {getLanguage} from "../../../../../../../controllers/languages/languages";
import cookie from "../../../../../../../services/cookies";
import ProductType from "./product-type/product-type";

const RightPanel = props => {
    const [filters, setFilters] = useState(false);
    const [active, setActive] = useState(3)

    const changeHandler = (event, page) => {
        props.setProductValues('productLoadingStatus', true);
        props.setProductValues('selected_products', []);
        props.getAllProducts(page, {...props.advancedSearchConfig})
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
                    // field: "id",
                    headerClass: "tableHeader",
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
                    "rowDragText": function(params, dragItemCount) {
                        if (dragItemCount > 1) {
                            return dragItemCount + ' products';
                        }
                        return params.rowNode.data["item_name"];
                    },
                })
            } else if (key === "item_name") {
                array.push({
                    headerClass: "tableHeader",
                    headerName: getLanguage(cookie.get("language") || "am", key)/*.toUpperCase()*/ || key,
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
            } else if (key === "create_date" || key === "del_date") {
                array.push({
                    headerClass: "tableHeader",
                    suppressMenu: true,
                    headerName: getLanguage(cookie.get("language") || "am", key)/*.toUpperCase()*/ || key,
                    field: key,
                    sortable: true,
                    resizable: true,
                    lockVisible: true,
                    type: "dateColumn",
                    hide: props.activeTabs.indexOf(key) !== -1,
                    minWidth: 90,
                    floatingFilter: filters,
                })
            } else {
                array.push({
                    headerClass: "tableHeader",
                    suppressMenu: true,
                    headerName: getLanguage(cookie.get("language") || "am", key)/*.toUpperCase()*/ || key,
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

    const columnTypes = {
        dateColumn: {
            filter: "agDateColumnFilter",
            filterParams: {
                "comparator": function (filterLocalDateAtMidnight, cellValue) {
                    let dateParts = cellValue.split('-');
                    let day = Number(dateParts[2].split(" ")[0]);
                    let month = Number(dateParts[1])-1;
                    let year = Number(dateParts[0]);
                    let cellDate = new Date(year, month, day);
                    if (cellDate < filterLocalDateAtMidnight) {
                        return -1;
                    } else if (cellDate > filterLocalDateAtMidnight) {
                        return 1;
                    } else {
                        return 0;
                    }
                }
            }
        }
    }

    const columnDefinition = props.products && props.products.length ? columnsRender(props.products) : [];

    const rowClassRules = {
        'red-row': 'data.id % 2 === 0',
        'green-row': 'data.id % 2 === 1',
    };

    const dataRender = products => {
        const data = JSON.parse(JSON.stringify(products));

        for (let item of data) {
            item.show_in_site = item.show_in_site === 1 ? "Այո" : "Ոչ";
            item.deleted = item.deleted ? "ջնջված է" : "առկա է"
            item.active = item.active === 1 ? "ակտիվ չէ" : "ակտիվ է";
            for (let type of props.types) {
                if (item.service === type.id) {
                    item.service = type.name
                }
            }
            for (let measurement of props.measurements) {
                if (item.unit === measurement.id) {
                    item.unit = measurement.name
                }
            }
            if (props.suppliers && props.suppliers.length) {
                const suppliers = [];
                let all_id = item["firms"] && item["firms"].length ? item["firms"].split(",").map(id => Number(id)) : null;
                if (all_id && all_id.length) {
                    for (let sItem of props.suppliers) {
                        if (all_id.indexOf(sItem.id) !== -1) {
                            suppliers.push(sItem.name)
                        }
                    }
                }
                item.firms = suppliers;
            }
        }
        return data
    }

    const contentRender = type => {

        switch (type) {
            case 1:
                return (
                    <div>Type list</div>
                );
            case 2:
                return (
                    <ProductType
                        products={props.products}
                        screen={props.screen}
                        // Methods
                        onClick={props.getProduct}
                    />
                )
            case 3:
            default:
                return (
                    <ProductTable
                        tableType={"product"}
                        tabs={props.tabs}
                        data={dataRender(props.products)}
                        columnDefinition={columnDefinition}
                        rowSelection="multiple"
                        rowClassRules={rowClassRules}
                        animateRows={true}
                        rowDragManaged={true}
                        enableMultiRowDragging={true}
                        enableRangeSelection={true}
                        enableFillHandle={true}
                        columnTypes={columnTypes}
                        // Methods
                        clickHandler={props.getProduct}
                    />
                )
        }
    }

    return (
        <div className={classes.rightPanel}>
            <Header
                active={active}
                screen={props.screen}
                open={props.open}
                activeTabs={props.activeTabs}
                products={props.products}
                advancedSearchConfig={props.advancedSearchConfig}
                filters={filters}
                // Methods
                setActive={setActive}
                setFilters={setFilters}
                onClick={props.onClick}
                toggleBackdrop={props.toggleBackdrop}
                toggleAddModalHandler={toggleAddModalHandler}
                unfaltering={props.unfaltering}
                backFiltersPage={props.backFiltersPage}
                setProductValues={props.setProductValues}
            />
            {
                props.products && props.products.length ?
                    <>
                        {contentRender(active)}
                        <p className={classes.showCount}>
                            Ցուցադրված է 20 հատ ապրանք {props.count}-ից
                        </p>
                        <div className={classes.paginationWindow}>
                            {
                                props.count ?
                                    <Pagination
                                        count={props.page_count}
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