import React from 'react'
import classes from './classifiersItem.module.css'
import CustomButton from "../../../../../../../../../../components/UI/button/customButton/customButton";
import cookie from "../../../../../../../../../../services/cookies";
import Icons from "../../../../../../../../../../components/Icons/icons";
import {createRoad} from "../../../../../../../../../../services/services";

const ClassifiersItem = props => {

    // const valueRender = (roads, data) => {
    //
    //     if (roads.length) {
    //         for (let item of roads) {
    //             if (+Object.keys(item)[0] === data.id) {
    //                 return item[data.id]
    //             }
    //         }
    //     }
    //     return 'Հիմնական դասակարգիչ'
    // };

    return (
        <div className={classes.classifiersItem}>
            <span className={props.subgroup[props.data.id] ? classes.groupButton : `${classes.groupButtonInactive} ${classes.groupButton}`}>
                {props.data[`title_${cookie.get("language") || "am"}`]}
            </span>
            <div className={classes.road}>
                {
                    props.subgroup && Object.keys(props.subgroup).length > 0 && props.subgroup[props.data.id] ?
                        <div className={classes.roadContent}>
                            {createRoad(props.subgroup[props.data.id])}
                        </div>
                        :
                        null
                }
                <CustomButton
                    className={classes.roadButton}
                    children={<Icons type={"add"}/>}
                    // Methods
                    onClick={() => props.onClick(props.data, true)}
                />
            </div>
        </div>
    )
};

export default ClassifiersItem;