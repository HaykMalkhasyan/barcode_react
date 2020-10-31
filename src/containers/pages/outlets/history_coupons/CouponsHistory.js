import React, {useState} from 'react'
import style from "./CouponsHistory.module.css"
import HistoryIcon from '@material-ui/icons/History';
import Drawer from "./Drawer"

export default function CouponsHistory() {

    const [open, setOpen] = useState(false)

    return (
        <div className={style.iconCont} onClick={()=>setOpen(!open)} >
            <span className={style.icon}>
                <HistoryIcon fontSize="large" />
            </span>
            <Drawer open={open} setOpen={setOpen} />
        </div>
    )
}
