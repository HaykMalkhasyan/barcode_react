import React from "react";
import classes from './treeViewer.module.css'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import CheckboxesUi from "../../../../../../components/UI/input/checkboxUI/checkboxUI"
import Collapse from "@material-ui/core/Collapse";
import Icons from "../../../../../../components/Icons/icons";

const TreeViewer = props => {

    const toggle = (event, id) => {
        event.stopPropagation();
        props.subGroupCollapses(id)
    };

    const treeItemRender = (group_id, id) => {

        let allData = props.data.map(
            item => {
                if (parseInt(item.parent_id) === parseInt(id)) {
                    let groupId = item.group_id ? item.group_id.id : false;
                    if (parseInt(groupId) === parseInt(group_id)) {

                        return (
                            <li
                                key={item.id}
                                style={
                                    props.sectionFontColor ?
                                        {color: props.sectionFontColor}
                                        :
                                        null
                                }
                            >
                                <span
                                    onDoubleClick={
                                        event => toggle(event, item.id)
                                    }
                                    className={`${props.fonstStyale} ${(props.advancedSearchConfig['classifier'] && (props.advancedSearchConfig['classifier'].id === item.id) && (props.advancedSearchConfig['classifier'].name === item.name)) ? classes.selected : null}`}
                                    style={
                                        props.sectionFontColor ?
                                            {
                                                color: props.sectionFontColor
                                            }
                                            :
                                            null
                                    }
                                >
                                    {
                                        treeItemRender(item.group_id.id, item.id).length > 0 ?
                                            <ChevronRightIcon
                                                style={props.collapsedStatus.includes(item.id) ? {
                                                    verticalAlign: 'middle',
                                                    transaction: '300ms',
                                                    transform: 'rotate(90deg)'
                                                } : {verticalAlign: 'middle', transaction: '300ms'}}
                                                fontSize='small'
                                                onClick={
                                                    event => toggle(event, item.id)
                                                }
                                            />
                                            :
                                            null
                                    }
                                    <span style={{height: 20}}>
                                        <CheckboxesUi
                                            padding={0}
                                            checked={!!(props.advancedSearchConfig['classifier'] && (props.advancedSearchConfig['classifier'].id === item.id) && (props.advancedSearchConfig['classifier'].name === item.name))}
                                            color={'primary'}
                                            label={
                                                <>
                                                    <Icons type={'folder'}/>
                                                    {item.name}
                                                </>
                                            }
                                            name={item.name}
                                            value={item.id}
                                            hidden={true}
                                            size={'small'}
                                            translate={false}
                                            onChange={event =>
                                                props.onChange(event, event.target.value, event.target.checked, item)
                                            }
                                        />
                                    </span>
                                </span>
                                {
                                    treeItemRender(item.group_id.id, item.id).length > 0 ?
                                        <Collapse in={props.collapsedStatus.includes(item.id)} timeout="auto"
                                                  unmountOnExit>
                                            {
                                                <ul style={{listStyle: "none"}}>
                                                    {
                                                        treeItemRender(item.group_id.id, item.id)
                                                    }
                                                </ul>
                                            }
                                        </Collapse>
                                        :
                                        null
                                }
                            </li>
                        )
                    } else {
                        return null
                    }
                } else {
                    return null
                }
            }
        );
        let arr = [];
        allData.map(
            item => {
                if (item !== null) {
                    arr.push(item)
                }
                return allData
            }
        );
        return arr;
    };

    return (
        <ul
            className={classes.tree}
            style={{
                listStyle: 'none',
                marginLeft: 10
            }}
        >
            {
                props.data.length ?
                    props.data.map(
                        item => {
                            return item.group_id && !item.parent_id ?

                                props.group.id === item.group_id.id ?
                                    <li
                                        key={item.id}
                                        className={classes.borderLine}
                                    >
                                        <span
                                            onDoubleClick={
                                                event => toggle(event, item.id)
                                            }
                                            className={`${props.fonstStyale} ${(props.advancedSearchConfig['classifier'] && (props.advancedSearchConfig['classifier'].id === item.id) && (props.advancedSearchConfig['classifier'].name === item.name)) ? classes.selected : null}`}
                                            style={
                                                props.sectionFontColor ?
                                                    {color: props.sectionFontColor}
                                                    :
                                                    null
                                            }
                                        >
                                            {
                                                treeItemRender(item.group_id.id, item.id).length > 0 ?
                                                    <ChevronRightIcon
                                                        style={props.collapsedStatus.includes(item.id) ? {
                                                            verticalAlign: 'middle',
                                                            transaction: '300ms',
                                                            transform: 'rotate(90deg)'
                                                        } : {verticalAlign: 'middle', transaction: '300ms'}}
                                                        fontSize='small'
                                                        onClick={
                                                            event => toggle(event, item.id)
                                                        }
                                                    />
                                                    :
                                                    null
                                            }
                                            <span style={{height: 20, marginLeft: 5}}>
                                                <CheckboxesUi
                                                    padding={0}
                                                    checked={!!(props.advancedSearchConfig['classifier'] && (props.advancedSearchConfig['classifier'].id === item.id) && (props.advancedSearchConfig['classifier'].name === item.name))}
                                                    color={'primary'}
                                                    label={
                                                        <>
                                                            <Icons type={'folder'}/>
                                                            {item.name}
                                                        </>
                                                    }
                                                    name={item.name}
                                                    hidden={true}
                                                    value={item.id}
                                                    size={'small'}
                                                    translate={false}
                                                    onChange={event => props.onChange(event, event.target.value, event.target.checked, item)}
                                                />
                                            </span>
                                        </span>
                                        {
                                            treeItemRender(item.group_id.id, item.id).length > 0 ?
                                                <Collapse
                                                    timeout="auto"
                                                    unmountOnExit
                                                    in={props.collapsedStatus.includes(item.id)}>
                                                    <ul
                                                        className={classes.tree}
                                                        style={{
                                                            listStyle: 'none'
                                                        }}
                                                    >
                                                        {
                                                            treeItemRender(item.group_id.id, item.id)
                                                        }
                                                    </ul>
                                                </Collapse>
                                                :
                                                null
                                        }
                                    </li>
                                    :
                                    null
                                :
                                null
                        }
                    )
                    :
                    null
            }
        </ul>
    )
};

export default TreeViewer