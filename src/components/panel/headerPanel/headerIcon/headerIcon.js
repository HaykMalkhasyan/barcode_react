import React, {useState} from "react";
import Picker from "../../picker/picker";

const   HeaderIcon = props => {
    const [active, setactive] = useState(false)
    const [pickerValue, setpickerValue] = useState('#444')

    const checkColor = value => {
        setpickerValue(value);
        setactive(value);
    }
    const createColor = () => {
        props.setColor('headerIconColor', pickerValue);
    }

    const restorColor = () => {
        props.restorColor('headerIconColor', '#444');
        setpickerValue('#444');
        setactive(false);
    }

    return (
        <div className="p-0">
            <Picker
                backgroundColor={props.headerIconColor}
                name={'headerIconColor'}
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

export default HeaderIcon