import React from "react";
import Translate from "../../Translate";
import {Button} from "reactstrap";

export default function AddButton(props) {
    let unauthorized  = (props.perm)?props.perm.includes("add"):false;
    return unauthorized ? <div></div> : <Button
        color="primary"
        type="button"
        className="btn btn-raised btn-danger my-2 shadow-z-2"
        onClick={props.onClick}
    >
        <Translate name="add"/>
    </Button>;
}
