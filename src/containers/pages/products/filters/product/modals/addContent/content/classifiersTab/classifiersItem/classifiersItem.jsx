import React from 'react'
import classes from './classifiersItem.module.css'
import CustomButton from "../../../../../../../../../../components/UI/button/customButton/customButton";
import cookie from "../../../../../../../../../../services/cookies";
import Icons from "../../../../../../../../../../components/Icons/icons";
import {createRoad} from "../../../../../../../../../../services/services";

const ClassifiersItem = props => {

    const removeSelectedClassifiersHandler = (classifiers, id) => {
        const initialClassifier = {...classifiers};
        delete initialClassifier[id];
        props.setProductValues("classifiers", initialClassifier);
    }

    return (
        <div
            className={classes.classifiersItem}
            // Methods
            onClick={() => props.onClick(props.data, true)}
        >
            <div className={classes.classifiersSelectedItem}>
                <span className={props.subgroup[props.data.id] ? `background-transparent color-024059 font-size-13 ${classes.groupButton}` : `background-transparent color-bababa font-size-13 ${classes.groupButtonInactive} ${classes.groupButton}`}>
                    {`${props.data[`title_${cookie.get("language") || "am"}`]} ${props.data.id === 0 ? "*" : ""}`}
                </span>
                {
                    props.subgroup && Object.keys(props.subgroup).length > 0 && props.subgroup[props.data.id] ?
                        <div className={classes.roadContent}>
                            {createRoad(props.subgroup[props.data.id])}
                        </div>
                        :
                        null
                }
            </div>
            <div className={`background-transparent color-484848 font-size-13 ${classes.road}`}>
                {
                    props.classifiers && Object.keys(props.classifiers).length > 0 && props.classifiers[props.data.id] ?
                        <CustomButton
                            className={classes.removeButton}
                            children={<Icons type={'group-delete'} width={14} height={14} className={`stroke-000 ${classes.removeIcon}`} opacity={1}/>}
                            // events
                            onClick={event => {
                                event.stopPropagation();
                                removeSelectedClassifiersHandler(props.classifiers, props.data.id)

                            }}
                        />
                        :
                        null
                }
            </div>
        </div>
    )
};

export default ClassifiersItem;