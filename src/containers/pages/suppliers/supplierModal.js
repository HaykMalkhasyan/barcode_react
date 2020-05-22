import React from "react";
import {
    Button,
    ModalBody,
    ModalFooter,
    Modal,
    ModalHeader
} from "reactstrap";
import Translate from "../../../Translate";

const SupplierModal = (props) => {

    return (
        <React.Fragment>
            <Modal
                style={props.sectionFontColor ? {color: props.sectionFontColor} : null}
                isOpen={props.modal[props.type]}
                toggle={
                    () => {
                        props.toggleModal(props.type)
                    }
                }
                size="lg"
            >
                <ModalHeader
                    toggle={
                        () => {
                            props.toggleModal(props.type)
                        }
                    }
                >
                    <Translate name={props.type + "Supplier"}/>
                </ModalHeader>
                <ModalBody>
                    <Translate name={'Դուք համոզված ե՞ք ջնջել'}/>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        className="btn-square"
                        outline
                        type="submit"
                        onClick={
                            () => {
                                props.supplierActions(props.type, props.supplier)
                            }
                        }
                    >
                        <Translate name="confirm"/>
                    </Button>
                </ModalFooter>
            </Modal>

        </React.Fragment>
    );

};

export default SupplierModal;