import React, { useEffect } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const options = [
  {name:"Arial", value:"Arial, Helvetica, sans-serif"}, 
  {name:"Comic Sans MS", value:'"Comic Sans MS", cursive, sans-serif'}, 
  {name:"Impact", value:"Impact, Charcoal, sans-serif"}, 
  {name:"Lucida Sans Unicode", value:'"Lucida Sans Unicode", "Lucida Grande", sans-serif'}, 
  {name:"Tahoma", value:"Tahoma, Geneva, sans-serif"}, 
  ];

export default function ControllableStates(props) {
  const [value, setValue] = React.useState(options[0]);

  useEffect(()=>{
    setValue(props.fontFamily)
  },[props.fontFamily])

  const handleChange = (event) => {
        props.setReadFromParent(false)
        setValue(event.target.value);
        props.setFontFamily(event.target.value)
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
            {options.map(item=><MenuItem key={item.value} value={item.value}>{item.name}</MenuItem>)}
        </Select>
      </FormControl>
  );
}
