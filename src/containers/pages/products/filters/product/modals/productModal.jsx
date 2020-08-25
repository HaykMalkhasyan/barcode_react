import React, {useState} from 'react'
import AddContent from "./addContent/addContent";
import DialogUI from "../../../../../../components/dialogUI/dialogUI";
import ModalHeader from "./modalHeader/modalHeader";
import ModalFooter from "./modalFooter/modalFooter";
import {connect} from "react-redux";
import {setProduct, setProductValues} from "../../../../../../Redux/products/actions";

const ProductModal = props => {
    const [gallery, setGallery] = useState([]);

    const addPhotoHandler = event => {
        setGallery([...event.target.files]);
        const pictures = [];
        [...event.target.files].forEach(
            file => {
                pictures.push({name: file.name})
            }
        );
        props.setProductValues('pictures', {pictures: pictures})
    };

    const confirmHandler = type => {
        props.setProduct(gallery, type);
        if (type !== 'save') {
            setGallery([])
        }
    };

    switch (props.type) {
        case 'add':
            return (
                <DialogUI
                    label={
                        <ModalHeader
                            label={'Ավելացնել ապրանք'}
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
                    open={props.open === "add"}
                    paper={props.paper}
                    children={
                        <AddContent
                            modalTabs={props.modalTabs}
                            gallery={gallery}
                            // Methods
                            addPhotoHandler={addPhotoHandler}
                        />
                    }
                    // Methods
                    handleClose={props.handleClose}
                    footer={
                        <ModalFooter
                            type={props.type}
                            // Methods
                            confirmHandler={confirmHandler}
                        />
                    }
                />
            );
        case 'edit':
            return (
                <DialogUI
                    label={
                        <ModalHeader
                            label={'Փոփոխել ապրանքը'}
                            // Methods
                            closeHandler={
                                () => {
                                    setGallery([]);
                                    props.handleClose()
                                }
                            }
                        />
                    }
                    maxWidth={'lg'}
                    scroll={props.scroll}
                    open={props.open === "edit"}
                    children={
                        <div>
                            <h1>Փոփոխել ապրանք</h1>
                        </div>
                    }
                    // Methods
                    handleClose={props.handleClose}
                />
            );
        default: return null;
    }
};

function mapStateToProps(state) {

    return {
        errorFields: state.products.errorFields,
    }
}

function mapDispatchToProps(dispatch) {

    return {
        setProductValues: (name, value) => dispatch(setProductValues(name, value)),
        setProduct: (gallery, type) => dispatch(setProduct(gallery, type)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductModal)