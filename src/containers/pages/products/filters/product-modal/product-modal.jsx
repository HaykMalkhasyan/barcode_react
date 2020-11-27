import React, {useEffect, useState} from "react";
import classes from "./product-modal.module.css"
import Backdrop from "../../../../../components/UI/backdrop/backdrop";
import ModalHeader from "./modal-header/modal-header";
import ModalFooter from "./modal-footer/modal-footer";
import {setProduct, setProductValues, setTabValue} from "../../../../../Redux/products/actions";
import {connect} from "react-redux";
import ModalContent from "./modal-content/modal-content";

const ProductsModal = props => {
    const [gallery, setGallery] = useState([]);

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
            <Backdrop className={`background-rgba_00008 ${classes.backdrop}`}/>
            <div className={classes.productModal}>
                <div className={`background-fff ${classes.modal}`}>
                    <ModalHeader type={props.open} closeHandler={() => {
                        setGallery([]);
                        props.handleClose();
                    }}/>
                    <ModalContent gallery={gallery} modalTabs={props.modalTabs}/>
                    <ModalFooter type={props.open} errorFields={props.errorFields} confirmHandler={confirmHandler}/>
                </div>
            </div>
        </>
        :
        null
}

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

export default connect(mapStateToProps, mapDispatchToProps)(ProductsModal)