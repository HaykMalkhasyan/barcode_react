import React from 'react'
import Content from "./content/content";

const ClassifiersActionModals = props => {

    switch (props.modalType) {
        case 'add':
            return (
                <>
                    <Content
                        newGroup={props.newGroup}
                        label={props.groupType === 'group' ? 'Ավելացնել դասակարգիչ' : 'Ավելացնել խումբ'}
                        groupType={props.groupType}
                        subgroup={props.subgroup}
                        error={props.error}
                        group={props.group}
                        modalType={props.modalType}
                        // Methods
                        setGroupValues={props.setGroupValues}
                        setProductValues={props.setProductValues}
                        closeHandler={props.closeHandler}
                        uploadImage={props.uploadImage}
                    />
                </>
            );
        case 'edit':
            return (
                <>
                    <Content
                        newGroup={props.newGroup}
                        label={props.groupType === 'group' ? 'Փոփոխել դասակարգիչը' : 'Փոփոխել խումբը'}
                        groupType={props.groupType}
                        subgroup={props.subgroup}
                        group={props.group}
                        error={props.error}
                        modalType={props.modalType}
                        // Methods
                        setGroupValues={props.setGroupValues}
                        setProductValues={props.setProductValues}
                        closeHandler={props.closeHandler}
                        uploadImage={props.uploadImage}
                    />
                </>
            );
        default: return null
    }
};

export default ClassifiersActionModals