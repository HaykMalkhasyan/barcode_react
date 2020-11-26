import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import FormatColorFillIcon from '@material-ui/icons/FormatColorFill';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { Button } from '@material-ui/core';
import ColorPicker from "./colorPicker"
import FontSizePicker from "./fontSizePicker"
import FontFamilyPicker from "./fontFamilyPicker"


const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    border: `1px solid ${theme.palette.divider}`,
    flexWrap: 'wrap',
  },
  divider: {
    margin: theme.spacing(1, 0.5),
  },
}));

const StyledToggleButtonGroup = withStyles((theme) => ({
  grouped: {
    margin: theme.spacing(0.5),
    border: 'none',
    '&:not(:first-child)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-child': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}))(ToggleButtonGroup);

export default function CustomizedDividers(props) {

  const {selectedRangeCellsHeader} = props;


  const [alignment, setAlignment] = React.useState(null);
  const [formats, setFormats] = React.useState(() => []);
  const [selecteds, setSelecteds] = useState([])
  const [backgroundColor, setBackgroundColor] = useState()
  const [color, setColor] = useState()
  const [fontSize, setFontSize] = useState()
  const [fontFamily, setFontFamily] = useState()

  const [selectedCells, setSelectedCells] = useState()
  const [openColor, setOpenColor] = useState(false)
  const [openColorFont, setOpenColorFont] = useState(false)


  const [alignmentCopy, setAlignmentCopy] = React.useState(null);
  const [formatsCopy, setFormatsCopy] = React.useState(() => []);
  const [backgroundColorCopy, setBackgroundColorCopy] = useState()
  const [colorCopy, setColorCopy] = useState()
  const [fontSizeCopy, setFontSizeCopy] = useState()
  const [fontFamilyCopy, setFontFamilyCopy] = useState()

  const [readFromParent, setReadFromParent] = useState(false)

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
    readFromParent && setReadFromParent(false)
  };

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
    readFromParent && setReadFromParent(false)
  };

