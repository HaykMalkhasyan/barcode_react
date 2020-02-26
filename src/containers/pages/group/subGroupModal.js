import React from "react";
import {Button, FormGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import Translate from "../../../Translate";
import LocalizeInput from "../../localize/localizeInput";
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
                    <FormGroup>
                        <LocalizeTab />
                    </FormGroup>
                    <FormGroup>
                        <Label for="name"><Translate name="name"/></Label>
                        <LocalizeInput
                            errors = {props.errors.name}
                            name = {props.group.name}
                            setValue = {props.setModalValues}
                            lang = {props.lang}
                        />
                    </FormGroup>
                </ModalBody>
            )

        }

    }

    return (

        <React.Fragment>
            <Modal isOpen={props.subModal[props.type]} toggle={()=>props.toggleSubModal(props.type)}  size="md">
                <ModalHeader toggle={()=>props.toggleSubModal(props.type)}><Translate name={props.type+"SubGroup"}/></ModalHeader>
                {modalBodyContent()}
                <ModalFooter>
                    <Button color="primary" outline type="submit" onClick={()=>props.subGroupActions(props.type,props.group)}>
                        <Translate name="confirm"/>
                    </Button>
                </ModalFooter>
            </Modal>

        </React.Fragment>
    );

};

export default SubGroupModal;