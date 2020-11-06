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
        if (props.classifierName.length > 0) {
            const newGroup = {...props.newGroup};
            newGroup.id = props.group.id;
            props.editGroup({...newGroup}, props.group.id);
        } else {
            setError('Անվանման դաշտը չպետք է դատարկ լինի')
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
        if (ref.current && props.node && !subLevel) {
            const {tree} = ref.current;
            props.addSubgroup(subgroup, node, tree)
        } else {
            props.addSubgroup(subgroup, node, ref.current)
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

    const moveHandler = async (event, node) => {
        event.stopPropagation();
        /*await */props.getActionById("GET", "subgroup", {path: "Group/SubGroup", id: props.catId, param: {id: node.id}}, node.id)
        props.startMoveAction(node.id);
    };

    const moveIsHere = async (node, move = null) => {
        if (ref.current) {
            const {tree} = ref.current;
            tree.selectNode();
            const subgroup = {...props.subgroup};
            if (move === "move") {
                if (Object.keys(node).length > 1) {
                    const nods = parseInt(node.id) !== parseInt(props.node.parent_id) ? [...tree.getChildNodes(node.getParent())] : [...node.children];
                    props.sortTree(nods, tree, node, node.getParent() || null, true);
                } else {
                    const nods = props.own_subgroups;
                    props.sortTree(nods, tree, node, false);
                }
                // await props.editSubgroup({id: subgroup.id, cat_id: subgroup.cat_id, sort: (parseInt(node.sort) + 1), name: subgroup[`name_${cookie.get("language") || "am"}`]});
            } else {
                await props.editSubgroup({id: subgroup.id, cat_id: subgroup.cat_id, parent_id: node.id, name: subgroup[`name_${cookie.get("language") || "am"}`]});
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
                backPageHandler={backPageHandler}
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
                search={props.search}
                edit={props.edit}
                add={props.add}
                subgroupName={props.subgroupName}
                nodeStatus={props.nodeStatus}
                node={props.node}
                activeAction={props.activeAction}
                moveElement={props.moveElement}
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
            />
            <FooterContent
                newGroup={props.newGroup}
                group={props.group}
                // Methods
                confirmHandler={confirmHandler}
                cencel={backPageHandler}
            />
        </div>
    )
};

export default ModalContent