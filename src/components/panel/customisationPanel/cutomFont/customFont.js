import React, {useState} from "react";
import Picker from "../../picker/picker";

const   CustomizationFont = props => {
    const [active, setactive] = useState(false)
    const [pickerValue, setpickerValue] = useState('#444')

    const checkColor = value => {
        setpickerValue(value);
        setactive(value);
    }
    const createColor = () => {
        props.setColor('customBackgroundColor', pickerValue);
    }

    const restorColor = () => {
        props.restorColor('customBackgroundColor', '#444');
        setpickerValue('#444');
        setactive(false);
    }

    return (
        <div className="p-0">
            <Picker
                backgroundColor={props.customBackgroundColor}
                name={'customBackgroundColor'}
                data={props.customColorData}
                pickerValue={pickerValue}
                checkColor={checkColor}
                active={active}
                createColor={createColor}
                restorColor={restorColor}
            />
        </div>
    )
}

export default CustomizationFont