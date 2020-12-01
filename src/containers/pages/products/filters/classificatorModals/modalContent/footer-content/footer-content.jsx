import React from "react";
import classes from "./footer-content.module.css";
import CancelButton from "../../../../../../../components/UI/button/cencelButtom/cancelButton";
import ConfirmButton from "../../../../../../../components/UI/button/confirmButton/confirmButton";
import IconButtonUI from "../../../../../../../components/UI/button/icon-button-ui/icon-button-ui";
import Icons from "../../../../../../../components/Icons/icons";

const FooterContent = props => {

    return (
        <footer className={classes.footer}>
            <CancelButton
                onClick={props.cencel}
            />
            <div>
                {console.log(props.treeType)}
                {
                    !props.own_status ?
                        <IconButtonUI
                            size={"medium"}
                            className={classes.iconButton}
                            title={"Ջնջել դասակարգիչը"}
                            icon={<Icons opacity={1} type={"group-delete"} className={classes.removeButtonIcon}/>}
                            // Methods
                            onClick={event => props.deleteHandler(event, 'group', {path: "Group/Group", id: props.group.id})}
                        />
                        :
                        null
                }
                <ConfirmButton
                    // Methods
                    onClick={
                        props.newGroup.title_am && !props.own_status ?
                            props.cencel
                            :
                            props.confirmHandler
                    }
                />
            </div>
        </footer>
    )
}

export default FooterContent