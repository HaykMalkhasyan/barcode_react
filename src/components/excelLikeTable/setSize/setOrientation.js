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

  const { gridApi ,setPaperHeight, setPaperWidth} = props

  const [value, setValue] = React.useState("Potrait");




  const handleChange = (event) => {
        setValue(event.target.value);
        let paper = document.getElementsByClassName("paperRef")
        let cont = document.getElementById("tableRef")
        let width = paper[0].style.width
        let height = paper[0].style.height
        // console.log('orientation', event.target.value)
        // console.log('height', height)
        height==="210mm" ? props.setPaperHeight(39) : height==="250mm" ? props.setPaperHeight(46) : height==="297mm" ? props.setPaperHeight(55) : height==="353mm" ? props.setPaperHeight(65) : props.setPaperHeight(50);
        switch (event.target.value) {
          case "Landscape":
            if(width<height){
              // props.setPaperHeight(Math.random())
              // setTimeout(()=>{
                Array.from(paper).forEach(item=>{
                    item.style.width = height
                    item.style.height = width
                  })
                  cont.style.width=height
              // },50)  
            }
            break;
            case "Potrait":
              if(width>height){
                // props.setPaperHeight(Math.random())
              
                // setTimeout(()=>{
                  Array.from(paper).forEach(item=>{
                    item.style.width = height
                    item.style.height = width
                  })
                  cont.style.width=height
                // },50)
              }
              break;
          default:
            break;
        }
        
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




