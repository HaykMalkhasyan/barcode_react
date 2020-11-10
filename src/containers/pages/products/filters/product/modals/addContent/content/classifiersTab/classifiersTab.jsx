import React, {Component} from 'react'
import classes from './classifiersTab.module.css'
import {connect} from "react-redux";
import {
    getActionById,
    getAllGroup,
    getOnlySubgroupWithGroupId, openModalContent,
    setGroupValues
} from "../../../../../../../../../Redux/characteristics/actions";
import ClassifiersItem from "./classifiersItem/classifiersItem";
import {importGroupInProduct, setProductValues} from "../../../../../../../../../Redux/products/actions";
import AlertUI from "../../../../../../../../../components/UI/alert/alertUI/alertUI";
import Item from "./item/item";

class ClassifiersTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: null
        }
    }

    toggleWindow = currentOpen => {
        console.log(currentOpen, this.state.open)
        this.setState({
            open: currentOpen === this.state.open ? null : currentOpen
        })
    }

    componentDidMount() {
        this.props.getAllGroup();
    }

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
                                                // <ClassifiersItem
                                                //     key={`classifiers-item-${item.id}`}
                                                //     data={item}
                                                //     subgroup={this.props.classifiers}
                                                //     // Methods
                                                //     onClick={this.props.openModalContent}
                                                // />
                                                <Item
                                                    key={`classifiers-item-${item.id}`}
                                                    data={item}
                                                    open={this.state.open === item.id}
                                                    // Methods
                                                    toggleWindow={this.toggleWindow}
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
        openModalContent: (item, status) => dispatch(openModalContent(item, status))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassifiersTab);