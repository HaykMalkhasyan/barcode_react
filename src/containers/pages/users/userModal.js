import React from "react";
import {Col, Row, FormGroup, Label, Button, ModalBody, ModalFooter, Input, Modal, ModalHeader} from "reactstrap";
import Translate from "../../../Translate";
import jwt from "jwt-simple";

const UserModal = (props) => {

    function modalBodyContent() {
        if(props.type==="delete"){
            return(
                <ModalBody>Դուք համոզված ե՞ք ջնջել</ModalBody>
            )
        }else{

            return(

                <ModalBody>
                    <form>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="firstName"><Translate name="firstname"/></Label>
                                <input
                                    className={`form-control  ${props.errors.firstname? 'is-invalid':''}`}
                                    type="text"
                                    id="firstName"
                                    value={props.user.firstname}
                                    onChange={event => props.setModalValues("firstname",event.target.value)}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="lastName"><Translate name="lastname"/></Label>
                                <input
                                    className={`form-control  ${props.errors.lastname? 'is-invalid':''}`}
                                    type="text"
                                    id="lastName"
                                    onChange={event => props.setModalValues("lastname",event.target.value)}
                                    value={props.user.lastname ? props.user.lastname : ""}

                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="username"><Translate name="username"/></Label>
                                <input
                                    className={`form-control  ${props.errors.username? 'is-invalid':''}`}
                                    type="text"
                                    id="username"
                                    onChange={event => props.setModalValues("username",event.target.value)}
                                    value={props.user.username ? props.user.username : ""}

                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="password"><Translate name="password"/></Label>
                                <input
                                    className={`form-control  ${props.errors.password? 'is-invalid':''}`}
                                    type="password"
                                    id="password"
                                    onChange={event => props.setModalValues("password", event.target.value !=="" ? jwt.encode(event.target.value, "password"):"")}
                                    value={props.user.password ? jwt.decode( props.user.password , "password" ) : ""}

                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="position"><Translate name="position"/></Label>
                                <Input type="select" id="position" value={props.user.position_id || "0"} defaultValue={"0"}
                                       onChange={event => props.setModalValues("position_id",event.target.value)}>
                                    <option  value="0">Ընտրել</option>
                                    {props.positions.map((item, key) => {
                                        return <option value={item.id} key={key}>{item.name}</option>
                                    })}
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="active"><Translate name="active"/></Label>
                                <Input type="select" id="active" value={props.user.active || "0"} defaultValue={"0"}
                                       onChange={event => props.setModalValues("active",event.target.value)}>
                                    <option value="0">Այո</option>
                                    <option value="1">Ոչ</option>
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    </form>

                </ModalBody>
            )

        }

    }

    return (
        <React.Fragment>
            <Modal isOpen={props.modal[props.type]} toggle={()=>props.toggleModal(props.type)}  size="md">
                <ModalHeader toggle={()=>props.toggleModal(props.type)}><Translate name={props.type+"User"}/></ModalHeader>
                {modalBodyContent()}
                <ModalFooter>
                    <Button color="primary" type="submit" onClick={function(){props.userActions(props.type,props.user);}}>
                        <Translate name="confirm"/>
                    </Button>
                </ModalFooter>
            </Modal>

        </React.Fragment>
    );

};

export default UserModal;