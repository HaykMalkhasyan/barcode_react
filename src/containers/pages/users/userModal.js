import React from "react";
import {Col, Row, FormGroup, Label, Button, ModalBody, ModalFooter, Input} from "reactstrap";
import Translate from "../../../Translate";
import jwt from "jwt-simple";

const UserModal = (props) => {
    let user = props.user

    function handleInputChange(key, value) {
        let new_value = {}
        new_value[key] = value
        props.setModalValues(new_value)
    }

    function handleClick() {
        props.addUser(props.user)
    }

    return (
        <React.Fragment>
            <ModalBody>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="firstName"><Translate name="firstname"/></Label>
                            <input
                                className="form-control"
                                type="text"
                                id="firstName"
                                onChange={event => handleInputChange("firstname", event.target.value)}
                                value={user.firstname ? user.firstname : ""}
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="lastName"><Translate name="lastname"/></Label>
                            <input
                                className="form-control"
                                type="text"
                                id="lastName"
                                onChange={event => handleInputChange("lastname", event.target.value)}
                                value={user.lastname ? user.lastname : ""}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="username"><Translate name="username"/></Label>
                            <input
                                className="form-control"
                                type="text"
                                id="username"
                                onChange={event => handleInputChange("username", event.target.value)}
                                value={user.username ? user.username : ""}
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="password"><Translate name="password"/></Label>
                            <input
                                className="form-control"
                                type="password"
                                id="password"
                                onChange={event => handleInputChange("password", jwt.encode(event.target.value, "password"))}
                                value={user.password ? jwt.decode( user.password , "password" ) : ""}
                                required
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="position"><Translate name="position"/></Label>
                            <Input type="select" id="position" defaultValue={user.position}
                                    onChange={event => handleInputChange("position", event.target.value)}>
                                {props.positions.map((item, key) => {
                                    return <option value={item.id} key={key} selected={item.id === parseInt(user.position)}>{item.name}</option>
                                })}
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="active"><Translate name="active"/></Label>
                            <Input type="select" id="active" defaultValue={0}
                                    onChange={event => handleInputChange("active", event.target.value)}>
                                <option value="0" selected={0 === user.active}>Այո</option>
                                <option value="1" selected={1 === user.active}>Ոչ</option>
                            </Input>
                        </FormGroup>
                    </Col>
                </Row>

            </ModalBody>
            <ModalFooter>
                <Button color="primary" type="submit" onClick={handleClick}>
                    <Translate name="confirm"/>
                </Button>
            </ModalFooter>
        </React.Fragment>
    );

};

export default UserModal;