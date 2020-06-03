import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import Translate from "../../../../../../Translate";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import FolderIcon from "@material-ui/icons/Folder";
import CheckboxesUi from "../../../../../../components/checkBoxUI/checkBoxUI";

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        maxWidth: '100%'
    },
});

const ClassifiersTreeViewer = (props) => {
    const classes = useStyles();

    const selectNodes = (event, nodeId) => {
        event.stopPropagation()
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
                                label={
                                    <CheckboxesUi
                                        checked={props.advancedSearchConfig.classifier && props.advancedSearchConfig.classifier === item.id ? true : false}
                                        color={'primary'}
                                        label={item.name}
                                        name={item.name}
                                        value={item.id}
                                        size={'small'}
                                        translate={false}
                                        onChange={event => props.onChange(event, event.target.value, event.target.checked)}
                                    />
                                }
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
                        style={props.sectionFontColor ? {color: props.sectionFontColor} : null}
                        className={classes.root}
                        defaultCollapseIcon={<FolderIcon
                            style={{
                                color: '#ffc749',
                                verticalAlign: "middle"
                            }}
                            fontSize={'small'}
                        />}
                        defaultExpandIcon={<FolderIcon
                            style={{
                                color: '#ffc749',
                                verticalAlign: "middle"
                            }}
                            fontSize={'small'}
                        />}
                        defaultEndIcon={<FolderOpenIcon
                            style={{
                                color: '#ffc749',
                                verticalAlign: "middle"
                            }}
                            fontSize={'small'}
                        />}
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
                                            label={
                                                <CheckboxesUi
                                                    checked={props.advancedSearchConfig.classifier && props.advancedSearchConfig.classifier === item.id ? true : false}
                                                    color={'primary'}
                                                    label={item.name}
                                                    name={item.name}
                                                    value={item.id}
                                                    size={'small'}
                                                    translate={false}
                                                    onChange={event => props.onChange(event, event.target.value, event.target.checked)}
                                                />
                                            }
                                        >
                                            {treeItemRender(item.id, item.group_id.id)}
                                        </TreeItem>
                                        :
                                        null

                                }
                            )
                        }
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
