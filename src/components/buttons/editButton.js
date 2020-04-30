import React from "react";
import {Edit} from "react-feather";

export default function EditButton(props) {
    let unauthorized  = (props.perm)?props.perm.includes("edit"):false;
    return unauthorized ? <div></div> : <Edit size={18} className="mr-2 cursor-pointer" onClick={props.onClick} />;
}
