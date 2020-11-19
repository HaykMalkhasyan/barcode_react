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
                {
                    !props.own_status ?
                        <GroupContent
                            error={props.error}
                            group={props.group}
                            newGroup={props.newGroup}
                            own_status={props.own_status}
                            classifierName={props.classifierName}
                            // Methods
                            groupNameChangeHandler={props.groupNameChangeHandler}
                        />
                        :
                        null
                }
                <div className={props.own_status ? `${classes.searchWindow} ${classes.hide}` : classes.searchWindow}>
                    {
                        !props.own_status ?
                            <ModalActions
                                own_select={props.own_select}
                                controllerId={props.controllerId}
                                groupId={props.groupId}
                                catId={props.catId}
                                activeAction={props.activeAction}
                                own_move={props.own_move}
                                node={props.node}
                                buffer={props.buffer}
                                // Methods
                                moveHandler={props.moveHandler}
                                copyHandler={props.copyHandler}
                                pasteHandler={props.pasteHandler}
                                onEditSubgroup={props.onEditSubgroup}
                                onAddSubgroup={props.onAddSubgroup}
                                onAddGroup={props.onAddGroup}
                                deleteHandler={props.deleteHandler}
                            />
                            :
                            null
                    }
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
                    own_status={props.own_status}
                    node={props.node}
                    nodeStatus={props.nodeStatus}
                    moveElement={props.moveElement}
                    activeAction={props.activeAction}
                    buffer={props.buffer}
                    own_move={props.own_move}
                    type={'edit'}
                    // Methods
                    selectTreeItem={props.selectTreeItem}
                    editSubgroup={props.editSubgroup}
                    addSubgroup={props.addSubgroup}
                    setGroupValues={props.setGroupValues}
                    changeSubgroupName={props.changeSubgroupName}
                    selectTreeGroupItem={props.selectTreeGroupItem}
                    cancelEditing={props.cancelEditing}
                    getActionById={props.getActionById}
                    setMovingStart={props.setMovingStart}
                    //*****************
                    dropInside={props.dropInside}
                    sortInside={props.sortInside}
                />
            </div>
        </section>
    )
})

export default SectionContent