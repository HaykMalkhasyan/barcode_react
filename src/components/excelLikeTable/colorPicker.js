import React, {useState, useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import ToggleButton from '@material-ui/lab/ToggleButton';
import FormatColorFillIcon from '@material-ui/icons/FormatColorFill';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import FormatColorTextIcon from '@material-ui/icons/FormatColorText';


import { SketchPicker } from 'react-color'

export default function PopoverPopupState(props) {

    const [state, setState] = useState({
        displayColorPicker: false,
        color: props.color ? props.color : undefined
    });

 useEffect(()=>{
  setState({ color: props.color ? props.color : undefined })
 },[props.color])


    const handleChange = (color) => {
        props.setReadFromParent(false)
        setState({ color: color.hex })
        props.setColor && props.setColor(color.hex)
    };

  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
             <ToggleButton {...bindTrigger(popupState)} style={{backgroundColor: state.color && state.color.includes("#fffff") ? "#9B9B9B" : "inherit"}} value="color" aria-label="color" >
            {props.type === "font" ? <FormatColorTextIcon htmlColor={state.color} /> : <FormatColorFillIcon htmlColor={state.color} />}
            <ArrowDropDownIcon htmlColor={state.color} />
          </ToggleButton>
          
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            {/* <Box p={2}> */}
            <SketchPicker color={ state.color } onChange={ handleChange } />
            {/* </Box> */}
          </Popover>
        </div>
      )}
    </PopupState>
  );
}
