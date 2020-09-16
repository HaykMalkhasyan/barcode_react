import React, {useState} from 'react'
import classes from './modalContent.module.css'
import CustomButton from "../../../../../../components/UI/button/customButton/customButton"
import SpinnerForContent from "../../../../../../components/UI/spinners/spinerForContent/spinnerForContent";
import ConfirmButton from "../../../../../../components/UI/button/confirmButton/confirmButton";
import DeleteModal from "../../../../../../components/deleteModal/deleteModal";
import Backdrop from "../../../../../../components/UI/backdrop/backdrop";
import Icons from "../../../../../../components/Icons/icons";
import CloseButton from "../../../../../../components/UI/button/closeButton/closeButton";
import CustomCheckbox from "../../../../../../components/UI/input/customCheckbox/customCheckbox";
import Tree from "../../../../../../components/tree/tree";
import CustomSearch from "../../../../../../components/customSearch/customSearch";
import CancelButton from "../../../../../../components/UI/button/cencelButtom/cancelButton";
import CustomInput from "../../../../../../components/UI/input/customInput/customInput";

const ModalContent = props => {
    const [error, setError] = useState(null);

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

    /* Actions */
    const onAddClassifier = (event, id, type) => {
        event.stopPropagation();

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

    const onEditClassifier = (event, item, type) => {
        event.stopPropagation();

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

    const deleteHandler = (event, id) => {
        event.stopPropagation();
        props.setGroupValues('delete', true);
        props.getSubgroup(id);
    };

    const moveHandler = (event, id) => {
        event.stopPropagation();

        props.setGroupValues('moveElement', id);
        props.getSubgroup(id);
    };

    const cancelMoving = event => {
        event.stopPropagation();
        props.setGroupValues('moveElement', null)
    };

    const moveIsHer = (event, item) => {
        event.stopPropagation();

        const subgroup = {...props.subgroup};
        subgroup.active = '1';
        subgroup['group_id'].group_type = '1';
        if (subgroup.image.length > 0 && subgroup.image[0].hasOwnProperty('image')) {
            delete subgroup.image[0].image;
        }
        switch (item.hasOwnProperty('parent_id')) {
            case true: {
                subgroup.parent_id = item.id;
                break;
            }
            case false: {
                subgroup.parent_id = "";
                break;
            }
            default: break;
        }

        props.editSubgroup(subgroup);
        props.setGroupValues('moveElement', null);
        props.setGroupValues('controllerId', null)
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
                </div>
                <div>
                    <CloseButton onClick={props.handleClose}/>
                </div>
            </header>
            <section>
                <div className={classes.content}>
                    <div className={classes.nameWindow}>
                        <CustomInput
                            id={'group-name'}
                            classNameInput={error ? `${classes.nameInput} ${classes.errorField}` : classes.nameInput}
                            classNameLabel={classes.nameLabel}
                            name={'name'}
                            placeholder={'Դասակագիչի անվանում'}
                            value={props.newGroup.name}
                            // Methods
                            onChange={event => groupNameChangeHandler(event, 'name')}
                        />
                        <CustomCheckbox
                            id={'required_group'}
                            label={'Պարտադիր'}
                            labelStyle={classes.labelStyle}
                            checked={props.newGroup.required_group}
                            status={props.newGroup.required_group}
                            name={'required_group'}
                            // Methods
                            onChange={event => groupNameChangeHandler(event, 'required_group')}
                        />
                    </div>
                    <div className={classes.searchWindow}>
                        <div>
                            <CustomButton
                                className={classes.actionButtons}
                                children={<Icons type={'group-arrows'} opacity={props.controllerId !== null ? 1 : 0.18} className={props.controllerId !== null ? classes.groupArrowSelected : classes.iconsInactive}/>}
                                // Methods
                                onClick={props.controllerId ? event => moveHandler(event, props.controllerId.id) : null}
                            />
                            <CustomButton
                                className={classes.actionButtons}
                                children={<Icons type={'contained-edit'} opacity={props.controllerId !== null ? 1 : 0.18} className={props.controllerId !== null ? classes.containedEditSelected : classes.iconsInactive}/>}
                                // Methods
                                onClick={props.controllerId ? event => onEditClassifier(event, props.controllerId, 'subgroup') : null}
                            />
                            <CustomButton
                                className={classes.actionButtons}
                                children={<Icons type={'group-add'} opacity={props.controllerId !== null ? 1 : 0.18} className={props.controllerId !== null ? classes.groupAddSelected : classes.iconsInactive}/>}
                                // Methods
                                onClick={props.controllerId ? event => onAddClassifier(event, props.controllerId.id, 'subgroup') : null}
                            />
                            <CustomButton
                                className={classes.actionButtons}
                                children={<Icons type={'group-delete'} opacity={props.controllerId !== null ? 1 : 0.18} className={props.controllerId !== null ? classes.groupDeleteSelected : classes.iconsInactive}/>}
                                // Methods
                                onClick={props.controllerId ? event => deleteHandler(event, props.controllerId.id) : null}
                            />
                        </div>
                        <div>
                            <CustomSearch
                                drop={false}
                                withButton={false}
                                id={'modalSearch'}
                                type={'search'}
                                name={'search'}
                                value={props.search}
                                placeholder={'Որոնում'}
                                // Methods
                                onChange={event => searchChangeHandler(event.target.name, event.target.value)}
                            />
                        </div>
                    </div>
                    <div className={classes.treeWindow}>
                        {
                            props.customSubgroup ?
                                <Tree
                                    label={'Բոլորը'}
                                    type={'edit'}
                                    group={props.group}
                                    customSubgroup={props.customSubgroup}
                                    collapsed={props.collapsed}
                                    controllerId={props.controllerId}
                                    moveElement={props.moveElement}
                                    collapsedGroup={props.collapsedGroup}
                                    searchResult={props.searchResult}
                                    // Methods
                                    subCollapsed={props.subCollapsed}
                                    subCollapsedGroup={props.subCollapsedGroup}
                                    setTreeValue={props.setGroupValues}
                                    moveHandler={moveHandler}
                                    cancelMoving={cancelMoving}
                                    onAddClassifier={onAddClassifier}
                                    onEditClassifier={onEditClassifier}
                                    editSubgroup={props.editSubgroup}
                                    deleteHandler={deleteHandler}
                                    moveIsHer={moveIsHer}
                                    editGroupSubGroup={props.editGroupSubGroup}
                                />
                                :
                                <SpinnerForContent/>
                        }
                    </div>
                </div>
            </section>
            <footer>
                <CancelButton
                    onClick={() => props.classifierOpenHandler(props.group.id)}
                />
                <ConfirmButton
                    // Methods
                    onClick={confirmHandler}
                />
            </footer>
        </div>
    )
};

export default ModalContent