import React, {useState} from "react";
import classes from "./tree-viewer.module.css";
import InfiniteTree from "react-infinite-tree";
import TreeNode from "./tree-node/tree-node";
import Toggler from "./trigger/toggler";
import SkeletonUI from "../skeletion/skeleton";
import Collapse from "@material-ui/core/Collapse";
import CustomButton from "../UI/button/customButton/customButton";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

const TreeViewer = React.forwardRef((props, ref) => {
    const [open, setOpen] = useState(true)

    return (
        <>
            <div
                className={props.group && props.group.id === props.groupId ? classes.active : classes.toggle}
                onClick={() => {
                    props.selectTreeGroupItem(props.group.id)
                }}
            >
                {
                    props.data && props.data.length ?
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
                                setOpen(!open);
                            }}
                        />
                        :
                        null
                }
                <span>Բոլորը</span>
            </div>
            {
                props.data ?
                    props.data.length ?
                        <Collapse in={open} timeout={0} unmountOnExit className={classes.collapse}>
                            <InfiniteTree
                                autoOpen={false}
                                ref={ref}
                                width="100%"
                                height={317}
                                rowHeight={30}
                                data={props.data}
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

                                    return (
                                        <TreeNode
                                            groupId={props.groupId}
                                            selected={node.state.selected}
                                            depth={node.state.depth}
                                            onClick={() => {
                                                tree.selectNode(node)
                                                props.select(node.id, node.state.path, node.cat_id)
                                            }}
                                        >
                                            <Toggler
                                                state={toggleState}
                                                onClick={event => {
                                                    event.stopPropagation()
                                                    if (toggleState === "closed") {
                                                        tree.openNode(node);
                                                    } else if (toggleState === "opened") {
                                                        tree.closeNode(node);
                                                    }
                                                }}
                                            />
                                            <span
                                                className={`${classes.nodeName} ${props.search && props.search.length > 0 && node.name.search(props.search) !== -1 ? classes.hasHave : ''}`}
                                            >
                                                {node.name}
                                            </span>
                                        </TreeNode>
                                    );
                                }}
                            </InfiniteTree>
                        </Collapse>
                        :
                        <SkeletonUI/>
                    :
                    <small className={classes.isEmpty}>Դատարկ է</small>
            }
        </>
    )

})

export default TreeViewer