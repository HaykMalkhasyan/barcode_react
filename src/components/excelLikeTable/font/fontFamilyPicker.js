






import React, { useEffect } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const options = [
  "sans-serif",   
  "Arial", 
  "Comic Sans MS", 
  "Impact", 
  "Lucida Sans Unicode", 
  "Tahoma",
  'Segoe UI',
];

export default function ControllableStates(props) {
  const [value, setValue] = React.useState(options[2]);


  useEffect(()=>{
    setValue(props.fontFamily)
  },[props.fontFamily])

  const handleChange = (event) => {
        setValue(event.target.value);
        props.setFontFamily(event.target.value)
        props.handleChangeStyle(undefined, undefined, undefined, undefined, undefined, event.target.value)
  };

  return (
    <FormControl variant="outlined" margin="none" >
        <InputLabel id="demo-simple-select-helper-label">Font Style</InputLabel>
        <Select
        style={{height:"48.19px", width:"183px"}}
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={value}
          onChange={handleChange}
          label="Font Style"
        >
            {options.map(item=><MenuItem key={item} style={{fontFamily:item}} value={item}>{item}</MenuItem>)}
        </Select>
      </FormControl>
  );
}
