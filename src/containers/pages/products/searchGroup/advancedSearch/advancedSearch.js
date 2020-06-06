import React, {useState} from 'react';
import {Card, CardBody, Col, Collapse, Row} from 'reactstrap';
import classes from './advancedSearch.module.css'
import Translate from "../../../../../Translate";
import CheckboxesUi from "../../../../../components/checkBoxUI/checkBoxUI";
import ButtonUi from "../../../../../components/buttons/buttonUi";
import SettingsIcon from '@material-ui/icons/Settings';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import RadioUi from "../../../../../components/radioUI/radioUI";
import SearchIcon from '@material-ui/icons/Search';

const AdvancedSearch = (props) => {
    const [displayNumbers] = useState([
        {id: 1, name: '10 pieces', value: 10},
        {id: 2, name: '50 pieces', value: 50},
        {id: 3, name: '100 pieces', value: 100},
    ])

    const changeCheckboxHandler = (name, check) => {
        props.toggleCheckBoxValue(name, check)
    }

    const choosePageSize = size => {
        props.changePageSize(size)
    }

    return (
        <Card style={{backgroundColor: 'transparent'}} className="m-0">
            <CardBody className="m-0">
                <Row>
                    <Col md={6} className={`${classes.searchWindow} mb-4`}>
                        <h6 style={props.sectionFontColor ? {color: props.sectionFontColor} : null}>
                            <FindInPageIcon className='mr-1'/>
                            <Translate name={'Search settings'}/>
                        </h6>
                        <hr style={{margin: '10px 0', borderColor: '#eee'}}/>
                        <Row
                            className='pt-1'
                        >
                            {
                                Object.keys(props.searchItemsKey).map(
                                    (item, index) => {

                                        return (
                                            <Col
                                                md={6}
                                                key={index}
                                                style={props.sectionFontColor ? {color: props.sectionFontColor} : null}
                                                className='py-1 pl-2'
                                            >
                                                <CheckboxesUi
                                                    translate={true}
                                                    checked={props.advancedSearchConfig[item] ? props.advancedSearchConfig[item] : false}
                                                    label={item}
                                                    size={"small"}
                                                    color={"primary"}
                                                    name={item}
                                                    onChange={event => changeCheckboxHandler(event.target.name, event.target.checked)}
                                                />
                                            </Col>
                                        )
                                    }
                                )
                            }
                        </Row>
                    </Col>
                    <Col md={6} style={props.sectionFontColor ? {color: props.sectionFontColor} : null}>
                        <h6>
                            <SettingsIcon className="mr-1"/>
                            <Translate name={'Additional settings'}/>
                        </h6>
                        <hr style={{margin: '10px 0', borderColor: '#eee'}}/>
                        <RadioUi
                            md={6}
                            headerName={'Show the first'}
                            data={displayNumbers}
                            name={'displayNumber'}
                            color={'primary'}
                            size={"small"}
                            value={props.advancedSearchConfig.pageSize}
                            onChange={event => choosePageSize(event.target.value)}
                        />
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
}

export default AdvancedSearch;