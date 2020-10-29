import React from "react";
import classes from "./section-content.module.css";
import GroupContent from "../group-content/group-content";
import ModalActions from "../actions/actions";
import CustomSearch from "../../../../../../../components/customSearch/customSearch";
import BodyContent from "../body-content/body-content";

const SectionContent = props => {

    return (
        <section className={classes.section}>
            <div className={classes.content}>
                <GroupContent
                    error={props.error}
                    group={props.group}
                    newGroup={props.newGroup}
                    classifierName={props.classifierName}
                    // Methods
                    groupNameChangeHandler={props.groupNameChangeHandler}
                />
                <div className={classes.searchWindow}>
                    <ModalActions
                        own_select={props.own_select}
                        controllerId={props.controllerId}
                        groupId={props.groupId}
                        catId={props.catId}
                        // Methods
                        changePositionStatus={props.changePositionStatus}
                        toggleMovingStatus={props.toggleMovingStatus}
                        moveHandler={props.moveHandler}
                        onEditSubgroup={props.onEditSubgroup}
                        onAddSubgroup={props.onAddSubgroup}
                        onAddGroup={props.onAddGroup}
                        deleteHandler={props.deleteHandler}
                    />
                    <div>
                        <CustomSearch
                            drop={false}
                            withButton={false}
                            id={'modalSearch'}
                            type={'search'}
                            name={'search'}
                            value={props.search}
                            placeholder={'Որոնում'}
                            // Methods
                            onChange={event => props.searchChangeHandler(event.target.name, event.target.value)}
                        />
                    </div>
                </div>
                <BodyContent
                    own_subgroups={props.own_subgroups}
                    search={props.search}
                    group={props.group}
                    groupId={props.groupId}
                    own_move={props.own_move}
                    own_select={props.own_select}
                    edit={props.edit}
                    catId={props.catId}
                    newSubgroup={props.newSubgroup}
                    subgroupName={props.subgroupName}
                    type={'edit'}
                    // Methods
                    selectTreeItem={props.selectTreeItem}
                    editSubgroup={props.editSubgroup}
                    setGroupValues={props.setGroupValues}
                    changeSubgroupName={props.changeSubgroupName}
                    selectTreeGroupItem={props.selectTreeGroupItem}
                />
            </div>
        </section>
    )
}

export default SectionContent