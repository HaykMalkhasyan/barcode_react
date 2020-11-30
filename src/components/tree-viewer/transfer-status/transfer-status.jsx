import React from "react";
import classes from "./transfer-status.module.css";
import {AiFillCopy} from "react-icons/ai";
import {BiCut} from "react-icons/bi";

const TransferStatus = props => {

    return (
        <div className={classes.copedItem}>
            <span
                className={
                    `
                    ${classes.nodeName}
                    ${props.activeAction === "cut" || props.activeAction === "copy" ?
                        classes.cut
                        :
                        ''
                    }
                    ${props.search && props.search.length > 0 && props.node.name.search(props.search) !== -1 ?
                        classes.hasHave
                        :
                        ''
                    }
                    `
                }
            >
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
}

export default TransferStatus