import React, {Component} from 'react';
import {Button} from 'reactstrap';
import classes from './content.module.css'
import EditButton from "../../../components/buttons/editButton";
import DeleteButton from "../../../components/buttons/deleteButton";
import TextFields from "../../../components/textFieldUI/textField";
import Translate from "../../../Translate";
import CustomizedTreeView from "./treeUi/tree";
import * as Icon from 'react-feather';
import AddIcon from '@material-ui/icons/Add';
import ButtonUi from "../../../components/buttons/buttonUi";
import BuildIcon from '@material-ui/icons/Build';

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
                    label={<BuildIcon/>}
                    padding={10}
                    width={'auto'}
                    height={'auto'}
                    color={this.props.editabled ? 'primary' : 'default'}
                    onClick={this.props.toggleEditebled}
                />
                <header
                    className={classes.header}
                >
                    {
                        this.props.groups ?
                            this.props.groups.map(
                                item => {

                                    return (
                                        <React.Fragment key={item.id}>
                                            <div className={classes.btnWindow}>
                                                <Button
                                                    active={
                                                        this.props.group.id === item.id ?
                                                            true
                                                            :
                                                            false
                                                    }
                                                    className={`btn-square ${classes.groupBtn}`}
                                                    outline
                                                    color='primary'
                                                    onClick={
                                                        () => this.clickHandler(item.id)
                                                    }
                                                >
                                                    {item.name}
                                                </Button>
                                                {
                                                    this.props.editabled ?
                                                        <div className={classes.controlBtnAll}>
                                                            <EditButton
                                                                className={classes.controlBtnEdit}
                                                                perm={this.props.perm}
                                                                onClick={() => {
                                                                    this.props.toggleModal('edit', item.id);
                                                                    this.props.groupActions("get", item)
                                                                }}
                                                            />
                                                            <DeleteButton
                                                                className={classes.controlBtnDelete}
                                                                perm={this.props.perm}
                                                                onClick={
                                                                    () => this.props.toggleModal('delete', item.id)
                                                                }
                                                            />
                                                        </div>
                                                        :
                                                        null
                                                }
                                            </div>
                                        </React.Fragment>
                                    )
                                }
                            )
                            :
                            null
                    }
                    {
                        this.props.editabled ?
                            <Button
                                outline
                                className="btn-square"
                                color={'info'}
                                perm={this.props.perm}
                                onClick={() => this.props.toggleModal("add")}
                            >
                                <AddIcon/>
                            </Button>
                            :
                            null
                    }
                </header>
                <nav className={classes.nav}>

                    <TextFields
                        label={<Translate name={'Search'} />}
                        name={'search'}
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
                </nav>
                <section className={classes.section}>
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
                </section>
            </>
        )
    }
}

export default ContentTable