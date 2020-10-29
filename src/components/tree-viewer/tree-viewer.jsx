import React, {useEffect, useRef, useState} from "react";
import classes from "./tree-viewer.module.css";
import InfiniteTree from "react-infinite-tree";
import TreeNode from "./tree-node/tree-node";
import Toggler from "./trigger/toggler";
import SkeletonUI from "../skeletion/skeleton";
import Collapse from "@material-ui/core/Collapse";
import CustomButton from "../UI/button/customButton/customButton";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import CustomInput from "../UI/input/customInput/customInput";
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

const TreeViewer = props => {
    const [open, setOpen] = useState(true);
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

    return (
        <>
            <div
                className={props.group && props.group.id === props.groupId ? classes.active : classes.toggle}
                onClick={() => {
                    ref.current.tree.selectNode()
                    props.selectTreeGroupItem(props.group.id)
                }}
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
                        null
                }
                <span>Բոլորը</span>
            </div>
            {
                props.own_subgroups && props.own_subgroups.length ?
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

                                return (
                                    <TreeNode
                                        groupId={props.groupId}
                                        selected={node.state.selected}
                                        depth={node.state.depth}
                                        onClick={() => {
                                            if (props.edit === null) {
                                                tree.selectNode(node)
                                                props.select(node.id, node.state.path, node.cat_id)
                                            }
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
                                        {
                                            parseInt(props.edit) === parseInt(node.id) && parseInt(props.catId) === parseInt(node.cat_id) ?
                                                <div className={classes.changeControllerWindow}>
                                                    <CustomInput
                                                        classNameInput={classes.subgroupNameInput}
                                                        classNameLabel={classes.subgroupNameLabel}
                                                        value={props.subgroupName}
                                                        name={'subgroupName'}
                                                        // Methods
                                                        onChange={event => {
                                                            props.changeSubgroupName(event.target.name, event.target.value)
                                                        }}
                                                    />
                                                    <div className={classes.actions}>
                                                        <CustomButton
                                                            className={classes.actionsButton}
                                                            children={<CheckIcon/>}
                                                            // Methods
                                                            onClick={() => {
                                                                const newSubgroup = {...props.newSubgroup}
                                                                newSubgroup.name = props.subgroupName;
                                                                props.editSubgroup(newSubgroup)
                                                            }}
                                                        />
                                                        <CustomButton
                                                            className={classes.actionsButton}
                                                            children={<CloseIcon/>}
                                                        />
                                                    </div>
                                                </div>
                                                :
                                                <span className={`${classes.nodeName} ${props.search && props.search.length > 0 && node.name.search(props.search) !== -1 ? classes.hasHave : ''}`} >
                                                        {node.name}
                                                    </span>
                                        }
                                    </TreeNode>
                                );
                            }}
                        </InfiniteTree>
                    </Collapse>
                    :
                    <SkeletonUI/>
            }
        </>
    )

}

export default TreeViewer