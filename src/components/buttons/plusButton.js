import React from "react";
import {Plus} from "react-feather";

export default function EditButton(props) {
    let unauthorized  = (props.perm)?props.perm.includes("add"):false;
    return unauthorized ? <div></div> : <Plus size={18} className="mr-2" style={{color: '#009598\n'}} onClick={props.onClick} />;
}
