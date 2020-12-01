import React, { useState, useEffect } from "react";
import Popover from "@material-ui/core/Popover";
import ToggleButton from "@material-ui/lab/ToggleButton";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import FormatColorFillIcon from "@material-ui/icons/FormatColorFill";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { Button } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import ColorPicker from "../colorPicker"
import LineStyleIcon from '@material-ui/icons/LineStyle';


import {CgBorderStyleDashed, CgBorderStyleDotted, CgBorderStyleSolid} from "react-icons/cg"

import BorderClearIcon from "@material-ui/icons/BorderClear";
import BorderBottomIcon from "@material-ui/icons/BorderBottom";
import BorderAllIcon from "@material-ui/icons/BorderAll";
import BorderHorizontalIcon from "@material-ui/icons/BorderHorizontal";
import BorderInnerIcon from "@material-ui/icons/BorderInner";
import BorderLeftIcon from "@material-ui/icons/BorderLeft";
import BorderOuterIcon from "@material-ui/icons/BorderOuter";
import BorderRightIcon from "@material-ui/icons/BorderRight";
import BorderTopIcon from "@material-ui/icons/BorderTop";
import BorderVerticalIcon from "@material-ui/icons/BorderVertical";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    border: `1px solid ${theme.palette.divider}`,
    flexWrap: "nowrap",
  },
  divider: {
    margin: theme.spacing(1, 0.5),
  },
}));

const StyledToggleButtonGroup = withStyles((theme) => ({
  grouped: {
    margin: theme.spacing(0.5),
    border: "none",
    "&:not(:first-child)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-child": {
      borderRadius: theme.shape.borderRadius,
    },
  },
}))(ToggleButtonGroup);

export default function PopoverPopupState(props) {
    const classes = useStyles();
  const [, setState] = useState();
  const [openColorBorder, setOpenColorBorder] = useState(false)
  const [color, setColor] = useState("#00000")

//   useEffect(() => {
//     setColor(props.color);
//   }, [props.color]);

  
//   useEffect(() => {
//     props.setColor(props.color);
//   }, [color]);

  const borderTypes = [
    { value: "solid", component: <CgBorderStyleSolid fontSize="40px" /> },
    { value: "dashed", component: <CgBorderStyleDashed fontSize="40px"  /> },
    { value: "dotted", component: <CgBorderStyleDotted fontSize="40px"  /> },
  ];

  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div >
          <ToggleButton
            {...bindTrigger(popupState)}
            value="color"
            aria-label="color"
          >
            <LineStyleIcon />
            <ArrowDropDownIcon
              style={popupState.isOpen ? { transform: "rotate(180deg)" } : {}}
            />
          </ToggleButton>

          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <StyledToggleButtonGroup
              size="small"
              exclusive
              value={props.lineType}
              onChange={props.handleLineType}
              aria-label="text formatting"
              style={{display:"flex", flexWrap:"nowrap" }}
            >
              {borderTypes.map((item) => {
                console.log('item', item)
                return (
                  <ToggleButton value={item.value} style={{margin:0}} aria-label={item.value}>
                    {item.component}
                  </ToggleButton>
                );
              })}
            </StyledToggleButtonGroup>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}
