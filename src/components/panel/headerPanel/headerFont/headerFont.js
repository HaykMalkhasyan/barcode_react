import React, {useState} from "react";
import Picker from "../../picker/picker";

const   HeaderFont = props => {
    const [active, setactive] = useState(false)
    const [pickerValue, setpickerValue] = useState('#444')

    const checkColor = value => {
        setpickerValue(value);
        setactive(value);
    }
    const createColor = () => {
        props.setColor('headerFontColor', pickerValue);
    }

    const restorColor = () => {
        props.restorColor('headerFontColor', null);
        setpickerValue('#444');
        setactive(false);
    }

    return (
        <div className="p-0">
            <Picker
                backgroundColor={props.headerFontColor}
                name={'headerFontColor'}
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

export default HeaderFont