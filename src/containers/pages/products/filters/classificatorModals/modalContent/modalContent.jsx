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
    const onAddSubgroup = (event, id) => {
        event.stopPropagation();
        if (ref.current && props.nodeStatus) {
            const { tree } = ref.current;

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
            tree.selectNode();
            if (props.node && !subLevel && props.add !== null) {
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
            tree.swapNodes(changeNode, node)
            props.editSubgroup(newSubgroup);
            tree.openNode(node.getParent());
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
        if (props.own_move) {
            if (ref.current) {
                const {tree} = ref.current;
                tree.selectNode();
                props.setGroupValues("node", null)
                props.setGroupValues("own_select", null)
            }
        }
        props.startMoveAction();
    };

    const moveIsHere = async (node, move = null) => {
        if (ref.current) {
            const {tree} = ref.current;
            tree.update();
            tree.selectNode();
            const subgroup = {...props.subgroup};
            if (move === "move") {
                if (Object.keys(node).length > 1) {
                    const nods = parseInt(node.id) !== parseInt(props.node.parent_id) ? [...tree.getChildNodes(node.getParent())] : [...node.children];
                    props.sortTree(nods, tree, props.catId, node, node.getParent() || null, true);
                } else {
                    const nods = props.own_subgroups;
                    props.sortTree(nods, tree, props.catId, node, false);
                }
                // await props.editSubgroup({id: subgroup.id, cat_id: subgroup.cat_id, sort: (parseInt(node.sort) + 1), name: subgroup[`name_${cookie.get("language") || "am"}`]});
            } else {
                await props.editSubgroup({id: subgroup.id, cat_id: subgroup.cat_id, parent_id: node.id, name: subgroup[`name_${cookie.get("language") || "am"}`]});
                const movingNode = {...props.node};
                console.log(Object.keys(node).length)
                if (Object.keys(node).length > 1) {
                    tree.removeNode(props.node)
                    movingNode.parent_id = parseInt(node.id)
                    movingNode.sort = 0;
                    tree.addChildNodes(movingNode, 0, node)
                    tree.openNode(node)
                } else {
                    movingNode.parent_id = 0;
                    movingNode.sort = 0;
                    tree.removeNode(props.node)
                    tree.addChildNodes(movingNode, 0)
                }

            }
            props.setMoveAction();
        }
    }

    const backPageHandler = () => {
        props.classifierOpenHandler(props.group.id)
    };

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
                // Methods
                groupNameChangeHandler={groupNameChangeHandler}
                moveHandler={moveHandler}
                onEditSubgroup={onEditSubgroup}
                onAddSubgroup={onAddSubgroup}
                onAddGroup={onAddGroup}
                deleteHandler={deleteHandler}
                searchChangeHandler={searchChangeHandler}
                addSubgroup={successAdding}
                moveIsHere={moveIsHere}
                cancelEditing={cancelAdding}
                setGroupValues={props.setGroupValues}
                editSubgroup={editHandler}
                changeSubgroupName={props.changeSubgroupName}
                selectTreeItem={props.selectTreeItem}
                selectTreeGroupItem={props.selectTreeGroupItem}
                getActionById={props.getActionById}
            />
            <FooterContent
                newGroup={props.newGroup}
                group={props.group}
                own_status={props.own_status}
                // Methods
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