import React from 'react'
import classes from './classifiersItem.module.css'
import CustomButton from "../../../../../../../../../../components/UI/button/customButton/customButton";
import CustomInput from "../../../../../../../../../../components/UI/input/customInput/customInput";

const ClassifiersItem = props => {

    const valueRender = (roads, data) => {

        if (roads.length) {
            for (let item of roads) {
                if (+Object.keys(item)[0] === data.id) {
                    return item[data.id]
                }
            }
        }
        return 'Հիմնական դասակարգիչ'
    };

    return (
        <div className={classes.classifiersItem}>
            <CustomButton
                className={classes.groupButton}
                children={props.data.name}
                // Methods
                onClick={() => props.onClick(props.data.id)}
            />
            <CustomInput
                readOnly={true}
                classNameInput={classes.road}
                classNameLabel={classes.roadLabel}
                value={valueRender(props.roads, props.data)}
            />
        </div>
    )
};

export default ClassifiersItem;