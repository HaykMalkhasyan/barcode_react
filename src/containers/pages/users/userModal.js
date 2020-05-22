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
                        <Label for="password"
                               style={props.sectionFontColor ? {color: props.sectionFontColor} : null}
                        >
                            <Translate name="password"/></Label>
                        <input
                            style={props.sectionFontColor ? {color: props.sectionFontColor} : null}
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
                    <p style={props.sectionFontColor ? {color: props.sectionFontColor} : null}>
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
                                    <Label for="firstName"
                                           style={props.sectionFontColor ? {color: props.sectionFontColor} : null}><Translate
                                        name="firstname"/></Label>
                                    <input
                                        style={props.sectionFontColor ? {color: props.sectionFontColor} : null}
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
                                    <Label for="lastName"
                                           style={props.sectionFontColor ? {color: props.sectionFontColor} : null}><Translate
                                        name="lastname"/></Label>
                                    <input
                                        style={props.sectionFontColor ? {color: props.sectionFontColor} : null}
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
                                    <Label for="email"
                                           style={props.sectionFontColor ? {color: props.sectionFontColor} : null}><Translate
                                        name="email"/></Label>
                                    <input
                                        style={props.sectionFontColor ? {color: props.sectionFontColor} : null}
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
                                    <Label for="company"
                                           style={props.sectionFontColor ? {color: props.sectionFontColor} : null}><Translate
                                        name="company"/></Label>
                                    <input
                                        style={props.sectionFontColor ? {color: props.sectionFontColor} : null}
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
                                    <Label for="username"
                                           style={props.sectionFontColor ? {color: props.sectionFontColor} : null}><Translate
                                        name="username"/></Label>
                                    <input
                                        style={props.sectionFontColor ? {color: props.sectionFontColor} : null}
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
                                    <Label for="password"
                                           style={props.sectionFontColor ? {color: props.sectionFontColor} : null}><Translate
                                        name="password"/></Label>
                                    <input
                                        style={props.sectionFontColor ? {color: props.sectionFontColor} : null}
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
                                    <Label for="position"
                                           style={props.sectionFontColor ? {color: props.sectionFontColor} : null}><Translate
                                        name="positions"/></Label>
                                    <Input
                                        style={props.sectionFontColor ? {color: props.sectionFontColor} : null}
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
                                    <Label for="active"
                                           style={props.sectionFontColor ? {color: props.sectionFontColor} : null}><Translate
                                        name="active"/></Label>
                                    <Input
                                        style={props.sectionFontColor ? {color: props.sectionFontColor} : null}
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
                <ModalHeader
                    toggle={
                        () => {
                            props.toggleModal(props.type)
                        }
                    }
                    style={props.sectionFontColor ? {color: props.sectionFontColor} : null}
                >
                    <Translate name={props.type + "User"}/>
                </ModalHeader>
                {modalBodyContent()}
                <ModalFooter>
                    <Button
                        color="primary"
                        outline
                        type="submit"
                        onClick={
                            () => {
                                switch (props.type) {

                                    case 'add': {
                                        if ((props.user.first_name && props.user.first_name.length) && (props.user.last_name && props.user.last_name.length) && (props.user.email && props.user.email.length && props.user.email.includes('@') && props.user.email.includes('.')) && (props.user.username && props.user.username.length) && (props.user.password && props.user.password.length >= 8)) {
                                            setStatus(false);
                                            let index = false
                                            for (let item of props.users) {
                                                if (item.username === props.user.username) {
                                                    index = true
                                                }
                                            }
                                            if (!index) {
                                                props.userActions(props.type, props.user);
                                            } else {
                                                setStatus(true)
                                            }
                                        } else {
                                            setStatus(true);
                                        }
                                        break;
                                    }
                                    case 'delete': {
                                        props.userActions(props.type, props.user);
                                        break;
                                    }
                                    default: {
                                        if ((props.user.first_name && props.user.first_name.length) && (props.user.last_name && props.user.last_name.length) && (props.user.email && props.user.email.length && props.user.email.includes('@') && props.user.email.includes('.')) && (props.user.username && props.user.username.length) && (props.user.password && props.user.password.length >= 8)) {
                                            setStatus(false);
                                            props.userActions(props.type, props.user);
                                        } else {
                                            setStatus(true)
                                        }
                                        break;
                                    }
                                }

                                // if (props.type !== 'delete' && (props.user.first_name && props.user.first_name.length) && (props.user.last_name && props.user.last_name.length) && (props.user.email && props.user.email.length && props.user.email.includes('@') && props.user.email.includes('.')) && (props.user.username && props.user.username.length) && (props.user.password && props.user.password.length >= 8)) {
                                //     setStatus(false)
                                //     let index = false
                                //     for (let item of props.users) {
                                //         if (item.username === props.user.username) {
                                //             index = true
                                //         }
                                //     }
                                //     if (index !== true) {
                                //         props.userActions(props.type, props.user);
                                //     } else {
                                //         setStatus(true)
                                //     }
                                // } else if (props.type !== 'delete') {
                                //     setStatus(true)
                                // }
                                // if (props.type === 'delete') {
                                //     props.userActions(props.type, props.user);
                                // }
                                // if (props.type === 'add') {
                                //     let index = false
                                //     for (let item of props.users) {
                                //         if (item.username === props.user.username) {
                                //             index = true
                                //         }
                                //     }
                                //     if (index !== true) {
                                //         props.userActions(props.type, props.user);
                                //     } else {
                                //         setStatus(true)
                                //     }
                                // }
                                // if (props.type === 'edit') {
                                //     props.userActions(props.type, props.user);
                                // }
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