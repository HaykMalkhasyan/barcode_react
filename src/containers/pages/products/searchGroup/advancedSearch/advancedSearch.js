import React, {useState} from 'react';
import {Card, CardBody, Col, Collapse, Row} from 'reactstrap';
import classes from './advancedSearch.module.css'
import Translate from "../../../../../Translate";
import SearchIcon from '@material-ui/icons/Search';
import CheckboxesUi from "../../../../../components/checkBoxUI/checkBoxUI";
import SwitchesUi from "../../../../../components/switchUI/switchUI";
import ButtonUi from "../../../../../components/buttons/buttonUi";
import TuneIcon from '@material-ui/icons/Tune';
import SettingsIcon from '@material-ui/icons/Settings';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import RadioUi from "../../../../../components/radioUI/radioUI";
import ClassifiersModal from "../classifiersModal/classifiersModal";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import CloseIcon from '@material-ui/icons/Close';
import TextFields from "../../../../../components/textFieldUI/textField";
import button from "../../../../../components/buttons/button";

const AdvancedSearch = (props) => {
    const [displayNumbers] = useState([
        {id: 1, name: 'Show the first 10 pieces', value: 10},
        {id: 2, name: 'Show the first 50 pieces', value: 50},
        {id: 3, name: 'Show the first 100 pieces', value: 100},
    ])

    const changeCheckboxHandler = (name, check) => {
        props.toggleCheckBoxValue(name, check)
    }

    const choosePageSize = size => {
        props.changePageSize(size)
    }

    return (
        <div>

            <Collapse isOpen={props.isOpen}>
                <Card style={{backgroundColor: 'transparent'}} className="m-0">
                    <CardBody className="m-0">
                        <Row>
                            <Col md={12} className={`${classes.searchWindow} mb-4`}>
                                <h6 style={props.sectionFontColor ? {color: props.sectionFontColor} : null}>
                                    <FindInPageIcon className='mr-1'/>
                                    <Translate name={'Search settings'}/>
                                </h6>
                                <hr style={{margin: '10px 0', borderColor: '#eee'}}/>
                                <Row>
                                    {
                                        Object.keys(props.searchItemsKey).map(
                                            (item, index) => {

                                                return (
                                                    <Col md={'auto'} key={index} style={props.sectionFontColor ? {color: props.sectionFontColor} : null}>
                                                        <CheckboxesUi
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
                            <Col md={12} style={props.sectionFontColor ? {color: props.sectionFontColor} : null}>
                                <h6>
                                    <SettingsIcon className="mr-1"/>
                                    <Translate name={'Additional settings'}/>
                                </h6>
                                <hr style={{margin: '10px 0', borderColor: '#eee'}}/>
                                <RadioUi
                                    md={'auto'}
                                    headerName={'Number of displays'}
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
            </Collapse>
        </div>
    );
}

export default AdvancedSearch;