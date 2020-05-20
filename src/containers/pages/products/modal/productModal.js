import React, {useState} from "react";
import classes from './productModal.module.css'
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
import ButtonGroup from '@material-ui/core/ButtonGroup';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import BackspaceIcon from '@material-ui/icons/Backspace';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import ButtonUi from "../../../../components/buttons/buttonUi";
import UploadButton from "../../../../components/buttons/upploadBtnUI";

const images = [
    {
        id: 1,
        original: 'https://picsum.photos/id/1018/1000/600/',
        thumbnail: 'https://picsum.photos/id/1018/250/150/',
        originalAlt: '10',
    },
    {
        id: 2,
        original: 'https://picsum.photos/id/1015/1000/600/',
        thumbnail: 'https://picsum.photos/id/1015/250/150/',
        originalAlt: '20'
    },
    {
        id: 3,
        original: 'https://picsum.photos/id/1019/1000/600/',
        thumbnail: 'https://picsum.photos/id/1019/250/150/',
        originalAlt: '30'
    },
    {
        id: 4,
        original: 'https://picsum.photos/id/1018/1000/600/',
        thumbnail: 'https://picsum.photos/id/1018/250/150/',
        originalAlt: '40'
    },
    {
        id: 5,
        original: 'https://picsum.photos/id/1015/1000/600/',
        thumbnail: 'https://picsum.photos/id/1015/250/150/',
        originalAlt: '50'
    },
    {
        id: 6,
        original: 'https://picsum.photos/id/1019/1000/600/',
        thumbnail: 'https://picsum.photos/id/1019/250/150/',
        originalAlt: '60'
    },
    {
        id: 7,
        original: 'https://picsum.photos/id/1018/1000/600/',
        thumbnail: 'https://picsum.photos/id/1018/250/150/',
        originalAlt: '70'
    },
    {
        original: 'https://picsum.photos/id/1015/1000/600/',
        thumbnail: 'https://picsum.photos/id/1015/250/150/',
        originalAlt: '80'
    },
    {
        original: 'https://picsum.photos/id/1019/1000/600/',
        thumbnail: 'https://picsum.photos/id/1019/250/150/',
        originalAlt: '90'
    },
];

const ProductModal = (props) => {
    const [img] = useState(false)
    const [mainImg, setMainImg] = useState(false)
    const [creatProductStatus, setCreateProductStatus] = useState(false)
    const [photoBtns, setPhotoBtns] = useState(false)
    const [valImg, setValImg] = useState(null)
    const [activeImg, setActiveImg] = useState(null)

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
        return 'select the unit of measurement'
    }
    const onPointHandler = event => {
        props.setPointsValue(event.target.name, event.target.value)
    }

    //galery change handler
    const clickHandler = event => {
        setPhotoBtns(true)
        console.log(images[event])
        setActiveImg(event)
    }

    const renderLeftNav = (onClick, disabled) => {
        return (
            <button
                type={'button'}
                className='image-gallery-icon image-gallery-left-nav'
                disabled={disabled}
                onClick={onClick}>
                <KeyboardArrowLeftIcon/>
            </button>
        )
    }

    const renderFullscreenButton = (onClick, isFullscreen) => {
        return (
            <button
                type='button'
                className={`image-gallery-icon image-gallery-fullscreen-button`}
                onClick={onClick}
            >
                {
                    isFullscreen ?
                        <FullscreenExitIcon/>
                        :
                        <FullscreenIcon/>
                }
            </button>
        );
    }

    const renderRightNav = (onClick, disabled) => {
        return (
            <button
                type={'button'}
                className='image-gallery-icon image-gallery-right-nav'
                disabled={disabled}
                onClick={onClick}>
                <KeyboardArrowRightIcon/>
            </button>
        )
    }

    const uploadImageHandler = event => {
        setValImg(event.target.files)
        let imgs = event.target.files;
        for (let item of imgs) {
            let obj = {
                original: URL.createObjectURL(item),
                thumbnail: URL.createObjectURL(item),
                originalAlt: item.name
            }
            images.unshift(obj)
        }
        props.SetUploadImages(event.target.name, event.target.files)
    }

    const selectMainIMage = () => {
        console.log(images[activeImg].originalAlt)
        // props.mainIMg(images[activeImg].originalAlt)
        props.setMainImage(images[activeImg].originalAlt)
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
                                            <Col md="5">
                                                <FormGroup>
                                                    {/*<img*/}
                                                    {/*    className="img-fluid"*/}
                                                    {/*    src={*/}
                                                    {/*        mainImg ?*/}
                                                    {/*            mImageRender()*/}
                                                    {/*            :*/}
                                                    {/*            photo6*/}
                                                    {/*    }*/}
                                                    {/*    alt="Timeline 2"*/}
                                                    {/*/>*/}

                                                    <div className={classes.imagesArea}>
                                                        <div
                                                            className={`d-flex justify-content-center ${classes.ctrlsBtns}`}>
                                                            {
                                                                photoBtns ?
                                                                    <ButtonGroup variant="text" color="primary"
                                                                                 aria-label="text primary button group">
                                                                        <UploadButton
                                                                            color={'default'}
                                                                            name={'upImages'}
                                                                            onChange={event => uploadImageHandler(event)}
                                                                            multiple={true}
                                                                            accept={'image/*'}
                                                                            padding={'3px 5px'}
                                                                            margin={0}
                                                                            width={'auto'}
                                                                            height={'auto'}
                                                                        />
                                                                        <ButtonUi
                                                                            width={'auto'}
                                                                            height={'auto'}
                                                                            margin={'0'}
                                                                            padding={'1px 15px'}
                                                                            color={'primary'}
                                                                            onClick={selectMainIMage}
                                                                        >
                                                                            <PhotoLibraryIcon
                                                                                fontSize={'small'}
                                                                                className='mr-1'
                                                                            />

                                                                        </ButtonUi>
                                                                        <ButtonUi
                                                                            width={'auto'}
                                                                            height={'auto'}
                                                                            margin={'0'}
                                                                            padding={'1px 15px'}
                                                                            color={'secondary'}
                                                                        >
                                                                            <BackspaceIcon
                                                                                fontSize={'small'}
                                                                                className='mr-1'
                                                                            />
                                                                        </ButtonUi>
                                                                    </ButtonGroup>
                                                                    :
                                                                    <ButtonGroup variant="text" color="primary"
                                                                                 aria-label="text primary button group">
                                                                        <UploadButton
                                                                            color={'default'}
                                                                            name={'upImages'}
                                                                            onChange={event => uploadImageHandler(event)}
                                                                            multiple={true}
                                                                            accept={'image/*'}
                                                                            padding={'3px 5px'}
                                                                            margin={0}
                                                                            width={'auto'}
                                                                            height={'auto'}
                                                                        />
                                                                    </ButtonGroup>
                                                            }
                                                        </div>
                                                        <ImageGallery
                                                            items={images}
                                                            showPlayButton={false}
                                                            showFullscreenButton={false}
                                                            // onThumbnailClick={event => clickHandler(event)}
                                                            onSlide={event => clickHandler(event)}
                                                            renderLeftNav={renderLeftNav}
                                                            renderRightNav={renderRightNav}
                                                            renderFullscreenButton={renderFullscreenButton}
                                                        />
                                                    </div>

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
                                            <Col md="7">
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
            <Modal isOpen={props.modal[props.type]} toggle={() => props.toggleModal(props.type)} size="xl">
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