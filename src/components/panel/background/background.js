import React, {useState} from "react";
import Picker from "../picker/picker";

const Background = props => {
    const [active, setActive] = useState(false)
    const [pickerValue, setPickerValue] = useState('#F5F7FA')

    const checkColor = value => {
        setPickerValue(value);
        setActive(value);
    }
    const createColor = () => {
        props.setColor('backgroundColor', pickerValue);
    }

    const restorColor = () => {
        props.restorColor('backgroundColor', '#F5F7FA');
        setPickerValue('#F5F7FA');
        setActive(false);
    }
    
    return (
        <div className='p-3'>
            <Picker
                name={'backgroundColor'}
                data={props.colorData}
                backgroundColor={props.backgroundColor}
                pickerValue={pickerValue}
                checkColor={checkColor}
                active={active}
                createColor={createColor}
                restorColor={restorColor}
            />
        </div>
    )
}

export default Background