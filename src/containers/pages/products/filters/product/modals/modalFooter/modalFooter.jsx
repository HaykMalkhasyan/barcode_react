import React from 'react'
import classes from './modalFoote.module.css'
import ConfirmButton from "../../../../../../../components/UI/button/confirmButton/confirmButton";
import RemoveButton from "../../../../../../../components/UI/button/removeButton/removeButton";

const ModalFooter = props => {

    return (
        <div className={props.type === "add" ? `${classes.modalFooter} ${classes.typeAdd}` : classes.modalFooter}>
            {
                props.type === "edit" ?
                    <RemoveButton
                        name={'remove'}
                        label={'Ջնջել'}
                    />
                    :
                    null
            }
            <ConfirmButton
                name={'confirm'}
                // Methods
                onClick={() => props.confirmHandler('confirm')}
            />
        </div>
    )
};

export default ModalFooter;