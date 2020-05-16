import React, {Component} from 'react';
import {Button} from 'reactstrap';
import classes from './content.module.css'
import PlusButton from "../../../components/buttons/plusButton";
import EditButton from "../../../components/buttons/editButton";
import DeleteButton from "../../../components/buttons/deleteButton";
import TextFields from "../../../components/textFieldUI/textField";
import Translate from "../../../Translate";
import CustomizedTreeView from "./treeUi/tree";
import ButtonUi from "../../../components/buttons/buttonUi";
import Show from "./alternativShow/show";
import * as Icon from 'react-feather';

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

                <header className={classes.header}>
                    {
                        this.props.groups ?
                            this.props.groups.map(
                                item => {

                                    return (
                                        <React.Fragment key={item.id}>
                                            <Button
                                                active={
                                                    this.props.group.id === item.id ?
                                                        true
                                                        :
                                                        false
                                                }
                                                className={classes.groupBtn}
                                                outline
                                                color='primary'
                                                onClick={
                                                    () => this.clickHandler(item.id)
                                                }
                                            >
                                                {item.name}
                                            </Button>
                                        </React.Fragment>
                                    )
                                }
                            )
                            :
                            null
                    }
                </header>
                <nav className={classes.nav}>
                    <div className={classes.controllers}>
                        {
                            this.props.group ?
                                this.props.group.id ?
                                    <PlusButton
                                        perm={this.props.perm}
                                        onClick={
                                            () => this.props.setActionToggleSubModal('add', this.props.group.id)
                                        }
                                    />
                                    :
                                    null
                                :
                                null
                        }
                        {
                            this.props.group ?
                                this.props.group.id ?
                                    <EditButton
                                        perm={this.props.perm}
                                        onClick={() => {
                                            this.props.toggleModal('edit', this.props.group.id);
                                            this.props.groupActions("get", this.props.group)
                                        }}
                                    />
                                    :
                                    null
                                :
                                null
                        }
                        {
                            this.props.group ?
                                this.props.group.id ?
                                    <DeleteButton
                                        perm={this.props.perm}
                                        onClick={
                                            () => this.props.toggleModal('delete', this.props.group.id)
                                        }
                                    />
                                    :
                                    null
                                :
                                null
                        }
                    </div>

                    <TextFields
                        label={<Translate name={'Search'}/>}
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
                        this.props.search && this.props.searchResult.length ?
                            <>
                                <ButtonUi
                                    label={<Translate name={'Show alternative'}/>}
                                    name={'showAlternative'}
                                    width='auto'
                                    height='auto'
                                    padding='5px 10px'
                                    color={!this.props.alternative ? 'primary' : 'default'}
                                    variant='contained'
                                    margin='0 0 10px 0'
                                    fontSize='12px'
                                    onClick={this.alternativeHandler}
                                />
                                {
                                    this.props.alternative ?
                                        <Show
                                            subGroupActions={this.props.subGroupActions}
                                            setActionToggleSubModal={this.props.setActionToggleSubModal}
                                            group={this.props.group}
                                            subGroups={this.props.subGroups}
                                            data={this.props.searchAltResult}
                                        />
                                        :
                                        <CustomizedTreeView
                                            subGroupActions={this.props.subGroupActions}
                                            setActionToggleSubModal={this.props.setActionToggleSubModal}
                                            mainId={this.props.search.id}
                                            mainName={this.props.group.name}
                                            data={this.props.searchResult}
                                            movingGroupStatus={this.props.movingGroupStatus}
                                            startMovingGroup={this.props.startMovingGroup}
                                            endeMovingGroup={this.props.endeMovingGroup}
                                            editPosition={this.props.editPosition}
                                        />
                                }
                            </>
                            :
                            this.props.group ?
                                this.props.group.id ?
                                    <CustomizedTreeView
                                        subGroupActions={this.props.subGroupActions}
                                        setActionToggleSubModal={this.props.setActionToggleSubModal}
                                        mainId={this.props.group.id}
                                        mainName={this.props.group.name}
                                        data={this.props.subGroups}
                                        movingGroupStatus={this.props.movingGroupStatus}
                                        startMovingGroup={this.props.startMovingGroup}
                                        endeMovingGroup={this.props.endeMovingGroup}
                                        editPosition={this.props.editPosition}
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