import React from "react";
import {Col, Row, FormGroup, Label, Button, ModalBody, ModalFooter, ModalHeader, Modal} from "reactstrap";
import Translate from "../../../Translate";

const menuModal = (props) => {
    function modalBodyContent() {
        if (props.type === "delete") {
            return (
                <ModalBody>Դուք համոզված ե՞ք ջնջել</ModalBody>
            )
        } else {
            return (
                <ModalBody>
                    <Row>
                        <Col md="12">
                            <FormGroup>
                                <Label for="name"><Translate name={"name"}/></Label>
                                <input
                                    className={`form-control  ${props.errors.name ? 'is-invalid' : ''}`}
                                    type="text"
                                    id="name"
                                    value={props.dataMenu.name ? props.dataMenu.name : ""}
                                    onChange={event => props.setModalValue("name", event.target.value)}
                                />
                            </FormGroup>
                        </Col>
                        <Col md="12">
                            <FormGroup>
                                <Label for="name"><Translate name={"icon"}/></Label>
                                <input
                                    className={`form-control  ${props.errors.name ? 'is-invalid' : ''}`}
                                    type="text"
                                    id="icon"
                                    value={props.dataMenu.icon ? props.dataMenu.icon : ""}
                                    onChange={event => props.setModalValue("icon", event.target.value)}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                </ModalBody>
            )

        }

    }

    return (
        <React.Fragment>
            <Modal isOpen={props.modal[props.type]} toggle={() => props.toggleModal(props.type, props.dataMenu.id)}
                   size="md">
                <ModalHeader toggle={() => props.toggleModal(props.type, props.dataMenu.id)}><Translate
                    name={props.type + "menu"}/></ModalHeader>
                {modalBodyContent()}
                <ModalFooter>
                    <Button
                        color="primary"
                        outline
                        type="submit"
                        onClick={
                            () => {
                                props.menuActions(props.type, props.dataMenu);
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

export default menuModal;