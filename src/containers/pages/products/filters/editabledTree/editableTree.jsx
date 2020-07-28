import React from "react"
import classes from './editableTree.module.css'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import Collapse from "@material-ui/core/Collapse"
import CustomButton from "../../../../../components/UI/button/customButton/customButton"
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline'

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
                                <svg width={14} height={14} viewBox="0 0 16.169 16.168">
                                    <path
                                        className={classes.arrows}
                                        d="M14.045,5.99a.367.367,0,0,0-.218.1l-2.2,2.2a.367.367,0,1,0,.517.523l1.579-1.579v6.465H7.252l1.579-1.579a.368.368,0,1,0-.517-.523l-2.2,2.2a.368.368,0,0,0,0,.523l2.2,2.2a.367.367,0,1,0,.517-.523L7.252,14.442h6.465V20.9l-1.579-1.579a.368.368,0,1,0-.517.523l2.2,2.2a.368.368,0,0,0,.517,0l2.2-2.2a.367.367,0,1,0-.517-.523L14.452,20.9v-6.46h6.465l-1.579,1.573a.367.367,0,1,0,.517.523l2.2-2.2a.368.368,0,0,0,0-.523l-2.2-2.2a.368.368,0,1,0-.517.523l1.579,1.579H14.452V7.242l1.579,1.579a.367.367,0,1,0,.517-.523l-2.2-2.2A.368.368,0,0,0,14.045,5.99Z"
                                        transform="translate(-6 -5.988)"
                                    />
                                </svg>
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
                                <svg width={14} height={14} viewBox="0 0 14.468 16.168">
                                    <g transform="translate(0 0)">
                                        <rect
                                            className={classes.editIcon}
                                            width={13.617}
                                            height={0.851}
                                            transform="translate(0 15.318)"
                                        />
                                        <path
                                            className={classes.editIcon}
                                            d="M16.32,2.4l-.9-.9a1.917,1.917,0,0,0-2.708,0L4.585,9.622a.425.425,0,0,0-.108.184l-1.2,4.213a.426.426,0,0,0,.526.527l4.213-1.2a.421.421,0,0,0,.184-.108L16.32,5.109a1.914,1.914,0,0,0,0-2.708ZM7.672,12.553l-3.37.963.963-3.37L11.806,3.6l2.407,2.407Zm8.046-8.045-.9.9L12.408,3l.9-.9a1.066,1.066,0,0,1,1.5,0l.9.9a1.065,1.065,0,0,1,0,1.5Z"
                                            transform="translate(-2.413 -0.939)"
                                        />
                                    </g>
                                </svg>
                            }
                            // Methods
                            onClick={() => props.onEditClassifier(item, 'subgroup')}
                        />
                        <CustomButton
                            className={`${classes.cntBtns} ${classes.ctrAllBtn}`}
                            children={
                                <svg width={14} height={14} viewBox="0 0 15.761 15.761">
                                    <g transform="translate(7.88 0.736) rotate(45)">
                                        <path
                                            className={classes.addIcon}
                                            d="M9.733.063,5.206,4.6a.2.2,0,0,1-.293,0L.37.063a.2.2,0,0,0-.293,0h0a.2.2,0,0,0,0,.293L4.619,4.9a.2.2,0,0,1,0,.293L.063,9.733a.2.2,0,0,0,0,.293h0a.2.2,0,0,0,.293,0L4.9,5.485a.2.2,0,0,1,.293,0l4.542,4.556a.2.2,0,0,0,.293,0h0a.2.2,0,0,0,0-.293L5.5,5.206a.2.2,0,0,1,0-.293L10.041.37a.2.2,0,0,0,0-.293h0A.208.208,0,0,0,9.733.063Z"
                                            transform="translate(0 0)"
                                        />
                                    </g>
                                </svg>
                            }
                            // Methods
                            onClick={() => props.onAddClassifier(item.id, 'subgroup')}
                        />
                        <CustomButton
                            className={`${classes.cntBtns} ${classes.ctrAllBtn}`}
                            children={
                                <svg width={14} height={14} viewBox="0 0 15.558 16.568">
                                    <g transform="translate(-19.8 -17.8)">
                                        <path
                                            className={classes.deleteIcon}
                                            d="M23.537,34.168h8.084A1.768,1.768,0,0,0,33.39,32.4V21.284h1.516a.253.253,0,0,0,0-.505H30.358V19.263A1.263,1.263,0,0,0,29.095,18H26.063A1.263,1.263,0,0,0,24.8,19.263v1.516H20.253a.253.253,0,0,0,0,.505h1.516V32.4A1.768,1.768,0,0,0,23.537,34.168Zm1.768-14.905a.758.758,0,0,1,.758-.758h3.032a.758.758,0,0,1,.758.758v1.516H25.305Zm7.579,2.021V32.4a1.263,1.263,0,0,1-1.263,1.263H23.537A1.263,1.263,0,0,1,22.274,32.4V21.284Z"
                                        />
                                        <path
                                            className={classes.deleteIcon}
                                            d="M41.253,50.305a.253.253,0,0,0,.253-.253v-4.8a.253.253,0,0,0-.505,0v4.8A.253.253,0,0,0,41.253,50.305Z"
                                            transform="translate(-15.695 -20.179)"
                                        />
                                        <path
                                            className={classes.deleteIcon}
                                            d="M57.253,50.305a.253.253,0,0,0,.253-.253v-4.8a.253.253,0,0,0-.505,0v4.8A.253.253,0,0,0,57.253,50.305Z"
                                            transform="translate(-27.653 -20.179)"
                                        />
                                    </g>
                                </svg>
                            }
                            // onClick={() => props.onDeleteClassifier(item.id)}
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