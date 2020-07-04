import React, {useState} from "react";
import classes from './classifiersTree.module.css'
import Collapsee from '@material-ui/core/Collapse';
import {Collapse} from 'reactstrap';
import {animated, useSpring} from "react-spring/web.cjs";
import PropTypes from "prop-types";
import CheckboxesUi from "../../../../../../components/checkBoxUI/checkBoxUI";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

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
    const [toggleItem, setToggleItem] = useState(null)

    const toggle = (event, id) => {
        event.stopPropagation()
        if (toggleItem === id) {
            setToggleItem(null)
        } else {
            setToggleItem(id)
        }
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
                                    // onDoubleClick={
                                    //     event => toggle(event, item.id)
                                    // }
                                    className={props.fonstStyale}
                                    style={
                                        props.sectionFontColor ?
                                            {color: props.sectionFontColor}
                                            :
                                            null
                                    }
                                >
                                    {
                                        treeItemRender(item.group_id.id, item.id).length > 0 ?
                                            <>
                                                <ChevronRightIcon
                                                    style={toggleItem === item.id ? {verticalAlign: 'middle', transaction: '300ms', transform: 'rotate(90deg)'} : {verticalAlign: 'middle', transaction: '300ms'}}
                                                    fontSize='small'
                                                    onClick={
                                                        event => toggle(event, item.id)
                                                    }
                                                />
                                                <svg
                                                    width={18.302}
                                                    height={13.255}
                                                    viewBox="0 0 18.302 13.255"
                                                >
                                                    <defs>
                                                        <style>{".foldera,.folderb{fill:none;}.foldera{stroke:#ffa000;}.folderb{stroke:#ffc107;}"}</style>
                                                    </defs>
                                                    <g transform="translate(-59.375 -279.245)">
                                                        <path
                                                            className="foldera"
                                                            d="M55.283,74.667H44.469a1.8,1.8,0,0,0-1.8,1.8v.721a.36.36,0,0,0,.36.36h3.085a.365.365,0,0,1,.342.242l.393,1.189a1.089,1.089,0,0,0,1.024.732h8.853a.36.36,0,0,0,.36-.36V76.469A1.8,1.8,0,0,0,55.283,74.667Z"
                                                            transform="translate(18.65 205.078)"
                                                        />
                                                        <path
                                                            className="folderb"
                                                            d="M16.22,140.83H6.647a.371.371,0,0,1-.342-.242L5.911,139.4a1.09,1.09,0,0,0-1.024-.732H1.081A1.081,1.081,0,0,0,0,139.748a10.219,10.219,0,0,0,.426,2.93l1.442,4.8A1.8,1.8,0,0,0,3.6,148.76H13.776a1.8,1.8,0,0,0,1.693-1.171l1.557-4.154a4.371,4.371,0,0,0,.275-1.523A1.081,1.081,0,0,0,16.22,140.83Z"
                                                            transform="translate(59.875 143.241)"
                                                        />
                                                    </g>
                                                </svg>
                                            </>
                                            :
                                            null
                                    }
                                    <span style={{height: 20}}>
                                        <CheckboxesUi
                                            useColor={props.advancedSearchConfig.classifier && props.advancedSearchConfig.classifier.id === item.id ? '#20d62e' : null}
                                            padding={0}
                                            checked={props.advancedSearchConfig.classifier && props.advancedSearchConfig.classifier.id === item.id ? true : false}
                                            color={'primary'}
                                            label={item.name}
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
                                            // onDoubleClick={
                                            //     event => toggle(event, item.id)
                                            // }
                                            className={props.fonstStyale}
                                            style={
                                                props.sectionFontColor ?
                                                    {color: props.sectionFontColor}
                                                    :
                                                    null
                                            }
                                        >
                                            {
                                                treeItemRender(item.group_id.id, item.id).length > 0 ?
                                                    <>
                                                        <ChevronRightIcon
                                                            style={toggleItem === item.id ? {verticalAlign: 'middle', transaction: '300ms', transform: 'rotate(90deg)'} : {verticalAlign: 'middle', transaction: '300ms'}}
                                                            fontSize='small'
                                                            onClick={
                                                                event => toggle(event, item.id)
                                                            }
                                                        />
                                                        <svg
                                                            width={18.302}
                                                            height={13.255}
                                                            viewBox="0 0 18.302 13.255"
                                                        >
                                                            <defs>
                                                                <style>{".foldera,.folderb{fill:none;}.foldera{stroke:#ffa000;}.folderb{stroke:#ffc107;}"}</style>
                                                            </defs>
                                                            <g transform="translate(-59.375 -279.245)">
                                                                <path
                                                                    className="foldera"
                                                                    d="M55.283,74.667H44.469a1.8,1.8,0,0,0-1.8,1.8v.721a.36.36,0,0,0,.36.36h3.085a.365.365,0,0,1,.342.242l.393,1.189a1.089,1.089,0,0,0,1.024.732h8.853a.36.36,0,0,0,.36-.36V76.469A1.8,1.8,0,0,0,55.283,74.667Z"
                                                                    transform="translate(18.65 205.078)"
                                                                />
                                                                <path
                                                                    className="folderb"
                                                                    d="M16.22,140.83H6.647a.371.371,0,0,1-.342-.242L5.911,139.4a1.09,1.09,0,0,0-1.024-.732H1.081A1.081,1.081,0,0,0,0,139.748a10.219,10.219,0,0,0,.426,2.93l1.442,4.8A1.8,1.8,0,0,0,3.6,148.76H13.776a1.8,1.8,0,0,0,1.693-1.171l1.557-4.154a4.371,4.371,0,0,0,.275-1.523A1.081,1.081,0,0,0,16.22,140.83Z"
                                                                    transform="translate(59.875 143.241)"
                                                                />
                                                            </g>
                                                        </svg>
                                                    </>
                                                    :
                                                    null
                                            }
                                            <span style={{height: 20, marginLeft: 5}}>
                                                <CheckboxesUi
                                                    useColor={props.advancedSearchConfig.classifier && props.advancedSearchConfig.classifier.id === item.id ? '#20d62e' : null}
                                                    padding={0}
                                                    checked={props.advancedSearchConfig.classifier && props.advancedSearchConfig.classifier.id === item.id ? true : false}
                                                    color={'primary'}
                                                    label={item.name}
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
                                                    timeout={0}
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