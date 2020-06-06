import React from 'react';
import {FormGroup, Input, Label} from 'reactstrap';
import Translate from "../../Translate";

const Selectstrap = props => {

    return (
        <FormGroup>
            <Label for="exampleSelect">
                <Translate name={props.label}/>
            </Label>
            <Input
                type="select"
                name={props.name}
                id="exampleSelect"
                value={props.value}
                onChange={props.onChange}
            >
                <option>
                    ...
                </option>
                {
                    props.data ?
                        props.data.map(
                            item => {

                                return (
                                    <option
                                        key={item.id}
                                        value={item.id}
                                    >
                                        {item.name}
                                    </option>
                                )
                            }
                        )
                        :
                        null
                }
            </Input>
        </FormGroup>
    )
}

export default Selectstrap