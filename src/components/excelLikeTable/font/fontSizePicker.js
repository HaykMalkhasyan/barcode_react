import React, { useEffect } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const options = ['10px', '12px', '14px', '16px', '18px', '20px', '22px', '24px', '26px', '28px', '30px',];

export default function ControllableStates(props) {
  const [value, setValue] = React.useState(options[2]);

  useEffect(()=>{
    setValue(props.fontSize)
  },[props.fontSize])

  const handleChange = (event) => {
        setValue(event.target.value);
        props.setFontSize(event.target.value)
        props.handleChangeStyle(undefined, undefined, undefined, undefined, event.target.value, undefined)
  };

  return (
    <FormControl variant="outlined" margin="none" >
        <InputLabel id="demo-simple-select-helper-label">Font</InputLabel>
        <Select
            style={{height:"48.19px", width:"83px"}}
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={value}
          onChange={handleChange}
          label="Font"
        >
            {options.map(item=><MenuItem key={item} value={item}>{item}</MenuItem>)}
        </Select>
      </FormControl>
  );
}
