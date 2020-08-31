import React, {Component} from 'react'
import classes from '../filters/filters.module.css'
import {connect} from "react-redux"
import {
    advanceSearchHandler,
    clearSearchClassifiers,
    subGroupCollapses,
    toggleCheckBoxValue
} from "../../../../../Redux/products/actions"
import Icons from "../../../../../components/Icons/icons";
import CustomButton from "../../../../../components/UI/button/customButton/customButton";
import {
    getOnlySubgroupWithGroupId,
    setGroupValues,
    subCollapsed,
    subCollapsedGroup
} from "../../../../../Redux/characteristics/actions";
import Tree from "../../../../../components/tree/tree";
import CustomHeader from "../../../../../components/UI/customHeader/customHeader";
import Collapse from "@material-ui/core/Collapse";

class ClassifiersTree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            isOpen: false,
            collapseStatus: true
        };
    }

    collapsed = () => {
      this.setState({
          collapseStatus: !this.state.collapseStatus
      })
    };

    classifiersSelectHandler = (value) => {
        this.props.advanceSearchHandler(value)
    };

    prevHandler = (groups, active) => {
        let length = groups.length;

        if (active !== 0) {
            if (active - 1 !== 0) {
                this.props.getOnlySubgroupWithGroupId(groups[active - 1].id, 'classifierSubgroup')
            }
            this.props.setGroupValues('open', `collapse-${groups[active - 1].id}`);
            this.props.setGroupValues('active', active - 1);
        } else {
            if (length - 1 !== 0) {
                this.props.getOnlySubgroupWithGroupId(groups[length - 1].id, 'classifierSubgroup')
            }
            this.props.setGroupValues('open', `collapse-${groups[length - 1].id}`);
            this.props.setGroupValues('active', length - 1);
        }
    };

    nextHandler = (groups, active) => {
        let length = groups.length;

        if (active !== length -1) {
            this.props.setGroupValues('open', `collapse-${groups[active + 1].id}`);
            this.props.setGroupValues('active', active + 1);
            this.props.getOnlySubgroupWithGroupId(groups[active + 1].id, 'classifierSubgroup')
        } else {
            this.props.setGroupValues('open', `collapse-${groups[0].id}`);
            this.props.setGroupValues('active', 0);
        }
    };

    render() {
        return (
            <div className={classes.classifiersWindow}>
                <CustomHeader
                    type={'collapsed'}
                    name={'Դասակարգիչ'}
                    open={this.state.collapseStatus}
                    // Methods
                    onClick={this.collapsed}
                />
                <Collapse in={this.state.collapseStatus} timeout="auto" unmountOnExit>
                    {
                        this.props.groups && this.props.groups.length ?
                            <>
                                <div className={classes.controllers}>
                                    <CustomButton
                                        className={classes.nextSlideBtn}
                                        children={
                                            <Icons type={'right-angle'} className={classes.nextSlideIcon}/>
                                        }
                                        // Methods
                                        onClick={this.nextHandler.bind(this, this.props.groups, this.props.active)}
                                    />
                                    <span onClick={() => this.props.classifierOpenHandler(this.props.groups[this.props.active].id)}>{this.props.groups[this.props.active].name}</span>
                                    <CustomButton
                                        className={classes.prevSlideBtn}
                                        children={
                                            <Icons type={'left-angle'} className={classes.prevSlideIcon}/>
                                        }
                                        // Methods
                                        onClick={this.prevHandler.bind(this, this.props.groups, this.props.active)}
                                    />
                                </div>
                                <div className={classes.classifBody}>
                                    {
                                        this.props.active === 0 ?
                                            <Tree
                                                label={'Բոլորը'}
                                                type={'select'}
                                                group={this.props.groups[0]}
                                                customSubgroup={[]}
                                                collapsed={[]}
                                                collapsedGroup={[]}
                                                advancedSearchConfig={this.props.advancedSearchConfig}
                                                // Methods
                                                subCollapsed={this.props.subCollapsed}
                                                subCollapsedGroup={this.props.subCollapsedGroup}
                                                select={this.classifiersSelectHandler}
                                            />
                                            :
                                            <Tree
                                                label={'Բոլորը'}
                                                type={'select'}
                                                group={this.props.groups[this.props.active]}
                                                customSubgroup={this.props.classifierSubgroup}
                                                collapsed={this.props.classifiersCollapsed}
                                                collapsedGroup={this.props.classifiersCollapsedGroup}
                                                advancedSearchConfig={this.props.advancedSearchConfig}
                                                // Methods
                                                subCollapsed={this.props.subCollapsed}
                                                subCollapsedGroup={this.props.subCollapsedGroup}
                                                select={this.classifiersSelectHandler}
                                            />
                                    }
                                </div>
                            </>
                            :
                            null
                    }
                </Collapse>
            </div>
        )
    }
}

function mapStateToProps(state) {

    return {
        groups: state.characteristics.groups,
        group: state.characteristics.group,
        active: state.characteristics.active,
        open: state.characteristics.open,
        subgroups: state.characteristics.subgroups,
        classifierSubgroup: state.characteristics.classifierSubgroup,
        classifiersCollapsed: state.characteristics.classifiersCollapsed,
        classifiersCollapsedGroup: state.characteristics.classifiersCollapsedGroup,
        advancedSearchConfig: state.products.advancedSearchConfig,
        collapsedStatus: state.products.collapsedStatus,
        errors: state.products.errors,
    }
}

function mapDispatchToProps(dispatch) {

    return {
        subGroupCollapses: id => dispatch(subGroupCollapses(id)),
        toggleCheckBoxValue: (name, check, value, classifier) => dispatch(toggleCheckBoxValue(name, check, value, classifier)),
        clearSearchClassifiers: () => dispatch(clearSearchClassifiers()),
        setGroupValues: (name, value) => dispatch(setGroupValues(name, value)),
        getOnlySubgroupWithGroupId: (id, place) => dispatch(getOnlySubgroupWithGroupId(id, place)),
        subCollapsed: (id, place) => dispatch(subCollapsed(id, place)),
        subCollapsedGroup: (id, place) => dispatch(subCollapsedGroup(id, place)),
        advanceSearchHandler: item => dispatch(advanceSearchHandler(item)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassifiersTree)