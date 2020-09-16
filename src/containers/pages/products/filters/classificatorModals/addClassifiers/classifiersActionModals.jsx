import React from 'react'
import Content from "./content/content";

const ClassifiersActionModals = props => {

    const labelRender = (modalType, groupType) => {

        switch (modalType) {
            case 'add':
                return groupType === 'group' ?
                    'Ավելացնել դասակարգիչ'
                    :
                    'Ավելացնել խումբ';
            case "edit":
                return groupType === 'group' ?
                    'Փոփոխել դասակարգիչը'
                    :
                    'Փոփոխել խումբը';
            default:
                return 'Դասակարգիչի փոփոխման պատուհան';
        }
    };

    const actionRender = (modalType, addAction, editAction) => {
        switch (modalType) {
            case "edit":
                return editAction;
            case 'add':
            default:
                return addAction;
        }
    };

    return (
        <Content
            newGroup={props.newGroup}
            newSubgroup={props.newSubgroup}
            label={labelRender(props.modalType, props.groupType)}
            groupType={props.groupType}
            subgroup={props.subgroup}
            error={props.error}
            group={props.group}
            modalType={props.modalType}
            customSubgroup={props.customSubgroup}
            collapsedModalStatus={props.collapsedModalStatus}
            // Methods
            setGroupValues={props.setGroupValues}
            setProductValues={props.setProductValues}
            closeHandler={props.closeHandler}
            uploadImage={props.uploadImage}
            subGroupAction={actionRender(props.modalType, props.addSubgroup, props.editSubgroup)}
            groupAction={actionRender(props.modalType, props.addGroup, props.editGroup)}
            subGroupModalCollapses={props.subGroupModalCollapses}
        />
    );
};

export default ClassifiersActionModals