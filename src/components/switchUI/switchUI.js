import React from 'react';
import Switch from '@material-ui/core/Switch';
import Translate from "../../Translate";

export default function SwitchesUi(props) {
    const [state, setState] = React.useState({
        checkedA: false,
        checkedB: false,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    return (
        <label>
            <Translate name={props.label}/>
            <Switch
                checked={state.checkedB}
                onChange={handleChange}
                color="primary"
                name="checkedB"
                inputProps={{ 'aria-label': 'primary checkbox' }}
            />
        </label>
    );
}
