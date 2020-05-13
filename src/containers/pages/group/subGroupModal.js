import React from "react";
import {Button, Col, FormGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import Translate from "../../../Translate";
import LocalizeTab from "../../localize/localizeTab";

const SubGroupModal = (props) => {
    function modalBodyContent() {
        if(props.type==="delete"){
            return(
                <ModalBody>Դուք համոզված ե՞ք ջնջել</ModalBody>
            )
        }else{
            return(
                <ModalBody>
                    <FormGroup row className="justify-content-between">
                        <Col sm={12}>
                            <LocalizeTab/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Label for="name"><Translate name={"name"}/></Label>
                        <input
                            className={`form-control  ${props.errors.name ? 'is-invalid' : ''}`}
                            type="text"
                            id="name"
                            value={props.subGroup.name ? props.subGroup.name : ""}
                            onChange={event => props.setSubModalName("name", event.target.value)}
                        />
                    </FormGroup>
                </ModalBody>
            )

        }

    }

    return (

        <React.Fragment>
            <Modal isOpen={props.subModal[props.type]} toggle={()=>props.setActionToggleSubModal({/*props.type*/})}  size="md">
                <ModalHeader toggle={()=>props.toggleSubModal(props.type)}><Translate name={props.type+"SubGroup"}/></ModalHeader>
                {modalBodyContent()}
                <ModalFooter>
                    <Button color="primary" outline type="submit" onClick={()=>props.subGroupActions(props.type,props.subGroup)}>
                        <Translate name={"confirm"}/>
                    </Button>
                </ModalFooter>
            </Modal>

        </React.Fragment>
    );

};

export default SubGroupModal;