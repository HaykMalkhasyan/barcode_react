import React, { useEffect } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const options = [
  "Landscape",   
  "Potrait", 
];

export default function ControllableStates(props) {
  const [value, setValue] = React.useState("Potrait");




  const handleChange = (event) => {
        setValue(event.target.value);
        let paper = document.getElementById("paperRef")
        let width = paper.style.width
        let height = paper.style.height
        paper.style.width = height
        paper.style.height = width
  };

  return (
    <FormControl variant="outlined" margin="none" >
        <InputLabel id="demo-simple-select-helper-label">Orientation</InputLabel>
        <Select
        style={{height:"48.19px", width:"183px"}}
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={value}
          onChange={handleChange}
          label="Orientation"
        >
            {options.map(item=><MenuItem key={item} value={item}>{item}</MenuItem>)}
        </Select>
      </FormControl>
  );
}




