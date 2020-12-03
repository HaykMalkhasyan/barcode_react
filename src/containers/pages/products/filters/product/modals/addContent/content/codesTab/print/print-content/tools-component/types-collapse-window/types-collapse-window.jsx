import React from 'react'
import classes from './types-collapse-window.module.css'
import CustomButton from "../../../../../../../../../../../../../components/UI/button/customButton/custom-button";

const TypesCollapseWindow = props => {

    const selectTypesHandler = id => {
        props.setBarcodeValue('active_type', id)
    };

    return (
        <div className={classes.typesCollapseWindow}>
            {
                props.types_data && props.types_data.length ?
                    props.types_data.map(
                        item => {

                            return (
                                <CustomButton
                                    key={'barcode-types-' + item.id}
                                    className={`${classes.typesButton} ${item.id === props.active_type ? classes.active : ''}`}
                                    children={
                                        <img src={`${process.env.PUBLIC_URL}/${item.image}`}
                                             alt={`${item.alt}-${item.id}`}/>
                                    }
                                    // Methods
                                    onClick={() => selectTypesHandler(item.id)}
                                />
                            )
                        }
                    )
                    :
                    null
            }
        </div>
    )
};

export default TypesCollapseWindow;