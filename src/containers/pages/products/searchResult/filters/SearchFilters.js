import MySearch from "../../../../../components/mySearch/mySearch";
import ClassifiersModal from "../../searchGroup/classifiersModal/classifiersModal";
import CheckboxesUi from "../../../../../components/checkBoxUI/checkBoxUI";
import SwitchesUi from "../../../../../components/switchUI/switchUI";
import classes from "./SearchFilters.module.css";
import {Col} from "reactstrap";
import React, {useState} from "react";
import SearchIcon from "@material-ui/icons/Search";
import Translate from "../../../../../Translate";
import TextFields from "../../../../../components/textFieldUI/textField";

const SearchFilters = props => {
    const [active, setActive] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const handleClick = (item) => {
        if (isOpen === item.name) {
            setIsOpen(false)
        } else {
            setIsOpen(item.name)
            setActive(item.id)
            props.selectClassifiersGroup(item)
        }
    }

    const classifiersSelectHandler = (event, value, check, item) => {
        event.stopPropagation()
        props.toggleCheckBoxValue('classifier', check, +value, item)
    }
    return (
        <Col lg={4} xl={3} className={classes.leftPanel}>
            <div className="p-1">
                <TextFields
                    type={'search'}
                    label={<><SearchIcon/><Translate name={'search'}/></>}
                    name={'searchProduct'}
                />
            </div>
            <div className={`p-0 ${classes.filters}`}>
                <ClassifiersModal
                    active={active}
                    isOpen={isOpen}
                    handleClick={handleClick}
                    classifiersSelectHandler={classifiersSelectHandler}
                    subGroupCollapses={props.subGroupCollapses}
                    collapsedStatus={props.collapsedStatus}
                    sectionFontColor={props.sectionFontColor}
                    toggleCheckBoxValue={props.toggleCheckBoxValue}
                    groups={props.groups}
                    group={props.group}
                    createError={props.createError}
                    classifiersToggleModal={props.classifiersToggleModal}
                    subGroups={props.subGroups}
                    classifiersModal={props.classifiersModal}
                    selectClassifiersGroup={props.selectClassifiersGroup}
                    selectGroupsNode={props.selectGroupsNode}
                    createClassifiers={props.createClassifiers}
                    advancedSearchConfig={props.advancedSearchConfig}
                />
            </div>
            <hr style={{borderColor: '#eee'}}/>
            <div>
                {
                    Object.keys(props.searchProduct).map(
                        (item, index) => {

                            return (
                                <Col
                                    md={12}
                                    key={index}
                                    style={props.sectionFontColor ? {color: props.sectionFontColor} : null}
                                    className='py-1 pl-2'
                                >
                                    <CheckboxesUi
                                        translate={true}
                                        checked={props.advancedSearchConfig[item] ? props.advancedSearchConfig[item] : false}
                                        label={item}
                                        size={"small"}
                                        color={"primary"}
                                        name={item}
                                        onChange={event => props.changeCheckboxHandler(event.target.name, event.target.checked)}
                                    />
                                </Col>
                            )
                        }
                    )
                }
            </div>
            <hr style={{borderColor: '#eee'}}/>
            <div
                className='m-2 px-2'
                style={props.sectionFontColor ?
                    {color: props.sectionFontColor}
                    :
                    null
                }
            >
                <SwitchesUi
                    mBottom={0}
                    label={'Image'}
                    name={'image'}
                    color={"primary"}
                    value={props.advancedSearchConfig.image}
                    onChange={event => props.changeSwitchHandler(event.target.name, event.target.value)}
                />
            </div>
            <div
                className='m-2 px-2'
                style={props.sectionFontColor
                    ?
                    {color: props.sectionFontColor}
                    :
                    null
                }
            >
                <SwitchesUi
                    mBottom={0}
                    label={'active'}
                    name={'hasActive'}
                    color={"primary"}
                    value={props.advancedSearchConfig.hasActive}
                    onChange={event => props.changeSwitchHandler(event.target.name, event.target.value)}
                />
            </div>
            <div
                className='m-2 px-2'
                style={props.sectionFontColor ?
                    {color: props.sectionFontColor}
                    :
                    null
                }
            >
                <SwitchesUi
                    mBottom={0}
                    label={'suppliers'}
                    name={'hasSuppliers'}
                    color={"primary"}
                    value={props.advancedSearchConfig.hasSuppliers}
                    onChange={event => props.changeSwitchHandler(event.target.name, event.target.value)}
                />
            </div>
        </Col>
    )
}

export default SearchFilters