import React, {useState} from "react";
import {Button, Col, FormGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import Translate from "../../../Translate";
import LocalizeTab from "../../localize/localizeTab";
import UploadWithIcon from "../../../components/uploadImageWithIcon/uploadImageWithIcon";
import SwitchesUi from "../../../components/switchUI/switchUI";
import HelpRoundedIcon from '@material-ui/icons/HelpRounded';
import Tooltip from '@material-ui/core/Tooltip';

const GroupModal = (props) => {
    const [image, setImage] = useState(null)

    const uploadImage = file => {
        setImage(file)
    }

    const deleteUploadedImage = () => {
        setImage(null)
    }

    function modalBodyContent() {
        if (props.type === "delete") {
            return (
                <ModalBody
                    style={props.sectionFontColor ? {color: props.sectionFontColor} : null}
                >Դուք համոզված ե՞ք ջնջել</ModalBody>
            )
        } else {
            return (
                <ModalBody>
                    <FormGroup row className="justify-content-between">
                        <Col sm={12}>
                            <LocalizeTab/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <UploadWithIcon
                            image={image}
                            id={'classifiersImage'}
                            hidden={true}
                            name={'classifiersImage'}
                            alt={'classifiers-image'}
                            fileName={image ? image.name : ''}
                            fileSize={image ? image.size : ''}
                            fileType={image ? image.type : ''}
                            onClick={deleteUploadedImage}
                            onChange={
                                event => uploadImage(event.target.files[0])
                            }
                        />
                    </FormGroup>
                    <Row>
                        <Col md={8}>
                            <FormGroup>
                                <Label for="name"
                                       style={props.sectionFontColor ? {color: props.sectionFontColor} : null}><Translate
                                    name={"name"}/></Label>
                                <input
                                    style={props.sectionFontColor ? {color: props.sectionFontColor} : null}
                                    className={`form-control  ${props.errors.name ? 'is-invalid' : ''}`}
                                    type="text"
                                    id="name"
                                    value={props.group && props.group.name ? props.group.name : ""}
                                    onChange={event => props.setModalValues("name", event.target.value)}
                                />
                            </FormGroup>
                        </Col>
                        <Col
                            md={4}
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <SwitchesUi
                                color={'primary'}
                                label={'required'}
                                mBottom={0}
                                name={'required_group'}
                                value={props.group.required_group}
                                onChange={
                                    event => {
                                        console.log(!event.target.checked)
                                        props.setModalValues("required_group", event.target.checked)
                                    }
                                }
                            />
                            <span>
                                <Tooltip
                                    title={
                                        <Translate
                                            name={'attachedClassifier.'}
                                        />
                                    }
                                    placement="right"
                                >
                                    <HelpRoundedIcon fontSize='small' color='primary'/>
                                </Tooltip>
                            </span>
                        </Col>
                    </Row>
                </ModalBody>
            )

        }

    }

    return (

        <React.Fragment>
            <Modal isOpen={props.modal[props.type]} toggle={() => props.toggleModal(props.type)} size="lg">
                <ModalHeader toggle={() => props.toggleModal(props.type)}
                             style={props.sectionFontColor ? {color: props.sectionFontColor} : null}>
                    <Translate name={props.type + "Group"}/>
                </ModalHeader>
                {modalBodyContent()}
                <ModalFooter>
                    <Button
                        color="primary"
                        type="submit"
                        outline
                        onClick={
                            () => {
                                props.groupActions(props.type, props.group);
                                props.toggleModalLanguage()
                            }
                        }
                    >
                        <Translate name={"confirm"}/>
                    </Button>
                </ModalFooter>
            </Modal>

        </React.Fragment>
    );

};

export default GroupModal;