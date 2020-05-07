import React from "react";
import {Button, FormGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import Translate from "../../../Translate";
import {setModalValues} from "../../../redux/group/actions";

const GroupModal = (props) => {
    function modalBodyContent() {
        if (props.type === "delete") {
            return (
                <ModalBody>Դուք համոզված ե՞ք ջնջել</ModalBody>
            )
        } else {
            return (
                <ModalBody>
                    <FormGroup>
                        <Label for="name"><Translate name={"name"}/></Label>
                        <input
                            className={`form-control  ${props.errors.name ? 'is-invalid' : ''}`}
                            type="text"
                            id="name"
                            value={props.group.name ? props.group.name : ""}
                            onChange={event => props.setModalValues("name", event.target.value)}
                        />
                    </FormGroup>
                </ModalBody>
            )

        }

    }

    return (

        <React.Fragment>
            <Modal isOpen={props.modal[props.type]} toggle={() => props.toggleModal(props.type)} size="md">
                <ModalHeader toggle={() => props.toggleModal(props.type)}><Translate
                    name={props.type + "Group"}/></ModalHeader>
                {modalBodyContent()}
                <ModalFooter>
                    <Button
                        color="primary"
                        type="submit"
                        outline
                        onClick={
                            () => {
                                props.groupActions(props.type, props.group);
                                props.toggleModalLanguage()
                            }
                        }
                    >
                        <Translate name={"confirm"}/>
                    </Button>
                </ModalFooter>
            </Modal>

        </React.Fragment>
    );

};

export default GroupModal;