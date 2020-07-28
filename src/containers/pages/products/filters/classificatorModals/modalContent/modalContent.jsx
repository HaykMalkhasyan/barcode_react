import React from 'react'
import classes from './modalContent.module.css'
import CustomButton from "../../../../../../components/UI/button/customButton/customButton"
import CustomInput from "../../../../../../components/UI/input/customInput/customInput"
import SearchIcon from '@material-ui/icons/Search'
import EditableTreeViewer from "../../editabledTree/editableTree"
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'
import Tooltip from "@material-ui/core/Tooltip";
import SpinnerForContent from "../../../../../../components/UI/spinerForContent/spinnerForContent";
import ConfirmButton from "../../../../../../components/UI/button/confirmButton/confirmButton";

const ModalContent = props => {

    const showBtnHandler = (id, name) => {

        if (props.toggleButtons && props.toggleButtons.id === id && props.toggleButtons.name === name) {
            props.setGroupValues('toggleButtons', null)
        } else {
            props.setGroupValues('toggleButtons', {id: id, name: name})
        }
    };

    const onChangePosition = id => {
        props.getSubgroup(id);
        props.setGroupValues('movingStatus', id)
    };

    const onAddClassifier = (id, type) => {

        if (type === 'group') {
            props.getGroup(id)
        } else if (type === 'subgroup') {
            props.getSubgroup(id)
        } else if (type === 'inGroup') {
            props.getGroup(id)
        }

        props.setGroupValues('modalType', 'add');
        props.setGroupValues('groupType', type);
        props.setProductValues('classifiersModal', false)
    };

    const onEditClassifier = (item, type) => {
        const newGroup = {...props.newGroup};
        if (type === 'group') {
            props.getGroup(item.id);
            newGroup.name = item.name;
            newGroup.required_group = item.required_group;
            newGroup.image = item.image
        } else if (type === 'subgroup') {
            props.getSubgroup(item.id);
            newGroup.name = item.name;
            newGroup.image = item.image
        }

        props.setGroupValues('newGroup', newGroup);
        props.setGroupValues('modalType', 'edit');
        props.setGroupValues('groupType', type);
        props.setProductValues('classifiersModal', false)
    };

    const movingHandler = (id, subgroup) => {
        let data = subgroup;
        data['parent_id'] = id;
        data['group_id']['group_type'] = '1';
        props.editSubgroup(data);
        props.setGroupValues('movingStatus', null);
        props.setGroupValues('subgroup', null);
    };

    const movingParentGroupHandler = subgroup => {
        let data = subgroup;
        data['parent_id'] = "";
        if (data['group_id']['group_type'] === "") {
            data['group_id']['group_type'] = '1';
        }
        props.editSubgroup(data);
        props.setGroupValues('movingStatus', null);
        props.setGroupValues('subgroup', null);
    };

    const searchChangeHandler = (name, value) => {
        props.searchHandler(name, value)
    };

    return (
        <div className={classes.main}>
            <header>
                <CustomButton
                    className={classes.closeBtnWithIcon}
                    children={
                        <svg width={10.063} height={10.075} viewBox="0 0 10.063 10.075">
                            <defs>
                                <style>{".closeBtnWithIcon{fill:#4b4b4b;stroke:#4b4b4b;opacity:0.36;}"}</style>
                            </defs>
                            <path
                                className="closeBtnWithIcon"
                                d="M22.554,13.206l-4.049,4.062a.181.181,0,0,1-.262,0l-4.062-4.062a.181.181,0,0,0-.262,0h0a.181.181,0,0,0,0,.262L17.98,17.53a.181.181,0,0,1,0,.262l-4.074,4.062a.181.181,0,0,0,0,.262h0a.181.181,0,0,0,.262,0l4.062-4.062a.181.181,0,0,1,.262,0l4.062,4.074a.181.181,0,0,0,.262,0h0a.181.181,0,0,0,0-.262l-4.049-4.062a.181.181,0,0,1,0-.262l4.062-4.062a.181.181,0,0,0,0-.262h0A.186.186,0,0,0,22.554,13.206Z"
                                transform="translate(-13.323 -12.61)"
                            />
                        </svg>
                    }
                    // Methods
                    onClick={props.handleClose}
                />
                <div className={classes.forOf}>
                    <h3>Դասակարգչի խմբագրում</h3>
                    <h6>Դասակարգիչը խմբագրելու համար սեղմել համապատասխան տողի վրա։</h6>
                </div>
            </header>
            <section>
                <div className={classes.content}>
                    <div className={classes.groupName}>
                        {
                            props.nextGroup ?
                                <CustomButton
                                    className={classes.nextSlide}
                                    children={
                                        <Tooltip title={props.nextGroup.name} placement="right">
                                            <svg width={5} height={9} viewBox="0 0 5.182 9.675">
                                                <g transform="translate(0 9.675) rotate(-90)">
                                                    <g transform="translate(0 0)">
                                                        <path
                                                            className={props.nextSlideIcon}
                                                            d="M4.907,5.178a.516.516,0,0,0,.285-.14L9.492.91A.516.516,0,1,0,8.782.163L4.837,3.952.893.163A.516.516,0,1,0,.183.91l4.3,4.128A.516.516,0,0,0,4.907,5.178Z"
                                                        />
                                                    </g>
                                                </g>
                                            </svg>
                                        </Tooltip>
                                    }
                                    // Methods
                                    onClick={
                                        () => props.changeStatus ?
                                            props.handleOpen(props.nextGroup, (props.indexKey + 1), props.groups[props.indexKey] || null, props.groups[props.indexKey + 2] || null)
                                            :
                                            null
                                    }
                                />
                                :
                                null
                        }
                        {
                            props.prevGroup ?
                                <CustomButton
                                    className={classes.prevSlide}
                                    children={
                                        <Tooltip title={props.prevGroup.name} placement="left">
                                            <svg width={5} height={9} viewBox="0 0 5.182 9.675">
                                                <g transform="translate(5.182) rotate(90)">
                                                    <path
                                                        className={props.prevSlideIcon}
                                                        d="M4.907,5.178a.516.516,0,0,0,.285-.14L9.492.91A.516.516,0,1,0,8.782.163L4.837,3.952.893.163A.516.516,0,1,0,.183.91l4.3,4.128A.516.516,0,0,0,4.907,5.178Z"
                                                    />
                                                </g>
                                            </svg>
                                        </Tooltip>
                                    }
                                    // Methods
                                    onClick={
                                        () => props.changeStatus ?
                                            props.handleOpen(props.prevGroup, (props.indexKey - 1), props.groups[props.indexKey -2] || null, props.groups[props.indexKey] || null)
                                            :
                                            null
                                    }
                                />
                                :
                                null
                        }

                        <span onClick={() => props.classifierOpenHandler(props.group.id)} className={classes.classifierButton}>{props.group ? props.group.name : ''}</span>
                    </div>
                    <div className={classes.searchWindow}>
                        <CustomInput
                            id={'modalSearch'}
                            inputType={'inner'}
                            label={
                                <span className={classes.searchIcon}>
                                    <SearchIcon />
                                </span>
                            }
                            classNameLabel={classes.searchLabel}
                            classNameInput={classes.searchInput}
                            name={'search'}
                            value={props.search}
                            // Methods
                            onChange={event => searchChangeHandler(event.target.name, event.target.value)}
                        />
                    </div>
                    <div>
                        {
                            props.customSubgroup ?
                                <ul style={{listStyle: 'none'}}>
                                    <li>
                                        <span className={`${classes.mainTreeName} ${props.toggleButtons && props.toggleButtons.id === props.group.id && props.toggleButtons.name === props.group.name ? classes.mainNameBlockSelected : ''}`} onClick={showBtnHandler.bind(this, props.group.id, props.group.name)}>
                                             <div className={classes.itemMenu}>
                                                <div
                                                    className={
                                                        `
                                                        ${classes.controllerButtons} 
                                                        ${
                                                            props.toggleButtons && props.toggleButtons.id === props.group.id && props.toggleButtons.name === props.group.name ? 
                                                                classes.controllerButtonsOpened 
                                                                :
                                                                ''
                                                        }
                                                        `
                                                    }
                                                >
                                                    <CustomButton
                                                        className={classes.cntBtns}
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
                                                        onClick={() => onAddClassifier(props.group.id, 'inGroup')}
                                                    />
                                                </div>
                                            </div>
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
                                            <span className={classes.classifMainName}>
                                                {props.group ? props.group.name : ''}
                                                {
                                                    props.movingStatus ?
                                                        <>
                                                            <CustomButton
                                                            className={classes.insertBtn}
                                                            children={<KeyboardBackspaceIcon style={{fontSize: 20}}/>}
                                                            // Methods
                                                            onClick={
                                                                () => {
                                                                    props.setGroupValues('selectId', null);
                                                                    movingParentGroupHandler(props.subgroup)
                                                                }
                                                            }
                                                            />
                                                            <CustomButton
                                                                className={`${classes.cancelBtn}`}
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
                                        <EditableTreeViewer
                                            data={props.customSubgroup}
                                            group={props.group}
                                            subgroup={props.subgroup}
                                            collapsedStatus={props.collapsedStatus}
                                            toggleButtons={props.toggleButtons}
                                            movingStatus={props.movingStatus}
                                            searchResult={props.searchResult}
                                            selectId={props.selectId}
                                            // Methods
                                            subGroupCollapses={props.subGroupCollapses}
                                            setGroupValues={props.setGroupValues}
                                            onChangePosition={onChangePosition}
                                            onAddClassifier={onAddClassifier}
                                            onEditClassifier={onEditClassifier}
                                            movingHandler={movingHandler}
                                        />
                                    </li>
                                </ul>
                                :
                                <SpinnerForContent/>
                        }
                    </div>
                </div>
            </section>
            <footer>
                <ConfirmButton
                    // Methods
                    onClick={props.handleClose}
                />
            </footer>
        </div>
    )
};

export default ModalContent