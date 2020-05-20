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
    const [isOpen, setIsOpen] = useState(false);
    const [type, setType] = useState(false)
    const [displayNumbers] = useState([
        {id: 1, name: 'Show the first 10 pieces', value: 10},
        {id: 2, name: 'Show the first 50 pieces', value: 50},
        {id: 3, name: 'Show the first 100 pieces', value: 100},
    ])

    let clsSearchBtn = [
        classes.searchBtn,
        isOpen ? classes.searchBtnOpened : null
    ]

    const toggle = () => {
        setIsOpen(!isOpen)
        setType(!type)
    };

    const deleteClassifiersItem = item => {
        props.removeSelectedClassifier(item)
    };

    const changeSwitchHandler = (name, value) => {
        props.toggleSwitchValue(name, value)
    }

    const changeCheckboxHandler = (name, check) => {
        props.toggleCheckBoxValue(name, check)
    }

    const choosePageSize = size => {
        props.changePageSize(size)
    }

    const writeSearchText = (text) => {
       props.addSearchText(text)
    }

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
            <Row>
                <Col xs={9} sm={10} md={10} lg={10}>
                    <TextFields
                        type={'search'}
                        label={<><SearchIcon/><Translate name={'search'}/></>}
                        name={'searchProduct'}
                        value={props.advancedSearchText}
                        onChange={event => writeSearchText(event.target.value)}
                    />
                </Col>
                <Col xs={3} sm={2} md={2} lg={2}>
                    <button
                        type={'button'}
                        className={`${classes.searchButton} d-lg-block mx-auto`}
                    >
                        <SearchIcon style={{ fontSize: 20 }}/>
                    </button>
                </Col>
            </Row>

            <Collapse isOpen={isOpen}>
                <Card style={{backgroundColor: 'transparent'}} className="m-0">
                    <CardBody className="m-0">
                        <h3 className="m-0"><Translate name={'advanced search'}/></h3>
                        <hr/>
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
                                                        checked={props.advancedSearchConfig[item] ? props.advancedSearchConfig[item] : false}
                                                        label={item}
                                                        size={"small"}
                                                        color={"primary"}
                                                        name={item}
                                                        onChange={event => changeCheckboxHandler(event.target.name, event.target.checked)}
                                                    />
                                                </p>
                                            )
                                        }
                                    )
                                }
                            </Col>
                            <Col md={props.advancedSearchConfig && props.advancedSearchConfig.classifiers ? 3 : 5}
                                 style={{paddingRight: 0}}>
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
                                        name={'image'}
                                        color={"primary"}
                                        value={props.advancedSearchConfig.image}
                                        onChange={event => changeSwitchHandler(event.target.name, event.target.value)}
                                    />
                                </div>
                                <div>
                                    <SwitchesUi
                                        label={'active'}
                                        name={'hasActive'}
                                        color={"primary"}
                                        value={props.advancedSearchConfig.hasActive}
                                        onChange={event => changeSwitchHandler(event.target.name, event.target.value)}
                                    />
                                </div>
                                <div>
                                    <SwitchesUi
                                        label={'suppliers'}
                                        name={'hasSuppliers'}
                                        color={"primary"}
                                        value={props.advancedSearchConfig.hasSuppliers}
                                        onChange={event => changeSwitchHandler(event.target.name, event.target.value)}
                                    />
                                </div>
                            </Col>
                            {
                                props.advancedSearchConfig && props.advancedSearchConfig.classifiers ?

                                    <Col ms={2} style={{paddingLeft: 0, paddingRight: 0}}>
                                        <h5>
                                            <Translate name={'Classifiers'}/>
                                        </h5>
                                        <hr style={{marginTop: '1.6rem'}}/>
                                        <div className={classes.classifiersWindow}>
                                            {
                                                props.advancedSearchConfig.classifiers.map(
                                                    item => {

                                                        return (
                                                            <p
                                                                key={item.id}
                                                                className={classes.listItem}
                                                            >
                                                                <span>{item.name}</span>
                                                                <ButtonUi
                                                                    fontColor={'#fff'}
                                                                    onClick={deleteClassifiersItem.bind(this, item)}
                                                                >
                                                                    <CloseIcon/>
                                                                </ButtonUi>
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
                                    value={props.advancedSearchConfig.pageSize}
                                    onChange={event => choosePageSize(event.target.value)}
                                />
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Collapse>
            <div className='mb-3'>
                <button
                    className={clsSearchBtn.join(' ')}
                    onClick={toggle}
                >
                    <ExpandLessIcon className={classes.icon}/>
                </button>
                <div className={classes.line}/>
            </div>
        </div>
    );
}

export default AdvancedSearch;