import React, {useEffect, useRef, useState} from "react";
import classes from "./body-content.module.css";
import TreeViewer from "../../../../../../../components/tree-viewer/tree-viewer";

const BodyContent = props => {
    const [touch, setTouch] = useState(false);
    const ref = useRef();

    useEffect(() => {
        if (ref.current) {
            if (props.search.length > 0) {
                ref.current.tree.filter(
                    props.search,
                    {
                        includeAncestors: true,
                        includeDescendants: true
                    }
                )
                setTouch(true);
            } else if (props.search.length === 0 && touch) {
                ref.current.tree.unfilter();
                setTouch(false)
            }
        }
    }, [props.search, touch])

    return (
        <div className={classes.treeWindow}>
            <TreeViewer
                ref={ref}
                type={props.type}
                search={props.search}
                group={props.group}
                groupId={props.groupId}
                data={props.data}
                // Methods
                select={props.selectTreeItem}
                selectTreeGroupItem={props.selectTreeGroupItem}
            />
        </div>
    )
}

export default BodyContent