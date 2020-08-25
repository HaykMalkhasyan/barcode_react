import React from 'react'
import classes from './leftPanel.module.css'
import ListUI from "../../../../../../../components/UI/listUI/listUI";
import Backdrop from "../../../../../../../components/UI/backdrop/backdrop";
import TreeFilter from "./treeFilter/treeFilter";
import MeasurementFilter from "./measurementFilter/measurementFilter";
import PriceFilter from "./priceFilter/priceFilter";
import BalanceFilter from "./balanceFilter/balanceFilter";
import SupplierFilter from "./supplierFilter/supplierFilter";
import ActiveFilter from "./activeFilter/activeFilter";

const LeftPanel = props => {

    const clickHandler = (id, index) => {
        props.closeClassifierWindow(index, id);
        props.getGroup(id)
    };

    return (
        <div className={classes.leftPanel}>
            {
                props.toggleClassifier ?
                    <Backdrop
                        className={classes.backdrop}
                        // Methods
                        onClick={() => props.setFiltersValue('toggleClassifier', false)}
                    />
                    :
                    null
            }
            <h1>Դասակարգիչ</h1>
            <div className={classes.classifiers}>
                <div className={classes.classifiersName}>
                    <div className={props.toggleClassifier ? `${ classes.toggleWindow} ${classes.toggleWindowShow}` : classes.toggleWindow}>
                        <div className={classes.allGroupWindow}>
                            <ListUI
                                data={props.groups}
                                selectedIndex={props.selectedIndex}
                                label={'Դասակարգիչների ցանկ'}
                                empty={'Դատարկ է'}
                                // Methods
                                onClick={clickHandler}
                            />
                        </div>
                    </div>
                    <h2
                        className={props.toggleClassifier ? classes.selected : ''}
                        onClick={() => props.setFiltersValue('toggleClassifier', true)}
                    >
                        {
                            props.group ?
                                props.group.name
                                :
                                props.groups[0] ?
                                    props.groups[0].name
                                    :
                                    ''
                        }
                    </h2>
                </div>
                <TreeFilter
                    label={'Բոլորը'}
                    type={'select'}
                    group={props.group ? props.group : props.groups[0]}
                    customSubgroup={props.customSubgroup ? props.customSubgroup : []}
                    collapsed={props.group ? props.collapsed : []}
                    collapsedGroup={props.group ? props.collapsedGroup : []}
                    advancedSearchConfig={props.advancedSearchConfig}
                    // Methods
                    subCollapsed={props.subCollapsed}
                    subCollapsedGroup={props.subCollapsedGroup}
                    // select={classifiersSelectHandler}
                />
                {/*<hr className={classes.line}/>*/}
                <MeasurementFilter/>
                {/*<hr className={classes.line}/>*/}
                <PriceFilter/>
                <BalanceFilter/>
                <SupplierFilter/>
                <ActiveFilter/>
            </div>
        </div>
    )
};

export default LeftPanel;