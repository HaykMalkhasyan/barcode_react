import React from "react"
import classes from './editableTree.module.css'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import Collapse from "@material-ui/core/Collapse"
import CustomButton from "../../../../../components/UI/button/customButton/customButton"
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline'
import Icons from "../../../../../components/Icons/icons";

const EditableTreeViewer = props => {

    const toggle = (event, id) => {
        event.stopPropagation();
        props.subGroupCollapses(id)
    };

    const showBtnHandler = (id, name) => {

        if (props.toggleButtons && props.toggleButtons.id === id && props.toggleButtons.name === name) {
            props.setGroupValues('toggleButtons', null)
        } else {
            props.setGroupValues('toggleButtons', {id: id, name: name})
        }
    };

    const getItem = id => {
        for (let item of props.data) {
            if (item['parent_id'] && parseInt(item['parent_id']) === parseInt(id)) {
                return item.id
            }
        }
        return null
    };

    const checkId = () => {
        let arrId = [];
        if (props.subgroup) {
            arrId.push(props.subgroup.id);
            for (let item of props.data) {
                if (item['parent_id'] && parseInt(item['parent_id']) === parseInt(props.subgroup.id)) {
                    arrId.push(item.id);
                    arrId.push(getItem(item.id))
                }
            }
        }

        return arrId
    };

    const moveStatusHandler = (id, array) => {
        let index = true;
        for (let itemId of array) {
            if (itemId === id) {
                index = false
            }
        }
        return index
    };

    const checkSearchItem = (id, searchResult) => {

        if (searchResult.length > 0) {
            for (let item of searchResult) {
                if (id === item) {
                    return classes.searchItem
                }
            }
        }
    };

    const treeNameRender = (item, searchResult) => {
        return (
            <span
                className={`
                ${classes.mainNameBlock} 
                ${props.toggleButtons && props.toggleButtons.id === item.id && props.toggleButtons.name === item.name ? classes.mainNameBlockSelected : ''}
                ${props.selectId === item.id ? classes.cut : ''}
                `}
                onClick={showBtnHandler.bind(this, item.id, item.name)}
            >
                <div className={classes.itemMenu}>
                    <div
                        className={`${classes.controllerButtons} ${props.toggleButtons && props.toggleButtons.id === item.id && props.toggleButtons.name === item.name ? classes.controllerButtonsOpened : ''}`}
                    >
                        <CustomButton
                            className={`${classes.cntBtns} ${classes.ctrAllBtn}`}
                            children={
                                <Icons type={'arrows'} iconStyele={classes.arrows}/>
                            }
                            // Methods
                            onClick={
                                () => {
                                    props.setGroupValues('selectId', item.id);
                                    props.onChangePosition(item.id)
                                }
                            }
                        />
                        <CustomButton
                            className={`${classes.cntBtns} ${classes.ctrAllBtn}`}
                            children={
                                <Icons type={'edit'} className={classes.editIcon}/>
                            }
                            // Methods
                            onClick={() => props.onEditClassifier(item, 'subgroup')}
                        />
                        <CustomButton
                            className={`${classes.cntBtns} ${classes.ctrAllBtn}`}
                            children={
                                <Icons type={'add'} className={classes.addIcon}/>
                            }
                            // Methods
                            onClick={() => props.onAddClassifier(item.id, 'subgroup')}
                        />
                        <CustomButton
                            className={`${classes.cntBtns} ${classes.ctrAllBtn}`}
                            children={
                                <Icons type={'delete'} className={classes.deleteIcon}/>
                            }
                            onClick={() => props.onDeleteClassifier(item.id)}
                        />
                    </div>
                </div>
                {
                    treeItemRender(item['group_id'].id, item.id).length > 0 ?
                        <ChevronRightIcon
                            style={props.collapsedStatus.length > 0 && props.collapsedStatus.includes(item.id) ? {
                                verticalAlign: 'middle',
                                transaction: '300ms',
                                transform: 'rotate(90deg)',
                                cursor: 'pointer'
                            } : {verticalAlign: 'middle', transaction: '300ms', cursor: 'pointer'}}
                            fontSize='small'
                            onClick={
                                event => toggle(event, item.id)
                            }
                        />
                        :
                        null
                }
                <Icons type={'folder'}/>
                <span className={`${classes.name} ${checkSearchItem(item.id, searchResult)}`}>
                    <span
                        onDoubleClick={
                            event => toggle(event, item.id)
                        }
                    >
                        {item.name}
                    </span>
                    {
                        props.movingStatus && moveStatusHandler(item.id, checkId()) ?
                            <>
                                <CustomButton
                                className={`${classes.insertBtn} ${classes.ctrAllBtn}`}
                                children={<KeyboardBackspaceIcon style={{fontSize: 20}}/>}
                                // Methods
                                onClick={
                                    () => {
                                        props.setGroupValues('selectId', null);
                                        props.movingHandler(item.id, props.subgroup)
                                    }
                                }
                                />
                                <CustomButton
                                    className={`${classes.cancelBtn} ${classes.ctrAllBtn}`}
                                    children={<RemoveCircleOutlineIcon style={{fontSize: 15}}/>}
                                    // Methods
                                    onClick={
                                        () => {
                                            props.setGroupValues('selectId', null);
                                            props.setGroupValues('movingStatus', false);
                                            props.setGroupValues('subgroup', null)
                                        }
                                    }
                                />
                            </>
                            :
                            null
                    }
                </span>
            </span>
        )
    };

    const treeItemRender = (group_id, id) => {

        let allData = props.data.map(
            item => {
                if (parseInt(item['parent_id']) === parseInt(id)) {
                    let groupId = item['group_id'] ? item['group_id'].id : false;
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
                                {treeNameRender(item, props.searchResult)}
                                {
                                    treeItemRender(item['group_id'].id, item.id).length > 0 ?
                                        <Collapse in={props.collapsedStatus.length > 0 && props.collapsedStatus.includes(item.id)} timeout="auto"
                                                  unmountOnExit>
                                            {
                                                <ul style={{listStyle: "none"}}>
                                                    {
                                                        treeItemRender(item['group_id'].id, item.id)
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
                            return item['group_id'] && item['parent_id'].length === 0 ?

                                props.group.id === item['group_id'].id ?
                                    <li
                                        key={item.id}
                                        className={classes.borderLine}
                                    >
                                        {treeNameRender(item, props.searchResult)}
                                        {
                                            treeItemRender(item['group_id'].id, item.id).length > 0 ?
                                                <Collapse
                                                    timeout="auto"
                                                    unmountOnExit
                                                    in={props.collapsedStatus.length > 0 && props.collapsedStatus.includes(item.id)}>
                                                    <ul
                                                        className={classes.tree}
                                                        style={{
                                                            listStyle: 'none'
                                                        }}
                                                    >
                                                        {
                                                            treeItemRender(item['group_id'].id, item.id)
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

export default EditableTreeViewer