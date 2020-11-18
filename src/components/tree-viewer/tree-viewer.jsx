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
import CoupleButtons from "../couple-action-buttons/couple-action-buttons";

const TreeViewer = React.forwardRef((props, ref) => {
    const [open, setOpen] = useState(true);

    const groupActionsRender = () => {

        if (props.moveElement !== null) {

            if (props.node) {
                if (parseInt(props.node.parent_id) === 0) {
                    return (
                        <CoupleButtons
                            type={"move"}
                            checkSuccess={event => {
                                event.stopPropagation();
                                props.moveIsHere({parent_id: 0})
                            }}
                            checkMoveSuccess={event => {
                                event.stopPropagation();
                                props.moveIsHere({sort: 0}, "move")
                            }}
                            checkClose={event => {
                                event.stopPropagation();
                                props.cancelEditing();
                            }}
                        />
                    )
                }
                return (
                    <CoupleButtons
                        type={"only-move"}
                        checkSuccess={event => {
                            event.stopPropagation();
                            props.moveIsHere({id: 0})
                        }}
                        checkClose={event => {
                            event.stopPropagation();
                            props.cancelEditing();
                        }}
                    />
                )
            }
        }
    }

    // Drag&Drop

    const dragStart = (event, tree, node) => {
        tree.selectNode(node)
        props.select(node, node.id, node.state.path, node.cat_id)
        event.dataTransfer.setData("object", JSON.stringify({id: node.id, parent_id: node.parent_id, cat_id: node.cat_id, sort: node.sort, name: node.name}))
        props.getActionById("GET", "subgroup", {path: "Group/SubGroup", id: props.catId, param: {id: node.id}}, node.id)
    }

    const dragOver = event => {
        event.preventDefault();
    }

    const dragEnter = event => {
        event.preventDefault();
        event.stopPropagation();
        event.target.style.color = "#FF8927";
    }

    const dragLeave = event => {
        event.preventDefault();
        event.target.style.color = "";
    }

    const drop = event => {
        event.preventDefault();
        console.log(event.dataTransfer.getData("object"))
    }

    const dragEnd = event => {
        event.preventDefault();
        event.target.style.color = "";
    }

    const onDragTogglerEnter = (event, t, n) => {
        event.target.style.color = "#FF8927";
        t.openNode(n);
    }

    const onDragTogglerLeave = event => {
        event.target.style.color = "";
    }

    const dragLineEnter = event => {
        event.target.style.background = "#0da3e0";
        event.target.style.borderLeftColor = "#0da3e0";
        event.target.style.borderRightColor = "#0da3e0";
    }

    const dragLineLeave = event => {
        event.target.style.background = "";
        event.target.style.borderLeftColor = "";
        event.target.style.borderRightColor = "";
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
                <div className={classes.content}>
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
                {groupActionsRender()}
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
                                            onDragEnter={dragEnter}
                                            onDrop={drop}
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
                                                    // Methods
                                                    changeSubgroupName={props.changeSubgroupName}
                                                    editSubgroup={props.editSubgroup}
                                                    moveIsHere={props.moveIsHere}
                                                    checkMoveSuccess={props.moveIsHere}
                                                    cancelEditing={props.cancelEditing}
                                                />
                                            </div>
                                            <div
                                                className={classes.line}
                                                onDragOver={dragOver}
                                                onDragLeave={dragLineLeave}
                                                onDragEnter={dragLineEnter}
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