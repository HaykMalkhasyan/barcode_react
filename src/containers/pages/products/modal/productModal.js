import React, {useState} from "react";
import {
    Button,
    Col,
    CustomInput,
    Form,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row
} from "reactstrap";
import Translate from "../../../../Translate";
import TabComponent from "./tab/productTab";
import photo6 from "../../../../assets/images/empty_product.svg";
import LocalizeTab from "../../../localize/localizeTab";
import SearchSelectUI from "../../../../components/selectWithSearchUI/selectWithSearch";

const ProductModal = (props) => {
    const [img] = useState(false)
    const [mainImg, setMainImg] = useState(false)
    const [creatProductStatus, setCreateProductStatus] = useState(false)

    const onMeasurementHandler = (name, data) => {
        props.setMeasurementValue(name, data)
    }

    const createProduct = () => {
        let prod = props.product;
        if (prod.sku && prod.name && prod.points && prod.measurement && prod.groups && prod.suppliers && prod.barcode && prod.description) {
            setCreateProductStatus(false);
            props.productActions(props.type, props.product)
        } else {
            setCreateProductStatus('You have not filled in all the fields')
        }
    }

    const setValueHandler = () => {
        if (props.product.measurement) {
            for (let item of props.measurementData) {
                if (item.id === props.product.measurement) {
                    return item.name;
                }
            }
        }
    }
    const onPointHandler = event => {
        props.setPointsValue(event.target.name, event.target.value)
    }

    const mImageRender = () => {
        if (mainImg && props.product.upImages) {
            for (let item of props.product.upImages) {
                if (item === mainImg.name) {
                    return URL.createObjectURL(mainImg)
                }
            }
            return photo6
        } else {
            return photo6
        }
    }

    function modalBodyContent() {
        if (props.type === "delete") {
            return (
                <ModalBody>Դուք համոզված ե՞ք ջնջել</ModalBody>
            )

        } else {
            return (
                <ModalBody>
                    <Row>
                        <Col md="12">
                            <div className="px-3">
                                <Form className="form-horizontal">
                                    <div className="form-body">
                                        <Row>
                                            <Col md="4">
                                                <FormGroup>
                                                    <img
                                                        className="img-fluid"
                                                        src={
                                                            mainImg ?
                                                                mImageRender()
                                                                :
                                                                photo6
                                                        }
                                                        alt="Timeline 2"
                                                    />
                                                    {/*<CustomInput*/}
                                                    {/*    type="file"*/}
                                                    {/*    id="images"*/}
                                                    {/*    className="form-control-file"*/}
                                                    {/*    value={props.product.images ? props.product.images || '' : ''}*/}
                                                    {/*    multiple="multiple"*/}
                                                    {/*    onChange={event => {*/}
                                                    {/*        setImg(event.target.files[0])*/}
                                                    {/*        props.uploadImages("products", event);*/}
                                                    {/*        props.setModalValues("images", event.target.value)*/}
                                                    {/*    }}*/}
                                                    {/*/>*/}


                                                </FormGroup>
                                            </Col>
                                            <Col md="8">
                                                <FormGroup row className="py-3">
                                                    <Label sm={4}></Label>
                                                    <Col sm={8}>
                                                        <LocalizeTab/>
                                                    </Col>
                                                </FormGroup>

                                                <FormGroup row>
                                                    <Label for="sku" sm={4}><Translate name={"sku"}/></Label>
                                                    <Col sm={8}>
                                                        <Input
                                                            type="text"
                                                            id="sku"
                                                            value={props.product.sku ? props.product.sku || '' : ''}
                                                            onChange={event => props.setModalValues("sku", event.target.value)}
                                                        />
                                                    </Col>
                                                </FormGroup>

                                                <FormGroup row>
                                                    <Label for="name" sm={4}><Translate name={"name"}/></Label>
                                                    <Col sm={8}>
                                                        <Input
                                                            type="text"
                                                            id="name"
                                                            value={props.product.name ? props.product.name || '' : ''}
                                                            onChange={event => props.setModalValues("name", event.target.value)}
                                                        />
                                                    </Col>
                                                </FormGroup>

                                                <FormGroup row>
                                                    <Label for="points" sm={4}><Translate name={"points"}/></Label>
                                                    <Col sm={8}>
                                                        <Input
                                                            type="number"
                                                            min={0}
                                                            id="points"
                                                            name="points"
                                                            value={props.product.points ? props.product.points : ''}
                                                            onChange={event => onPointHandler(event)}
                                                        />
                                                    </Col>
                                                </FormGroup>

                                                <FormGroup
                                                    row
                                                    className="justify-content-end"
                                                >
                                                    <Label for="measurement" sm={4}><Translate
                                                        name={"measurement"}/></Label>
                                                    <Col
                                                        sm={8}
                                                    >
                                                        <SearchSelectUI
                                                            id={'measurement'}
                                                            name={'measurement'}
                                                            label={'measurement'}
                                                            data={props.measurementData}
                                                            onClick={onMeasurementHandler}
                                                            defaultValue={setValueHandler()}
                                                        />
                                                    </Col>
                                                </FormGroup>

                                                <FormGroup row
                                                           style={{marginBottom: '14px', justifyContent: 'flex-end'}}>
                                                    <Label for="active" sm={'auto'}><Translate name={"active"}/></Label>
                                                    <Col sm={'auto'}>
                                                        <CustomInput
                                                            type="checkbox"
                                                            id="active"
                                                            defaultChecked
                                                            onChange={event => props.setModalValues("active", props.product.hasOwnProperty('active') ? (!props.product.active) : false)}
                                                        />
                                                    </Col>
                                                </FormGroup>
                                            </Col>

                                        </Row>
                                        <TabComponent mainIMg={setMainImg} {...props}/>
                                    </div>
                                </Form>
                            </div>
                        </Col>

                    </Row>


                </ModalBody>
            )

        }

    }

    return (
        <React.Fragment>
            <Modal isOpen={props.modal[props.type]} toggle={() => props.toggleModal(props.type)} size="lg">
                <ModalHeader toggle={() => props.toggleModal(props.type)}><Translate name="addProduct"/></ModalHeader>
                {modalBodyContent()}
                <ModalFooter>
                    {
                        creatProductStatus ?
                            <span className='danger font-small-1'>
                                <Translate name={creatProductStatus}/>
                            </span>
                            :
                            null
                    }
                    <Button color="primary" outline type="submit"
                            onClick={createProduct}>
                        <Translate name="confirm"/>
                    </Button>
                </ModalFooter>
            </Modal>

        </React.Fragment>
    );

};

export default ProductModal;