//   backgroundColor: "#473838 !important"
// color: "undefined !important"
// fontStyle: "normal"
// fontWeight: "bold"
// textAlign: null
// textDecoration: "none"

  useEffect(()=>{
    setReadFromParent(true)
    if(selectedRangeCellsHeader && selecteds.hasOwnProperty(selectedRangeCellsHeader.col) && selecteds[selectedRangeCellsHeader.col].hasOwnProperty(selectedRangeCellsHeader.row+1)){
      // console.log('selectedRangeCellsHeader', selectedRangeCellsHeader)
      // console.log('selecteds', selecteds[selectedRangeCellsHeader.col][selectedRangeCellsHeader.row+1])
      let style = selecteds[selectedRangeCellsHeader.col][selectedRangeCellsHeader.row+1]
      setAlignmentCopy(style.textAlign)
      setBackgroundColorCopy(style.backgroundColor.split(" ")[0])
      setFormatsCopy([style.fontStyle, style.fontWeight, style.textDecoration==="underline" ? "underlined" : "none",])
      setColorCopy(style.color.split(" ")[0])
      setFontSizeCopy(style.fontSize)
      setFontFamilyCopy(style.fontFamily)
    }else{
      setAlignmentCopy(null)
      setBackgroundColorCopy()
      setColorCopy()
      setFormatsCopy([])
      setFontSizeCopy()
      setFontFamilyCopy()
    }
  },[props.selectedRangeCellsHeader])


  useEffect(()=>{
    if(props.gridApi){
      let editings = props.gridApi.getEditingCells()
      if(editings.length){
        return
      }
        let selected = props.gridApi.getCellRanges()
        setSelectedCells(selected)

        let selectedFormateds = {}
        selected.forEach(itemN=>{
            
                let startRowIndex = itemN.startRow.rowIndex +1
                let endRowIndex = itemN.endRow.rowIndex +1
                let columns = itemN.columns.map(x=>x.colDef.field)
                columns.forEach(col=>{
                    Object.assign(selectedFormateds, {
                        [col]: getObjects(selecteds[col], startRowIndex, endRowIndex, { 
                          textAlign: alignment, 
                          fontStyle: formats.includes("italic") ? "italic" : "normal",
                          fontWeight: formats.includes("bold") ? "bold" : "normal",
                          textDecoration: formats.includes("underlined") ? "underline" : "none",
                          backgroundColor: `${backgroundColor} !important`,
                          color: `${color} !important`,
                          fontSize: fontSize,
                          fontFamily: fontFamily,
                      })
                    })
                    // selectedFormateds.push(
                    //     {
                    //         [`${col}_${startRowIndex}-${endRowIndex}`]:{ 
                    //             textAlign: alignment, 
                    //             fontStyle: formats.includes("italic") ? "italic" : "normal",
                    //             fontWeight: formats.includes("bold") ? "bold" : "normal",
                    //             textDecoration: formats.includes("underlined") ? "underline" : "none",
                    //         }
                    //     }
                    //     )

                })
           
        })

        setSelecteds(Object.assign({}, selecteds, selectedFormateds))
        // props.gridApi.setColumnDefs([])

        // colDefs[1].cellStyle = function(){
        //     return {border: "1px solid red" }
        // }
        // props.gridApi.setColumnDefs(colDefs)
        
        // console.log('props.gridApi.getRowNode()')
        // let row = props.gridApi.getRowNode(selecteds[0].startRow.rowIndex)
        // props.gridApi.forEachNode(()=>{addStyle(row, 0)})
    }
  },[alignment, formats, backgroundColor, color, fontSize, fontFamily])


  function getObjects(res = {}, start, end, style){
     for(let i=start; i<=end; i++){
       Object.assign(res, {[i]:style})
     }
     return res
  }

  useEffect(()=>{
      if(props.gridApi){

    // let keys = Object.keys(selecteds)
    // let pairs=[];
    // keys.forEach(item=>{
    //     let splitted = item.split("_");
    //     let start = splitted[1].split("-");
    //     let end = start[1]
    //     start = start[0]
    //     pairs.push({[splitted[0]]: getObjects(start, end)})
    //     // startEndRow = splitted[1]

    // })
    let colDefs = props.gridApi.getColumnDefs()
    let selected = Object.assign({}, props.gridApi.getCellRanges())
    if(!selected[0]){
        return
    }
    props.gridApi.setColumnDefs([])
    // console.log('pairs', pairs)
    // console.log('selecteds', selecteds)
    colDefs.forEach(item=>{
        if(selecteds.hasOwnProperty(item.field)){
            item.cellStyle = function(params){
                if(selecteds[item.field].hasOwnProperty(params.data["/"])){
                  return selecteds[item.field][params.data["/"]]
                }
            }
            // if(pairs.includes(pairs[index].col, index+1)){
            //     pairs.splice(index,1)
            // }
        }
    })
        // colDefs[1].cellStyle = function(){
        //     return {border: "1px solid red" }
        // }

            props.gridApi.setColumnDefs(colDefs)
            let obj = {
                rowStartIndex: selected[0].startRow.rowIndex,
                rowEndIndex: selected[0].endRow.rowIndex,
                columnStart: selected[0].columns[0].colDef.field,
                columnEnd: selected[0].columns[selected[0].columns.length-1].colDef.field,
            }
            props.gridApi.addCellRange(obj)
            console.log('selected[0]', selected[0])
            // props.gridApi.getRowNode(selected[0].endRow.rowIndex)
            console.log('props.gridApi.getRowNode(selected[0].endRow.rowIndex)',props.gridApi.getRowNode(selected[0].endRow.rowIndex))
            props.gridApi.ensureNodeVisible(props.gridApi.getRowNode(selected[0].endRow.rowIndex))
        
        // props.gridApi.setColumnDefs(colDefs)
        // console.log('selectedCells', selectedCells)
        // console.log('selected', selected)
        // setTimeout(() => {
        // }, 1);
      }

  },[selecteds])


 

  const classes = useStyles();

  return (
    <div>
        
      <Paper elevation={0} className={classes.paper}>
        <StyledToggleButtonGroup
          size="small"
          value={readFromParent ? alignmentCopy : alignment}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
        >
          <ToggleButton value="left" aria-label="left aligned">
            <FormatAlignLeftIcon />
          </ToggleButton>
          <ToggleButton value="center" aria-label="centered">
            <FormatAlignCenterIcon />
          </ToggleButton>
          <ToggleButton value="right" aria-label="right aligned">
            <FormatAlignRightIcon />
          </ToggleButton>
          {/* <ToggleButton value="justify" aria-label="justified" disabled>
            <FormatAlignJustifyIcon />
          </ToggleButton> */}
        </StyledToggleButtonGroup>
        <Divider flexItem orientation="vertical" className={classes.divider} />
        <StyledToggleButtonGroup
          size="small"
          value={readFromParent ? formatsCopy : formats}
          onChange={handleFormat}
          aria-label="text formatting"
        >
          <ToggleButton value="bold" aria-label="bold">
            <FormatBoldIcon />
          </ToggleButton>
          <ToggleButton value="italic" aria-label="italic">
            <FormatItalicIcon />
          </ToggleButton>
          <ToggleButton value="underlined" aria-label="underlined">
            <FormatUnderlinedIcon />
          </ToggleButton>
          
        </StyledToggleButtonGroup>
          <ColorPicker
            open={openColor}
            setOpen={setOpenColor}
            setColor={setBackgroundColor}
            setReadFromParent={setReadFromParent}
            readFromParent={readFromParent}
            color={readFromParent ? backgroundColorCopy : backgroundColor}
          />
           <ColorPicker
           type="font"
            open={openColorFont}
            setOpen={setOpenColorFont}
            setColor={setColor}
            setReadFromParent={setReadFromParent}
            readFromParent={readFromParent}
            color={readFromParent ? colorCopy : color}
          />
          <FontSizePicker
            setReadFromParent={setReadFromParent}
            setFontSize={setFontSize}
            fontSize={readFromParent ? fontSizeCopy : fontSize }
          />
           <FontFamilyPicker
            setReadFromParent={setReadFromParent}
            setFontFamily={setFontFamily}
            fontFamily={readFromParent ? fontFamilyCopy : fontFamily }
          />

      </Paper>
    </div>
  );
}
