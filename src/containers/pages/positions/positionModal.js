import React from "react";
import {Col, Row, FormGroup, Label, Button, ModalBody, ModalFooter, ModalHeader, Modal} from "reactstrap";
import Translate from "../../../Translate";
import PositionDownMenu from "./positionDownMenu";
const PositionModal = (props) => {
    function modalBodyContent() {
        if(props.type==="delete"){
            return(
                <ModalBody>Դուք համոզված ե՞ք ջնջել</ModalBody>
            )
        }else{
            return(
                <ModalBody>
                    <Row>
                        <Col md="12">
                            <FormGroup>
                                <Label for="name"><Translate name="name"/></Label>
                                <input
                                    className={`form-control  ${props.errors.name? 'is-invalid':''}`}
                                    type="text"
                                    id="name"
                                    value={props.position.name}
                                    onChange={event => props.setModalValues("name", event.target.value)}

                                />
                            </FormGroup>
                        </Col>
                        <Col md="12">
                            <PositionDownMenu data={props.pages} perm={props.position.perm} handle={props.handle}/>
                        </Col>
                    </Row>
                </ModalBody>
            )

        }

    }
    return (
        <React.Fragment>
            <Modal isOpen={props.modal[props.type]} toggle={() => props.toggleModal(props.type, props.position.id)} size="md">
                <ModalHeader toggle={() => props.toggleModal(props.type, props.position.id)}><Translate name={props.type + "Position"}/></ModalHeader>
                {modalBodyContent()}
                <ModalFooter>
                    <Button color="primary" outline type="submit" onClick={()=>props.positionActions(props.type,props.position)}>
                        <Translate name="confirm"/>
                    </Button>
                </ModalFooter>
            </Modal>
        </React.Fragment>
    );

};

export default PositionModal;