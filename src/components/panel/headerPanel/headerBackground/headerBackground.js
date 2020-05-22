import React, {useState} from "react";
import Picker from "../../picker/picker";

const   HeaderBackground = props => {
    const [active, setactive] = useState(false)
    const [pickerValue, setpickerValue] = useState('#fff')

    const checkColor = value => {
        setpickerValue(value);
        setactive(value);
    }
    const createColor = () => {
        props.setColor('headerBackgroundColor', pickerValue);
    }

    const restorColor = () => {
        props.restorColor('headerBackgroundColor', '#fff');
        setpickerValue('#fff');
        setactive(false);
    }

    return (
        <div className="p-0">
            <Picker
                backgroundColor={props.headerBackgroundColor}
                name={'headerBackgroundColor'}
                data={props.headerColorData}
                pickerValue={pickerValue}
                checkColor={checkColor}
                active={active}
                createColor={createColor}
                restorColor={restorColor}
            />
        </div>
    )
}

export default HeaderBackground