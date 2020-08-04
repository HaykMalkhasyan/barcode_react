import React, {useState} from 'react'
import classes from './modalContent.module.css'
import CustomButton from "../../../../../../components/UI/button/customButton/customButton"
import CustomInput from "../../../../../../components/UI/input/customInput/customInput"
import SearchIcon from '@material-ui/icons/Search'
import EditableTreeViewer from "../../editabledTree/editableTree"
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'
import SpinnerForContent from "../../../../../../components/UI/spinerForContent/spinnerForContent";
import ConfirmButton from "../../../../../../components/UI/button/confirmButton/confirmButton";
import DeleteModal from "../../../../../../components/deleteModal/deleteModal";
import Backdrop from "../../../../../../components/UI/backdrop/backdrop";
import Icons from "../../../../../../components/Icons/icons";
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import Collapse from "@material-ui/core/Collapse";
import CloseButton from "../../../../../../components/UI/button/closeButton/closeButton";
import InputUI from "../../../../../../components/UI/input/inputUI/inputUI";
import CustomCheckbox from "../../../../../../components/UI/input/customCheckbox/customCheckbox";

const ModalContent = props => {
    const [open, setOpen] = useState(null);
    const [error, setError] = useState(null);

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
        const newSubgroup = {...props.newSubgroup};
        if (type === 'group') {
            props.getGroup(item.id);
            newSubgroup.name = item.name;
            newSubgroup.required_group = item.required_group;
            newSubgroup.image = item.image
        } else if (type === 'subgroup') {
            props.getSubgroup(item.id);
            newSubgroup.name = item.name;
            newSubgroup.image = item.image
        }

        props.setGroupValues('newSubgroup', newSubgroup);
        props.setGroupValues('modalType', 'edit');
        props.setGroupValues('groupType', type);
        props.setProductValues('classifiersModal', false)
    };

    const movingHandler = (id, subgroup) => {
        let data = {...subgroup};
        data['parent_id'] = id;
        data['group_id']['group_type'] = '1';
        data.active = '0';
        delete data.image[0].image;
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
        delete data.image[0].image;
        data.active = '0';
        props.editSubgroup(data);
        props.setGroupValues('movingStatus', null);
        props.setGroupValues('subgroup', null);
    };

    const deleteHandler = id => {
        props.getSubgroup(id);
        props.setGroupValues('delete', true);
    };

    const searchChangeHandler = (name, value) => {
        props.searchHandler(name, value)
    };

    const deleteModalCloseHandler = () => {
        props.setGroupValues('delete', false);
        props.setGroupValues('subgroup', null);
    };

    const deleteModalConfirmHandler = id => {
        props.deleteSubgroup(id);
        props.setGroupValues('delete', false);
        props.setGroupValues('subgroup', null);
    };

    const checkSubs = id => {

        if (props.customSubgroup.length) {
            for (let item of props.customSubgroup) {
                if (item['parent_id'] === "" && item.group_id.id === id) {
                    return true
                }
            }
        }
        return false
    };

    const groupNameChangeHandler = (event, type) => {

        const newGroup = {...props.newGroup};
        switch (type) {
            case "name": {
                setError(null);
                newGroup[event.target.name] = event.target.value;
                props.setGroupValues('newGroup', newGroup);
                break;
            }
            case "required_group": {
                newGroup[event.target.name] = event.target.checked;
                props.setGroupValues('newGroup', newGroup);
                break;
            }
            default:
                break;
        }
    };

    const confirmHandler = () => {
        if (props.newGroup.name.length > 0) {
            props.editGroup({...props.newGroup});
            props.handleClose();
            props.classifierOpenHandler(props.group.id)
        } else {
            setError('Անվանման դաշտը չպետք է դատարկ լինի')
        }
    };

    return (
        <div className={classes.main}>
            {
                props.delete ?
                    <Backdrop
                        className={classes.backdrop}
                        // Methods
                        onClick={deleteModalCloseHandler}
                    />
                    :
                    null
            }
            <DeleteModal
                open={props.delete}
                groupName={props.subgroup ? props.subgroup.name : ''}
                data={props.subgroup}
                alertText={'Դուք չեք կարող ջնջել տվյալ խումբը, քանի որ այն պարունակում է իրեն կից ապրանքատեսականի'}
                information={'Եթե տվյալ խումբը պարունակում է ենթախմբեր, ապա ջնջելով այն կջնջվեն նաև իր բոլոր ենթախմբերը․'}
                question={'Դուք իսկապե՞ս ցանկանում եք ջնջել տվյալ խումբը'}
                cancelButtonName={'Ոչ'}
                confirmButtonName={'Այո'}
                status={props.group ? props.group.required_group : false}
                // Methods
                closeHandler={deleteModalCloseHandler}
                deleteHandler={deleteModalConfirmHandler}
            />
            <header>
                <CustomButton
                    className={classes.backButton}
                    children={<Icons type={'back-page'} className={classes.backButtonIcon}/>}
                    // Methods
                    onClick={() => props.classifierOpenHandler(props.group.id)}
                />
                <div className={classes.forOf}>
                    <h3>Դասակարգչի խմբագրում</h3>
                    <h6>Դասակարգիչը խմբագրելու համար սեղմել համապատասխան տողի վրա։</h6>
                </div>
                <CloseButton onClick={props.handleClose}/>
            </header>
            <section>
                <div className={classes.content}>
                    <div className={classes.nameWindow}>
                        <InputUI
                            id={error ? 'standard-error-helper-text' : 'group-name'}
                            error={!!error}
                            variant={'standard'}
                            label={'Դասակարգչի անվանում'}
                            root={classes.nameInput}
                            name={'name'}
                            value={props.newGroup.name}
                            helperText={error ? error : null}
                            // Methods
                            onChange={event => groupNameChangeHandler(event, 'name')}
                        />
                        <CustomCheckbox
                            id={'required_group'}
                            tooltip={'Պարտադիր դասակարգիչ'}
                            checked={props.newGroup.required_group}
                            status={props.newGroup.required_group}
                            name={'required_group'}
                            // Methods
                            onChange={event => groupNameChangeHandler(event, 'required_group')}
                        />
                    </div>
                    <div className={classes.searchWindow}>
                        <CustomInput
                            id={'modalSearch'}
                            inputType={'inner'}
                            label={
                                <span className={classes.searchIcon}>
                                    <SearchIcon/>
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
                    <div className={classes.treeWindow}>
                        {
                            props.customSubgroup ?
                                <ul style={{listStyle: 'none'}}>
                                    <li>
                                        <span
                                            className={`${classes.mainTreeName} ${props.toggleButtons && props.toggleButtons.id === props.group.id && props.toggleButtons.name === props.group.name ? classes.mainNameBlockSelected : ''}`}
                                            onClick={() => showBtnHandler(props.group.id, props.group.name)}
                                        >
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
                                                            <Icons type={'add'} className={classes.addIcon}/>
                                                        }
                                                        // Methods
                                                        onClick={
                                                            props.group && Object.keys(props.group).length ?
                                                                () => onAddClassifier(props.group.id, 'inGroup')
                                                                :
                                                                null
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            {
                                                checkSubs(props.group.id) ?
                                                    <ChevronRightIcon
                                                        onClick={
                                                            () => {
                                                                open === null ? setOpen(`collapse-${props.group.id}`) : setOpen(null)
                                                            }
                                                        }
                                                        style={
                                                            props.group && open === `collapse-${props.group.id}` ?
                                                                {
                                                                    verticalAlign: 'middle',
                                                                    cursor: "pointer",
                                                                    transaction: '300ms',
                                                                    color: '#666666',
                                                                    transform: 'rotate(90deg)'
                                                                }
                                                                :
                                                                {
                                                                    verticalAlign: 'middle',
                                                                    cursor: "pointer",
                                                                    transaction: '300ms',
                                                                    color: '#666666',
                                                                    transform: 'rotate(0)'
                                                                }
                                                        }
                                                    />
                                                    :
                                                    null
                                            }
                                            <Icons type={'mFolder'}/>
                                            <span className={classes.classifMainName}>
                                                Բոլորը
                                                {
                                                    props.movingStatus ?
                                                        <>
                                                            <CustomButton
                                                                className={classes.insertBtn}
                                                                children={<KeyboardBackspaceIcon
                                                                    style={{fontSize: 20}}/>}
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
                                                                children={<RemoveCircleOutlineIcon
                                                                    style={{fontSize: 15}}/>}
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
                                        <Collapse in={props.group && open === `collapse-${props.group.id}`}
                                                  timeout="auto" unmountOnExit>
                                            <div style={{marginLeft: 25}}>
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
                                                    onDeleteClassifier={deleteHandler}
                                                />
                                            </div>
                                        </Collapse>
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
                    onClick={confirmHandler}
                />
            </footer>
        </div>
    )
};

export default ModalContent