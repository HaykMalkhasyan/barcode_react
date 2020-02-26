import React from "react";
import {Plus} from "react-feather";

export default function EditButton(props) {
    let unauthorized  = (props.perm)?props.perm.includes("add"):false;
    return unauthorized ? <div></div> : <Plus size={20} className="mr-2" style={{color:props.color? props.color:'#009598\n'}} onClick={props.onClick} />;
}
