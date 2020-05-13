import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import Translate from "../../../../../../Translate";

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        maxWidth: '100%'
    },
});

const ClassifiersTreeViewer = (props) => {
    const classes = useStyles();

    const selectNodes = (event, nodeId) => {
        props.selectGroupsNode(nodeId)
    }
    const treeItemRender = (id, group_id) => {

        let result = props.data.map(
            item => {
                if (parseInt(item.parent_id) === parseInt(id)) {
                    let groupId = item.group_id ? item.group_id.id : false
                    if (parseInt(groupId) === parseInt(group_id)) {
                        return (
                            <TreeItem
                                key={item.id}
                                nodeId={`${item.id}`}
                                label={item.name}
                            >
                                {treeItemRender(item.id, item.group_id.id)}
                            </TreeItem>
                        )
                    } else {
                        return null
                    }
                } else {
                    return null
                }
            }
        )
        let arr = []
        result.map(
            (item, index) => {
                if (item !== null) {
                    arr.push(item)
                }
                return result;
            }
        )
        return arr
    }

    return (
        <>
            {
                props.data && props.data.length > 0 ?
                    <TreeView
                        className={classes.root}
                        defaultCollapseIcon={<ExpandMoreIcon/>}
                        defaultExpandIcon={<ChevronRightIcon/>}
                        onNodeSelect={selectNodes}
                        multiSelect
                    >
                        {
                            props.data.map(
                                item => {

                                    return item.parent_id.length === 0 && item.group_id && item.group_id.id === props.group.id ?
                                        <TreeItem
                                            key={item.id}
                                            nodeId={`${item.id}`}
                                            label={item.name}
                                        >
                                            {treeItemRender(item.id, item.group_id.id)}
                                        </TreeItem>
                                        :
                                        null

                                }
                            )
                        }
                        {/*<TreeItem nodeId="1" label="Applications">*/}
                        {/*    <TreeItem nodeId="2" label="Calendar"/>*/}
                        {/*    <TreeItem nodeId="3" label="Chrome"/>*/}
                        {/*    <TreeItem nodeId="4" label="Webstorm"/>*/}
                        {/*</TreeItem>*/}
                        {/*<TreeItem nodeId="5" label="Documents">*/}
                        {/*    <TreeItem nodeId="6" label="Material-UI">*/}
                        {/*        <TreeItem nodeId="7" label="src">*/}
                        {/*            <TreeItem nodeId="8" label="index.js"/>*/}
                        {/*            <TreeItem nodeId="9" label="tree-view.js"/>*/}
                        {/*        </TreeItem>*/}
                        {/*    </TreeItem>*/}
                        {/*</TreeItem>*/}
                    </TreeView>
                    :
                    <p className="text-center info pt-2 mb-0">
                        <Translate name={'empty'}/>
                    </p>
            }

        </>
    );
}

export default ClassifiersTreeViewer
