import React from "react";
import classes from './classifiersTree.module.css'
import FolderIcon from "@material-ui/icons/Folder";
import Collapsee from '@material-ui/core/Collapse';
import {Collapse} from 'reactstrap';
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import {animated, useSpring} from "react-spring/web.cjs";
import PropTypes from "prop-types";
import CheckboxesUi from "../../../../../../components/checkBoxUI/checkBoxUI";

function TransitionComponent(props) {
    const style = useSpring({
        from: {opacity: 0, transform: 'translate3d(20px,0,0)'},
        to: {opacity: props.in ? 1 : 0, transform: `translate3d(${props.in ? 0 : 20}px,0,0)`},
    });

    return (
        <animated.div style={style}>
            <Collapsee {...props} />
        </animated.div>
    );
}

TransitionComponent.propTypes = {
    /**
     * Show the component; triggers the enter or exit states
     */
    in: PropTypes.bool,
};

const ClassifaersTree = props => {

    const toggle = (event, id) => {
        event.stopPropagation()
        props.subGroupCollapses(id)
    }

    const treeItemRender = (group_id, id) => {

        let allData = props.data.map(
            item => {
                if (parseInt(item.parent_id) === parseInt(id)) {
                    let groupId = item.group_id ? item.group_id.id : false
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
                                    style={
                                        props.sectionFontColor ?
                                            {color: props.sectionFontColor}
                                            :
                                            null
                                    }
                                >
                                    {
                                        treeItemRender(item.group_id.id, item.id).length > 0 ?
                                            <FolderIcon
                                                onClick={
                                                    event => toggle(event, item.id)
                                                }
                                                style={{
                                                    color: '#ffc749',
                                                    verticalAlign: "middle",
                                                    marginRight: '5px'
                                                }}
                                                fontSize={'small'}
                                            />
                                            :
                                            <FolderOpenIcon
                                                onClick={
                                                    event => toggle(event, item.id)
                                                }
                                                style={{
                                                    color: '#ffc749',
                                                    verticalAlign: "middle",
                                                    marginRight: '5px'
                                                }}
                                                fontSize={'small'}
                                            />
                                    }
                                    <span style={{height: 20}}>
                                        <CheckboxesUi
                                            useColor={props.advancedSearchConfig.classifier && props.advancedSearchConfig.classifier === item.id ? '#20d62e' : null}
                                            padding={0}
                                            checked={props.advancedSearchConfig.classifier && props.advancedSearchConfig.classifier === item.id ? true : false}
                                            color={'primary'}
                                            label={item.name}
                                            name={item.name}
                                            value={item.id}
                                            hidden={true}
                                            size={'small'}
                                            translate={false}
                                            onChange={event => props.onChange(event, event.target.value, event.target.checked)}
                                        />
                                    </span>
                                </span>
                                {
                                    treeItemRender(item.group_id.id, item.id).length > 0 ?
                                        <Collapse isOpen={!!parseInt(props.collapsedStatus[item.id])}>
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
        )
        let arr = []
        allData.map(
            (item, index) => {
                if (item !== null) {
                    arr.push(item)
                }
                return allData
            }
        )
        return arr;
    }

    return (
        <ul
            className={classes.tree}
            style={{
                listStyle: 'none'
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
                                            style={
                                                props.sectionFontColor ?
                                                    {color: props.sectionFontColor}
                                                    :
                                                    null
                                            }
                                        >
                                            {
                                                treeItemRender(item.group_id.id, item.id).length > 0 ?
                                                    <FolderIcon
                                                        onClick={
                                                            event => toggle(event, item.id)
                                                        }
                                                        style={{
                                                            color: '#ffc749',
                                                            verticalAlign: "middle",
                                                            marginRight: '5px'
                                                        }}
                                                        fontSize={'small'}
                                                    />
                                                    :
                                                    <FolderOpenIcon
                                                        onClick={
                                                            event => toggle(event, item.id)
                                                        }
                                                        style={{
                                                            color: '#ffc749',
                                                            verticalAlign: "middle",
                                                            marginRight: '5px'
                                                        }}
                                                        fontSize={'small'}
                                                    />
                                            }
                                            <span style={{height: 20}}>
                                                <CheckboxesUi
                                                    useColor={props.advancedSearchConfig.classifier && props.advancedSearchConfig.classifier === item.id ? '#20d62e' : null}
                                                    padding={0}
                                                    checked={props.advancedSearchConfig.classifier && props.advancedSearchConfig.classifier === item.id ? true : false}
                                                    color={'primary'}
                                                    label={item.name}
                                                    name={item.name}
                                                    hidden={true}
                                                    value={item.id}
                                                    size={'small'}
                                                    translate={false}
                                                    onChange={event => props.onChange(event, event.target.value, event.target.checked)}
                                                />
                                            </span>
                                        </span>
                                        {
                                            treeItemRender(item.group_id.id, item.id).length > 0 ?
                                                <Collapse
                                                    isOpen={!!parseInt(props.collapsedStatus[item.id])}>
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
}

export default ClassifaersTree