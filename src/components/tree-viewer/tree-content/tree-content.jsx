import React from "react";
import classes from "./tree-content.module.css";
import EditContent from "../edit-content/edit-content";
import MoveContent from "../move-content/move-content";

const TreeContent = props => {
   if (parseInt(props.edit) === parseInt(props.node.id) && parseInt(props.catId) === parseInt(props.node.cat_id)) {

       return (
           <EditContent
               moveElement={props.moveElement}
               subgroupName={props.subgroupName}
               newSubgroup={props.newSubgroup}
               name={props.node.name}
               node={props.node}
               // Methods
               changeSubgroupName={props.changeSubgroupName}
               editSubgroup={props.editSubgroup}
               cancelEditing={props.cancelEditing}
           />
       )
   } else  if (props.moveElement !== null && parseInt(props.moveElement) !== parseInt(props.node.id)) {

       return (
           <MoveContent
               node={props.node}
               selectNode={props.selectNode}
               // Methods
               cancelEditing={props.cancelEditing}
               moveIsHere={props.moveIsHere}
               checkMoveSuccess={props.checkMoveSuccess}
           />
       )
   } else {

       return (
           <span className={`${classes.nodeName} ${props.search && props.search.length > 0 && props.node.name.search(props.search) !== -1 ? classes.hasHave : ''}`} >
               {props.node.name}
           </span>
       )
   }
}

export default TreeContent