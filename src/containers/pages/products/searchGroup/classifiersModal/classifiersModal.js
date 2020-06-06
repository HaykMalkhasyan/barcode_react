import React from "react";
import {Card, CardBody, ModalFooter} from "reactstrap";
import Translate from "../../../../../Translate";
import classes from './classifiersModal.module.css'
import * as Icon from 'react-feather'
import LayersIcon from '@material-ui/icons/Layers';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from '@material-ui/core/Collapse';
import ClassifaersTree from "./classifiersTreeViewer/classifiersTreeViewverV2";

const ClassifiersModal = props => {

    // const groupsClickHandler = item => {
    //     setActive(item.id)
    //     props.selectClassifiersGroup(item)
    // }

    // const chooseClassifiersHandler = () => {
    //     setActive(false)
    //     props.createClassifiers()
    // }


    return (
        <Card className="m-0">
            <CardBody className="m-0">
                <h6 style={props.sectionFontColor ? {color: props.sectionFontColor} : null}>
                    <LayersIcon className='mr-1'/>
                    <Translate name={'Classifiers'}/>
                </h6>
                <hr style={{margin: '10px 0', borderColor: '#eee'}}/>
                <header className={classes.mBodyHeader}>
                    <List
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                    >
                        {
                            props.groups && props.groups.length ?
                                props.groups.map(
                                    (item, index) => {

                                        return (
                                            <React.Fragment key={index}>
                                                <ListItem className='px-0' button onClick={props.handleClick.bind(this, item)}>
                                                    <ListItemIcon>
                                                        <LayersIcon fontSize='small'/>
                                                    </ListItemIcon>
                                                    <ListItemText primary={item.name}/>
                                                    {props.isOpen === item.name ? <ExpandLess/> : <ExpandMore/>}
                                                </ListItem>
                                                <Collapse
                                                    in={props.isOpen === item.name ? true : false}
                                                    timeout={400}
                                                    unmountOnExit
                                                    className='px-2'
                                                >
                                                    {
                                                        props.group && props.subGroups ?
                                                            <ClassifaersTree
                                                                // DATA
                                                                group={props.group}
                                                                data={props.subGroups}
                                                                sectionFontColor={props.sectionFontColor}
                                                                collapsedStatus={props.collapsedStatus}
                                                                advancedSearchConfig={props.advancedSearchConfig}
                                                                // METHODS
                                                                subGroupCollapses={props.subGroupCollapses}
                                                                onChange={props.classifiersSelectHandler}
                                                            />
                                                            :
                                                            null
                                                    }
                                                </Collapse>
                                            </React.Fragment>
                                        )
                                    }
                                )
                                :
                                <p className="text-center info m-1">
                                    <Icon.AlertTriangle className='warning mr-1'/>
                                    <Translate name={'The groups are empty'}/>
                                </p>
                        }
                    </List>
                </header>
            </CardBody>
            {
                props.createError ?
                    <ModalFooter>
                        <p className="danger font-weight-bold"><Translate
                            name={'Error! The classifier was not selected'}/></p>
                    </ModalFooter>
                    :
                    null
            }
        </Card>
    )
}

export default ClassifiersModal