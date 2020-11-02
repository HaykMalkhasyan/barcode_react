import React, {Component} from 'react'
import classes from '../filters/filters.module.css'
import {connect} from "react-redux"
import {advanceSearchHandler, clearSearchClassifiers, toggleCheckBoxValue} from "../../../../../Redux/products/actions"
import Icons from "../../../../../components/Icons/icons";
import CustomButton from "../../../../../components/UI/button/customButton/customButton";
import {
    getOnlySubgroupWithGroupId,
    getSubgroupWithGroupId,
    setGroupValues
} from "../../../../../Redux/characteristics/actions";
import CustomHeader from "../../../../../components/UI/customHeader/customHeader";
import Collapse from "@material-ui/core/Collapse";
import cookies from "../../../../../services/cookies";
import TreeViewer from "../../../../../components/tree-viewer/tree-viewer";

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

        this.props.setGroupValues('progress', true);
        this.props.setGroupValues('own_subgroups', []);
        if (active !== 0) {
            this.props.getSubgroupWithGroupId(groups[active - 1].id, "filter_subgroups");
            this.props.setGroupValues('open', `collapse-${groups[active - 1].id}`);
            this.props.setGroupValues('active', active - 1);
        } else {
            this.props.getSubgroupWithGroupId(groups[length - 1].id, "filter_subgroups");
            this.props.setGroupValues('open', `collapse-${groups[length - 1].id}`);
            this.props.setGroupValues('active', length - 1);
        }
    };

    nextHandler = (groups, active) => {
        let length = groups.length;

        this.props.setGroupValues('progress', true);
        this.props.setGroupValues('own_subgroups', []);
        if (active !== length -1) {
            this.props.setGroupValues('open', `collapse-${groups[active + 1].id}`);
            this.props.setGroupValues('active', active + 1);
            this.props.getSubgroupWithGroupId(groups[active + 1].id, "filter_subgroups")
        } else {
            this.props.setGroupValues('open', `collapse-${groups[0].id}`);
            this.props.setGroupValues('active', 0);
            this.props.getSubgroupWithGroupId(groups[0].id, "filter_subgroups")
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
                                    <span onClick={() => this.props.classifierOpenHandler(this.props.groups[this.props.active].id)}>{this.props.groups[this.props.active][`title_${cookies.get('language') || 'am'}`]}</span>
                                    <CustomButton
                                        className={classes.prevSlideBtn}
                                        children={
                                            <Icons type={'left-angle'} className={classes.prevSlideIcon}/>
                                        }
                                        // Methods
                                        onClick={this.prevHandler.bind(this, this.props.groups, this.props.active)}
                                    />
                                </div>
                                <div id="scrollableDiv" className={classes.classifBody}>
                                    <TreeViewer
                                        group={this.props.groups[this.props.active]}
                                        data={this.props.filter_subgroups}
                                        type={'select'}
                                        // Methods
                                    />
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
        filter_subgroups: state.characteristics.filter_subgroups,

        groups: state.characteristics.groups,
        group: state.characteristics.group,
        active: state.characteristics.active,
        open: state.characteristics.open,
        subgroups: state.characteristics.subgroups,
        classifierSubgroup: state.characteristics.classifierSubgroup,
        advancedSearchConfig: state.products.advancedSearchConfig,
        collapsedStatus: state.products.collapsedStatus,
        errors: state.products.errors,
    }
}

function mapDispatchToProps(dispatch) {

    return {
        toggleCheckBoxValue: (name, check, value, classifier) => dispatch(toggleCheckBoxValue(name, check, value, classifier)),
        clearSearchClassifiers: () => dispatch(clearSearchClassifiers()),
        setGroupValues: (name, value) => dispatch(setGroupValues(name, value)),
        getOnlySubgroupWithGroupId: (id, place) => dispatch(getOnlySubgroupWithGroupId(id, place)),
        getSubgroupWithGroupId: (id, place) => dispatch(getSubgroupWithGroupId(id, place)),
        advanceSearchHandler: item => dispatch(advanceSearchHandler(item)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassifiersTree)