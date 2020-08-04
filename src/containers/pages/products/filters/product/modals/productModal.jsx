import React from 'react'
import AddContent from "./addContent/addContent";
import DialogUI from "../../../../../../components/dialogUI/dialogUI";
import ModalHeader from "./modalHeader/modalHeader";
import ModalFooter from "./modalFooter/modalFooter";

const ProductModal = props => {
    switch (props.type) {
        case 'add':
            return (
                <DialogUI
                    label={
                        <ModalHeader
                            label={'Ավելացնել ապրանք'}
                            // Methods
                            closeHandler={props.handleClose}
                        />
                    }
                    maxWidth={false}
                    scroll={props.scroll}
                    open={props.open === "add"}
                    paper={props.paper}
                    children={
                        <AddContent
                            modalTabs={props.modalTabs}
                        />
                    }
                    // Methods
                    handleClose={props.handleClose}
                    footer={
                        <ModalFooter
                            handleClose={props.handleClose}
                        />
                    }
                />
            );
        case 'edit':
            return (
                <DialogUI
                    label={
                        <ModalHeader
                            label={'Փոփոխել ապրանքը'}
                            // Methods
                            closeHandler={props.handleClose}
                        />
                    }
                    maxWidth={'lg'}
                    scroll={props.scroll}
                    open={props.open === "edit"}
                    children={
                        <div>
                            <h1>Փոփոխել ապրանք</h1>
                        </div>
                    }
                    // Methods
                    handleClose={props.handleClose}
                />
            );
        default: return null;
    }
};

export default ProductModal