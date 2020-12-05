import React, {useEffect, useState} from "react";
import classes from "./product-modal.module.css"
import Backdrop from "../../../../../components/UI/backdrop/backdrop";
import ModalHeader from "./modal-header/modal-header";
import ModalFooter from "./modal-footer/modal-footer";
import {
    deleteProduct,
    setAllImages,
    setMainImage,
    setProduct,
    setProductValues,
    setTabValue
} from "../../../../../Redux/products/actions";
import {connect} from "react-redux";
import ModalContent from "./modal-content/modal-content";

const ProductsModal = props => {
    const [gallery, setGallery] = useState([]);

    const addPhotoHandler = event => {
        setGallery([...event.target.files]);
        const pictures = {...props.pictures};
        const picturesArr = [...pictures.pictures];
        const images = [...props.images];
        [...event.target.files].forEach(
            (file, index) => {
                images.push(URL.createObjectURL(file));
                picturesArr.push({name: file.name, index: index})
            }
        );
        props.setAllImages(images, {pictures: picturesArr});
    }

    const setDefaultImage = index => {
        let mainIMage = {};
        for (let item of props.pictures.pictures) {
            if (item.index === index) {
                mainIMage = {...item};
                props.setMainImage(mainIMage);
                break;
            }
        }
    }

    useEffect(() => {
        if (props.open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = ''
        };
    });

    const confirmHandler = type => {
        props.setProduct(gallery, type);
        if (type !== 'save' && props.open === false) {
            setGallery([])
        }
    };

    return props.open ?
        <>
            <Backdrop className={classes.backdrop}/>
            <div className={classes.productModal}>
                <div className={classes.modal}>
                    <ModalHeader
                        type={props.open}
                        // Methods
                        closeHandler={() => {
                            setGallery([]);
                            props.handleClose();
                        }}
                        confirmHandler={confirmHandler}
                    />
                    <ModalContent
                        tabErrors={props.tabErrors}
                        gallery={props.images}
                        images={props.images}
                        pictures={props.pictures}
                        modalTabs={props.modalTabs}
                        main={props.main}
                        // Methods
                        addPhotoHandler={addPhotoHandler}
                        setDefaultImage={setDefaultImage}
                    />
                    <ModalFooter type={props.open} errorFields={props.errorFields} confirmHandler={confirmHandler} deleteProduct={props.deleteProduct}/>
                </div>
            </div>
        </>
        :
        null
}

function mapStateToProps(state) {

    return {
        errorFields: state.products.errorFields,
        tabErrors: state.products.tabErrors,
        activeTab: state.products.activeTab,
        images: state.products.images,
        pictures: state.products.pictures,
        product: state.products.product,
        open: state.products.open,
        main : state.products.main,
    }
}

function mapDispatchToProps(dispatch) {

    return {
        setProductValues: (name, value) => dispatch(setProductValues(name, value)),
        setProduct: (gallery, type) => dispatch(setProduct(gallery, type)),
        setTabValue: (value) => dispatch(setTabValue(value)),
        setMainImage: image_path => dispatch(setMainImage(image_path)),
        setAllImages: (images, pictures) => dispatch(setAllImages(images, pictures)),
        deleteProduct: () => dispatch(deleteProduct()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsModal)