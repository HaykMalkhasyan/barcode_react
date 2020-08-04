import React, {Component} from 'react'
import classes from '../filters.module.css'
import {connect} from "react-redux"
import TreeViewer from "./treeViewer/treeViewer"
import {clearSearchClassifiers, subGroupCollapses, toggleCheckBoxValue} from "../../../../../Redux/products/actions"
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import Collapse from "@material-ui/core/Collapse";
import CheckboxesUi from "../../../../../components/UI/input/checkboxUI/checkboxUI";
import Icons from "../../../../../components/Icons/icons";
import CustomButton from "../../../../../components/UI/button/customButton/customButton";
import {getOnlySubgroupWithGroupId, setGroupValues} from "../../../../../Redux/characteristics/actions";

class ClassifiersTree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            isOpen: false,
        };
    }

    classifiersSelectHandler = (event, value, check, name) => {
        event.stopPropagation();
        this.props.toggleCheckBoxValue('classifier', check, +value, name)
    };

    toggleHandler = id => {
        if (this.props.open === `collapse-${id}`) {
            this.props.setGroupValues('open', false);
        } else {
            this.props.setGroupValues('open', `collapse-${id}`);
        }
    };

    checkSubs = id => {
        for (let item of this.props.subgroups) {
            if (item['group_id'].id === id && item['parent_id'] === "") {
                return true
            }
        }
    };

    prevHandler = (groups, active) => {
        let length = groups.length;

        if (active !== 0) {
            this.props.setGroupValues('open', `collapse-${groups[this.props.active - 1].id}`);
            this.props.setGroupValues('active', active - 1)
        } else {
            this.props.setGroupValues('open', `collapse-${groups[length - 1].id}`);
            this.props.setGroupValues('active', length - 1);
        }
    };

    nextHandler = (groups, active) => {
        let length = groups.length;

        if (active !== length -1) {
            this.props.setGroupValues('open', `collapse-${groups[this.props.active + 1].id}`);
            this.props.setGroupValues('active', active + 1)
        } else {
            this.props.setGroupValues('open', `collapse-${groups[0].id}`);
            this.props.setGroupValues('active', 0)
        }
    };

    render() {
        return (
            <div className={classes.classifiersWindow}>
                {
                    this.props.groups && this.props.groups.length ?
                        <>
                            <header>
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
                            </header>
                            <div className={classes.classifBody}>
                                <ul style={{listStyle: 'none'}}>
                                    <li>
                                        <span className={`${classes.mainTreeName} ${this.props.advancedSearchConfig['classifier'] && this.props.advancedSearchConfig['classifier'].id === this.props.groups[this.props.active].id && this.props.advancedSearchConfig['classifier'].name === this.props.groups[this.props.active].name ? classes.selected : null}`}>
                                            {
                                                this.checkSubs(this.props.groups[this.props.active].id) ?
                                                    <ChevronRightIcon
                                                        onClick={
                                                            () => {
                                                                this.props.clearSearchClassifiers();
                                                                this.toggleHandler(this.props.groups[this.props.active].id)
                                                            }
                                                        }
                                                        style={
                                                            this.props.open === `collapse-${this.props.groups[this.props.active].id}` ?
                                                                {verticalAlign: 'middle', cursor: "pointer", transaction: '300ms', color: '#666666', transform: 'rotate(90deg)'}
                                                                :
                                                                {verticalAlign: 'middle', cursor: "pointer", transaction: '300ms', color: '#666666', transform: 'rotate(0)'}
                                                        }
                                                    />
                                                    :
                                                    null
                                            }
                                            <Icons type={'mFolder'}/>
                                            <span className={classes.classifMainName}>
                                                <CheckboxesUi
                                                    padding={0}
                                                    checked={!!(this.props.advancedSearchConfig['classifier'] && this.props.advancedSearchConfig['classifier'].id === this.props.groups[this.props.active].id && this.props.advancedSearchConfig['classifier'].name === this.props.groups[this.props.active].name)}
                                                    color={'primary'}
                                                    label={'Բոլորը'}
                                                    name={this.props.groups[this.props.active].name}
                                                    value={this.props.groups[this.props.active].id}
                                                    hidden={true}
                                                    size={'small'}
                                                    translate={false}
                                                    onChange={event =>
                                                        this.classifiersSelectHandler(event, event.target.value, event.target.checked, this.props.groups[this.props.active])
                                                    }
                                                />
                                            </span>
                                        </span>
                                        <Collapse in={this.props.open === `collapse-${this.props.groups[this.props.active].id}`} timeout="auto" unmountOnExit>
                                            <ul  style={{listStyle: 'none', paddingLeft: 25}}>
                                                <li>
                                                    {/*<Collapse in={this.state.isOpen === this.props.groups[this.props.active].id} timeout="auto" unmountOnExit>*/}

                                                        {
                                                            this.props.subgroups ?
                                                                <TreeViewer
                                                                    // DATA
                                                                    fonstStyale={classes.fonstStyale}
                                                                    group={this.props.groups[this.props.active]}
                                                                    data={this.props.subgroups}
                                                                    sectionFontColor={this.props.sectionFontColor}
                                                                    collapsedStatus={this.props.collapsedStatus}
                                                                    advancedSearchConfig={this.props.advancedSearchConfig}
                                                                    // METHODS
                                                                    subGroupCollapses={this.props.subGroupCollapses}
                                                                    onChange={this.classifiersSelectHandler}
                                                                />
                                                                :
                                                                null
                                                        }
                                                    {/*</Collapse>*/}
                                                </li>
                                            </ul>
                                        </Collapse>
                                    </li>
                                </ul>
                            </div>
                        </>
                        :
                        null
                }
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
        getOnlySubgroupWithGroupId: id => dispatch(getOnlySubgroupWithGroupId(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassifiersTree)