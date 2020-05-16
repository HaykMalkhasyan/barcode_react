import React from "react";
import classes from './cardBody.module.css'
import {CardBody, Col, Row} from "reactstrap";
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import Translate from "../../../../Translate";
import InputUi from "../../../../components/inputUI/inputUI";
import * as Icon from 'react-feather';

const BodyComponent = props => {

    const changeFormHandler = (name, value, area, id) => {
        props.changeFormDataValue(name, value, area, id)
    }

    const onFocusHandler = (name, area, id) => {
        props.checkTouched(name, area, id)
    }

    const formDataRender = (data, area, formDataValue) => {

        return data.map(
            item => {

                return (
                    <React.Fragment
                        key={item.id}
                    >
                        <InputUi
                            margin={item.error ? 0 : '0 0 24px'}
                            label={item.name}
                            type={'number'}
                            name={item.name}
                            value={formDataValue[item.name]}
                            onChange={event => changeFormHandler(event.target.name, event.target.value, area, item.id)}
                            onFocus={onFocusHandler.bind(this, item.name, area, item.id)}
                        />
                        {
                            item.error ?
                                <span className='danger font-small-1'>
                                    <Icon.AlertCircle size={20} className='danger mr-1'/>
                                    <Translate name={item.error}/>
                                </span>
                                :
                                null
                        }
                    </React.Fragment>
                )
            }
        )
    }

    return (
        <CardBody>
            <h4 className='pb-2'>
                <FormatListNumberedIcon fontSize={'large'}/>
                <Translate name={'It is necessary to indicate the numbers of the sections in the corresponding field'}/>
            </h4>
            <Row>
                <Col md={6} className={classes.colWindow}>
                    <div>
                        {
                            formDataRender(props.formData.departOne, 'departOne', props.formDataValue)
                        }
                    </div>
                </Col>
                <Col md={6} className={classes.colWindow}>
                    <div>
                        {
                            formDataRender(props.formData.departTwo, 'departTwo', props.formDataValue)
                        }
                    </div>
                </Col>
            </Row>
        </CardBody>
    )
}

export default BodyComponent