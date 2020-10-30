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
import CoupleButtons from "../couple-action-buttons/couple-action-buttons";
import AddContent from "./add-content/add-content";
import Icons from "../Icons/icons";

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
                {
                    parseInt(props.add) === 0 ?
                        <AddContent
                            subgroupName={props.subgroupName}
                            newSubgroup={props.newSubgroup}
                            add={props.add}
                            catId={props.catId}
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
                                rowHeight={props.add ? 60 : 30}
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
                                            <div className={classes.nodeContent}>
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
                                                            <CoupleButtons
                                                                // Methods
                                                                checkSuccess={event => {
                                                                    event.stopPropagation();
                                                                    const newSubgroup = {...props.newSubgroup};
                                                                    newSubgroup.name = props.subgroupName;
                                                                    props.editSubgroup(newSubgroup)
                                                                }}
                                                                checkClose={event => {
                                                                    event.stopPropagation();
                                                                    props.cancelEditing();
                                                                }}
                                                            />
                                                        </div>
                                                        :
                                                        <span className={`${classes.nodeName} ${props.search && props.search.length > 0 && node.name.search(props.search) !== -1 ? classes.hasHave : ''}`} >
                                                        {node.name}
                                                    </span>
                                                }
                                            </div>
                                            {
                                                parseInt(props.add) === parseInt(node.id) && parseInt(props.catId) === parseInt(node.cat_id) ?
                                                    <AddContent
                                                        subgroupName={props.subgroupName}
                                                        newSubgroup={props.newSubgroup}
                                                        add={props.add}
                                                        catId={props.catId}
                                                        // Methods
                                                        changeSubgroupName={props.changeSubgroupName}
                                                        addSubgroup={props.addSubgroup}
                                                        cancelEditing={props.cancelEditing}
                                                    />
                                                    :
                                                    null
                                            }
                                        </TreeNode>
                                    );
                                }}
                            </InfiniteTree>
                        </Collapse>
                        :
                        <small className={classes.isEmpty}>Դատարկ</small>
                    :
                    <SkeletonUI/>
            }
        </>
    )

}

export default TreeViewer