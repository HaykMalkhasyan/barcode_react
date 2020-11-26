import React from 'react'
import classes from './deleteModal.module.css'
import CustomButton from "../UI/button/customButton/customButton";
import AlertUI from "../UI/alert/alertUI/alertUI";

const DeleteModal = props => {

    return (
        <div className={props.open ? `background-fff ${classes.deleteModal} ${classes.deleteModalOpened}` : `background-fff ${classes.deleteModal} ${classes.deleteModalClosed}`}>
            <header className="color-444 font-size-15">
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
                <p className="color-666 font-size-12">
                    {/*{props.information}*/}
                </p>
                <h5 className="color-ff8927">
                    {props.question}
                </h5>
            </section>
            <footer>
                <CustomButton
                    className={`background-transparent color-ff4a4a font-size-12 ${classes.cancelButton}`}
                    children={props.cancelButtonName}
                    // Methods
                    onClick={props.closeHandler}
                />
                <CustomButton
                    className={`background-transparent color-54a94a font-size-12 ${classes.confirmButton}`}
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