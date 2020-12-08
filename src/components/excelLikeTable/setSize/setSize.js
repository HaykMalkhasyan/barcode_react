import React, { useEffect } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const options = [
  "A4",   
  "B4", 
];

export default function ControllableStates(props) {
  const [value, setValue] = React.useState("A4");




  const handleChange = (event) => {
        setValue(event.target.value);
        let paper = document.getElementById("paperRef")
        switch (event.target.value) {
            case "A4":
              paper.style.width="210mm"
              paper.style.height="297mm"
              props.setPaperHeight(50);
                break;
            case "B4":
              paper.style.width="250mm"
              paper.style.height="353mm"
                props.setPaperWidth(6);
                props.setPaperHeight(6);
                // props.gridApi.redrawRows()
                // let coldef = props.gridApi.getColumnDefs()
                // props.gridApi.setColumnDefs([])
                // setTimeout(()=>{
                //   props.gridApi.setColumnDefs(coldef)
                // },100)
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




