import React, {useState} from 'react';
import {Button, Card, CardBody, Col, Collapse, Row} from 'reactstrap';
import classes from './advancedSearch.module.css'
import Translate from "../../../../../Translate";
import SearchIcon from '@material-ui/icons/Search';
import CheckboxesUi from "../../../../../components/checkBoxUI/checkBoxUI";
import SwitchesUi from "../../../../../components/switchUI/switchUI";
import ButtonUi from "../../../../../components/buttons/buttonUi";
import SelectUi from "../../../../../components/selectUI/selectUI";
import TuneIcon from '@material-ui/icons/Tune';
import SettingsIcon from '@material-ui/icons/Settings';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import RadioUi from "../../../../../components/radioUI/radioUI";
import ClassifiersModal from "../classifiersModal/classifiersModal";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

const AdvancedSearch = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [type, setType] = useState(false)
    const [displayNumbers] = useState([
        {id: 1, name: 'Show the first 10 pieces', value: 10},
        {id: 2, name: 'Show the first 50 pieces', value: 50},
        {id: 3, name: 'Show the first 100 pieces', value: 100},
    ])

    const toggle = () => {
        setIsOpen(!isOpen)
        setType(!type)
    };

    return (
        <div>
            <ClassifiersModal
                groups={props.groups}
                group={props.group}
                createError={props.createError}
                classifiersToggleModal={props.classifiersToggleModal}
                subGroups={props.subGroups}
                classifiersModal={props.classifiersModal}
                selectClassifiersGroup={props.selectClassifiersGroup}
                selectGroupsNode={props.selectGroupsNode}
                createClassifiers={props.createClassifiers}
            />
            <button
                className={classes.searchBtn}
                onClick={toggle}
            >
                {
                    !isOpen ?
                        <SearchIcon className={classes.icon}/>
                        :

                        <ExpandLessIcon className={classes.icon}/>
                }
            </button>
            <div className={classes.line}/>
            <Collapse isOpen={isOpen}>
                <h3><Translate name={'advanced search'}/></h3>
                <Card>
                    <CardBody>
                        <Row>
                            <Col md={3} className={classes.searchWindow}>
                                <h5>
                                    <FindInPageIcon className='mr-1'/>
                                    <Translate name={'Search settings'}/>
                                </h5>
                                <hr/>
                                {
                                    Object.keys(props.searchItemsKey).map(
                                        (item, index) => {

                                            return (
                                                <p key={index}>
                                                    <CheckboxesUi
                                                        checked={false}
                                                        label={item}
                                                        size={"small"}
                                                        color={"primary"}
                                                    />
                                                </p>
                                            )
                                        }
                                    )
                                }
                            </Col>
                            <Col md={props.advancedSearchConfig && props.advancedSearchConfig.classifiers ? 3 : 5}>
                                <h5>
                                    <TuneIcon className="mr-1"/>
                                    <Translate name={'filters'}/>
                                </h5>
                                <hr/>
                                <div className={classes.searchWindow}>
                                    <span className="mr-1"><Translate name={'groups'}/></span>
                                    <ButtonUi
                                        width={'auto'}
                                        height={'auto'}
                                        label={<Translate name={'Classifiers'}/>}
                                        name={'classifiers'}
                                        color={'primary'}
                                        variant={'contained'}
                                        padding={'2px 10px'}
                                        fontSize={'12px'}
                                        fontWeight={700}
                                        onClick={props.classifiersToggleModal}
                                    />
                                </div>
                                <div>
                                    <SwitchesUi
                                        label={'Image'}
                                    />
                                </div>
                                <div>
                                    <SwitchesUi
                                        label={'active'}
                                    />
                                </div>
                                <div>
                                    <SwitchesUi
                                        label={'suppliers'}
                                    />
                                </div>
                            </Col>
                            {
                                props.advancedSearchConfig && props.advancedSearchConfig.classifiers ?

                                    <Col ms={2}>
                                        <h5>
                                            <Translate name={'Classifiers'}/>
                                        </h5>
                                        <hr/>
                                        <div className="p-1">
                                            {
                                                props.advancedSearchConfig.classifiers.map(
                                                    item => {

                                                        return (
                                                            <p
                                                                key={item.id}
                                                                className={classes.listItem}
                                                            >
                                                                {item.name}
                                                            </p>
                                                        )
                                                    }
                                                )
                                            }
                                        </div>
                                    </Col>
                                    :
                                    null
                            }
                            <Col md={4}>
                                <h5>
                                    <SettingsIcon className="mr-1"/>
                                    <Translate name={'Additional settings'}/>
                                </h5>
                                <hr/>
                                <RadioUi
                                    headerName={'Number of displays'}
                                    data={displayNumbers}
                                    name={'displayNumber'}
                                    color={'primary'}
                                    size={"small"}
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