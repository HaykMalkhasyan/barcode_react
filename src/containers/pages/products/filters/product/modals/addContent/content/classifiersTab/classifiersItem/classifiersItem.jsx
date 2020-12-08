import React from 'react'
import classes from './classifiersItem.module.css'
import CustomButton from "../../../../../../../../../../components/UI/button/customButton/custom-button";
import cookie from "../../../../../../../../../../services/cookies";
import Icons from "../../../../../../../../../../components/Icons/icons";
import {createRoad} from "../../../../../../../../../../services/services";

const ClassifiersItem = props => {

    const removeSelectedClassifiersHandler = (classifiers, id) => {
        const initialClassifier = [...classifiers];
        for (let [index, item] of Object.entries(initialClassifier)) {

            if (parseInt(item.cat_id) === id) {
                initialClassifier.splice(parseInt(index), 1)
            }
        }
        props.setProductValues("classifiers", initialClassifier);
    }

    const checkRoadRender = (classifiers, data) => {
        for (let item of classifiers) {
            if (parseInt(item.cat_id) === data.id) {
                return (
                    <div className={classes.roadContent}>
                        {createRoad(item)}
                    </div>
                )
            }
        }
    }

    return (
        <div
            className={classes.classifiersItem}
            // Methods
            onClick={() => props.onClick(props.data, true)}
        >
            <div className={classes.classifiersSelectedItem}>
                <span className={checkRoadRender(props.classifiers, props.data) ? classes.groupButton : `${classes.groupButtonInactive} ${classes.groupButton}`}>
                    {`${props.data[`title_${cookie.get("language") || "am"}`]} ${props.data.id === 0 ? "*" : ""}`}
                </span>
                {
                    props.classifiers && props.classifiers.length ?
                        checkRoadRender(props.classifiers, props.data)
                        :
                        null
                }
            </div>
            <div className={classes.road}>
                {
                    props.classifiers && props.classifiers.length > 0 && checkRoadRender(props.classifiers, props.data) ?
                        <CustomButton
                            className={classes.removeButton}
                            children={<Icons type={'group-delete'} width={14} height={14} className={classes.removeIcon} opacity={1}/>}
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