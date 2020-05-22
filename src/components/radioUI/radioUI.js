import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Translate from "../../Translate";
import {Col, Row} from "reactstrap";

export default function RadioUi(props) {

    return (
        <FormControl
            component="fieldset"
            style={{
                userSelect: 'none'
            }}
        >
            <FormLabel component="legend"><Translate name={props.headerName}/></FormLabel>
            <RadioGroup aria-label="gender" name={props.name} value={props.value} onChange={props.onChange}>
                <Row>
                    <Col md={props.md}>
                        <FormControlLabel
                            value={'all'}
                            control={<Radio color={props.color}/>}
                            label={<Translate name={'all'}/>}
                        />
                    </Col>
                    {
                        props.data ?
                            props.data.map(
                                item => {

                                    return (
                                        <Col
                                            key={item.id}
                                            md={props.md}
                                        >
                                            <FormControlLabel
                                                value={item.value}
                                                size={props.size}
                                                control={<Radio color={props.color}/>}
                                                label={<Translate name={item.name}/>}
                                            />
                                        </Col>
                                    )
                                }
                            )
                            :
                            null
                    }
                </Row>
            </RadioGroup>
        </FormControl>
    );
}
