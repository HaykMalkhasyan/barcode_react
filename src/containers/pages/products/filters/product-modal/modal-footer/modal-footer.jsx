import React from "react";
import classes from "./modal-footer.module.css";
import RemoveButton from "../../../../../../components/UI/button/removeButton/removeButton";
import Tooltip from "@material-ui/core/Tooltip";
import ErrorIcon from "@material-ui/icons/Error";
import ConfirmButton from "../../../../../../components/UI/button/confirmButton/confirmButton";

const ModalFooter = props => {

    const titleRender = () => {
        let errors = [];
        if (props.errorFields.indexOf('item_name') !== -1) {
            errors.push('"Անվանում" դաշտը լրացրած չէ');
        }
        if (props.errorFields.indexOf('short_name') !== -1) {
            errors.push('"Կրճատ անվանում" դաշտը լրացրած չէ');
        }
        if (props.errorFields.indexOf('product_type') !== -1) {
            errors.push('"Տեսակ" դաշտը լրացրած չէ');
        }
        if (props.errorFields.indexOf('unit_id') !== -1) {
            errors.push('"Չափման միաոր" դաշտը լրացրած չէ');
        }
        if (props.errorFields.indexOf('classifiers') !== -1) {
            errors.push('Դասակագիչները ընտրված չեն');
        }
        if (props.errorFields.indexOf('barcode') !== -1) {
            errors.push('Ապրանքին կցված չեն շտրիխ-կոդ(եր)');
        }
        if (props.errorFields.indexOf('suppliers') !== -1) {
            errors.push('Մատակարարները նշված չեն');
        }

        return errors.map(
            (error, index) => {

                return (
                    <p key={`error-${index}`}>{error}</p>
                )
            }
        )
    };

    return (
        <footer className={props.type === "add" ? `${classes.modalFooter} ${classes.typeAdd}` : classes.modalFooter}>
            {
                props.type === "edit" ?
                    <RemoveButton
                        name={'remove'}
                        label={'Ջնջել'}
                    />
                    :
                    null
            }
            <div className={classes.finishButtons}>
                {
                    props.errorFields && props.errorFields.length ?
                        <Tooltip title={titleRender()} placement="right">
                            <ErrorIcon className={classes.errorIcon}/>
                        </Tooltip>
                        :
                        null
                }
                <ConfirmButton
                    name={'confirm'}
                    // Methods
                    onClick={() => props.confirmHandler('confirm')}
                />
            </div>
        </footer>
    )
}

export default ModalFooter