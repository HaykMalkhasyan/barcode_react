import React, {Component} from 'react';
import {Button, Col, Row} from 'reactstrap';
import classes from './content.module.css'
import TextFields from "../../../components/textFieldUI/textField";
import Translate from "../../../Translate";
import CustomizedTreeView from "./treeUi/tree";
import * as Icon from 'react-feather';
import ButtonUi from "../../../components/buttons/buttonUi";
import BuildIcon from '@material-ui/icons/Build';
import MyTabs from "../../../components/myTabs/myTabs";
import AddIcon from "@material-ui/icons/Add";

class ContentTable extends Component {
    state = {
        msg: false,
        searchStatus: false
    }

    clickHandler = id => {
        this.props.getSeletGroup(id)
        this.props.getSubGroup(id)
    }

    searchCHangeHandler = (name, value, mainId) => {
        // let index = false
        // for (let item of value) {
        //     if (item / 1) {
        //         index = true
        //     }
        // }
        // if (!index) {
        //     this.setState({
        //         msg: false
        //     })
        this.props.searchGroups(name, value, mainId)
        // } else {
        //     this.setState({
        //         msg: true
        //     })
        // }
    }

    alternativeHandler = () => {
        this.props.alternativeShow()
    }

    render() {

        return (
            <>
                <ButtonUi
                    className={`${classes.buildBtn} ${this.props.editabled ? classes.buildBtnAnimated : null}`}
                    label={<BuildIcon style={{fontSize: 12}}/>}
                    padding={5}
                    width={'auto'}
                    height={'auto'}
                    color={this.props.editabled ? 'primary' : 'default'}
                    onClick={this.props.toggleEditebled}
                />
                <div className={classes.headerWindow}>
                    <div>
                        <h4 style={this.props.sectionFontColor ? {color: this.props.sectionFontColor} : null}><Translate name={'Groups'}/></h4>
                        {
                            this.props.editabled ?
                                <div className='ml-1 p-0'>
                                    <Button
                                        style={{margin: 0, padding: 0, width: 30, height: '30px'}}
                                        outline
                                        className="btn-square"
                                        color={'info'}
                                        perm={this.props.perm}
                                        onClick={() => this.props.toggleModal("add")}
                                    >
                                        <AddIcon className='p-0'/>
                                    </Button>
                                </div>
                                :
                                null
                        }
                    </div>
                    <div className={classes.searchArea}>
                        <TextFields
                            label={<Translate name={'Search'} />}
                            name={'search'}
                            type='search'
                            value={this.props.search ? this.props.search.value : ''}
                            onChange={
                                this.props.group ?
                                    this.props.group.id ?
                                        event => this.searchCHangeHandler(event.target.name, event.target.value, this.props.group.id)
                                        :
                                        () => this.setState({
                                            searchStatus: 'The groups are empty'
                                        })
                                    :
                                    () => this.setState({
                                        searchStatus: 'The groups are empty'
                                    })
                            }
                        />
                        {
                            this.state.searchStatus ?
                                <span className='info font-small-1 bold'>
                                            <Icon.AlertOctagon className='mr-1 warning' size={18}/>
                                            <Translate name={this.state.searchStatus}/>
                                        </span>
                                :
                                null
                        }

                        {
                            this.state.msg ?
                                <p className='font-small-2 m-0'>
                                    <Icon.AlertOctagon className="danger mr-1" size={14}/>
                                    <span className="warning">
                                                <Translate name={'It is not allowed to enter a digit in this field'}/>
                                            </span>
                                </p>
                                :
                                null
                        }
                        {
                            this.props.search !== null && this.props.searchResult.length === 0 ?
                                <p className='font-small-2 m-0'>
                                    <Icon.AlertTriangle className="danger mr-1" size={14}/>
                                    <span className="info">
                                                <Translate name={'The search returned no result'}/>
                                            </span>
                                </p>
                                :
                                null
                        }
                    </div>
                </div>
                <section className={classes.section}>
                    <MyTabs
                        clickHandler={this.clickHandler}
                        groups={this.props.groups}
                        group={this.props.group}
                        editabled={this.props.editabled}
                        perm={this.props.perm}
                        toggleModal={this.props.toggleModal}
                        groupActions={this.props.groupActions}
                    >
                        <Row>
                            <Col md={8}>
                                {
                                    this.props.group ?
                                        this.props.group.id ?
                                            <CustomizedTreeView
                                                sectionFontColor={this.props.sectionFontColor}
                                                subGroupActions={this.props.subGroupActions}
                                                subGroupsCollapseStatus={this.props.subGroupsCollapseStatus}
                                                collapsedStatus={this.props.collapsedStatus}
                                                editabled={this.props.editabled}
                                                setActionToggleSubModal={this.props.setActionToggleSubModal}
                                                groupActions={this.props.groupActions}
                                                toggleModal={this.props.toggleModal}
                                                mainId={this.props.group.id}
                                                mI={this.props.group}
                                                mainName={this.props.group.name}
                                                data={this.props.subGroups}
                                                movingGroupStatus={this.props.movingGroupStatus}
                                                startMovingGroup={this.props.startMovingGroup}
                                                endeMovingGroup={this.props.endeMovingGroup}
                                                editPosition={this.props.editPosition}
                                                seteExpanded={this.props.seteExpanded}
                                                expanded={this.props.expanded}
                                                searchResItem={this.props.searchResItem}
                                            />
                                            :
                                            null
                                        :
                                        null
                                }
                            </Col>
                        </Row>
                    </MyTabs>
                </section>
            </>
        )
    }
}

export default ContentTable