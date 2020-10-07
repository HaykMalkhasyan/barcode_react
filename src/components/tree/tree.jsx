import React, {useState} from 'react'
import classes from './tree.module.css'
import Collapse from "@material-ui/core/Collapse"
import MovingButton from "./movingButton/movingButton"
import Icons from "../Icons/icons";
import CustomButton from "../UI/button/customButton/customButton";
import cookie from "../../services/cookies";
import { FixedSizeList as List } from "react-window";

const Tree = props => {
    const [active, setActive] = useState(null);
    const [openGroup, setOpenGroup] = useState(true);
    const[ count, setCount] = useState({});

    const toggle = (event, id, status) => {
        event.stopPropagation();

        switch (props.type) {
            case 'edit': {
                if (status) {
                    props.subCollapsedGroup(id)
                } else {
                    props.subCollapsed(id)
                }
                props.setTreeValue('controllerId', null);
                break;
            }
            case 'select': {
                if (status) {
                    props.subCollapsedGroup(id, 'classifiersCollapsedGroup')
                } else {
                    props.subCollapsed(id, 'classifiersCollapsed')
                }
                break;
            }
            default:
                break;
        }
    };

    const checkSubs = (id, sub, level) => {
        if (sub) {
            for (let item of sub) {
                switch (level) {
                    case 1: {
                        if (item.parent_id === "") {
                            return true
                        }
                        break
                    }
                    case 2: {
                        if (parseInt(item.parent_id) === id) {
                            return true
                        }
                        break;
                    }
                    default:
                        break;
                }
            }
        }
        return false
    };

    const getOwnData = (sub, subgroup) => {
        const data = [];
        for (let [index, item] of Object.entries(subgroup)) {
            if (parseInt(item.parent_id) === parseInt(sub.id)) {
                data.push(
                    ({
                        index: index,
                        id: item.id,
                        parent_id: item.parent_id,
                        level: item.level,
                        name_am: item.name_am,
                        name_ru: item.name_ru,
                        name_en: item.name_en,
                        image: item.image,
                        logo: item.logo,
                        sort: item.sort,
                        cat_id: item.cat_id,
                    })
                )
            }
        }
        return data;
    };

    let dataLength = 20;

    const contentRender = (sub, subgroup, moveElement, leng) => {
        let status = null;
        let thisId = null;
        let data = getOwnData(sub, subgroup);

        const Row = ({index, style}) => (
            <li key={'classifiers-tree' + data[index].id} style={style}>
                        <span
                            id={`inBtn-${data[index].id}`}
                            draggable={props.type === "edit" && props.changePositionStatus}
                            onDragStart={props.type === "edit" && props.changePositionStatus ? event => drag(event, data[index]) : null}
                            // onDragOver={props.type === "edit" ? allowDrop : null}
                            // onDrop={props.type === "edit" ? event => drop(event, item, false) : null}
                            onClick={event => selectItem(event, props.type, data[index])}
                            onDoubleClick={checkSubs(data[index].id, subgroup, 2) ? (event => toggle(event, data[index].id, false)) : null}
                            className={`
                                ${thisId === data[index].id ? `${classes.nameArea} ${classes.cut}` : classes.nameArea} 
                                ${props.controllerId && props.controllerId.id === data[index].id ? classes.nameAreaSelected : ''}
                                ${props.selectSub === data[index].id ? classes.nameAreaSelected : ''}
                                ${props.searchResult && props.searchResult.includes(data[index].id) ? classes.searchSelect : ''}
                                ${props.type === 'select' && props.advancedSearchConfig && checkSelect(props.advancedSearchConfig, data[index]) ? classes.classifiersSelected : ''}
                            `}
                        >
                            {
                                props.type === 'edit' && props.changePositionStatus ?
                                    <CustomButton
                                        id={`downBtn-${data[index].id}`}
                                        className={active === `downBtn-${data[index].id}` ? `${classes.bottomLineButton} ${classes.bottomLineButtonSelected}` : classes.bottomLineButton}
                                        onDragOver={props.type === "edit" ? allowDrop : null}
                                        onDragEnter={props.type === "edit" ? event => dropEnter(event, 'subgroup') : null}
                                        onDragLeave={props.type === "edit" ? dropLeave : null}
                                        onDrop={props.type === "edit" ? event => dropPosition(event, data[index]) : null}
                                    />
                                    :
                                    null
                            }
                            {
                                checkSubs(data[index].id, subgroup, 2) ?
                                    <span
                                        className={classes.chevron}
                                        onClick={
                                            event => {
                                                let initialCount = {...setCount};
                                                initialCount[sub.id] = 200;
                                                setCount(initialCount);
                                                toggle(event, data[index].id, false)
                                            }
                                        }
                                    >
                                        {
                                            props.collapsed.includes(data[index].id) ?
                                                <Icons type={'tree-arrow-down'} className={classes.treeArrowDown}/>
                                                :
                                                <Icons type={'tree-arrow-right'} className={classes.treeArrowRight}/>
                                        }
                                    </span>
                                    :
                                    <span className={classes.chevron}>
                                        <Icons type={'tree-arrow-right-empty'} className={classes.treeArrowRightEmpty}/>
                                    </span>
                            }
                            <span className={classes.name}>
                                 <span className={classes.nameSpace}>{data[index][`name_${cookie.get('language') || 'am'}`]}</span>
                                {
                                    props.type === 'edit' ?
                                        movingButtons(data[index], moveElement, 'inGroup')
                                        :
                                        null
                                }
                            </span>
                        </span>
                <ul
                    className={classes.tree}
                    style={{
                        listStyle: 'none',
                        marginLeft: 10
                    }}
                >
                    <Collapse
                        timeout={0}
                        unmountOnExit
                        in={props.collapsed.includes(data[index].id)}
                    >
                        {contentRender(data[index], subgroup, status, leng)}
                    </Collapse>
                </ul>
            </li>
        );
        console.log(dataLength)
        return (
            <List
                width={'100%'}
                height={200}
                itemCount={data.length}
                itemSize={count[sub.id] ? count[sub.id] : 20}
            >
                {Row}
            </List>
        )

    };

    const selectItem = (event, type, item) => {
        event.stopPropagation();
        switch (type) {
            case 'edit': {
                if (item.hasOwnProperty('parent_id')) {
                    if (props.groupId !== null) {
                        props.setTreeValue('groupId', null)
                    }
                    props.controllerId && props.controllerId.id === item.id ?
                        props.setTreeValue('controllerId', null)
                        :
                        // props.setTreeValue('controllerId', item.id);
                        props.setTreeValue('controllerId', item);
                } else {
                    if (props.controllerId !== null) {
                        props.setTreeValue('controllerId', null)
                    }
                    props.groupId === item.id ?
                        props.setTreeValue('groupId', null)
                        :
                        props.setTreeValue('groupId', item.id)
                }
                break;
            }
            case 'select': {
                props.select(item);
                break;
            }
            default:
                break;
        }
    };

    const movingButtons = (item, moveElement, type) => {

        switch (type) {
            case 'group':
                return (
                    <span
                        className={moveElement === null ? classes.insertWindow : `${classes.showInsertWindow} ${classes.insertWindow}`}>
                        <MovingButton
                            data={props.group}
                            // Methods
                            moveIsHer={props.moveIsHer}
                            cancelMoving={props.cancelMoving}
                        />
                    </span>
                );
            case 'subgroup':
                return (
                    <span
                        className={moveElement && moveElement !== item.id ? `${classes.showInsertWindow} ${classes.insertWindow}` : classes.insertWindow}>
                        <MovingButton
                            data={item}
                            // Methods
                            moveIsHer={props.moveIsHer}
                            cancelMoving={props.cancelMoving}
                        />
                    </span>
                );
            case 'inGroup':
                return (
                    <span
                        className={moveElement && moveElement !== item.id ? `${classes.showInsertWindow} ${classes.insertWindow}` : classes.insertWindow}>
                            <MovingButton
                                data={item}
                                // Methods
                                moveIsHer={props.moveIsHer}
                                cancelMoving={props.cancelMoving}
                            />
                    </span>
                );
            default:
                return null;
        }
    };

    const checkSelect = (config, item) => {
        const classifiers = config.classifiers;
        return classifiers === item;
    };

    const drag = (event, item) => {
        event.dataTransfer.setData("item", JSON.stringify(item));
    };

    const allowDrop = event => {
        event.preventDefault()
    };

    const dropEnter = (event, type) => {

        if (type === 'group') {
            setActive('group-' + event.target.id)
        } else if (type === 'subgroup') {
            setActive(event.target.id)
        }
    };

    const dropLeave = () => {
        setActive(null);
    };

    // const checkParent = (sub, data) => {
    //
    //     if (parseInt(sub['parent_id']) === data.id) {
    //         return false;
    //     }
    //
    //     for (let item of props.customSubgroup) {
    //         if (parseInt(sub['parent_id']) === item.id) {
    //             return checkParent(item, data);
    //         }
    //     }
    //
    //     return true;
    // };

    // const drop = (event, subgroup, type) => {
    //     event.stopPropagation();
    //     setActive(null);
    //     const id = subgroup.id;
    //     const data = {...JSON.parse(event.dataTransfer.getData("item"))};
    //
    //     if (type) {
    //         if (checkParent(subgroup, data)) {
    //             data['parent_id'] = "";
    //             data.active = '1';
    //
    //             if (data.group_id && (data.group_id.group_type !== null || true)) {
    //                 data.group_id.group_type = '1';
    //             }
    //             if (data.image.length > 0 && data.image[0].hasOwnProperty('image')) {
    //                 delete data.image[0].image;
    //             }
    //             props.editSubgroup(data)
    //         }
    //     } else {
    //         if (id !== data.id && checkParent(subgroup, data)) {
    //             data['parent_id'] = id;
    //             data.active = '1';
    //
    //             if (data.group_id && (data.group_id.group_type !== null || true)) {
    //                 data.group_id.group_type = '1';
    //             }
    //             if (data.image.length > 0 && data.image[0].hasOwnProperty('image')) {
    //                 delete data.image[0].image;
    //             }
    //             props.editSubgroup(data)
    //         }
    //     }
    // };

    const dropPosition = (event, subgroup, type = false) => {
        event.stopPropagation();
        setActive(null);
        const data = {...JSON.parse(event.dataTransfer.getData("item"))};
        const newCustomGroup = [];
        if ((subgroup.parent_id === data.parent_id) || (!subgroup.parent_id && data.parent_id === "") || (subgroup.id === parseInt(data.parent_id))) {
            props.customSubgroup.forEach(
                item => data.parent_id === item.parent_id ?
                    newCustomGroup.push(item)
                    :
                    null
            );
            data.active = '1';
            if (data.group_id && (data.group_id.group_type !== null || true)) {
                data.group_id.group_type = '1';
            }
            if (data.image.length > 0 && data.image[0].hasOwnProperty('image')) {
                delete data.image[0].image;
            }
            const index = type ? -1 : newCustomGroup.indexOf(subgroup);
            for (let [key, value] of Object.entries(newCustomGroup)) {
                if (value.group_id && (value.group_id.group_type !== null || true)) {
                    value.group_id.group_type = '1';
                }
                if (value.image.length > 0 && value.image[0].hasOwnProperty('image')) {
                    delete value.image[0].image;
                }
                value.active = '1';
                if (key > index) {
                    value['sort'] = `${parseInt(value['sort']) + 1}`;
                }
            }
            switch (type) {
                case true: {
                    data.sort = `0`;
                    for (let [key, item] of Object.entries(newCustomGroup)) {
                        if (item.id === data.id) {
                            newCustomGroup[key] = data
                        }
                    }
                    break;
                }
                case false: {
                    if (subgroup.id === parseInt(data.parent_id)) {
                        data.sort = `0`;
                        for (let [key, item] of Object.entries(newCustomGroup)) {
                            if (item.id === data.id) {
                                newCustomGroup[key] = data
                            }
                        }
                    } else {
                        let sort = parseInt(subgroup.sort) + 1;
                        data.sort = `${sort}`;
                        for (let [key, item] of Object.entries(newCustomGroup)) {
                            if (item.id === data.id) {
                                newCustomGroup[key] = data
                            }
                        }
                    }
                    break;
                }
                default:
                    break;
            }
            props.editGroupSubGroup(newCustomGroup);
        }
    };

    return (
        <div>
            <div className={classes.block}>
                {
                    props.group && props.customSubgroup ?
                        <ul
                            // className={classes.tree}
                            style={{
                                listStyle: 'none',
                                marginLeft: 10,
                                padding: 0
                            }}
                        >
                            <li className={classes.allName}>
                                    <span
                                        // onDragOver={props.type === 'edit' ? allowDrop : null}
                                        // onDrop={props.type === 'edit' ? event => drop(event, props.group, true) : null}
                                        // onClick={props.type === 'select' ? event => selectItem(event, props.type, props.group) : null}
                                        onClick={event => selectItem(event, props.type, props.group)}
                                        style={{marginBottom: 5}}
                                        className={`
                                            ${classes.nameArea}  
                                            ${props.searchResult && props.searchResult.length ? classes.searchSelect : null}
                                            ${props.type === 'select' && props.advancedSearchConfig && checkSelect(props.advancedSearchConfig, props.group) ? classes.classifiersSelected : null}
                                            ${props.groupId === props.group.id ? classes.classifiersSelected : ''}
                                        `}
                                        onDoubleClick={checkSubs(props.group.id, props.customSubgroup, 1) ? () => setOpenGroup(!openGroup) : null}
                                    >
                                        {
                                            props.type === 'edit' && props.changePositionStatus ?
                                                <CustomButton
                                                    id={`downBtn-${props.group.id}`}
                                                    className={active === `group-downBtn-${props.group.id}` ? `${classes.bottomLineButton} ${classes.bottomLineButtonSelected}` : classes.bottomLineButton}
                                                    onDragOver={props.type === 'edit' ? allowDrop : null}
                                                    onDragEnter={props.type === 'edit' ? event => dropEnter(event, 'group') : null}
                                                    onDragLeave={props.type === 'edit' ? dropLeave : null}
                                                    onDrop={props.type === "edit" ? event => dropPosition(event, props.group, true) : null}
                                                />
                                                :
                                                null
                                        }
                                        {
                                            checkSubs(props.group.id, props.customSubgroup, 1) ?
                                                <span className={classes.chevron} onClick={() => setOpenGroup(!openGroup)}>
                                                    {
                                                        openGroup ?
                                                            <Icons type={'tree-arrow-down'}/>
                                                            :
                                                            <Icons type={'tree-arrow-right'}/>
                                                    }
                                                </span>
                                                :
                                                <span className={classes.chevron}>
                                                    <Icons type={'tree-arrow-right-empty'} className={classes.treeArrowRightEmpty}/>
                                                </span>
                                        }
                                        <span className={classes.name}>
                                            {props.label}
                                            {
                                                props.type === 'edit' ?
                                                    movingButtons(null, props.moveElement, 'group')
                                                    :
                                                    null
                                            }
                                        </span>
                                    </span>
                                <Collapse
                                    timeout={0}
                                    unmountOnExit
                                    in={openGroup}
                                >
                                    <ul
                                        className={classes.tree}
                                        style={{
                                            listStyle: 'none',
                                            marginLeft: 10
                                        }}
                                    >
                                        {
                                            props.customSubgroup ?
                                                props.customSubgroup.map(
                                                    item => {

                                                        return parseInt(item.parent_id) === 0 ?
                                                            <li
                                                                key={`first-level-${item.id}`}
                                                                className={props.type === "edit" && props.changePositionStatus ? classes.borderLine : classes.allName}
                                                            >
                                                                <span
                                                                    id={`inBtn-${item.id}`}
                                                                    draggable={props.type === 'edit' && props.changePositionStatus}
                                                                    onDragStart={props.type === 'edit' && props.changePositionStatus ? event => drag(event, item) : null}
                                                                    // onDragOver={props.type === 'edit' ? allowDrop : null}
                                                                    // onDrop={props.type === 'edit' ? event => drop(event, item, false) : null}
                                                                    onClick={event => selectItem(event, props.type, item)}
                                                                    className={`
                                                                        ${props.moveElement && props.moveElement === item.id ? `${classes.nameArea} ${classes.cut}` : classes.nameArea}
                                                                        ${props.controllerId && props.controllerId.id === item.id ? classes.nameAreaSelected : null}
                                                                        ${props.selectSub === item.id ? classes.nameAreaSelected : null}
                                                                        ${props.searchResult && props.searchResult.includes(item.id) ? classes.searchSelect : null}
                                                                        ${props.type === 'select' && props.advancedSearchConfig && checkSelect(props.advancedSearchConfig, item) ? classes.classifiersSelected : null}
                                                                     `}
                                                                    onDoubleClick={checkSubs(item.id, props.customSubgroup, 2) ? event => toggle(event, item.id, false) : null}
                                                                >
                                                                    {
                                                                        props.type === 'edit' && props.changePositionStatus ?
                                                                            <CustomButton
                                                                                id={`downBtn-${item.id}`}
                                                                                className={active === `downBtn-${item.id}` ? `${classes.bottomLineButton} ${classes.bottomLineButtonSelected}` : classes.bottomLineButton}
                                                                                onDragOver={props.type === 'edit' ? allowDrop : null}
                                                                                onDragEnter={props.type === 'edit' ? event => dropEnter(event, 'subgroup') : null}
                                                                                onDragLeave={props.type === 'edit' ? dropLeave : null}
                                                                                onDrop={props.type === "edit" ? event => dropPosition(event, item) : null}
                                                                            />
                                                                            :
                                                                            null
                                                                    }
                                                                    {
                                                                        checkSubs(item.id, props.customSubgroup, 2) ?
                                                                            <span className={classes.chevron} onClick={event => toggle(event, item.id, false)}>
                                                                                {
                                                                                    props.collapsed.includes(item.id) ?
                                                                                        <Icons type={'tree-arrow-down'}/>
                                                                                        :
                                                                                        <Icons type={'tree-arrow-right'}/>
                                                                                }
                                                                            </span>
                                                                            :
                                                                            <span className={classes.chevron}>
                                                                                <Icons type={'tree-arrow-right-empty'} className={classes.treeArrowRightEmpty}/>
                                                                            </span>
                                                                    }
                                                                    <span className={classes.name}>
                                                                        <span
                                                                            className={classes.nameSpace}>{item[`name_${cookie.get('language') || 'am'}`]}</span>
                                                                        {
                                                                            props.type === 'edit' ?
                                                                                movingButtons(item, props.moveElement, 'subgroup')
                                                                                :
                                                                                null
                                                                        }
                                                                    </span>
                                                                </span>
                                                                <Collapse in={props.collapsed.includes(item.id)}
                                                                          timeout={0} unmountOnExit>
                                                                    <ul
                                                                        className={classes.tree}
                                                                        style={{
                                                                            listStyle: 'none',
                                                                            marginLeft: 10
                                                                        }}
                                                                    >
                                                                        {
                                                                            contentRender(item, props.customSubgroup, props.moveElement && props.moveElement !== item.id ? props.moveElement : null, 20)
                                                                        }
                                                                    </ul>
                                                                </Collapse>
                                                            </li>
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
                        :
                        null
                }
            </div>
        </div>
    )
};

export default Tree;