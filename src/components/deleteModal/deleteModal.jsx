import React from 'react'
import classes from './deleteModal.module.css'
import CustomButton from "../UI/button/customButton/customButton";
import AlertUI from "../UI/alert/alertUI/alertUI";

const DeleteModal = props => {

    return (
        <div className={props.open ? `${classes.deleteModal} ${classes.deleteModalOpened}` : `${classes.deleteModal} ${classes.deleteModalClosed}`}>
            <header>
                {props.groupName ? props.groupName : ''}
            </header>
            <section>
                {
                    props.status ?
                        <AlertUI
                            root={classes.alertRoot}
                            variant={'filled'}
                            severity={'warning'}
                            text={props.alertText}
                        />
                        :
                        null
                }
                <p>
                    {/*{props.information}*/}
                </p>
                <h5>
                    {props.question}
                </h5>
            </section>
            <footer>
                <CustomButton
                    className={classes.cancelButton}
                    children={props.cancelButtonName}
                    // Methods
                    onClick={props.closeHandler}
                />
                <CustomButton
                    className={classes.confirmButton}
                    children={props.confirmButtonName}
                    disabled={props.status}
                    // Methods
                    onClick={() => props.deleteHandler(props.data.id)}
                />
            </footer>
        </div>
    )
};

export default DeleteModal;