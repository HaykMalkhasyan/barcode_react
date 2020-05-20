import React from "react";
import {Trash2} from "react-feather";

export default function DeleteButton(props) {
    let unauthorized  = (props.perm)?props.perm.includes("delete"):false;
    return unauthorized ? <div></div> : <Trash2 className={`cursor-pointer ${props.className}`} size={18} color="#FF586B"  onClick={props.onClick}/>;
}
