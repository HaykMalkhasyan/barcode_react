import React, {useState} from 'react'
import classes from './modalContent.module.css'
import DeleteModal from "../../../../../../components/deleteModal/deleteModal";
import Backdrop from "../../../../../../components/UI/backdrop/backdrop";
import CustomCheckbox from "../../../../../../components/UI/input/customCheckbox/customCheckbox";
import CustomSearch from "../../../../../../components/customSearch/customSearch";
import CustomInput from "../../../../../../components/UI/input/customInput/customInput";
import HeaderContent from "./header-content/header-content";
import ModalActions from "./actions/actions";
import FooterContent from "./footer-content/footer-content";
import BodyContent from "./body-content/body-content";
import cookie from "../../../../../../services/cookies";

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
        const group = {}
        switch (type) {
            case "title": {
                setError(null);
                group.id = newGroup.id
                group[event.target.name] = event.target.value;
                props.editGroupAction(event.target.value, group);
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
        if (props.classifierName.length > 0) {
            props.editGroup({...props.newGroup}, props.group.id);
        } else {
            setError('Անվանման դաշտը չպետք է դատարկ լինի')
        }
    };

    /* Actions */
    const onAddSubgroup = (event, id) => {
        event.stopPropagation();
        props.addSubgroupAction(id)
    };

    const onAddGroup = (event) => {
        event.stopPropagation();
        props.addGroupAction()
    }

    const onEditSubgroup =  async (event, id) => {
        event.stopPropagation();
        await props.getSubgroup(id, props.catId);
        props.editSubgroupAction();
    };

    const deleteHandler = (event, type, param, id = null) => {
        event.stopPropagation();
        if (id === null) {
            props.deleteClassifiersAction(type, param)
        } else {
            props.deleteClassifiersAction(type, param, id)
        }
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

    const deleteModalNameRender = (subgroup, group) => {
        if (subgroup) {
            return subgroup[`name_${cookie.get('language') || "am"}`]
        }
        return group[`title_${cookie.get('language') || "am"}`]
    }

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
                groupName={deleteModalNameRender(props.subgroup, props.group)}
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
                            disabled={props.group && props.group.id === 0}
                            classNameInput={error ? `${classes.nameInput} ${classes.errorField}` : classes.nameInput}
                            classNameLabel={classes.nameLabel}
                            name={'title'}
                            placeholder={'Դասակագիչի անվանում'}
                            value={props.classifierName}
                            // Methods
                            onChange={event => groupNameChangeHandler(event, 'title')}
                        />
                        <CustomCheckbox
                            id={'required_group'}
                            label={'Պարտադիր'}
                            disabled={props.group && props.group.id === 0}
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
                            catId={props.catId}
                            // Methods
                            changePositionStatus={props.changePositionStatus}
                            toggleMovingStatus={toggleMovingStatus}
                            moveHandler={moveHandler}
                            onEditSubgroup={onEditSubgroup}
                            onAddSubgroup={onAddSubgroup}
                            onAddGroup={onAddGroup}
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
                        data={props.own_subgroups}
                        search={props.search}
                        group={props.group}
                        groupId={props.groupId}
                        own_move={props.own_move}
                        own_select={props.own_select}
                        type={'edit'}
                        // Methods
                        selectTreeItem={props.selectTreeItem}
                        selectTreeGroupItem={props.selectTreeGroupItem}
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