import React, {useState} from 'react'
import classes from './modalContent.module.css'
import DeleteModal from "../../../../../../components/deleteModal/deleteModal";
import Backdrop from "../../../../../../components/UI/backdrop/backdrop";
import CustomCheckbox from "../../../../../../components/UI/input/customCheckbox/customCheckbox";
import CustomSearch from "../../../../../../components/customSearch/customSearch";
import CustomInput from "../../../../../../components/UI/input/customInput/customInput";
import TreeViewer from "../../../../../../components/tree-viewer/tree-viewer";
import SkeletonUI from "../../../../../../components/skeletion/skeleton";
import HeaderContent from "./header-content/header-content";
import ModalActions from "./actions/actions";
import FooterContent from "./footer-content/footer-content";
import BodyContent from "./body-content/body-content";

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
            default:
                break;
        }

        props.editSubgroup(subgroup);
        props.setGroupValues('moveElement', null);
        props.setGroupValues('controllerId', null)
    };

    const toggleMovingStatus = () => {
        if (props.controllerId !== null) {
            props.setGroupValues('controllerId', null)
        }
        if (props.groupId !== null) {
            props.setGroupValues('groupId', null)
        }
        props.setGroupValues('changePositionStatus', !props.changePositionStatus)
    };

    const backPageHandler = () => {
        props.setGroupValues(
            "newGroup", {
                title_am: '',
                title_ru: '',
                title_en: '',
                required_group: false,
                group_type: '1'
            }
        );
        props.classifierOpenHandler(props.group.id)
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
            <HeaderContent
                // Methods
                handleClose={props.handleClose}
                backPageHandler={backPageHandler}
            />
            <section>
                <div className={classes.content}>
                    <div className={classes.nameWindow}>
                        <CustomInput
                            type={'text'}
                            id={'group-title_am'}
                            classNameInput={error ? `${classes.nameInput} ${classes.errorField}` : classes.nameInput}
                            classNameLabel={classes.nameLabel}
                            name={'title_am'}
                            placeholder={'Դասակագիչի անվանում'}
                            value={props.newGroup['title_am']}
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
                        <ModalActions
                            own_select={props.own_select}
                            controllerId={props.controllerId}
                            groupId={props.groupId}
                            // Methods
                            changePositionStatus={props.changePositionStatus}
                            toggleMovingStatus={toggleMovingStatus}
                            moveHandler={moveHandler}
                            onEditClassifier={onEditClassifier}
                            onAddClassifier={onAddClassifier}
                            deleteHandler={deleteHandler}
                        />
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
                    <BodyContent
                        group={props.group}
                        own_subgroups={props.own_subgroups}
                        own_collapse={props.own_collapse}
                        own_move={props.own_move}
                        own_select={props.own_select}
                        collapseName={"own_collapse"}
                        type={'edit'}
                        // Methods
                        setGroupValues={props.setGroupValues}
                        toggleTreeItem={props.toggleTreeItem}
                    />
                </div>
            </section>
            <FooterContent
                group={props.group}
                // Methods
                confirmHandler={confirmHandler}
            />
        </div>
    )
};

export default ModalContent