import React from "react";
import classes from "./section-content.module.css";
import GroupContent from "../group-content/group-content";
import ModalActions from "../actions/actions";
import CustomSearch from "../../../../../../../components/customSearch/customSearch";
import BodyContent from "../body-content/body-content";

const SectionContent = React.forwardRef((props, ref) => {

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
                        activeAction={props.activeAction}
                        node={props.node}
                        // Methods
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
                    ref={ref}
                    own_subgroups={props.own_subgroups}
                    search={props.search}
                    group={props.group}
                    groupId={props.groupId}
                    own_select={props.own_select}
                    edit={props.edit}
                    add={props.add}
                    catId={props.catId}
                    newSubgroup={props.newSubgroup}
                    subgroupName={props.subgroupName}
                    nodeStatus={props.nodeStatus}
                    moveElement={props.moveElement}
                    type={'edit'}
                    // Methods
                    selectTreeItem={props.selectTreeItem}
                    editSubgroup={props.editSubgroup}
                    addSubgroup={props.addSubgroup}
                    moveIsHere={props.moveIsHere}
                    setGroupValues={props.setGroupValues}
                    changeSubgroupName={props.changeSubgroupName}
                    selectTreeGroupItem={props.selectTreeGroupItem}
                    cancelEditing={props.cancelEditing}
                />
            </div>
        </section>
    )
})

export default SectionContent