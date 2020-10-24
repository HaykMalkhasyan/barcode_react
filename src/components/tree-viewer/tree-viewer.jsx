import React, {useState} from "react";
import classes from './tree-viewer.module.css'
import CustomButton from "../UI/button/customButton/customButton";
import Icons from "../Icons/icons";
import MovingButton from "../tree/movingButton/movingButton";
import cookie from "../../services/cookies";

const TreeItem = props => {

    return (
        <div className={classes.treeWindow}>
            {
                props.own_subgroups && props.own_subgroups.length ?
                    props.own_subgroups.map(
                        item => {

                            return (
                                <div key={`classifiers-${item.level}-${item.id}`} className={classes.mainItem}>
                                    <span className={props.own_select && props.own_select === item.id ? `${classes.nameArea} ${classes.active}` : classes.nameArea}>
                                        {
                                            item.children.length ?
                                                <CustomButton
                                                    className={classes.chevronButton}
                                                    children={
                                                        props.own_collapse.includes(item.id) ?
                                                            <Icons type={'tree-arrow-down'} className={classes.chevronIcon}/>
                                                            :
                                                            <Icons type={'tree-arrow-right'} className={classes.chevronIcon}/>
                                                    }
                                                    // Methods
                                                    onClick={() => props.toggleTreeItem(item.id, props.collapseName)}
                                                />
                                                :
                                                <CustomButton
                                                    className={classes.chevronButton}
                                                    children={<Icons type={'tree-arrow-right-empty'} className={classes.treeArrowRightEmpty}/>}
                                                    // Methods
                                                />
                                            // <span className={classes.chevron}>
                                            //     <Icons type={'tree-arrow-right-empty'} className={classes.treeArrowRightEmpty}/>
                                            // </span>
                                        }
                                        <span className={classes.name}>
                                            <span className={classes.nameText} onClick={() => props.setGroupValues('own_select', props.own_select === item.id ? null : item.id)} onDoubleClick={() => props.openHandler(item.id)}>{item[`name_${cookie.get('language') || "am"}`]}</span>
                                            {
                                                props.type === "edit" ?
                                                    <span className={props.own_move && props.own_move !== item.id ? `${classes.insertWindow} ${classes.show}` : classes.insertWindow}>
                                                        <MovingButton
                                                            data={item}
                                                        />
                                                    </span>
                                                    :
                                                    null
                                            }
                                        </span>
                                    </span>
                                    {
                                        props.own_collapse.includes(item.id) ?
                                            <div className={classes.collapse}>
                                                <TreeItem
                                                    own_subgroups={item.children}
                                                    own_collapse={props.own_collapse}
                                                    type={props.type}
                                                    own_move={props.own_move}
                                                    own_select={props.own_select}
                                                    collapseName={props.collapseName}
                                                    // Methods
                                                    setGroupValues={props.setGroupValues}
                                                    toggleTreeItem={props.toggleTreeItem}
                                                />
                                            </div>
                                            :
                                            null
                                    }
                                </div>
                            )
                        }
                    )
                    :
                    null
            }
        </div>
    )
}

const TreeViewer = props => {
    const [open, setOpen] = useState(true);

    return (
        <div className={classes.main}>
            {
                props.group ?
                    <div key={`group-${props.group.id}`} className={classes.mainItem}>
                        <span className={classes.nameArea}>
                            {
                                props.own_subgroups && props.own_subgroups.length ?
                                    <CustomButton
                                        className={classes.chevronButton}
                                        children={
                                            open ?
                                                <Icons type={'tree-arrow-down'} className={classes.chevronIcon}/>
                                                :
                                                <Icons type={'tree-arrow-right'} className={classes.chevronIcon}/>
                                        }
                                        // Methods
                                        onClick={() => setOpen(!open)}
                                    />
                                    :
                                    <CustomButton
                                        className={classes.chevronButton}
                                        children={<Icons type={'tree-arrow-right-empty'} className={classes.treeArrowRightEmpty}/>}
                                        // Methods
                                    />
                                // <span className={classes.chevron}>
                                //     <Icons type={'tree-arrow-right-empty'} className={classes.treeArrowRightEmpty}/>
                                // </span>
                            }
                            <span className={classes.name}>
                                <span className={classes.nameText} onDoubleClick={() => setOpen(!open)}>Բոլորը</span>
                                {
                                    props.type === "edit" ?
                                        <span className={classes.insertWindow}>
                                            <MovingButton
                                                data={props.group}
                                            />
                                        </span>
                                        :
                                        null
                                }
                            </span>
                        </span>
                        {
                            open ?
                                <div className={classes.collapse}>
                                    <TreeItem
                                        own_subgroups={props.own_subgroups}
                                        own_collapse={props.own_collapse}
                                        type={props.type}
                                        own_move={props.own_move}
                                        own_select={props.own_select}
                                        collapseName={props.collapseName}
                                        // Methods
                                        setGroupValues={props.setGroupValues}
                                        toggleTreeItem={props.toggleTreeItem}
                                    />
                                </div>
                                :
                                null
                        }
                    </div>
                    :
                    null
            }
        </div>
    )
}

export default TreeViewer