import React from 'react'
import classes from './treeFilter.module.css'
import Tree from "../../../../../../../../components/tree/tree"

const TreeFilter = props => {

    return (
        <div className={classes.treeWindow}>
            <Tree
                label={'Բոլորը'}
                type={'select'}
                group={props.group}
                customSubgroup={props.customSubgroup}
                collapsed={props.collapsed}
                collapsedGroup={props.collapsedGroup}
                advancedSearchConfig={props.advancedSearchConfig}
                // Methods
                subCollapsed={props.subCollapsed}
                subCollapsedGroup={props.subCollapsedGroup}
                select={props.select}
            />
        </div>
    )
};

export default TreeFilter;