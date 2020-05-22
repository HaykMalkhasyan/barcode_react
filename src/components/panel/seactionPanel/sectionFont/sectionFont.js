import React, {useState} from "react";
import Picker from "../../picker/picker";

const   SectionFont = props => {
    const [active, setactive] = useState(false)
    const [pickerValue, setpickerValue] = useState('#444')

    const checkColor = value => {
        setpickerValue(value);
        setactive(value);
    }
    const createColor = () => {
        props.setColor('sectionFontColor', pickerValue);
    }

    const restorColor = () => {
        props.restorColor('sectionFontColor', null);
        setpickerValue('#444');
        setactive(false);
    }

    return (
        <div className="p-0">
            <Picker
                backgroundColor={props.sectionFontColor}
                name={'sectionFontColor'}
                data={props.sectionColorData}
                pickerValue={pickerValue}
                checkColor={checkColor}
                active={active}
                createColor={createColor}
                restorColor={restorColor}
            />
        </div>
    )
}

export default SectionFont