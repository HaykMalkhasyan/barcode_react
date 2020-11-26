import React from "react";
import classes from "./delete-content.module.css";
import Backdrop from "../../../../../../../components/UI/backdrop/backdrop";
import cookie from "../../../../../../../services/cookies";
import DeleteModal from "../../../../../../../components/deleteModal/deleteModal";

const DeleteContent = props => {

    const deleteModalNameRender = (type, subgroup, group) => {
        if (type === 'subgroup') {
            if (subgroup) {
                return subgroup[`name_${cookie.get('language') || "am"}`]
            }
        } else if (type === 'group') {
            if (group) {
                return group[`title_${cookie.get('language') || "am"}`]
            }
        }
    }

    const dataRender = (type, subgroup, group) => {
        if (type === 'subgroup') {
            if (subgroup) {
                return subgroup;
            }
        } else if (type === 'group') {
            if (group) {
                return group;
            }
        }
    }

    return (
        <>
            {
                props.delete ?
                    <Backdrop
                        className={`background-rgba_00008 ${classes.backdrop}`}
                        // Methods
                        onClick={props.deleteModalCloseHandler}
                    />
                    :
                    null
            }
            <DeleteModal
                open={props.delete}
                groupName={deleteModalNameRender(props.delete, props.subgroup, props.group)}
                data={dataRender(props.delete, props.subgroup, props.group)}
                alertText={'Դուք չեք կարող ջնջել տվյալ խումբը, քանի որ այն պարունակում է իրեն կից ապրանքատեսականի'}
                information={'Եթե տվյալ խումբը պարունակում է ենթախմբեր, ապա ջնջելով այն կջնջվեն նաև իր բոլոր ենթախմբերը․'}
                question={'Դուք իսկապե՞ս ցանկանում եք ջնջել տվյալ խումբը'}
                cancelButtonName={'Ոչ'}
                confirmButtonName={'Այո'}
                status={props.group ? props.group.required_group : false}
                // Methods
                closeHandler={props.deleteModalCloseHandler}
                deleteHandler={props.deleteModalConfirmHandler}
            />
        </>
    )
}

export default DeleteContent