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
import LocalizeTab from "../../../localize/localizeTab";
import SearchSelectUI from "../../../../components/selectWithSearchUI/selectWithSearch";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import ButtonUi from "../../../../components/buttons/buttonUi";
import UploadButton from "../../../../components/buttons/upploadBtnUI";
import Tooltip from '@material-ui/core/Tooltip';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const ProductModal = (props) => {
    const [photoBtns, setPhotoBtns] = useState(false)
    const [valImg, setValImg] = useState(null)
    const [activeImg, setActiveImg] = useState(null)

    const onMeasurementHandler = (name, data) => {
        props.setMeasurementValue(name, data)
    }

    const createProduct = (event,type) => {
        event.preventDefault();
        console.log(event, type)
        let prod = props.product;
        if (Object.keys(prod).length > 0) {
            if (type === 'add') {
                if (prod.sku && prod.name && prod.measurement && prod.groups && prod.supplier && prod.barcode && prod.description && props.images.length) {
                    let image = valImg;
                    props.testFetchNewProduct(props.type, props.product, image);
                    setPhotoBtns(false)
                    setValImg(null)
                    setActiveImg(null)
                } else {
                    props.addProductStatus(true, 'error', 'You have not filled in all the fields')
                }
            } else if (type === 'edit') {
                let image = valImg
                props.testFetchNewProduct(props.type, props.product, image)
                setPhotoBtns(false)
                setValImg(null)
                setActiveImg(null)
            } else {
                props.productActions(type, props.product)
                setPhotoBtns(false)
                setValImg(null)
                setActiveImg(null)
            }
        } else {
            props.addProductStatus(true, 'error', 'You have not filled in all the fields')
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
    const deleteImage = type => {
        switch (type) {
            case 'add': {
                let images = [...valImg];
                images.splice(activeImg.index, 1)
                setValImg(images)
                props.deleteUploadImage(activeImg.image, activeImg.index,  type)
                break;
            }
            case 'edit': {
                console.log(type)
                break;
            }
            default: break
        }
    }

    const uploadImageHandler = event => {
        let imgs = event.target.files;
        let allImage = false;
        if (valImg !== null) {
            allImage = [...valImg];
        }
        for (let item of imgs) {
            let index = false;
            for (let imageItem of props.images) {
                if (item.name === imageItem.originalAlt) {
                    index = true
                }
            }
            if (!index) {
                if (allImage !== false) {
                    allImage.push(item)
                    setValImg(allImage)
                } else {
                    setValImg(event.target.files)
                }
                let obj = {
                    original: URL.createObjectURL(item),
                    thumbnail: URL.createObjectURL(item),
                    originalAlt: item.name
                }
                props.images.unshift(obj)

                props.SetUploadImages(event.target.name, item)
            }
        }
    }

    const selectMainIMage = () => {
        if (activeImg) {
            props.setMainImage(activeImg.image.originalAlt)
        }
        setPhotoBtns(false)
    }

    const thumbClickHandler = (event, index) => {
        setPhotoBtns(true);
        let img = {
            image: props.images[index],
            index: index
        }
        setActiveImg(img)
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

    function modalBodyContent() {
        if (props.modal === "delete") {
            return (
                <ModalBody style={props.sectionFontColor ? {color: props.sectionFontColor} : null}>
                    <Translate name={'Դուք համոզված ե՞ք ջնջել'}/>
                </ModalBody>
            )

        } else if (props.modal === 'add' || props.modal === 'edit') {
            return (
                <ModalBody style={props.sectionFontColor ? {color: props.sectionFontColor} : null}>
                    <Row>
                        <Col md="12">
                            <div className="px-3">
                                <Form className="form-horizontal">
                                    <div className="form-body">
                                        <Row>
                                            <Col md="5">
                                                <FormGroup>
                                                    <div className={classes.imagesArea}>
                                                        <div
                                                            className={`d-flex justify-content-center ${classes.ctrlsBtns}`}>
                                                            {
                                                                photoBtns ?
                                                                    <ButtonGroup
                                                                        variant="text"
                                                                        color="primary"
                                                                        aria-label="text primary button group"
                                                                        onMouseLeave={() => setPhotoBtns(false)}
                                                                    >
                                                                        <UploadButton
                                                                            color={'default'}
                                                                            name={'pictures'}
                                                                            onChange={event => uploadImageHandler(event)}
                                                                            multiple={true}
                                                                            accept={'image/*'}
                                                                            padding={'3px 5px'}
                                                                            margin={0}
                                                                            width={'auto'}
                                                                            height={'auto'}
                                                                            title={'add photo'}
                                                                        />
                                                                        {
                                                                            props.type === 'edit' ?
                                                                                <ButtonUi
                                                                                    width={'auto'}
                                                                                    height={'auto'}
                                                                                    margin={'0'}
                                                                                    padding={'1px 15px'}
                                                                                    color={'primary'}
                                                                                    onClick={selectMainIMage}
                                                                                >
                                                                                    <Tooltip title={<Translate
                                                                                        name={'make the main'}/>}
                                                                                             placement="right">
                                                                                        <PhotoLibraryIcon
                                                                                            fontSize={'small'}
                                                                                            className='mr-1'
                                                                                        />
                                                                                    </Tooltip>
                                                                                </ButtonUi>
                                                                                :
                                                                                null
                                                                        }
                                                                        <ButtonUi
                                                                            width={'auto'}
                                                                            height={'auto'}
                                                                            margin={'0'}
                                                                            padding={'1px 15px'}
                                                                            color={'secondary'}
                                                                            onClick={deleteImage.bind(this, props.type)}
                                                                        >
                                                                            <Tooltip
                                                                                title={<Translate name={'delete'}/>}
                                                                                placement="right">
                                                                                <DeleteForeverIcon
                                                                                    fontSize={'small'}
                                                                                    className='mr-1'
                                                                                />
                                                                            </Tooltip>
                                                                        </ButtonUi>
                                                                    </ButtonGroup>
                                                                    :
                                                                    <ButtonGroup variant="text" color="primary"
                                                                                 aria-label="text primary button group">
                                                                        <UploadButton
                                                                            color={'default'}
                                                                            name={'pictures'}
                                                                            onChange={event => uploadImageHandler(event)}
                                                                            multiple={true}
                                                                            accept={'image/*'}
                                                                            padding={'3px 5px'}
                                                                            margin={0}
                                                                            width={'auto'}
                                                                            height={'auto'}
                                                                            title={'add photo'}
                                                                        />
                                                                    </ButtonGroup>
                                                            }
                                                        </div>
                                                        {
                                                            props.images.length ?
                                                                <ImageGallery
                                                                    items={props.images}
                                                                    showPlayButton={false}
                                                                    showFullscreenButton={false}
                                                                    renderLeftNav={renderLeftNav}
                                                                    renderRightNav={renderRightNav}
                                                                    renderFullscreenButton={renderFullscreenButton}
                                                                    onThumbnailClick={(event, index) => thumbClickHandler(event, index)}
                                                                    thumbnailPosition={'bottom'}
                                                                />
                                                                :
                                                                <div
                                                                    style={{
                                                                        height: 300,
                                                                        overflow: 'hidden',
                                                                        // backgroundColor: '#F2F2F2'
                                                                    }}
                                                                >
                                                                    <img
                                                                        src={process.env.PUBLIC_URL + '/folder-add.gif'}
                                                                        alt=""
                                                                        style={{
                                                                            height: 300,
                                                                            display: 'block',
                                                                            margin: '0 auto'
                                                                        }}
                                                                    />
                                                                </div>
                                                        }
                                                    </div>

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
                                                    <Label for="sku" sm={4}
                                                           style={props.sectionFontColor ? {color: props.sectionFontColor} : null}><Translate
                                                        name={"sku"}/></Label>
                                                    <Col sm={8}>
                                                        <Input
                                                            style={props.sectionFontColor ? {color: props.sectionFontColor} : null}
                                                            type="text"
                                                            id="sku"
                                                            value={props.product.sku ? props.product.sku || '' : ''}
                                                            onChange={event => props.setModalValues("sku", event.target.value)}
                                                        />
                                                    </Col>
                                                </FormGroup>

                                                <FormGroup row>
                                                    <Label for="name" sm={4}
                                                           style={props.sectionFontColor ? {color: props.sectionFontColor} : null}><Translate
                                                        name={"name"}/></Label>
                                                    <Col sm={8}>
                                                        <Input
                                                            style={props.sectionFontColor ? {color: props.sectionFontColor} : null}
                                                            type="text"
                                                            id="name"
                                                            value={props.product.name ? props.product.name || '' : ''}
                                                            onChange={event => props.setModalValues("name", event.target.value)}
                                                        />
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup
                                                    row
                                                    className="justify-content-end"
                                                >
                                                    <Label for="measurement" sm={4}
                                                           style={props.sectionFontColor ? {color: props.sectionFontColor} : null}>
                                                        <Translate name={"measurement"}/></Label>
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
                                                    <Label for="active" sm={'auto'}
                                                           style={props.sectionFontColor ? {color: props.sectionFontColor} : null}><Translate
                                                        name={"active"}/></Label>
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
                                        <TabComponent {...props}/>
                                    </div>
                                </Form>
                            </div>
                        </Col>

                    </Row>


                </ModalBody>
            )

        }

    }

    const modalheaderName = type => {
        if (type === 'add') {
            return "addProduct"
        } else if (type === 'edit') {
            return "editProduct"
        }
        return "deleteProduct"
    }

    return (
        <React.Fragment>
            <Modal
                isOpen={props.modal === props.type ? true : false}
                toggle={
                    event => {
                        event.stopPropagation()
                        setPhotoBtns(false)
                        setActiveImg(null)
                        props.toggleModal(props.type, 0, true)
                    }
                }
                size="xl"
            >
                <ModalHeader
                    toggle={
                        event => {
                            event.stopPropagation()
                            setPhotoBtns(false)
                            setActiveImg(null)
                            props.toggleModal(props.type, 0, true)
                        }
                    }
                    style={
                        props.sectionFontColor ?
                            {color: props.sectionFontColor}
                            :
                            null
                    }
                >
                    {
                        <Translate name={modalheaderName(props.type)}/>
                    }
                </ModalHeader>
                {modalBodyContent()}
                <ModalFooter>
                    <Button
                        color="primary"
                        outline
                        type="button"
                        onClick={
                            event => createProduct(event, props.type)
                        }
                    >
                        <Translate name="confirm"/>
                    </Button>
                </ModalFooter>
            </Modal>

        </React.Fragment>
    );

};

export default ProductModal;