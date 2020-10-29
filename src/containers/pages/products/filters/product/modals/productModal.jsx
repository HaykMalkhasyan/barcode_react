import React, {useState} from 'react'
import AddContent from "./addContent/addContent";
import DialogUI from "../../../../../../components/dialogUI/dialogUI";
import ModalHeader from "./modalHeader/modalHeader";
import ModalFooter from "./modalFooter/modalFooter";
import {connect} from "react-redux";
import {setProduct, setProductValues, setTabValue} from "../../../../../../Redux/products/actions";

const ProductModal = props => {
    const [gallery, setGallery] = useState([]);

    const deleteUploadImagesHandler = (item, index) => {
        const images = [];
        const old_images = [...props.images];

        setGallery([]);
        if (props.open === 'edit') {
            props.product['pictures'].forEach(
                image => old_images.indexOf(image.image) !== -1 ?
                    images.push(image['image'])
                    :
                    null
            );
            props.setProductValues('pictures', {pictures: props.product.pictures});
        }
        props.setProductValues('images', images);
    };

    const deleteImageHandler = (image, index) => {

        const pictures = {...props.pictures};
        const picturesArr = [...pictures.pictures];
        const images = [...props.images];
        images.splice(index, 1);
        for (let [key, item] of Object.entries(picturesArr)) {
            if (item.image === image) {
                picturesArr.splice(+key, 1)
            }
        }
        props.setProductValues('images', images);
        props.setProductValues('pictures', {pictures: picturesArr})
    };

    const addPhotoHandler = event => {
        setGallery([...event.target.files]);
        const pictures = {...props.pictures};
        const picturesArr = [...pictures.pictures];
        const images = [...props.images];
        [...event.target.files].forEach(
            file => {
                images.push(URL.createObjectURL(file));
                picturesArr.push({name: file.name})
            }
        );
        props.setProductValues('images', images);
        props.setProductValues('pictures', {pictures: picturesArr})
    };

    const confirmHandler = type => {
        props.setProduct(gallery, type);
        if (type !== 'save' && props.open === false) {
            setGallery([])
        }
    };

    const labelRender = type => {

        switch (type) {
            case 'add':
                return 'Ավելացնել ապրանք';
            case 'edit':
                return 'Փոփոխել ապրանքը';
            default:
                return 'Error #404!'
        }

    };

    return (
        <DialogUI
            root={props.root}
            label={
                <ModalHeader
                    label={labelRender(props.open)}
                    // Methods
                    confirmHandler={confirmHandler}
                    closeHandler={
                        () => {
                            setGallery([]);
                            props.handleClose()
                        }
                    }
                />
            }
            maxWidth={false}
            scroll={props.scroll}
            open={props.open}
            paper={props.paper}
            children={
                <AddContent
                    type={props.type}
                    modalTabs={props.modalTabs}
                    gallery={props.images}
                    imageData={gallery}
                    pictures={props.pictures}
                    activeTab={props.activeTab}
                    // Methods
                    addPhotoHandler={addPhotoHandler}
                    deleteImageHandler={deleteImageHandler}
                    deleteUploadImagesHandler={deleteUploadImagesHandler}
                    setTabValue={props.setTabValue}
                />
            }
            // Methods
            handleClose={props.handleClose}
            footer={
                <ModalFooter
                    type={props.type}
                    errorFields={props.errorFields}
                    // Methods
                    confirmHandler={confirmHandler}
                />
            }
        />
    );
};

function mapStateToProps(state) {

    return {
        errorFields: state.products.errorFields,
        activeTab: state.products.activeTab,
        images: state.products.images,
        pictures: state.products.pictures,
        product: state.products.product,
        open: state.products.open,
    }
}

function mapDispatchToProps(dispatch) {

    return {
        setProductValues: (name, value) => dispatch(setProductValues(name, value)),
        setProduct: (gallery, type) => dispatch(setProduct(gallery, type)),
        setTabValue: (value) => dispatch(setTabValue(value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductModal)