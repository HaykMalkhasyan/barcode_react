import React, {Component} from 'react'
import classes from '../filters.module.css'
import {connect} from "react-redux"
import TreeViewer from "./treeViewer/treeViewer"
import SlickSlider from "../../../../../components/slickSlider/slickSlider"
import {clearSearchClassifiers, subGroupCollapses, toggleCheckBoxValue} from "../../../../../Redux/products/actions"
import SpinnerForContent from "../../../../../components/UI/spinerForContent/spinnerForContent"
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import Collapse from "@material-ui/core/Collapse";
import CheckboxesUi from "../../../../../components/UI/input/checkboxUI/checkboxUI";

class ClassifiersTree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            isOpen: false,
        }
    }

    classifiersSelectHandler = (event, value, check, name) => {
        event.stopPropagation();
        this.props.toggleCheckBoxValue('classifier', check, +value, name)
    };

    toggleHandler = id => {

        if (this.state.open === `collapse-${id}`) {
            this.setState({
                open: false
            })
        } else {
            this.setState({
                open: `collapse-${id}`
            })
        }
    };

    checkSubs = id => {
        for (let item of this.props.subgroups) {
            if (item['group_id'].id === id) {
                return true
            }
        }
    };

    render() {
        return (
            <div className={classes.classifiersWindow}>
                <SlickSlider
                    dots={false}
                    arrows={true}
                    infinite={true}
                    speed={500}
                    slidesToShow={1}
                    slidesToScroll={1}
                    centerMode={false}
                    nextClassName={classes.nextSlideBtn}
                    nextSlideIcon={classes.nextSlideIcon}
                    prevClassName={classes.prevSlideBtn}
                    prevSlideIcon={classes.prevSlideIcon}
                >
                    <div>
                        <header>
                            <span style={{cursor: 'pointer'}}>Հիմնական դասակարգիչներ</span>
                        </header>
                        <div className={classes.allGroups}>
                            <ul className={classes.allGroupsList}>
                                <li>
                                    <span className={classes.mainTreeName}>
                                        <svg width={22} height={21} viewBox="0 0 23.249 22.828">
                                            <defs>
                                                <style>
                                                    {
                                                        ".fa,.fc{fill:#fff;}.fa{stroke:#fd8087;}.fb{fill:#fe646f;}.fc{stroke:#8ac9fe;}.fd{fill:#60b7ff;}.fe{fill:#fcfbf4;stroke:#fed402;}.ff{fill:#fac600;}.fg{fill:#b5adb6;}"
                                                    }
                                                </style>
                                            </defs>
                                            <g transform="translate(0.5 0.5)">
                                                <path
                                                    className="fa"
                                                    d="M492.119,216.355h20.01a1.131,1.131,0,0,0,1.119-1.142V203.879a1.131,1.131,0,0,0-1.119-1.142H498.353l-.64-1.956a1.121,1.121,0,0,0-1.061-.78h-4.532A1.131,1.131,0,0,0,491,201.142v14.071a1.131,1.131,0,0,0,1.119,1.142Zm0,0"
                                                    transform="translate(-491 -200)"
                                                />
                                                <path
                                                    className="fb"
                                                    d="M505.484,247.061a.857.857,0,0,1-.813.586H491v11.11a1.142,1.142,0,0,0,1.142,1.142h20.421a1.142,1.142,0,0,0,1.142-1.142V247.423a1.142,1.142,0,0,0-1.142-1.142h-6a1.142,1.142,0,0,0-1.083.78Zm0,0"
                                                    transform="translate(-491 -243.544)"
                                                />
                                                <path
                                                    className="fc"
                                                    d="M512.106,262.636H492.142A1.142,1.142,0,0,1,491,261.494V250.159a1.142,1.142,0,0,1,1.142-1.142H506.2l.653-1.956a1.142,1.142,0,0,1,1.083-.78h4.168a1.142,1.142,0,0,1,1.142,1.142v14.07a1.142,1.142,0,0,1-1.142,1.142Zm0,0"
                                                    transform="translate(-491 -243.544)"
                                                />
                                                <path
                                                    className="fd"
                                                    d="M513.706,261.494a1.142,1.142,0,0,1-1.142,1.142H492.142A1.142,1.142,0,0,1,491,261.494v-11.11h20.193a1.142,1.142,0,0,0,1.142-1.142v-1.818a1.142,1.142,0,0,0-1.142-1.142h1.371a1.142,1.142,0,0,1,1.142,1.142Zm0,0"
                                                    transform="translate(-491 -243.544)"
                                                />
                                                <path
                                                    className="fe"
                                                    d="M492.142,308.913h19.964a1.142,1.142,0,0,0,1.142-1.142V296.436a1.142,1.142,0,0,0-1.142-1.142H498.5l-.653-1.956a1.142,1.142,0,0,0-1.083-.781h-4.625A1.142,1.142,0,0,0,491,293.7v14.071a1.142,1.142,0,0,0,1.142,1.142Zm0,0"
                                                    transform="translate(-491 -287.085)"
                                                />
                                                <path
                                                    className="ff"
                                                    d="M833.875,338.836H832.5a1.142,1.142,0,0,1,1.142,1.142v11.334a1.142,1.142,0,0,1-1.142,1.142h1.37a1.142,1.142,0,0,0,1.142-1.142V339.978a1.142,1.142,0,0,0-1.142-1.142Zm0,0"
                                                    transform="translate(-812.311 -330.627)"
                                                />
                                                <path
                                                    className="fg"
                                                    d="M602,510.422"
                                                    transform="translate(-595.437 -492.067)"
                                                />
                                            </g>
                                        </svg>
                                        <span className={classes.classifMainName}>Բոլորը</span>
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {
                        this.props.groups && this.props.groups.length ?
                            this.props.groups.map(
                                (item, index) => {

                                    return (
                                        <div key={index}>
                                            <header>
                                                <span style={{cursor: 'pointer'}} onClick={this.props.handleOpen.bind(this, item, index, this.props.groups[index - 1], this.props.groups[index + 1])}>{item.name}</span>
                                            </header>
                                            <div className={classes.classifBody}>
                                                <ul style={{listStyle: 'none'}}>
                                                    <li>
                                                        <span className={classes.mainTreeName}>
                                                            {
                                                                this.checkSubs(item.id) ?
                                                                    <ChevronRightIcon
                                                                        onClick={
                                                                            () => {
                                                                                this.props.clearSearchClassifiers();
                                                                                this.toggleHandler(item.id)
                                                                            }
                                                                        }
                                                                        style={
                                                                            this.state.open === `collapse-${item.id}` ?
                                                                                {verticalAlign: 'middle', cursor: "pointer", transaction: '300ms', color: '#666666', transform: 'rotate(90deg)'}
                                                                                :
                                                                                {verticalAlign: 'middle', cursor: "pointer", transaction: '300ms', color: '#666666', transform: 'rotate(0)'}
                                                                        }
                                                                    />
                                                                    :
                                                                    null
                                                            }
                                                            <svg width={22} height={21} viewBox="0 0 23.249 22.828">
                                                                <defs>
                                                                    <style>
                                                                        {
                                                                            ".fa,.fc{fill:#fff;}.fa{stroke:#fd8087;}.fb{fill:#fe646f;}.fc{stroke:#8ac9fe;}.fd{fill:#60b7ff;}.fe{fill:#fcfbf4;stroke:#fed402;}.ff{fill:#fac600;}.fg{fill:#b5adb6;}"
                                                                        }
                                                                    </style>
                                                                </defs>
                                                                <g transform="translate(0.5 0.5)">
                                                                    <path
                                                                        className="fa"
                                                                        d="M492.119,216.355h20.01a1.131,1.131,0,0,0,1.119-1.142V203.879a1.131,1.131,0,0,0-1.119-1.142H498.353l-.64-1.956a1.121,1.121,0,0,0-1.061-.78h-4.532A1.131,1.131,0,0,0,491,201.142v14.071a1.131,1.131,0,0,0,1.119,1.142Zm0,0"
                                                                        transform="translate(-491 -200)"
                                                                    />
                                                                    <path
                                                                        className="fb"
                                                                        d="M505.484,247.061a.857.857,0,0,1-.813.586H491v11.11a1.142,1.142,0,0,0,1.142,1.142h20.421a1.142,1.142,0,0,0,1.142-1.142V247.423a1.142,1.142,0,0,0-1.142-1.142h-6a1.142,1.142,0,0,0-1.083.78Zm0,0"
                                                                        transform="translate(-491 -243.544)"
                                                                    />
                                                                    <path
                                                                        className="fc"
                                                                        d="M512.106,262.636H492.142A1.142,1.142,0,0,1,491,261.494V250.159a1.142,1.142,0,0,1,1.142-1.142H506.2l.653-1.956a1.142,1.142,0,0,1,1.083-.78h4.168a1.142,1.142,0,0,1,1.142,1.142v14.07a1.142,1.142,0,0,1-1.142,1.142Zm0,0"
                                                                        transform="translate(-491 -243.544)"
                                                                    />
                                                                    <path
                                                                        className="fd"
                                                                        d="M513.706,261.494a1.142,1.142,0,0,1-1.142,1.142H492.142A1.142,1.142,0,0,1,491,261.494v-11.11h20.193a1.142,1.142,0,0,0,1.142-1.142v-1.818a1.142,1.142,0,0,0-1.142-1.142h1.371a1.142,1.142,0,0,1,1.142,1.142Zm0,0"
                                                                        transform="translate(-491 -243.544)"
                                                                    />
                                                                    <path
                                                                        className="fe"
                                                                        d="M492.142,308.913h19.964a1.142,1.142,0,0,0,1.142-1.142V296.436a1.142,1.142,0,0,0-1.142-1.142H498.5l-.653-1.956a1.142,1.142,0,0,0-1.083-.781h-4.625A1.142,1.142,0,0,0,491,293.7v14.071a1.142,1.142,0,0,0,1.142,1.142Zm0,0"
                                                                        transform="translate(-491 -287.085)"
                                                                    />
                                                                    <path
                                                                        className="ff"
                                                                        d="M833.875,338.836H832.5a1.142,1.142,0,0,1,1.142,1.142v11.334a1.142,1.142,0,0,1-1.142,1.142h1.37a1.142,1.142,0,0,0,1.142-1.142V339.978a1.142,1.142,0,0,0-1.142-1.142Zm0,0"
                                                                        transform="translate(-812.311 -330.627)"
                                                                    />
                                                                    <path
                                                                        className="fg"
                                                                        d="M602,510.422"
                                                                        transform="translate(-595.437 -492.067)"
                                                                    />
                                                                </g>
                                                            </svg>
                                                            <span className={classes.classifMainName}>
                                                                <CheckboxesUi
                                                                    useColor={this.props.advancedSearchConfig['classifier'] && this.props.advancedSearchConfig['classifier'].id === item.id && this.props.advancedSearchConfig['classifier'].name === item.name ? '#20d62e' : null}
                                                                    padding={0}
                                                                    checked={!!(this.props.advancedSearchConfig['classifier'] && this.props.advancedSearchConfig['classifier'].id === item.id && this.props.advancedSearchConfig['classifier'].name === item.name)}
                                                                    color={'primary'}
                                                                    label={'Բոլորը'}
                                                                    name={item.name}
                                                                    value={item.id}
                                                                    hidden={true}
                                                                    size={'small'}
                                                                    translate={false}
                                                                    onChange={event =>
                                                                        this.classifiersSelectHandler(event, event.target.value, event.target.checked, item)
                                                                    }
                                                                />
                                                            </span>
                                                        </span>
                                                        <Collapse in={this.state.open === `collapse-${item.id}`} timeout="auto" unmountOnExit>
                                                            <ul  style={{listStyle: 'none', paddingLeft: 25}}>
                                                            <li>

                                                                {/*<Collapse in={this.state.isOpen === item.id} timeout="auto" unmountOnExit>*/}
                                                                    {
                                                                        this.props.subgroups ?
                                                                            <TreeViewer
                                                                                // DATA
                                                                                fonstStyale={classes.fonstStyale}
                                                                                group={item}
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
                                        </div>
                                    )
                                }
                            )
                            :
                            <SpinnerForContent/>
                    }
                </SlickSlider>
            </div>
        )
    }
}

function mapStateToProps(state) {

    return {
        groups: state.characteristics.groups,
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
        clearSearchClassifiers: () => dispatch(clearSearchClassifiers())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassifiersTree)