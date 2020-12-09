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
        let paper = document.getElementsByClassName("paperRef")
        let cont = document.getElementById("tableRef")
        let width = paper[0].style.width
        let height = paper[0].style.height
        switch (event.target.value) {
            case "A4":
              if(width>height){
                Array.from(paper).forEach(item=>{
                  item.style.width="297mm"
                  item.style.height="210mm"
                })
                props.setPaperHeight(39);
                cont.style.width="297mm"
                break;
              }
              Array.from(paper).forEach(item=>{
                item.style.width="210mm"
                item.style.height="297mm"
              })
              props.setPaperHeight(55);
              cont.style.width="210mm"
                break;
            case "B4":
              if(width>height){
                Array.from(paper).forEach(item=>{
                  item.style.width="353mm"
                  item.style.height="250mm"
                })
              cont.style.width="353mm"
                
                props.setPaperHeight(50);
                break;
              }
              Array.from(paper).forEach(item=>{
                item.style.width="250mm"
                item.style.height="353mm"
              })
              cont.style.width="250mm"
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




