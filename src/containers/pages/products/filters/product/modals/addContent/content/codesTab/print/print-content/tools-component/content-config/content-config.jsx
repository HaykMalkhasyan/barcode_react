import React from 'react'
import classes from './content-config.module.css'
import SelectUI from "../../../../../../../../../../../../../components/UI/input/selectUI/selectUI";
import CustomInput from "../../../../../../../../../../../../../components/UI/input/customInput/customInput";

const ContentConfig = props => {

    return (
        <div className={classes.contentConfig}>
            <SelectUI
                id={'content-id'}
                label={'Բովանդակության տարր'}
                labelId={'content-label'}
                name={'content'}
                formControl={classes.formControl}
                labelStyle={classes.labelStyle}
                root={classes.selectRoot}
                data={props.elem_data}
                value={props.content}
                // Methods
                onChange={props.selectContentItem}
            />
            {
                props.content.length > 0 ?
                    <div className={classes.inputsWindow}>
                        {
                            Object.keys(props.content_data[props.content]).map(
                                (item, index) => {

                                    return (
                                        <CustomInput
                                            key={`vonfig-inputs-${index}`}
                                            inputType={'inner'}
                                            classNameLabel={classes.classNameLabel}
                                            classNameInput={classes.classNameInput}
                                            name={item}
                                            placeholder={item}
                                            value={props.content_data[props.content][item]}
                                            // Methods
                                            onChange={props.changeHandler}
                                        />
                                    )
                                }
                            )
                        }
                    </div>
                    :
                    null
            }
        </div>
    )
};

export default ContentConfig;