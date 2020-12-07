import React from 'react'
import Header from "./header/header"
import classes from "./mainLayout.module.css";
import ModalContent from "../../pages/products/filters/classificatorModals/modalContent/modalContent";
import ModalUI from "../../../components/modalUI/modalUI";
import {connect} from "react-redux";
import {
    addGroupAction,
    addSubgroup,
    addSubgroupAction, cancelEditing,
    changeSubgroupName,
    closeAction, copyPaste, cutPaste,
    deleteAction,
    deleteClassifiersAction,
    deleteModalClose,
    editGroup,
    editGroupAction,
    editSubgroup,
    editSubgroupAction, getActionById,
    getAllGroup,
    openClassifiers, openModalContent,
    searchHandler,
    selectTreeGroupItem,
    selectTreeItem,
    setGroupValues, setMoveAction, setMovingStart, sortTree, startMoveAction, subgroupCopy
} from "../../../Redux/characteristics/actions";
import {selectSubgroup} from "../../../Redux/products/actions";

const MainLayout = props => {

    return (
        <>
            <div>
                <Header/>
                <main>
                    {props.children}
                </main>
            </div>
            {/*Modals*/}
            <ModalUI
                open={props.classifiersModal}
                className={classes.modal}
                // Methods
                handleOpen={props.openModalContent}
            >
                <ModalContent
                    // Data
                    treeType={"edit"}
                    group={props.group}
                    subgroup={props.subgroup}
                    classifierName={props.classifierName}
                    newGroup={props.newGroup}
                    delete={props.delete}
                    newSubgroup={props.newSubgroup}
                    search={props.search}
                    groupId={props.groupId}
                    own_subgroups={props.own_subgroups}
                    own_status={props.own_status}
                    own_select={props.own_select}
                    catId={props.catId}
                    edit={props.edit}
                    add={props.add}
                    node={props.node}
                    nodeStatus={props.nodeStatus}
                    activeAction={props.activeAction}
                    subgroupName={props.subgroupName}
                    own_move={props.own_move}
                    moveElement={props.moveElement}
                    buffer={props.buffer}
                    /* ------- */
                    // Methods
                    handleClose={props.closeAction}
                    classifierOpenHandler={id => {
                        props.getAllGroup();
                        props.openClassifiers(id);
                    }}
                    setGroupValues={props.setGroupValues}
                    changeSubgroupName={props.changeSubgroupName}
                    editGroupAction={props.editGroupAction}
                    deleteClassifiersAction={props.deleteClassifiersAction}
                    editSubgroup={props.editSubgroup}
                    searchHandler={props.searchHandler}
                    deleteAction={props.deleteAction}
                    editGroup={props.editGroup}
                    selectTreeItem={props.selectTreeItem}
                    selectTreeGroupItem={props.selectTreeGroupItem}
                    addSubgroupAction={props.addSubgroupAction}
                    addSubgroup={props.addSubgroup}
                    addGroupAction={props.addGroupAction}
                    editSubgroupAction={props.editSubgroupAction}
                    deleteModalClose={props.deleteModalClose}
                    getActionById={props.getActionById}
                    cancelEditing={props.cancelEditing}
                    startMoveAction={props.startMoveAction}
                    setMoveAction={props.setMoveAction}
                    sortTree={props.sortTree}
                    selectSubgroup={props.selectSubgroup}
                    subgroupCopy={props.subgroupCopy}
                    setMovingStart={props.setMovingStart}
                    cutPaste={props.cutPaste}
                    copyPaste={props.copyPaste}
                />
            </ModalUI>
        </>
    )
};

function mapStateToProps(state) {

    return {
        classifiersModal: state.characteristics.classifiersModal,
        group: state.characteristics.group,
        subgroup: state.characteristics.subgroup,
        classifierName: state.characteristics.classifierName,
        newGroup: state.characteristics.newGroup,
        delete: state.characteristics.delete,
        newSubgroup: state.characteristics.newSubgroup,
        search: state.characteristics.search,
        groupId: state.characteristics.groupId,
        own_subgroups: state.characteristics.own_subgroups,
        own_status: state.characteristics.own_status,
        own_select: state.characteristics.own_select,
        catId: state.characteristics.catId,
        edit: state.characteristics.edit,
        add: state.characteristics.add,
        node: state.characteristics.node,
        nodeStatus: state.characteristics.nodeStatus,
        activeAction: state.characteristics.activeAction,
        subgroupName: state.characteristics.subgroupName,
        own_move: state.characteristics.own_move,
        moveElement: state.characteristics.moveElement,
        buffer: state.characteristics.buffer,
    }
}

function mapDispatchToProps(dispatch) {

    return {
        openModalContent: item => dispatch(openModalContent(item)),
        closeAction: () => dispatch(closeAction()),
        getAllGroup: () => dispatch(getAllGroup()),
        openClassifiers: id => dispatch(openClassifiers(id)),
        setGroupValues: (name, value) => dispatch(setGroupValues(name, value)),
        changeSubgroupName: (name, value) => dispatch(changeSubgroupName(name, value)),
        editGroupAction: (value, newGroup) => dispatch(editGroupAction(value, newGroup)),
        deleteClassifiersAction: (type, param, id) => dispatch(deleteClassifiersAction(type, param, id)),
        editSubgroupAction: () => dispatch(editSubgroupAction()),
        editSubgroup: data => dispatch(editSubgroup(data)),
        searchHandler: (name, value) => dispatch(searchHandler(name, value)),
        deleteAction: (request, id, catId) => dispatch(deleteAction(request, id, catId)),
        editGroup: (data, id) => dispatch(editGroup(data, id)),
        selectTreeItem: (node, id, path, catId) => dispatch(selectTreeItem(node, id, path, catId)),
        selectTreeGroupItem: id => dispatch(selectTreeGroupItem(id)),
        addSubgroupAction: id => dispatch(addSubgroupAction(id)),
        addSubgroup: (data, node, ref) => dispatch(addSubgroup(data, node, ref)),
        addGroupAction: (id) => dispatch(addGroupAction(id)),
        deleteModalClose: () => dispatch(deleteModalClose()),
        getActionById: (requestType, memory, param, id) => dispatch(getActionById(requestType, memory, param, id)),
        cancelEditing: () => dispatch(cancelEditing()),
        startMoveAction: () => dispatch(startMoveAction()),
        setMoveAction: () => dispatch(setMoveAction()),
        sortTree: (data, ref, catId, node, level) => dispatch(sortTree(data, ref, catId, node, level)),
        selectSubgroup: subgroup => dispatch(selectSubgroup(subgroup)),
        subgroupCopy: (node, act) => dispatch(subgroupCopy(node, act)),
        setMovingStart: () => dispatch(setMovingStart()),
        cutPaste: tree => dispatch(cutPaste(tree)),
        copyPaste: tree => dispatch(copyPaste(tree)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout)