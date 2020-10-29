import React, {useState} from 'react'
import classes from './modalContent.module.css'
import HeaderContent from "./header-content/header-content";
import FooterContent from "./footer-content/footer-content";
import SectionContent from "./section-content/section-content";
import DeleteContent from "./delete-content/delete-content";

const ModalContent = props => {
    const [error, setError] = useState(null);

    const searchChangeHandler = (name, value) => {
        props.searchHandler(name, value)
    };

    const deleteModalCloseHandler = () => {
        props.deleteModalClose();
    };

    const deleteModalConfirmHandler = id => {
        if (props.delete === "group") {
            props.deleteAction("Group/Group", id);
        } else if (props.delete === "subgroup") {
            props.deleteAction("Group/SubGroup", id, props.catId);
        }
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
            const newGroup = {...props.newGroup};
            newGroup.id = props.group.id;
            props.editGroup({...newGroup}, props.group.id);
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
        await props.getActionById("get", "subgroup", {path: "Group/SubGroup", id: props.catId, param: {id: id}}, id)
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

    const moveHandler = async (event, id) => {
        event.stopPropagation();
        await props.getActionById("get", "subgroup", {path: "Group/SubGroup", id: props.catId, param: {id: id}}, id)
        props.setGroupValues('moveElement', id);
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
            <DeleteContent
                delete={props.delete}
                group={props.group}
                subgroup={props.subgroup}
                // Methods
                deleteModalCloseHandler={deleteModalCloseHandler}
                deleteModalConfirmHandler={deleteModalConfirmHandler}
            />
            <HeaderContent
                // Methods
                handleClose={props.handleClose}
                backPageHandler={backPageHandler}
            />
            <SectionContent
                error={error}
                group={props.group}
                groupId={props.groupId}
                catId={props.catId}
                newGroup={props.newGroup}
                newSubgroup={props.newSubgroup}
                classifierName={props.classifierName}
                own_select={props.own_select}
                own_subgroups={props.own_subgroups}
                own_move={props.own_move}
                search={props.search}
                edit={props.edit}
                subgroupName={props.subgroupName}
                // Methods
                groupNameChangeHandler={groupNameChangeHandler}
                changePositionStatus={props.changePositionStatus}
                setGroupValues={props.setGroupValues}
                editSubgroup={props.editSubgroup}
                changeSubgroupName={props.changeSubgroupName}
                toggleMovingStatus={toggleMovingStatus}
                moveHandler={moveHandler}
                onEditSubgroup={onEditSubgroup}
                onAddSubgroup={onAddSubgroup}
                onAddGroup={onAddGroup}
                deleteHandler={deleteHandler}
                searchChangeHandler={searchChangeHandler}
                selectTreeItem={props.selectTreeItem}
                selectTreeGroupItem={props.selectTreeGroupItem}
            />
            <FooterContent
                group={props.group}
                // Methods
                confirmHandler={confirmHandler}
            />
        </div>
    )
};

export default ModalContent