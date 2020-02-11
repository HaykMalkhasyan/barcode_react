import React from "react";
import {Button, FormGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import Translate from "../../../Translate";

const CategoryModal = (props) => {

    function modalBodyContent() {
        if(props.type==="delete"){
            return(
                <ModalBody>Դուք համոզված ե՞ք ջնջել</ModalBody>
            )
        }else{
            return(
                <ModalBody>
                    <FormGroup>
                        <Label for="name"><Translate name="name"/></Label>
                        <input
                            className={`form-control  ${props.errors.name? 'is-invalid':''}`}
                            type="text"
                            id="name"
                            value={props.category.name}
                            onChange={event => props.setModalValues1("name",event.target.value)}

                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="name_en"><Translate name="name_en"/></Label>
                        <input
                            className={`form-control  ${props.errors.name_en? 'is-invalid':''}`}
                            type="text"
                            id="name_en"
                            value={props.category.name_en}
                            onChange={event => props.setModalValues1("name_en",event.target.value)}

                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="name_ru"><Translate name="name_ru"/></Label>
                        <input
                            className={`form-control  ${props.errors.name_ru? 'is-invalid':''}`}
                            type="text"
                            id="name_ru"
                            value={props.category.name_ru}
                            onChange={event => props.setModalValues1("name_ru",event.target.value)}

                        />
                    </FormGroup>
                </ModalBody>
            )

        }

    }

    return (

        <React.Fragment>
            <Modal isOpen={props.modal[props.type]} toggle={()=>props.toggleModal(props.type)}  size="md">
                <ModalHeader toggle={()=>props.toggleModal(props.type)}><Translate name={props.type+"Category"}/></ModalHeader>
                {modalBodyContent()}
                <ModalFooter>
                    <Button color="primary" type="submit" onClick={()=>props.categoryActions(props.type,props.category)}>
                        <Translate name="confirm"/>
                    </Button>
                </ModalFooter>
            </Modal>

        </React.Fragment>
    );

};

export default CategoryModal;