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

    const deleteModalConfirmHandler = id => {
        if (props.delete === "group") {
            props.deleteAction("Group/Group", id);
        } else if (props.delete === "subgroup") {
            props.deleteAction("Group/SubGroup", id, props.catId);
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

            tree.appendChildNode({id: "add", name: 'test'}, props.node)
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

    const successAdding = (subgroup, node, subLevel) => {
        if (ref.current && props.node && !subLevel) {
            const {tree} = ref.current;
            tree.removeNode(node)
            props.addSubgroup(subgroup)
        } else {
            props.addSubgroup(subgroup)
        }
    }

    const onEditSubgroup =  async (event, id) => {
        event.stopPropagation();
        await props.getActionById("get", "subgroup", {path: "Group/SubGroup", id: props.catId, param: {id: id}}, id)
        props.editSubgroupAction();
    };


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
        /*await */props.getActionById("get", "subgroup", {path: "Group/SubGroup", id: props.catId, param: {id: node.id}}, node.id)
        props.startMoveAction(node.id);
    };

    const moveIsHere = async (node, move = null) => {
        if (ref.current) {
            const {tree} = ref.current;
            tree.selectNode();
            const subgroup = {...props.subgroup};
            const data = [];
            if (move === "move") {
                const nods = [...tree.getChildNodes(node.getParent())];
                const nodeIndex = nods.indexOf(node);
                const initIndex = nods.indexOf(props.node);
                for (let [index, item] of Object.entries(nods)) {
                    if (nods.hasOwnProperty(index) && index > nodeIndex) {
                        const init = {
                            id: item.id,
                            name: item.name,
                            cat_id: item.cat_id,
                            sort: item.sort + 1,
                        }
                        data.push(init)
                    } else {
                        let init = {
                            id: item.id,
                            name: item.name,
                            cat_id: item.cat_id,
                            sort: item.sort,
                        }
                        data.push(init)
                    }
                    // console.log(item.sort)
                }
                console.log(initIndex)
                // props.node.sort += (nods[nodeIndex].sort +1);
                data[initIndex].sort = data[nodeIndex].sort + 1
                console.log(data)
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
                editSubgroup={props.editSubgroup}
                changeSubgroupName={props.changeSubgroupName}
                selectTreeItem={props.selectTreeItem}
                selectTreeGroupItem={props.selectTreeGroupItem}
            />
            <FooterContent
                group={props.group}
                // Methods
                confirmHandler={confirmHandler}
            />
        </div>
    )
};

export default ModalContent