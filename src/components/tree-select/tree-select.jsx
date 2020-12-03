import React from "react";
import classes from "./tree-select.module.css";
import Icons from "../Icons/icons";
import TreeSelectContent from "./tree-select-content/tree-select-content";
import {createRoad} from "../../services/services";
import CustomButton from "../UI/button/customButton/custom-button";

const TreeSelect = props => {

    const removeSelectedClassifiersHandler = (classifiers, id) => {
        const initialClassifier = {...classifiers};
        delete initialClassifier[id];
        props.setProductValues("classifiers", initialClassifier);
    }

    return (
        <>
            <div
                className={classes.treeSelect}
                // Methods
                onClick={event => {
                    event.stopPropagation();
                    props.toggleWindow(props.id)
                }}
            >
                {
                    props.classifiers && Object.keys(props.classifiers).length > 0 && props.classifiers[props.id] ?
                        <div className={classes.road}>
                            {createRoad(props.classifiers[props.id])}
                        </div>
                        :
                        null
                }
                <span className={classes.angleButton}>
                    <Icons type={props.open ? 'top-angle' : 'bottom-angle'} className={classes.angleIcon}/>
                </span>
                {
                    props.classifiers && Object.keys(props.classifiers).length > 0 && props.classifiers[props.id] ?
                        <CustomButton
                            className={classes.removeButton}
                            children={<Icons type={'group-delete'} width={16} height={16} className={classes.removeIcon} opacity={1}/>}
                            // events
                            onClick={event => {
                                event.stopPropagation();
                                removeSelectedClassifiersHandler(props.classifiers, props.id)

                            }}
                        />
                        :
                        null
                }
            </div>
            {
                props.open ?
                    <div
                        className={classes.content}
                        onClick={event => {
                            event.stopPropagation();
                        }}
                    >
                        <TreeSelectContent
                            own_subgroups={props.own_subgroups}
                            // Methods
                            select={props.select}
                        />
                    </div>
                    :
                    null
            }
        </>
    )
}

export default TreeSelect