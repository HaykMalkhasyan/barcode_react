import React, { useState, useEffect, useRef } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import ToggleButton from "@material-ui/lab/ToggleButton";
import FormatColorFillIcon from "@material-ui/icons/FormatColorFill";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import FormatColorTextIcon from "@material-ui/icons/FormatColorText";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import InputAdornment from "@material-ui/core/InputAdornment";

import { SketchPicker } from "react-color";
import { TextField } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';

const useStyles = makeStyles({
    root: {
      width: 200,
    },
  });

export default function PopoverPopupState(props) {
const {
  top, setTop ,left, setLeft ,right, setRight ,bottom, setBottom
} = props
  const [mode, setMode] = useState("inputs")
  const classes = useStyles();

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }
  const topPrevious = usePrevious(top)
  const leftPrevious = usePrevious(left)
  const rightPrevious = usePrevious(right)
  const bottomPrevious = usePrevious(bottom)


   useEffect(()=>{
     if(props.gridApi){
      if(topPrevious!==top){
        console.log('top Changed', top)
        handleChange(top, null,"top");
      } else if(leftPrevious!==left){
        console.log('left Changed', left)
        handleChange(left, null,"left");
      }else if(rightPrevious!==right){
        handleChange(right, null,"right");
      }else if(bottomPrevious!==bottom){
        console.log('bottom Changed', bottom)
        handleChange(bottom, null,"bottom");
      }
}
   },[top, left, right, bottom, props.gridApi])
  

  const handleChange = (val, newVal, side) => {
    if(+val!==+val){
        return
    }
    if(!val){
        val=newVal
    }
    const el = document.getElementById("paperRef");
    const allCells = document.getElementsByClassName(
      "ag-center-cols-container"
    )[1];
    console.log('allCells', allCells)
    // const right = document.getElementById("printMarginRight")
    // const left = document.getElementById("printMarginLeft")
    // const top = document.getElementById("printMarginTop")
    // const bottom = document.getElementById("printMarginBottom")
    // console.log('right left top bottom', right, left, top, bottom)
    let colDefs = props.gridApi.getColumnDefs();

    switch (side) {
      case "top":
        setTop(val);
        allCells.style.margin = `${val}px ${right}px ${bottom}px ${left}px`;
        Array.from(document.getElementsByClassName("printMarginTop")).forEach(item=>{
          item.style.height = `${val}px`
        })
        break;
      case "bottom":
        setBottom(val);
        allCells.style.margin = `${top}px ${right}px ${val}px ${left}px`;
        Array.from(document.getElementsByClassName("printMarginBottom")).forEach(item=>{
          item.style.height = `${val}px`
        })
        break;
      case "left":
        let el = document.getElementsByClassName(
          "ag-header ag-focus-managed ag-pivot-off"
        )[1];
        
        colDefs.forEach((item, i) => {
          if (i === 0) {
            item.cellStyle = function (params) {
              console.log('val', val)
              let obj = {};
              if (i === 0) {
                return Object.assign(obj, {
                  backgroundColor: "#fff",
                  lineHeight: "14px !important",
                  left: `-${+val + 10}px`,
                  textAlign: "right",
                  padding: "0",
                  borderRight: "1px solid gray",
                  borderBottom: "1px solid gray",
                });
              }
              return Object.assign(obj, {
                border: "1px solid #d3d3d34d",
                lineHeight: "14px !important",
                zIndex: "2 !important",
              });
            };
          }
        });
        props.gridApi.setColumnDefs(colDefs);
        setLeft(val);
        allCells.style.margin = `${top}px ${right}px ${bottom}px ${val}px`;
        Array.from(document.getElementsByClassName("printMarginLeft")).forEach(item=>{
          item.style.width = `${val}px`
        })
        el.style.margin = `0px 0px 13px ${+val - 25}px`;
        break;
      case "right":
        setRight(val);
        Array.from(document.getElementsByClassName("printMarginRight")).forEach(item=>{
          item.style.width = `${val}px`
        })
        allCells.style.margin = `${top}px ${val}px ${bottom}px ${left}px`;
        break;

      default:
        break;
    }

    console.log("el", el);
  };

  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <ToggleButton
            {...bindTrigger(popupState)}
            value="color"
            aria-label="color"
          >
            Margins
            <ArrowDropDownIcon
              style={popupState.isOpen ? { transform: "rotate(180deg)" } : {}}
            />
          </ToggleButton>

          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            {mode === "inputs" ? (
              <div>
                {" "}
                <Box p={1}>
                  <TextField
                    variant="outlined"
                    label="Top"
                    size="small"
                    value={top}
                    onChange={(e) => {
                      handleChange(e.target.value, null,"top");
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">px</InputAdornment>
                      ),
                    }}
                  />
                </Box>
                <Box p={1}>
                  <TextField
                    variant="outlined"
                    label="Right"
                    size="small"
                    value={right}
                    onChange={(e) => {
                      handleChange(e.target.value, null,"right");
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">px</InputAdornment>
                      ),
                    }}
                  />
                </Box>
                <Box p={1}>
                  <TextField
                    variant="outlined"
                    label="Bottom"
                    size="small"
                    value={bottom}
                    onChange={(e) => {
                      handleChange(e.target.value, null,"bottom");
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">px</InputAdornment>
                      ),
                    }}
                  />
                </Box>
                <Box p={1}>
                  <TextField
                    variant="outlined"
                    label="Left"
                    size="small"
                    value={left}
                    onChange={(e) => {
                      handleChange(e.target.value, null,"left");
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">px</InputAdornment>
                      ),
                    }}
                  />
                </Box>
                <Box p={1}>values from 0 to 200</Box>
              </div>
            ) : (
              <div className={classes.root} >
                <Typography id="continuous-slider" gutterBottom>
                  Top
                </Typography>
                <Grid container spacing={2}>
                  <Grid item>
                    {/* <VolumeDown /> */}
                  </Grid>
                  <Grid item xs>
                    <Slider
                      value={top}
                      onChange={(e)=>{handleChange(e.target.value, 10, "top")}}
                      aria-labelledby="continuous-slider"
                    />
                  </Grid>
                  <Grid item>
                    {/* <VolumeUp /> */}
                  </Grid>
                </Grid>
              </div>
            )}
          </Popover>
        </div>
      )}
    </PopupState>
  );
}
