import React from 'react'
import classes from './subgroupsTreeModal.module.css'
import ModalHeader from "./modalHeader/modalHeader";
import ModalFooter from "./modalFooter/modalFooter";
import ModalContent from "./modalContent/modalContent";

const SubgroupsTreeModal = props => {

    const searchChangeHandler = (name, value) => {
        props.searchHandler(name, value)
    };

    const selectHandler = (sub) => {
        props.select('initialSub', {[props.group.id]: sub.id})
    };

    return (
        <div className={classes.subgroupsTreeModal}>
            <ModalHeader
                name={props.group ? props.group.name : ''}
                // Methods
                onBack={props.onBack}
                onClose={props.onClose}
            />
            <ModalContent
                group={props.group}
                customSubgroup={props.customSubgroup}
                collapsed={props.collapsed}
                searchResult={props.searchResult}
                initialSub={props.initialSub}
                // Methods
                searchChangeHandler={searchChangeHandler}
                subCollapsed={props.subCollapsed}
                select={selectHandler}
            />
            <ModalFooter
                // Methods
                onBack={props.onBack}
                onClick={props.onClick}
            />
        </div>
    )
};

export default SubgroupsTreeModal;