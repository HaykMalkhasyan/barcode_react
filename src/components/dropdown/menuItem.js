import React from "react";
import Translate from "../../Translate";

export default function menuItem(props) {
    console.log(props)
    const [checked] = useState(props.checked);
    return (
    <li className={"list-group-item list-group-item-action no-border  bg-lighten-4"} key={id}>
        <Row className="todo-list-group-item">
            <Label check onClick={() => setChecked(!checked)}><CustomInput  type="checkbox" defaultChecked={checked} /></Label>
            <p className="mb-0 font-small-3"><Translate name={props.name}/></p>
        </Row>
    </li>);
}
