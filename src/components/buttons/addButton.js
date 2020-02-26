import React from "react";
import Translate from "../../Translate";
import {Button} from "reactstrap";

export default function AddButton(props) {
    let unauthorized  = (props.perm)?props.perm.includes("add"):false;
    return unauthorized ? <div></div> : <Button
        color="primary"
        className="btn btn-square"
        onClick={props.onClick}
    >
        <Translate name="add"/>
    </Button>;
}
