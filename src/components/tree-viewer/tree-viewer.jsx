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

            if (props.node && props.node.parent_id === "0") {
                return (
                    <CoupleButtons
                        type={"move"}
                        checkSuccess={event => {
                            event.stopPropagation();
                            props.moveIsHere({id: 0})
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
            {
                props.own_subgroups ?
                    props.own_subgroups.length ?
                        <Collapse in={open} timeout={0} unmountOnExit className={classes.collapse}>
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
                                            groupId={props.groupId}
                                            selected={node.state.selected}
                                            depth={node.state.depth}
                                            onClick={() => {
                                                if (props.nodeStatus) {
                                                    tree.openNode(node);
                                                    if (props.edit === null && props.moveElement === null) {
                                                        tree.selectNode(node)
                                                        props.select(node, node.id, node.state.path, node.cat_id)
                                                    }
                                                }
                                            }}
                                        >
                                            <div className={classes.nodeContent}>
                                                <div>
                                                    <Toggler
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
                                        </TreeNode>
                                }}
                            </InfiniteTree>
                        </Collapse>
                        :
                        <small className={classes.isEmpty}>Դատարկ</small>
                    :
                    <SpinnerForContent/>
            }
        </>
    )
})

export default TreeViewer