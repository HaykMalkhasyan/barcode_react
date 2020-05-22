import React, {useState} from "react";
import Picker from "../../picker/picker";

const CustomizationIcon = props => {
    const [active, setactive] = useState(false)
    const [pickerValue, setpickerValue] = useState('')

    const checkColor = value => {
        setpickerValue(value);
        setactive(value);
    }
    const createColor = () => {
        props.setColor('customIconColor', pickerValue);
    }

    const restorColor = () => {
        props.restorColor('customIconColor', '');
        setpickerValue('');
        setactive(false);
    }

    return (
        <div className="p-0">
            <Picker
                backgroundColor={props.customIconColor}
                name={'customIconColor'}
                data={props.customIconColorData}
                pickerValue={pickerValue}
                checkColor={checkColor}
                active={active}
                createColor={createColor}
                restorColor={restorColor}
            />
        </div>
    )
}

export default CustomizationIcon