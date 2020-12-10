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
        console.log('size', event.target.value)
        switch (event.target.value) {
            case "A4":
              props.setPaperHeight(39);
              
              if(width>height){
                // setTimeout(()=>{
                  Array.from(paper).forEach(item=>{
                    item.style.width="297mm"
                    item.style.height="210mm"
                  })
                  cont.style.width="297mm"
                // },50)
                break;
              }
              props.setPaperHeight(55);
              // setTimeout(()=>{
                Array.from(paper).forEach(item=>{
                  item.style.width="210mm"
                  item.style.height="297mm"
                })
                cont.style.width="210mm"
              // },50)
                break;
            case "B4":
              if(width>height){
                props.setPaperHeight(50);
                // setTimeout(()=>{
                    Array.from(paper).forEach(item=>{
                      item.style.width="353mm"
                      item.style.height="250mm"
                    })
                  cont.style.width="353mm"
                // },50)
                break;
              }
              props.setPaperHeight(6);
              // setTimeout(()=>{
                Array.from(paper).forEach(item=>{
                  item.style.width="250mm"
                  item.style.height="353mm"
                })
                cont.style.width="250mm"
              // },50)
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




