import React, {Component} from 'react'
import classes from './classifiersTab.module.css'
import {connect} from "react-redux";
import {
    getActionById,
    getAllGroup,
    getSubgroupWithGroupId,
    openModalContent,
    setGroupValues
} from "../../../../../../../../../Redux/characteristics/actions";
import {
    importGroupInProduct,
    selectSubgroup,
    setProductValues
} from "../../../../../../../../../Redux/products/actions";
import AlertUI from "../../../../../../../../../components/UI/alert/alertUI/alertUI";
import ClassifiersItem from "./classifiersItem/classifiersItem";
import PageSpecifications from "../../../../../product-modal/page-specifications/page-specifications";

class ClassifiersTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: null
        }
        this.props.getAllGroup();
    }

    toggleWindow = currentOpen => {
        if (currentOpen === this.state.open) {
            this.setState({
                open: null
            })
            this.props.setGroupValues("own_subgroups", null);
        } else {
            this.props.setGroupValues("own_subgroups", null);
            this.setState({
                open: currentOpen
            })
            this.props.getSubgroupWithGroupId(currentOpen)
        }
    }

    select = node => {
        this.setState({
            open: null
        })
        this.props.selectSubgroup(node)
    }

    render() {

        return (
            <div className={classes.classifiersTab}>
                <div className={classes.content}>
                    <PageSpecifications
                        text={`
                        Հիմնական դասակարգիչ ցանկից կարող եք ընտրել ապրանքին համապատասխան դասակարգիչ կամ ավելացնել նորը և
                        կցել ապրանքին։ Դասակարգիչներն օգնում են հեշտությամբ առանձնացնել նույն կատեգորիային պատկանող
                        ապրանքների ցանկը։
                        `}
                    />
                    <div className={classes.classifiersControlWindow}>
                        {
                            this.props.errorFields.length ?
                                this.props.errorFields.indexOf('classifiers') !== -1 ?
                                    <div className={classes.errorFields}>
                                        <AlertUI
                                            variant="outlined"
                                            severity="error"
                                            text={'Դասակագիչները ընտրված չեն !'}
                                        />
                                    </div>
                                    :
                                    null
                                :
                                null
                        }
                        {
                            this.props.groups ?
                                this.props.groups.length ?
                                    this.props.groups.map(
                                        item => {

                                            return (
                                                <ClassifiersItem
                                                    key={`classifiers-item-${item.id}`}
                                                    data={item}
                                                    subgroup={this.props.classifiers}
                                                    classifiers={this.props.classifiers}
                                                    // Methods
                                                    onClick={this.props.openModalContent}
                                                    setProductValues={this.props.setProductValues}
                                                />
                                            )
                                        }
                                    )
                                    :
                                    <span>empty</span>
                                :
                                <span>Loading...</span>
                        }
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
        classifiers: state.products.classifiers,
        own_subgroups: state.characteristics.own_subgroups,
    }
}

function mapDispatchToProps(dispatch) {

    return {
        setGroupValues: (name, value) => dispatch(setGroupValues(name, value)),
        getAllGroup: () => dispatch(getAllGroup()),
        setProductValues: (name, value) => dispatch(setProductValues(name, value)),
        importGroupInProduct: (condition, status) => dispatch(importGroupInProduct(condition, status)),
        getActionById: (requestType, memory, param, id) => dispatch(getActionById(requestType, memory, param, id)),
        getSubgroupWithGroupId: id => dispatch(getSubgroupWithGroupId(id)),
        openModalContent: (item, status) => dispatch(openModalContent(item, status)),
        selectSubgroup: subgroup => dispatch(selectSubgroup(subgroup)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassifiersTab);