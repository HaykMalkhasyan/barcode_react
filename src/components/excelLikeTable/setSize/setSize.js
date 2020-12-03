import React, { useEffect } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const options = [
  "A4",   
  "B4", 
  "Work Mode", 
];

export default function ControllableStates(props) {
  const [value, setValue] = React.useState("Work Mode");




  const handleChange = (event) => {
        setValue(event.target.value);
        switch (event.target.value) {
            case "A4":
                props.setPrintSize({width:"297mm", height:"210mm"})
                break;
            case "Work Mode":
                props.setPrintSize({width:null, height:null})
                break;
            case "B4":
                props.setPrintSize({width:"353mm", height:"250mm"})
                break;
        
            default:
                break;
        }
  };

  return (
    <FormControl variant="outlined" margin="none" >
        <InputLabel id="demo-simple-select-helper-label">Print Size</InputLabel>
        <Select
        style={{height:"48.19px", width:"183px"}}
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={value}
          onChange={handleChange}
          label="Print Size"
        >
            {options.map(item=><MenuItem key={item} value={item}>{item}</MenuItem>)}
        </Select>
      </FormControl>
  );
}




