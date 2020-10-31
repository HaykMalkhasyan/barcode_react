import React, {Component} from 'react'
import classes from './classifiersTab.module.css'
import {connect} from "react-redux";
import {
    getActionById,
    getAllGroup,
    getOnlySubgroupWithGroupId,
    setGroupValues
} from "../../../../../../../../../Redux/characteristics/actions";
import ClassifiersItem from "./classifiersItem/classifiersItem";
import {
    importGroupInProduct,
    selectGroupItem,
    setProductValues
} from "../../../../../../../../../Redux/products/actions";
import CustomButton from "../../../../../../../../../components/UI/button/customButton/customButton";
import AlertUI from "../../../../../../../../../components/UI/alert/alertUI/alertUI";

class ClassifiersTab extends Component {

    componentDidMount() {
        if (this.props.groups.length && this.props.classifiers.classifiers.length === 0) {
            const classifiers = [];
            for (let group of this.props.groups) {
                if (group.required_group && group.id !== 0) {
                    classifiers.push(group)
                }
            }
            this.props.setProductValues('classifiers', {classifiers: classifiers})
        }
    }

    selectGroupHandler = id => {
        if (id !== 0) {
            this.props.getActionById("get", "group", {path: "Group/Group", id: id})
            this.props.getOnlySubgroupWithGroupId(id);
            this.props.selectGroupItem()
        }
    };

    render() {

        return (
            <div className={classes.classifiersTab}>
                <div className={classes.content}>
                    <p className={classes.information}>
                        Հիմնական դասակարգիչ ցանկից կարող եք ընտրել ապրանքին համապատասխան դասակարգիչ կամ ավելացնել նորը և
                        կցել ապրանքին։ Դասակարգիչներն օգնում են հեշտությամբ առանձնացնել նույն կատեգորիային պատկանող
                        ապրանքների ցանկը։
                    </p>
                    <div className={classes.classifiersControlWindow}>
                        <div className={classes.errorFields}>
                            {
                                this.props.errorFields.length ?
                                    this.props.errorFields.indexOf('classifiers') !== -1 ?
                                        <AlertUI variant="outlined" severity="error" text={'Դասակագիչները ընտրված չեն !'}/>
                                        :
                                        null
                                    :
                                    null
                            }
                        </div>
                        {
                            this.props.classifiers.classifiers.length ?
                                this.props.classifiers.classifiers.map(
                                    item => {

                                        return (
                                            <ClassifiersItem
                                                subs={this.props.subs}
                                                roads={this.props.roads}
                                                data={item}
                                                key={`classifiers-item-${item.id}`}
                                                // Methods
                                                onClick={this.selectGroupHandler}
                                            />
                                        )
                                    }
                                )
                                :
                                null
                        }
                        <CustomButton
                            className={classes.groupAddButton}
                            children={'Հիմնական Դասակարգիչ'}
                            // Methods
                            onClick={
                                () => {
                                    this.props.getAllGroup();
                                    this.props.importGroupInProduct(this.props.open, 'open');
                                    this.props.setGroupValues('modalGroup', "select")
                                }
                            }
                        />
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {

    return {
        errorFields: state.products.errorFields,
        open: state.products.open,
        roads: state.products.roads,
        initialOpen: state.products.initialOpen,
        groups: state.characteristics.groups,
        subs: state.products.subs,
        classifiers: state.products.classifiers,
    }
}

function mapDispatchToProps(dispatch) {

    return {
        setGroupValues: (name, value) => dispatch(setGroupValues(name, value)),
        getAllGroup: () => dispatch(getAllGroup()),
        setProductValues: (name, value) => dispatch(setProductValues(name, value)),
        importGroupInProduct: (condition, status) => dispatch(importGroupInProduct(condition, status)),
        getActionById: (requestType, memory, param, id) => dispatch(getActionById(requestType, memory, param, id)),
        getOnlySubgroupWithGroupId: (id, place) => dispatch(getOnlySubgroupWithGroupId(id, place)),
        selectGroupItem: () => dispatch(selectGroupItem()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassifiersTab);