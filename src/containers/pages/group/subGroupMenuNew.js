import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import FolderIcon from "@material-ui/icons/Folder";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        maxWidth: '100%',
    },
});


const Menu = props => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState([]);
    const [selected, setSelected] = React.useState([]);

    const handleToggle = (event, nodeIds) => {
        setExpanded(nodeIds);
    };

    const handleSelect = (event, nodeIds) => {
        let index = false;
        setSelected(nodeIds);
        props.data.forEach(
            item => item.parent_id === parseInt(nodeIds) ?
                index = true
                :
                null
        );
        if (!index) {
            for (let item of props.data) {
                if (item.id === parseInt(nodeIds)) {
                    props.selectGroup(item.group_id.id, {
                        id: item.id,
                        name: item.name
                    })
                }
            }
        }
    };

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
                        defaultEndIcon={
                            <FolderOpenIcon
                            style={{
                                color: '#ffc749',
                                verticalAlign: "middle"
                            }}
                            fontSize={'small'}
                        />
                        }
                        expanded={expanded}
                        selected={selected}
                        onNodeToggle={handleToggle}
                        onNodeSelect={handleSelect}
                    >
                        {
                            props.data.map(
                                (item) => {

                                    return item.parent_id.length === 0 ?

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

                    </TreeView>
                    :
                    null
            }
        </>
    )
}


export default Menu;

/*---------------------------------------------------*/

