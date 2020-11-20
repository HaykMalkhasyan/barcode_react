import React, {useState} from "react";
import classes from "./tree-viewer.module.css";
import InfiniteTree from "react-infinite-tree";
import TreeNode from "./tree-node/tree-node";
import Toggler from "./trigger/toggler";
import Collapse from "@material-ui/core/Collapse";
import CustomButton from "../UI/button/customButton/customButton";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import AddContent from "./add-content/add-content";
import Icons from "../Icons/icons";
import SpinnerForContent from "../UI/spinners/spinerForContent/spinnerForContent";
import TreeContent from "./tree-content/tree-content";

const TreeViewer = React.forwardRef((props, ref) => {
    const [open, setOpen] = useState(true);

    // Drag&Drop

    const dragStart = (event, tree, node) => {
        tree.selectNode(node)
        props.select(node, node.id, node.state.path, node.cat_id)
        event.dataTransfer.setData("object", JSON.stringify({id: node.id, parent_id: node.parent_id, cat_id: node.cat_id, sort: node.sort, name: node.name}))
        props.getActionById("GET", "subgroup", {path: "Group/SubGroup", id: node.cat_id, param: {id: node.id}}, node.id)
    }

    const dragOver = event => {
        event.preventDefault();
    }

    const dragAllItemEnter = event => {
        event.preventDefault();
        event.stopPropagation();
        if (parseInt(props.node.parent_id) !== 0) {
            event.target.style.color = "#FF8927";
        }
    }

    const dragEnter = (event, node) => {
        event.preventDefault();
        event.stopPropagation();
        if (!props.node.contains(node) && props.node.id !== node.id) {
            event.target.style.color = "#FF8927";
        }
    }

    const dragLeave = event => {
        event.preventDefault();
        event.target.style.color = "";
    }

    const drop = (event, t, n) => {
        event.preventDefault();
        const moving_data = JSON.parse(event.dataTransfer.getData("object"))
        if (n) {
            if (!props.node.contains(n) && props.node.id !== n.id) {
                props.dropInside(moving_data, n)
            }
        } else {
            if (parseInt(props.node.parent_id) !== 0) {
                props.dropInside(moving_data)
            }
        }
        event.target.style.color = "";
    }

    const dragEnd = event => {
        event.preventDefault();
        event.target.style.color = "";
        if (ref.current) {
            const {tree} = ref.current;
            tree.selectNode()
            props.setMovingStart()
        }
    }

    const onDragTogglerEnter = (event, t, n) => {
        event.target.style.color = "#FF8927";
        t.openNode(n);
    }

    const onDragTogglerLeave = event => {
        event.target.style.color = "";
    }

    const dragLineEnter = (event, node) => {
        if ((parseInt(props.node.parent_id) === parseInt(node.parent_id) || parseInt(props.node.parent_id) === node.id) && props.node.id !== node.id) {
            event.target.style.background = "#0da3e0";
        }
    }

    const dragLineLeave = event => {
        event.target.style.background = "";
    }

    const dropLine = (event, t, n) => {
        event.preventDefault();
        event.stopPropagation();
        const moving_data = JSON.parse(event.dataTransfer.getData("object"))
        props.sortInside(moving_data, n)
        event.target.style.background = "";
    }

    return (
        <>
            <div
                className={props.group && props.group.id === props.groupId ? classes.active : classes.toggle}
                onClick={() => {
                    if (ref.current) {
                        ref.current["tree"].selectNode()
                    }
                    props.selectTreeGroupItem(props.group.id)
                }}
            >
                <div
                    className={classes.content}
                    onDragOver={dragOver}
                    onDragLeave={dragLeave}
                    onDragEnter={dragAllItemEnter}
                    onDrop={event => {
                        drop(event)
                    }}
                    onDragEnd={dragEnd}
                >
                    {
                        props.own_subgroups && props.own_subgroups.length ?
                            <CustomButton
                                className={classes.collapseButton}
                                children={
                                    open ?
                                        <ArrowDropDownIcon/>
                                        :
                                        <ArrowRightIcon/>
                                }
                                // Methods
                                onClick={event => {
                                    event.stopPropagation();
                                    if (open) {
                                        props.setGroupValues('own_select', null)
                                    }
                                    setOpen(!open);
                                }}
                            />
                            :
                            <CustomButton
                                className={classes.collapseButton}
                                children={<Icons type={'tree-arrow-right-empty'}/>}
                            />

                    }
                    <span>Բոլորը</span>
                </div>
            </div>
            <div>
                {
                    parseInt(props.add) === 0 ?
                        <AddContent
                            type={"first"}
                            subgroupName={props.subgroupName}
                            newSubgroup={props.newSubgroup}
                            add={props.add}
                            catId={props.catId}
                            subLevel={true}
                            // Methods
                            changeSubgroupName={props.changeSubgroupName}
                            addSubgroup={props.addSubgroup}
                            cancelEditing={props.cancelEditing}
                        />
                        :
                        null
                }
            </div>
            <Collapse in={open} timeout={0} unmountOnExit className={classes.collapse}>
                {
                    props.own_subgroups ?
                        props.own_subgroups.length ?

                            <InfiniteTree
                                autoOpen={false}
                                ref={ref}
                                width="100%"
                                height={317}
                                rowHeight={30}
                                data={[...props.own_subgroups]}
                            >
                                {({node, tree}) => {
                                    let toggleState = '';
                                    const hasChildren = node.hasChildren();

                                    if ((!hasChildren && node.loadOnDemand) || (hasChildren && !node.state.open)) {
                                        toggleState = 'closed';
                                    }
                                    if (hasChildren && node.state.open) {
                                        toggleState = 'opened'
                                    }

                                    return node.id === "add" ?
                                        <TreeNode
                                            groupId={props.groupId}
                                            selected={node.state.selected}
                                            depth={node.state.depth}
                                        >
                                            <div className={classes.nodeContent}>
                                                <AddContent
                                                    subgroupName={props.subgroupName}
                                                    newSubgroup={props.newSubgroup}
                                                    node={node}
                                                    add={props.add}
                                                    catId={props.catId}
                                                    subLevel={false}
                                                    // Methods
                                                    changeSubgroupName={props.changeSubgroupName}
                                                    addSubgroup={props.addSubgroup}
                                                    cancelEditing={props.cancelEditing}
                                                />
                                            </div>
                                        </TreeNode>
                                        :
                                        <TreeNode
                                            draggable={props.own_move}
                                            onDragStart={event => {
                                                dragStart(event, tree, node)
                                            }}
                                            onDragOver={dragOver}
                                            onDragLeave={dragLeave}
                                            onDragEnter={event => {
                                                dragEnter(event, node)
                                            }}
                                            onDrop={event => {
                                                drop(event, tree, node)
                                            }}
                                            onDragEnd={dragEnd}
                                            groupId={props.groupId}
                                            selected={node.state.selected}
                                            depth={node.state.depth}
                                            onClick={() => {
                                                if (props.nodeStatus) {
                                                    tree.openNode(node);
                                                    if (!props.own_status) {
                                                        if (props.edit === null && props.moveElement === null) {
                                                            tree.selectNode(node)
                                                            props.select(node, node.id, node.state.path, node.cat_id)
                                                        }
                                                    } else {
                                                        tree.selectNode(node);
                                                        props.select(node, node.id, node.state.path, node.cat_id)
                                                    }
                                                }
                                            }}
                                        >
                                            <div className={classes.nodeContent}>
                                                <div>
                                                    <Toggler
                                                        onDragEnter={event => {
                                                            onDragTogglerEnter(event, tree, node)
                                                        }}
                                                        onDragLeave={onDragTogglerLeave}
                                                        state={toggleState}
                                                        onClick={event => {
                                                            event.stopPropagation()
                                                            if (props.moveElement === null) {
                                                                props.cancelEditing(node.getLastChild(), false)
                                                            }
                                                            if (toggleState === "closed") {
                                                                tree.openNode(node);
                                                            } else if (toggleState === "opened") {
                                                                tree.closeNode(node);
                                                            }
                                                        }}
                                                    />
                                                </div>
                                                <TreeContent
                                                    node={node}
                                                    selectNode={props.node}
                                                    search={props.search}
                                                    catId={props.catId}
                                                    edit={props.edit}
                                                    moveElement={props.moveElement}
                                                    subgroupName={props.subgroupName}
                                                    newSubgroup={props.newSubgroup}
                                                    activeAction={props.activeAction}
                                                    buffer={props.buffer}
                                                    own_select={props.own_select}
                                                    own_move={props.own_move}
                                                    type={props.type}
                                                    // Methods
                                                    changeSubgroupName={props.changeSubgroupName}
                                                    editSubgroup={props.editSubgroup}
                                                    cancelEditing={props.cancelEditing}
                                                    copyHandler={props.copyHandler}
                                                    pasteHandler={props.pasteHandler}
                                                />
                                            </div>
                                            <div
                                                className={classes.line}
                                                onDragOver={dragOver}
                                                onDragLeave={dragLineLeave}
                                                onDragEnter={event => {
                                                    dragLineEnter(event, node)
                                                }}
                                                onDrop={event => {
                                                    dropLine(event, tree, node)
                                                }}
                                                onDragEnd={dragEnd}
                                            />
                                        </TreeNode>
                                }}
                            </InfiniteTree>
                            :
                            <small className={classes.isEmpty}>Դատարկ</small>
                        :
                        <SpinnerForContent/>
                }
            </Collapse>
        </>
    )
})

export default TreeViewer