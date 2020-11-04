import React from 'react'
import style from "./AddModal.module.css"
import DialogUI from "../../../../components/dialogUI/dialogUI"

export default function AddModal(props) {
    return (
        // <ModalUI
        //         open={props.open}
        //         setOpen={props.setOpen}
        //         handleClose={()=>{props.setOpen(false)}}
        //         // className={classes.settingsModal}
        //     >
        //         <AddFunc
        //             // profile={props.profile}
        //         />
        //     </ModalUI>

        <DialogUI
            open={props.open}
            setOpen={props.setOpen}
            handleClose={()=>{props.setOpen(false)}}
        >
            <AddFunc />
        </DialogUI>
    )
}


function AddFunc(){
    return <div className={style.fullContainer}>
        <div className={style.header} >
            Ավելացնել փաստաթուղթ
        </div>
    </div>
}
