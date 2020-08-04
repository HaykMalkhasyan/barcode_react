import React from 'react'
import Content from "./content/content";

const ClassifiersActionModals = props => {

    switch (props.modalType) {
        case 'add':
            return (
                <>
                    <Content
                        newGroup={props.newGroup}
                        newSubgroup={props.newSubgroup}
                        label={props.groupType === 'group' ? 'Ավելացնել դասակարգիչ' : 'Ավելացնել խումբ'}
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
                        addSubgroup={props.addSubgroup}
                        addGroup={props.addGroup}
                        subGroupModalCollapses={props.subGroupModalCollapses}
                    />
                </>
            );
        case 'edit':
            return (
                <>
                    <Content
                        newGroup={props.newGroup}
                        newSubgroup={props.newSubgroup}
                        label={props.groupType === 'group' ? 'Փոփոխել դասակարգիչը' : 'Փոփոխել խումբը'}
                        groupType={props.groupType}
                        subgroup={props.subgroup}
                        group={props.group}
                        error={props.error}
                        modalType={props.modalType}
                        customSubgroup={props.customSubgroup}
                        collapsedModalStatus={props.collapsedModalStatus}
                        // Methods
                        setGroupValues={props.setGroupValues}
                        setProductValues={props.setProductValues}
                        closeHandler={props.closeHandler}
                        uploadImage={props.uploadImage}
                        editSubgroup={props.editSubgroup}
                        editGroup={props.editGroup}
                        subGroupModalCollapses={props.subGroupModalCollapses}
                    />
                </>
            );
        default: return null
    }
};

export default ClassifiersActionModals