import React from "react";
import {Button, FormGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import LocalizeTab from "../../localize/localizeTab";
import LocalizeInput from "../../localize/localizeInput";
import Translate from "../../../Translate";

const GroupModal = (props) => {
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
            <Modal isOpen={props.modal[props.type]} toggle={()=>props.toggleModal(props.type)}  size="md">
                <ModalHeader toggle={()=>props.toggleModal(props.type)}><Translate name={props.type+"Group"}/></ModalHeader>
                {modalBodyContent()}
                <ModalFooter>
                    <Button color="primary"  type="submit" outline onClick={()=>{props.groupActions(props.type,props.group);props.toggleModalLanguage()}}>
                        <Translate name="confirm"/>
                    </Button>
                </ModalFooter>
            </Modal>

        </React.Fragment>
    );

};

export default GroupModal;