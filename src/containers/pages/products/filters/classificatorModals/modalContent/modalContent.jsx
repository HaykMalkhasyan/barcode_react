import React, {useEffect, useRef, useState} from 'react'
import classes from './modalContent.module.css'
import HeaderContent from "./header-content/header-content";
import FooterContent from "./footer-content/footer-content";
import SectionContent from "./section-content/section-content";
import DeleteContent from "./delete-content/delete-content";
import cookie from "../../../../../../services/cookies";

const ModalContent = props => {
    const [error, setError] = useState(null);
    const [touch, setTouch] = useState(false);
    const ref = useRef();

    useEffect(() => {
        if (ref.current) {
            const { tree } = ref.current
            if (props.search && props.search.length > 0) {
                tree.filter(
                    props.search,
                    {
                        includeAncestors: true,
                        includeDescendants: true
                    }
                )
                setTouch(true);
            } else if (props.search.length === 0 && touch) {
                tree.unfilter();
                setTouch(false)
            }
        }
    }, [props.search, touch])

    const searchChangeHandler = (name, value) => {
        props.searchHandler(name, value)
    };

    const deleteModalCloseHandler = () => {
        if (ref.current) {
            const { tree } = ref.current
            tree.selectNode();
        }
        props.deleteModalClose();
    };

    const deleteModalConfirmHandler =  async id => {
        if (props.delete === "group") {
            props.deleteAction("Group/Group", id);
        } else if (props.delete === "subgroup") {
            await props.deleteAction("Group/SubGroup", id, props.catId);
            if (ref.current) {
                const {tree} = ref.current;
                tree.removeNode(props.node);
                tree.selectNode();
            }
        }
    };

    const groupNameChangeHandler = (event, type) => {

        const newGroup = {...props.newGroup};
        const group = {}
        switch (type) {
            case "title": {
                setError(null);
                group.id = newGroup.id
                group[event.target.name] = event.target.value;
                props.editGroupAction(event.target.value, group);
                break;
            }
            case "required_group": {
                newGroup[event.target.name] = event.target.checked;
                props.setGroupValues('newGroup', newGroup);
                break;
            }
            default:
                break;
        }
    };

    const confirmHandler = () => {
        if (!props.own_status) {
            if (props.classifierName.length > 0) {
                const newGroup = {...props.newGroup};
                newGroup.id = props.group.id;
                props.editGroup({...newGroup}, props.group.id);
            } else {
                setError('Անվանման դաշտը չպետք է դատարկ լինի')
            }
        } else {
            if (props.node) {
                props.selectSubgroup(props.node)
            }
        }
    };

    /* Actions */
    const onAddSubgroup = async (event, id) => {
        event.stopPropagation();
        props.setGroupValues("node", null)
        if (ref.current && props.nodeStatus) {
            const { tree } = ref.current;
            await tree.openNode(props.node)
            tree.selectNode()
            tree.appendChildNode({id: "add", name: 'test', sort: 0}, props.node)
            tree.scrollToNode(props.node.getLastChild())
            props.addSubgroupAction(id)
        }
    };

    const onAddGroup = (event, id) => {
        event.stopPropagation();
        props.addGroupAction(id)
    }

    const cancelAdding = (node, subLevel) => {
        if (ref.current) {
            const {tree} = ref.current;
            console.log(props.node, subLevel, props.add);
            console.log(props.node && !subLevel && (props.add !== null));
            tree.selectNode();
            if ((props.node || node) && !subLevel && props.add !== null) {
                tree.removeNode(node)
                props.cancelEditing()
            } else {
                props.cancelEditing()
            }
        }
    }

    const successAdding =  async (subgroup, node, subLevel) => {
        if (ref.current) {
            const {tree} = ref.current;
            if (props.node && !subLevel) {
                props.addSubgroup(subgroup, node, tree)
            } else {
                props.addSubgroup(subgroup, node, tree)
            }
        } else if (props.own_subgroups.length === 0) {
            props.addSubgroup(subgroup)
        }
    }

    const onEditSubgroup =  async (event, id) => {
        event.stopPropagation();
        await props.getActionById("GET", "subgroup", {path: "Group/SubGroup", id: props.catId, param: {id: id}}, id)
        props.editSubgroupAction();
    };

    const editHandler = (newSubgroup, node) => {
        if (ref.current) {
            const {tree} = ref.current;
            const changeNode = node;
            node.name = newSubgroup.name;
            tree.swapNodes(changeNode, node);
            props.editSubgroup(newSubgroup);
            if (node.getParent()) {
                tree.openNode(node.getParent());
            }
            tree.update();
            tree.selectNode();
        }
    }

    const deleteHandler = (event, type, param, id = null) => {
        event.stopPropagation();
        if (id === null) {
            props.deleteClassifiersAction(type, param)
        } else {
            props.deleteClassifiersAction(type, param, id)
        }
    };

    const moveHandler = event => {
        event.stopPropagation();
        if (ref.current) {
            const {tree} = ref.current;
            tree.selectNode();
            props.startMoveAction();
        }
    };

    // Drop inside (change place)
    const dropInside = async (mData, node) => {
        if (ref.current) {
            const {tree} = ref.current;
            const subgroup = {...props.subgroup};
            const movingNode = {...props.node};
            if (node) {
                await props.editSubgroup({id: subgroup.id, cat_id: subgroup.cat_id, parent_id: node.id, name: subgroup[`name_${cookie.get("language") || "am"}`]});
                tree.selectNode();
                tree.removeNode(props.node)
                movingNode.parent_id = parseInt(node.id)
                movingNode.sort = 0;
                tree.addChildNodes(movingNode, 0, node)
                tree.openNode(node)
            } else {
                await props.editSubgroup({id: subgroup.id, cat_id: subgroup.cat_id, parent_id: 0, name: subgroup[`name_${cookie.get("language") || "am"}`]});
                movingNode.parent_id = 0;
                movingNode.sort = 0;
                tree.removeNode(props.node)
                tree.addChildNodes(movingNode, 0)
            }
            props.setMoveAction();
        }
    }

    // Drop line (change sort)
    const sortInside = (mData, node) => {
        if (ref.current) {
            const {tree} = ref.current;
            tree.selectNode();
            const nods = parseInt(node.id) !== parseInt(props.node.parent_id) ? [...tree.getChildNodes(node.getParent())] : [...node.children];
            props.sortTree(nods, tree, props.catId, node, node.getParent() || null, true);
            props.setMoveAction();
        }
    }

    const backPageHandler = () => {
        props.classifierOpenHandler(props.group.id)
    };

    const copyHandler = (act) => {
        props.getActionById("GET", "subgroup", {path: "Group/SubGroup", id: props.node.cat_id, param: {id: props.node.id}}, props.node.id)
        if (ref.current) {
            const {tree} = ref.current;
            tree.selectNode();
            props.subgroupCopy(props.node, act)
        }
    }

    const pasteHandler = async () => {
        if (ref.current) {
            const {tree} = ref.current;

            switch (props.activeAction) {
                case "copy": {
                    props.copyPaste(tree)
                    break;
                }
                case "cut": {
                    props.cutPaste(tree);
                    break;
                }
                default: break;
            }
        }
    }

    return (
        <div className={classes.main}>
            <DeleteContent
                delete={props.delete}
                group={props.group}
                subgroup={props.subgroup}
                // Methods
                deleteModalCloseHandler={deleteModalCloseHandler}
                deleteModalConfirmHandler={deleteModalConfirmHandler}
            />
            <HeaderContent
                // Methods
                handleClose={props.handleClose}
                backPageHandler={
                    !props.own_status ?
                        backPageHandler
                        :
                        props.handleClose
                }
            />
            <SectionContent
                ref={ref}
                error={error}
                group={props.group}
                groupId={props.groupId}
                catId={props.catId}
                newGroup={props.newGroup}
                newSubgroup={props.newSubgroup}
                classifierName={props.classifierName}
                own_select={props.own_select}
                own_subgroups={props.own_subgroups}
                own_status={props.own_status}
                search={props.search}
                edit={props.edit}
                add={props.add}
                subgroupName={props.subgroupName}
                nodeStatus={props.nodeStatus}
                node={props.node}
                activeAction={props.activeAction}
                moveElement={props.moveElement}
                own_move={props.own_move}
                buffer={props.buffer}
                // Methods
                groupNameChangeHandler={groupNameChangeHandler}
                moveHandler={moveHandler}
                copyHandler={copyHandler}
                pasteHandler={pasteHandler}
                onEditSubgroup={onEditSubgroup}
                onAddSubgroup={onAddSubgroup}
                onAddGroup={onAddGroup}
                deleteHandler={deleteHandler}
                searchChangeHandler={searchChangeHandler}
                addSubgroup={successAdding}
                cancelEditing={cancelAdding}
                setGroupValues={props.setGroupValues}
                editSubgroup={editHandler}
                changeSubgroupName={props.changeSubgroupName}
                selectTreeItem={props.selectTreeItem}
                selectTreeGroupItem={props.selectTreeGroupItem}
                getActionById={props.getActionById}
                setMovingStart={props.setMovingStart}
                //***********************************
                dropInside={dropInside}
                sortInside={sortInside}
            />
            <FooterContent
                newGroup={props.newGroup}
                group={props.group}
                own_status={props.own_status}
                // Methods
                deleteHandler={deleteHandler}
                confirmHandler={confirmHandler}
                cencel={
                    !props.own_status ?
                        backPageHandler
                        :
                        props.handleClose
                }
            />
        </div>
    )
};

export default ModalContent