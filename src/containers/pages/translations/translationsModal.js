import React from "react";
import {Col, Row, FormGroup, Label, Button, ModalBody, ModalFooter, ModalHeader, Modal, CardBody} from "reactstrap";
import Translate from "../../../Translate";
// import {translationActions} from "../../../redux/lang/actions";

const menuModal = (props) => {
    function modalBodyContent() {
        if (props.type === "delete") {
            return (
                <ModalBody style={props.sectionFontColor ? {color: props.sectionFontColor} : null}><Translate name={'Դուք համոզված ե՞ք ջնջել'}/></ModalBody>
            )
        } else {
            return (
                <ModalBody style={props.sectionFontColor ? {color: props.sectionFontColor} : null}>
                    <Row>
                        <Col md="12">
                            <span>
                                <i style={{color: '#666'}}>
                                    <small style={props.sectionFontColor ? {color: props.sectionFontColor} : null}>
                                        <Translate name={'language'}/>
                                    </small>
                                </i>
                                <b style={{backgroundColor: '#009DA0', padding: '3px', marginLeft: '5px', textAlign: 'center', color: '#fff', borderRadius: '5px'}}>{props.translation.language ? props.translation.language : ""}</b>
                            </span>
                            <FormGroup>
                                <Label for="name"><Translate name="key"/></Label>
                                <input
                                    style={props.sectionFontColor ? {color: props.sectionFontColor} : null}
                                    disabled={true}
                                    className={`form-control  ${props.errors.name ? 'is-invalid' : ''}`}
                                    type="text"
                                    id="key"
                                    value={props.translation.key ? props.translation.key : ""}
                                    onChange={event => props.setTranslationsModal("key", event.target.value)}
                                />
                            </FormGroup>
                        </Col>
                        <Col md="12">
                            <FormGroup>
                                <Label for="name"><Translate name="value"/></Label>
                                <input
                                    style={props.sectionFontColor ? {color: props.sectionFontColor} : null}
                                    className={`form-control  ${props.errors.name ? 'is-invalid' : ''}`}
                                    type="text"
                                    id="value"
                                    value={props.translation.value ? props.translation.value : ""}
                                    onChange={event => props.setTranslationsModal("value", event.target.value)}
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
            <Modal isOpen={props.modal[props.type]}
                   toggle={() => props.toggleTranslationModal(props.type, props.translation.id)}
                   size="md">
                <ModalHeader toggle={() => props.toggleTranslationModal(props.type, props.translation.id)} style={props.sectionFontColor ? {color: props.sectionFontColor} : null}><Translate
                    name={props.type}/></ModalHeader>
                {modalBodyContent()}
                <ModalFooter>
                    <Button
                        color="primary"
                        outline
                        type="submit"
                        onClick={
                            () => {
                                props.translationActions(props.type, props.translation);
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

export default menuModal;