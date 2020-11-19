import React from "react";
import classes from "./tree-content.module.css";
import EditContent from "../edit-content/edit-content";
import { AiFillCopy } from "react-icons/ai";
import { BiCut } from "react-icons/bi";
import Tooltip from "@material-ui/core/Tooltip";
import CustomButton from "../../UI/button/customButton/customButton";
import {FaPaste} from "react-icons/fa";

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
   } else if (props.buffer && props.buffer.id === props.node.id) {
       return (
           <div className={classes.copedItem}>
               <span className={`${classes.nodeName} ${props.activeAction === "cut" ? classes.cut : ''} ${props.search && props.search.length > 0 && props.node.name.search(props.search) !== -1 ? classes.hasHave : ''}`} >
                   {props.node.name}
               </span>
               <span className={classes.copyIcon}>
                   {
                       props.activeAction === "copy" ?
                           <AiFillCopy/>
                           :
                           props.activeAction === "cut" ?
                               <BiCut/>
                               :
                               null
                   }
               </span>
           </div>
       )
   } else {
       return (
           <div className={classes.copedItem}>
               <span className={`${classes.nodeName} ${props.search && props.search.length > 0 && props.node.name.search(props.search) !== -1 ? classes.hasHave : ''}`} >
                   {props.node.name}
               </span>
               {
                   props.selectNode && props.node.id === props.selectNode.id ?
                       <div className={classes.copyCutPasteButtons}>
                           {/* subgroup copy */}
                           <CustomButton
                               className={props.activeAction === "copy" ? `${classes.actionButtons} ${classes.active}` : classes.actionButtons}
                               children={
                                   <Tooltip title={'Պատճենել'} placement="top">
                                       <span className={classes.contentSpan}>
                                           <AiFillCopy className={props.own_select !== null && props.own_move === false ? classes.copy : ''}/>
                                       </span>
                                   </Tooltip>
                               }
                               // Methods
                               onClick={props.node && (props.activeAction === null ||props.activeAction === "copy" || props.activeAction === "cut") && props.own_move === false ? () => props.copyHandler("copy") : null}
                           />
                           {/* subgroup cut */}
                           <CustomButton
                               className={props.activeAction === "cut" ? `${classes.actionButtons} ${classes.active}` : classes.actionButtons}
                               children={
                                   <Tooltip title={'Կտրել'} placement="top">
                                       <span className={classes.contentSpan}>
                                           <BiCut className={props.own_select !== null && props.own_move === false ? classes.cut : ''}/>
                                       </span>
                                   </Tooltip>
                               }
                               // Methods
                               onClick={props.node && (props.activeAction === null ||props.activeAction === "copy" || props.activeAction === "cut") && props.own_move === false ? () => props.copyHandler("cut") : null}
                           />

                           {/* subgroup paste */}
                           <CustomButton
                               className={props.buffer && ((props.node && !props.buffer.contains(props.node) && props.node.id !== props.buffer.id && props.node.id !== parseInt(props.buffer.parent_id)) || (props.groupId !== null && parseInt(props.buffer.parent_id) !== 0)) ? `${classes.actionButtons} ${classes.activePaste}` : classes.actionButtons}
                               children={
                                   <Tooltip title={'Կպցնել'} placement="top">
                                       <span className={classes.contentSpan}>
                                           <FaPaste className={props.buffer && props.own_move === false ? classes.paste : ''}/>
                                       </span>
                                   </Tooltip>
                               }
                               // Methods
                               onClick={props.buffer && ((props.node && !props.buffer.contains(props.node) && props.node.id !== props.buffer.id && props.node.id !== parseInt(props.buffer.parent_id) && (props.activeAction === "copy" || props.activeAction === "cut")) || props.groupId !== null) && props.own_move === false ? () => props.pasteHandler(): null}
                           />
                       </div>
                       :
                       null
               }
           </div>
       )
   }
}

export default TreeContent