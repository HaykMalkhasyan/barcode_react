import React, { useEffect } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const options = ["SUM", "AVERAGE", "MAX", "MIN"];

export default function ControllableStates(props) {
  const [value, setValue] = React.useState(options[2]);

  useEffect(()=>{
    setValue(props.selectedFunction)
  },[props.selectedFunction])

  const handleChange = (event) => {
        setValue(event.target.value);
        props.setSelectedFunction(event.target.value)
        props.handleChangeFunction(event.target.value)
  };

  return (
    <FormControl variant="outlined" margin="none" >
        <InputLabel id="demo-simple-select-helper-label">Functions</InputLabel>
        <Select
            style={{height:"48.19px", width:"183px"}}
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={value}
          onChange={handleChange}
          label="Functions"
        >
          <MenuItem value={null}><em>None</em></MenuItem>
            {options.map(item=><MenuItem key={item} value={item}>{item}</MenuItem>)}
        </Select>
      </FormControl>
  );
}
