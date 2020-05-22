import React from "react";
import {Button, Col, FormGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import Translate from "../../../Translate";
import LocalizeTab from "../../localize/localizeTab";

const GroupModal = (props) => {
    function modalBodyContent() {
        if (props.type === "delete") {
            return (
                <ModalBody
                    style={props.sectionFontColor ? {color: props.sectionFontColor} : null}
                >Դուք համոզված ե՞ք ջնջել</ModalBody>
            )
        } else {
            return (
                <ModalBody>
                    <FormGroup row className="justify-content-between">
                        <Col sm={12}>
                            <LocalizeTab/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Label for="name" style={props.sectionFontColor ? {color: props.sectionFontColor} : null}><Translate name={"name"}/></Label>
                        <input
                            style={props.sectionFontColor ? {color: props.sectionFontColor} : null}
                            className={`form-control  ${props.errors.name ? 'is-invalid' : ''}`}
                            type="text"
                            id="name"
                            value={props.group && props.group.name ? props.group.name : ""}
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
                <ModalHeader toggle={() => props.toggleModal(props.type)} style={props.sectionFontColor ? {color: props.sectionFontColor} : null}>
                    <Translate name={props.type + "Group"}/>
                </ModalHeader>
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