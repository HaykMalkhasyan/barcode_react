import React, {useState} from "react";
import {
    Col,
    Row,
    FormGroup,
    Label,
    Button,
    ModalBody,
    ModalFooter,
    Input,
    Modal,
    ModalHeader
} from "reactstrap";
import Translate from "../../../Translate";
// import jwt from "jwt-simple";

const UserModal = (props) => {
    const [status, setStatus] = useState(false)
    const modalBodyContent = () => {
        if (props.type === "delete") {
            return (
                <ModalBody>
                    <FormGroup>
                        <Label for="password"><Translate name="password"/></Label>
                        <input
                            className={`form-control  ${status ? 'is-invalid' : ''}`}
                            type="password"
                            id="password"
                            onBlur={event => event.target.value.length < 8 ? event.target.style.borderColor = '#f44' : event.target.style.borderColor = ''}
                            // onChange={event => props.setModalValues("password", event.target.value !== "" ? jwt.encode(event.target.value, "password") : "")}
                            onChange={event => props.setModalValues("password", event.target.value !== "" ? event.target.value : "")}
                            // value={props.user.password ? jwt.decode(props.user.password, "password") : ""}
                            value={props.user.password ? props.user.password : ""}

                        />
                    </FormGroup>
                    <p>
                        <Translate name={'Դուք համոզված ե՞ք ջնջել'}/>
                    </p>
                </ModalBody>
            )
        } else {

            return (

                <ModalBody>
                    <form>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="firstName"><Translate name="firstname"/></Label>
                                    <input
                                        onBlur={event => event.target.value.length === 0 ? event.target.style.borderColor = '#f44' : event.target.style.borderColor = ''}
                                        className={`form-control  ${status ? 'is-invalid' : ''}`}
                                        type="text"
                                        id="firstName"
                                        onChange={event => props.setModalValues("first_name", event.target.value)}
                                        value={props.user.first_name ? props.user.first_name : ''}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="lastName"><Translate name="lastname"/></Label>
                                    <input
                                        onBlur={event => event.target.value.length === 0 ? event.target.style.borderColor = '#f44' : event.target.style.borderColor = ''}
                                        className={`form-control  ${status ? 'is-invalid' : ''}`}
                                        type="text"
                                        id="lastName"
                                        onChange={event => props.setModalValues("last_name", event.target.value)}
                                        value={props.user.last_name ? props.user.last_name : ""}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="email"><Translate name="email"/></Label>
                                    <input
                                        onBlur={event => event.target.value.length === 0 || !event.target.value.includes('@') || !event.target.value.includes('.') ? event.target.style.borderColor = '#f44' : event.target.style.borderColor = ''}
                                        className={`form-control  ${status ? 'is-invalid' : ''}`}
                                        type="email"
                                        id="email"
                                        onChange={event => props.setModalValues("email", event.target.value)}
                                        value={props.user.email ? props.user.email : ""}

                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="company"><Translate name="company"/></Label>
                                    <input
                                        className={`form-control  ${props.errors.company_id ? 'is-invalid' : ''}`}
                                        type="text"
                                        id="company"
                                        onChange={event => props.setModalValues("company_id", event.target.value)}
                                        value={props.user.company_id ? props.user.company_id : ""}

                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="username"><Translate name="username"/></Label>
                                    <input
                                        onBlur={event => event.target.value.length === 0 ? event.target.style.borderColor = '#f44' : event.target.style.borderColor = ''}
                                        className={`form-control  ${status ? 'is-invalid' : ''}`}
                                        type="text"
                                        id="username"
                                        onChange={event => props.setModalValues("username", event.target.value)}
                                        value={props.user.username ? props.user.username : ""}

                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="password"><Translate name="password"/></Label>
                                    <input
                                        className={`form-control  ${status ? 'is-invalid' : ''}`}
                                        type="password"
                                        id="password"
                                        onBlur={event => event.target.value.length < 8 ? event.target.style.borderColor = '#f44' : event.target.style.borderColor = ''}
                                        // onChange={event => props.setModalValues("password", event.target.value !== "" ? jwt.encode(event.target.value, "password") : "")}
                                        onChange={event => props.setModalValues("password", event.target.value !== "" ? event.target.value : "")}
                                        // value={props.user.password ? jwt.decode(props.user.password, "password") : ""}
                                        value={props.user.password ? props.user.password : ""}

                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="position"><Translate name="positions"/></Label>
                                    <Input
                                        type="select"
                                        id="position"
                                        value={props.user.position_id || "0"}
                                        // defaultValue={"0"}
                                        onChange={event => props.setModalValues("position_id", event.target.value)}
                                    >
                                        {/*<option value="0">Choose</option>*/}
                                        {
                                            props.positions ?
                                                props.positions.map(
                                                    (item, key) => {
                                                        return <option value={item.id} key={key}>{item.name}</option>
                                                    }
                                                )
                                                :
                                                <option value="0">Empty</option>
                                        }
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="active"><Translate name="active"/></Label>
                                    <Input
                                        type="select"
                                        id="active"
                                        value={props.user.active || "0"}
                                        // defaultValue={"0"}
                                        onChange={event => props.setModalValues("active", event.target.value)}
                                    >
                                        <option value="0">Yes</option>
                                        <option value="1">No</option>
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
            <Modal
                isOpen={props.modal[props.type]}
                toggle={
                    () => {
                        setStatus(false)
                        props.toggleModal(props.type)
                    }
                }
                size="lg"
            >
                <ModalHeader toggle={() => {
                    props.toggleModal(props.type)
                }}><Translate
                    name={props.type + "User"}/></ModalHeader>
                {modalBodyContent()}
                <ModalFooter>
                    <Button
                        color="primary"
                        outline
                        type="submit"
                        onClick={
                            () => {
                                if (props.type !== 'delete' && (props.user.first_name && props.user.first_name.length) && (props.user.last_name && props.user.last_name.length) && (props.user.email && props.user.email.length && props.user.email.includes('@') && props.user.email.includes('.')) && (props.user.username && props.user.username.length) && (props.user.password && props.user.password.length >= 8)) {
                                    setStatus(false)
                                    let index = false
                                    for (let item of props.users) {
                                        if (item.username === props.user.username) {
                                            index = true
                                        }
                                    }
                                    if (index !== true) {
                                        console.log(index)
                                        props.userActions(props.type, props.user);
                                    } else {
                                        setStatus(true)
                                    }
                                } else if (props.type !== 'delete') {
                                    setStatus(true)
                                }
                                if (props.type === 'delete') {
                                    props.userActions(props.type, props.user);
                                }
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

export default UserModal;