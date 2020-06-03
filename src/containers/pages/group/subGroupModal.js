import React, {useState} from "react";
import {Button, Col, FormGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import Translate from "../../../Translate";
import LocalizeTab from "../../localize/localizeTab";
import UploadWithIcon from "../../../components/uploadImageWithIcon/uploadImageWithIcon";

const SubGroupModal = (props) => {
    const [image, setImage] = useState(null)

    const uploadImage = file => {
        setImage(file)
    }

    const deleteUploadedImage = () => {
        setImage(null)
    }

    function modalBodyContent() {
        if(props.type==="delete"){
            return(
                <ModalBody style={props.sectionFontColor ? {color: props.sectionFontColor} : null}>Դուք համոզված ե՞ք ջնջել</ModalBody>
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
                    <FormGroup>
                        <Label for="name" style={props.sectionFontColor ? {color: props.sectionFontColor} : null}><Translate name={"name"}/></Label>
                        <input
                            style={props.sectionFontColor ? {color: props.sectionFontColor} : null}
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
            <Modal isOpen={props.subModal[props.type]} toggle={()=>props.setActionToggleSubModal({/*props.type*/})}  size="lg">
                <ModalHeader toggle={()=>props.toggleSubModal(props.type)} style={props.sectionFontColor ? {color: props.sectionFontColor} : null}><Translate name={props.type+"SubGroup"}/></ModalHeader>
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