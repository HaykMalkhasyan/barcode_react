import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Collapsee from '@material-ui/core/Collapse';
import {animated, useSpring} from 'react-spring/web.cjs';
import ContextMenu from "./contextMenu/contextMenu";
import * as Icon from 'react-feather'
import styls from './tree.module.css'
import ButtonUi from "../../../../components/buttons/buttonUi";
import FolderIcon from '@material-ui/icons/Folder';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {Collapse} from 'reactstrap';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';


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

export default function CustomizedTreeView(props) {
    const [menu, setMenu] = useState(false)
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)
    const [id, setId] = useState(null)
    const [group_id, setGroup_id] = useState(null)

    const toggle = id => {
        props.subGroupsCollapseStatus(id)
    };

    useEffect(
        () => {
            window.onclick = () => {
                setMenu(false)
                if (props.movingGroupStatus) {
                    props.endeMovingGroup()
                }
            }
            // if (props.expanded === null) {
            props.seteExpanded([`${props.mI.id}`])
            // }
            window.onscroll = () => setMenu(false)
            // window.onmousedown = () => setMenu(false)
        }, [props.movingGroupStatus, props.seteExpanded]
    )

    const myContextMenu = (event, group_id, id) => {
        event.stopPropagation();
        event.preventDefault()
        setMenu(!menu)
        setX(event.clientX)
        setY(event.clientY)
        setGroup_id(group_id)
        setId(id)
    }

    const onClickHandler = (type, group_id, id) => {

        switch (type) {
            case 'add': {
                props.setActionToggleSubModal(type, group_id, id);
                break;
            }
            case 'edit': {
                props.subGroupActions('get', id);
                props.setActionToggleSubModal(type);
                break;
            }
            case 'move': {
                props.subGroupActions('get', id);
                props.startMovingGroup(id)
                break;
            }
            default: {
                props.subGroupActions('get', id);
                props.subGroupActions('delete', id);
                break;
            }
        }
    }

    const controllersRenderBtnHandler = (type, id, groupId, item) => {
        if (groupId) {
            onClickHandler(type, group_id, id)
        } else {
            if (type === 'edit') {
                props.toggleModal('edit', id);
                props.groupActions("get", item);
            } else if (type === 'delete') {
                props.toggleModal('delete', id)
            }

        }
    }

    const controllersRender = (id, groupId, item) => {

        return (
            <ButtonGroup className='ml-2' variant="text" color="primary" aria-label="text primary button group">
                <ButtonUi
                    className={styls.ctrlButtons}
                    label={<AddIcon style={{fontSize: 14}}/>}
                    width={'auto'}
                    height={'auto'}
                    padding={'0'}
                    margin={'0'}
                    color={'primary'}
                    onClick={
                        groupId ?
                            () => onClickHandler('add', groupId, id)
                            :
                            () => onClickHandler('add', id)
                    }
                />
                <ButtonUi
                    className={styls.ctrlButtons}
                    label={<EditIcon style={{fontSize: 14}}/>}
                    width={'auto'}
                    height={'auto'}
                    padding={'0 5px'}
                    margin={'0'}
                    color={'default'}
                    onClick={() => controllersRenderBtnHandler('edit', id, groupId, item)
                    }
                />
                <ButtonUi
                    className={styls.ctrlButtons}
                    label={<DeleteForeverIcon style={{fontSize: 14}}/>}
                    width={'auto'}
                    height={'auto'}
                    padding={'0 5px'}
                    margin={'0'}
                    color={'secondary'}
                    onClick={() => controllersRenderBtnHandler('delete', id, groupId, item)}
                />
            </ButtonGroup>
        )
    }

    const treeItemRender = (group_id, id, movingGroupStatus) => {
        let statusId = movingGroupStatus
        let x = props.data.map(
            item => {
                if (parseInt(item.parent_id) === parseInt(id)) {
                    let groupId = item.group_id ? item.group_id.id : false
                    if (parseInt(groupId) === parseInt(group_id)) {

                        return (
                            <li key={item.id} style={props.sectionFontColor ? {color: props.sectionFontColor} : null}>
                                    <span
                                        onClick={() => toggle(item.id)}
                                        onContextMenu={event => myContextMenu(event, item.group_id.id, item.id)}
                                        style={{
                                            marginBottom: '1rem',
                                            color: colorHandler(item.id) === '#666' ?
                                                props.sectionFontColor ?
                                                    props.sectionFontColor
                                                    :
                                                    colorHandler(item.id)
                                                :
                                                colorHandler(item.id)
                                        }}
                                    >
                                        {
                                            treeItemRender(item.group_id.id, item.id, statusId).length > 0 ?
                                                <FolderIcon
                                                    style={{
                                                        color: '#ffc749',
                                                        verticalAlign: "middle"
                                                    }}
                                                    fontSize={'small'}
                                                />
                                                :
                                                <FolderOpenIcon
                                                    style={{
                                                        color: '#ffc749',
                                                        verticalAlign: "middle"
                                                    }}
                                                    fontSize={'small'}
                                                />
                                        }
                                        <span
                                            className={animatedHandler(item.id)}
                                        >
                                            {item.name}
                                        </span>
                                        {ctr(item.id, item.group_id.id, item)}
                                        {
                                            statusId ?
                                                (statusId !== +item.parent_id && statusId !== +item.id) ?
                                                    <ButtonUi
                                                        onClick={event => movingHandler(event, item.id)}
                                                    >
                                                        <Icon.ArrowLeft className={styls.leftArrow}/>
                                                    </ButtonUi>
                                                    :
                                                    statusId === +item.parent_id ?
                                                        statusId = false
                                                        :
                                                        null
                                                :
                                                null
                                        }
                                    </span>
                                {
                                    treeItemRender(item.group_id.id, item.id, statusId).length > 0 ?
                                        <Collapse
                                            isOpen={!!parseInt(props.collapsedStatus[item.id])}
                                        >
                                            {
                                                <ul className={styls.list} style={{listStyle: 'none'}}>
                                                    {
                                                        treeItemRender(item.group_id.id, item.id, statusId)
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
                        return null;
                    }
                } else {
                    return null;
                }
            }
        )
        let arr = []

        x.map(
            (item, index) => {
                if (item !== null) {
                    arr.push(item)
                }
                return x;
            }
        )
        return arr
    }


    const movingHandler = (event, id) => {

        event.stopPropagation()
        props.editPosition(id)
    }

    const handleToggle = (event, nodeIds) => {
        props.seteExpanded(nodeIds);
    };

    const checkId = (searchId, id) => {

        if (searchId && searchId.length > 0) {
            for (let item of searchId) {
                if (item === id) {
                    return true
                }
            }
        }
    }

    const colorHandler = (id) => {
        let color;
        if (props.expanded && Object.keys(props.expanded).length > 0) {
            for (let item of props.expanded) {
                if ((parseInt(item) === parseInt(id)) || checkId(props.searchResItem, parseInt(id))) {
                    return '#4fb555';
                } else {
                    color = '#666'
                }
            }
        }
        return color
    }
    const animatedHandler = (id) => {
        let color;
        if (props.expanded && Object.keys(props.expanded).length > 0) {
            for (let item of props.expanded) {
                if ((parseInt(item) === parseInt(id)) || checkId(props.searchResItem, parseInt(id))) {
                    return styls.searchAnimated;
                }
            }
        }
        return color
    }

    const ctr = (id, groupId, elem) => {
        if (props.editabled === true) {
            return controllersRender(id, groupId, elem)
        }
    }

    return (

        <>
            {
                menu ?
                    <ContextMenu
                        onClick={onClickHandler}
                        left={x}
                        top={y}
                        id={id}
                        group_id={group_id}
                    />
                    :
                    null
            }

            <ul className={styls.mainList}>
                <li className={styls.borderLine}>
                    <span
                        onClick={() => toggle(props.mainId)}
                        style={props.sectionFontColor ? {color: props.sectionFontColor, marginBottom: '1rem'} : {
                            marginBottom: '1rem'
                        }}
                    >
                        <FolderIcon
                            style={{
                                color: '#ffc749',
                                verticalAlign: "middle"
                            }}
                            fontSize={'small'}
                        />
                        {props.mainName}
                        {ctr(props.mainId, null, props.mI)}
                    </span>
                    <Collapse isOpen={true}
                              style={{paddingLeft: '10px', backgroundColor: 'transparent'}}>

                        <ul className={styls.tree} style={{listStyle: 'none'}}>
                            {
                                props.data.length ?
                                    props.data.map(
                                        item => {

                                            return item.group_id && !item.parent_id ?

                                                props.mainId === item.group_id.id ?
                                                    <li key={item.id} className={styls.borderLine}>

                                                            <span
                                                                onClick={() => toggle(item.id)}
                                                                onContextMenu={event => myContextMenu(event, item.group_id.id, item.id)}
                                                                style={{
                                                                    marginBottom: '1rem',
                                                                    color: colorHandler(item.id) === '#666' ?
                                                                        props.sectionFontColor ?
                                                                            props.sectionFontColor
                                                                            :
                                                                            colorHandler(item.id)
                                                                        :
                                                                        colorHandler(item.id)
                                                                }}
                                                            >
                                                                {
                                                                    treeItemRender(item.group_id.id, item.id, props.movingGroupStatus).length > 0 ?
                                                                        <FolderIcon
                                                                            style={{
                                                                                color: '#ffc749',
                                                                                verticalAlign: "middle"
                                                                            }}
                                                                            fontSize={'small'}
                                                                        />
                                                                        :
                                                                        <FolderOpenIcon
                                                                            style={{
                                                                                color: '#ffc749',
                                                                                verticalAlign: "middle"
                                                                            }}
                                                                            fontSize={'small'}
                                                                        />
                                                                }
                                                                <span
                                                                    className={animatedHandler(item.id)}
                                                                >
                                                                    {item.name}
                                                                </span>
                                                                {ctr(item.id, item.group_id.id, item)}
                                                                {
                                                                    props.movingGroupStatus &&  props.movingGroupStatus !== item.id ?
                                                                        <ButtonUi
                                                                            onClick={event => movingHandler(event, item.id)}
                                                                        >
                                                                            <Icon.ArrowLeft
                                                                                className={styls.leftArrow}/>
                                                                        </ButtonUi>
                                                                        :
                                                                        null
                                                                }
                                                            </span>
                                                        {
                                                            treeItemRender(item.group_id.id, item.id, props.movingGroupStatus).length > 0 ?
                                                                <Collapse
                                                                    isOpen={!!parseInt(props.collapsedStatus[item.id])}
                                                                >
                                                                    <ul className={styls.tree}
                                                                        style={{listStyle: 'none'}}>
                                                                        {
                                                                            treeItemRender(item.group_id.id, item.id, props.movingGroupStatus)
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
                    </Collapse>
                </li>
            </ul>
        </>
    );
}
