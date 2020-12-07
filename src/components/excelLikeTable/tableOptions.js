import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import FormatAlignLeftIcon from "@material-ui/icons/FormatAlignLeft";
import FormatAlignCenterIcon from "@material-ui/icons/FormatAlignCenter";
import FormatAlignRightIcon from "@material-ui/icons/FormatAlignRight";
import FormatAlignJustifyIcon from "@material-ui/icons/FormatAlignJustify";
import FormatBoldIcon from "@material-ui/icons/FormatBold";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined";
import FormatColorFillIcon from "@material-ui/icons/FormatColorFill";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { Button } from "@material-ui/core";
import ColorPicker from "./colorPicker";
import FontSizePicker from "./font/fontSizePicker";
import FontFamilyPicker from "./font/fontFamilyPicker";
import BorderStyle from "./border/borderStyle";
import TableFunctions from "./tableFunctions/tableFunctions";
import VerticalAlignBottomIcon from "@material-ui/icons/VerticalAlignBottom";
import VerticalAlignCenterIcon from "@material-ui/icons/VerticalAlignCenter";
import VerticalAlignTopIcon from "@material-ui/icons/VerticalAlignTop";
import SizePicker from "./setSize/setSize"
import MarginsControl from "./margins/marginsControl"

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    border: `1px solid ${theme.palette.divider}`,
    flexWrap: "wrap",
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

export default function CustomizedDividers(props) {
  const { 
    selectedRangeCellsHeader, 
    functionalCells, 
    setFunctionalCells, 
    selecteds, 
    setSelecteds, 
    allExpandedCells, 
    paperHeight, 
    setPaperHeight, 
    paperWidth, 
    setPaperWidth } = props;


  const [alignment, setAlignment] = React.useState(null);
  const [verticalAlignment, setVerticalAlignment] = React.useState(null);
  const [formats, setFormats] = React.useState(() => []);
  const [backgroundColor, setBackgroundColor] = useState();
  const [color, setColor] = useState();
  const [fontSize, setFontSize] = useState();
  const [fontFamily, setFontFamily] = useState();
  const [border, setBorder] = useState();
  const [borderColor, setBorderColor] = useState();
  const [borderLineType, setBorderLineType] = useState();
  const [selectedFunction, setSelectedFunction] = useState(null);

  const [openColor, setOpenColor] = useState(false);
  const [openColorFont, setOpenColorFont] = useState(false);
  const [openBorder, setOpenBorder] = useState(false);
  const [size, setSize] = useState("work")

  const [selectedCells, setSelectedCells] = useState();

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
    handleChangeStyle(undefined, newFormats);
  };

  const handleBorder = (event, newBorder) => {
    setBorder(newBorder);
    handleChangeStyle(
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      newBorder
    );
  };

  const handleLineType = (event, newBorderLineType) => {
    setBorderLineType(newBorderLineType);
    handleChangeStyle(
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      newBorderLineType
    );
  };

  const handleBorderColor = (event, newBorderColor) => {
    setBorderColor(newBorderColor);
    handleChangeStyle(
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      newBorderColor
    );
  };

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
    handleChangeStyle(newAlignment);
  };

  const handleVerticalAlignment = (event, newAlignment) => {
    setVerticalAlignment(newAlignment);
    handleChangeStyle(
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      newAlignment
    );
  };

  function handleChangeFunction(func){
    let selectedCell = props.gridApi.getCellRanges()
    if(!func){
      props.gridApi.startEditingCell({
        rowIndex: selectedCell[0].startRow.rowIndex,
        colKey: selectedCell[0].startColumn.colDef.field,
        keyPress: 46
    });
    let indexF = functionalCells.findIndex(item=>item.rowIndex===selectedCell[0].startRow.rowIndex && item.colKey===selectedCell[0].startColumn.colDef.field)
    if(indexF!==-1){
      let clone = JSON.parse(JSON.stringify(functionalCells))
      clone.splice(indexF,1)
      setFunctionalCells(clone)
    }
    return
    // props.gridApi.stopEditing(true)
    }
    props.gridApi.startEditingCell({
      rowIndex: selectedCell[0].startRow.rowIndex,
      colKey: selectedCell[0].startColumn.colDef.field,
      charPress: func ? `=${func}(An:An+1)` : undefined,
  });
        setFunctionalCells([...functionalCells, {rowIndex: selectedCell[0].startRow.rowIndex, colKey: selectedCell[0].startColumn.colDef.field, func:func}])
  }


  useEffect(() => {
    if(selectedRangeCellsHeader){
      let index = functionalCells.findIndex(x=>x.colKey===selectedRangeCellsHeader.col && x.rowIndex===selectedRangeCellsHeader.row)
      if(index!==-1){
        setSelectedFunction(functionalCells[index].func)
      }else{
        setSelectedFunction()
      }
      
    }
    if (
      selectedRangeCellsHeader &&
      selecteds.hasOwnProperty(selectedRangeCellsHeader.col) &&
      selecteds[selectedRangeCellsHeader.col].hasOwnProperty(
        selectedRangeCellsHeader.row + 1
      )
    ) {
      // console.log('selectedRangeCellsHeader', selectedRangeCellsHeader)
      console.log('selecteds', selecteds)

      let style =
        selecteds[selectedRangeCellsHeader.col][
          selectedRangeCellsHeader.row + 1
        ];
      let borderStyle;
      let borderLineType;

      let align = style.justifyContent;
      switch (align) {
        case "flex-start":
          align = "left";
          break;
        case "center":
          align = "center";
          break;
        case "flex-end":
          align = "right";
          break;
        default:
          align = "left";
          break;
      }
      let verticalAlign = style.alignItems;
      switch (verticalAlign) {
        case "flex-start":
          verticalAlign = "top";
          break;
        case "center":
          verticalAlign = "center";
          break;
        case "flex-end":
          verticalAlign = "bottom";
          break;
        default:
          verticalAlign = "top";
          break;
      }

      // let modes = ["all", "right", "left", "top",]
      // let index = modes.indexOf()
      let borderColor;
      if (style.hasOwnProperty("border")) {
        borderStyle = "all";
        borderColor = style.border.split(" ")[2];
        borderLineType = style.border.split(" ")[1];
      } else if (style.hasOwnProperty("borderRight")) {
        borderStyle = "right";
        borderColor = style.borderRight.split(" ")[2];
        borderLineType = style.borderRight.split(" ")[1];
      } else if (style.hasOwnProperty("borderLeft")) {
        borderStyle = "left";
        borderColor = style.borderLeft.split(" ")[2];
        borderLineType = style.borderLeft.split(" ")[1];
      } else if (style.hasOwnProperty("borderTop")) {
        borderStyle = "top";
        borderColor = style.borderTop.split(" ")[2];
        borderLineType = style.borderTop.split(" ")[1];
      } else if (style.hasOwnProperty("borderBottom")) {
        borderStyle = "bottom";
        borderColor = style.borderBottom.split(" ")[2];
        borderLineType = style.borderBottom.split(" ")[1];
      }

      setAlignment(align);
      setVerticalAlignment(verticalAlign);
      setBackgroundColor(style.backgroundColor.split(" ")[0]);
      setFormats([
        style.fontStyle,
        style.fontWeight,
        style.textDecoration === "underline" ? "underlined" : "none",
      ]);
      setColor(style.color.split(" ")[0]);
      setFontSize(style.fontSize ? style.fontSize : "14px");
      setFontFamily(style.fontFamily ? style.fontFamily : "Segoe UI");
      setBorder(borderStyle);
      setBorderColor(borderColor);
      setBorderLineType(borderLineType);
    } else {
      setVerticalAlignment(null);
      setAlignment(null);
      setBackgroundColor();
      setColor();
      setFormats([]);
      setFontSize();
      setFontFamily();
      setBorder();
      setBorderColor();
      setBorderLineType();
    }

    


  }, [props.selectedRangeCellsHeader]);

  function handleChangeStyle(
    alignmentC,
    formatsC,
    backgroundColorC,
    colorC,
    fontSizeC,
    fontFamilyC = "Arial",
    borderC,
    borderLineTypeC,
    borderColorC,
    verticalAlignmentC
  ) {
    if (props.gridApi) {
      verticalAlignmentC = verticalAlignmentC
        ? verticalAlignmentC
        : verticalAlignment
        ? verticalAlignment
        : "center";
      alignmentC = alignmentC ? alignmentC : alignment ? alignment : "left";
      formatsC = formatsC ? formatsC : formats;
      backgroundColorC = backgroundColorC ? backgroundColorC : backgroundColor;
      colorC = colorC ? colorC : color;
      fontSizeC = fontSizeC ? fontSizeC : fontSize;
      fontFamilyC = fontFamilyC ? fontFamilyC : fontFamily;
      borderC = borderC ? borderC : border;
      borderLineTypeC = borderLineTypeC
        ? borderLineTypeC
        : borderLineType
        ? borderLineType
        : "solid";
      borderColorC = borderColorC
        ? borderColorC
        : borderColor
        ? borderColor
        : "#00000";
      let borderStyle;
      console.log("borderC", borderC);
      switch (borderC) {
        case "bottom":
          borderStyle = {
            borderBottom: `1px ${borderLineTypeC} ${borderColorC}`,
          };
          break;
        case "top":
          borderStyle = { borderTop: `1px ${borderLineTypeC} ${borderColorC}` };
          break;
        case "left":
          borderStyle = {
            borderLeft: `1px ${borderLineTypeC} ${borderColorC}`,
          };
          break;
        case "right":
          borderStyle = {
            borderRight: `1px ${borderLineTypeC} ${borderColorC}`,
          };
          break;
        case "all":
          borderStyle = { border: `1px ${borderLineTypeC} ${borderColorC}` };
          break;
        case "clear":
          borderStyle = {};
          break;

        default:
          break;
      }

      let align = { display: "flex" };
      switch (alignmentC) {
        case "left":
          align = { ...align, justifyContent: `flex-start` };
          break;
        case "center":
          align = { ...align, justifyContent: `center` };
          break;
        case "right":
          align = { ...align, justifyContent: `flex-end` };
          break;
        default:
          break;
      }

      switch (verticalAlignmentC) {
        case "top":
          align = { ...align, alignItems: `flex-start`};
          break;
        case "center":
          align = { ...align, alignItems: `center` };
          break;
        case "bottom":
          align = { ...align, alignItems: `flex-end` };
          break;
        default:
          break;
      }

      let editings = props.gridApi.getEditingCells();
      if (editings.length) {
        return;
      }
      let selected = props.gridApi.getCellRanges();
      // setSelectedCells(selected);

      let selectedFormateds = {};
      selected.forEach((itemN) => {
        let startRowIndex = itemN.startRow.rowIndex + 1;
        let endRowIndex = itemN.endRow.rowIndex + 1;
        let columns = itemN.columns.map((x) => x.colDef.field);
        columns.forEach((col, i) => {
          Object.assign(selectedFormateds, {
            [col]: getObjects(selecteds[col], startRowIndex, endRowIndex, 
              Object.assign({
                border: "1px solid #d3d3d34d",
                display:"flex",
                justifyContent:"flex-start",
                alignItems:"center",
                lineHeight:"14px !important",
                zindex: 2
              },
              {
                ...align,
                fontStyle: formatsC.includes("italic") ? "italic" : "normal",
                fontWeight: formatsC.includes("bold") ? "bold" : "normal",
                textDecoration: formatsC.includes("underlined")
                  ? "underline"
                  : "none",
                backgroundColor: `${backgroundColorC} !important`,
                color: `${colorC} !important`,
                fontSize: fontSizeC,
                fontFamily: fontFamilyC,
                ...borderStyle,
                zIndex:"2 !important",
                lineHeight:"14px !important"
              })),
          });
        });
      });

      setSelecteds(Object.assign({}, selecteds, selectedFormateds));
    }
  }

  function getObjects(res = {}, start, end, style) {
    for (let i = start; i <= end; i++) {
      Object.assign(res, { [i]: style });
    }
    return res;
  }

  useEffect(() => {
    if (props.gridApi && Object.keys(selecteds).length ) {
      console.log('selecteds', selecteds)
      let colDefs = props.gridApi.getColumnDefs();
      let selected = Object.assign({}, props.gridApi.getCellRanges());
      if (!selected[0]) {
        return;
      }
      props.gridApi.setColumnDefs([]);
      colDefs.forEach((item, i) => {
        if (selecteds.hasOwnProperty(item.field)) {
          let def = item.cellStyle
          
          item.cellStyle = function (params) {
            if (selecteds[item.field].hasOwnProperty(params.data["/"])) {
              // console.log('return selecteds[item.field][params.data["/"]];', selecteds[item.field][params.data["/"]])
              return selecteds[item.field][params.data["/"]];
            }
            else {
              let expandedIndex = allExpandedCells.findIndex(
                (x) => x.col === params.colDef.field && x.row === params.data["/"]
              );
              if (expandedIndex !== -1) {
                return {border: "1px solid #d3d3d34d", backgroundColor:"#fff", lineHeight:"14px !important"}
              }else{
                return {border: "1px solid #d3d3d34d", lineHeight:"14px !important"}
              }
            }
          };
        }
         
      });
      props.gridApi.setColumnDefs(colDefs);
      let obj = {
        rowStartIndex: selected[0].startRow.rowIndex,
        rowEndIndex: selected[0].endRow.rowIndex,
        columnStart: selected[0].columns[0].colDef.field,
        columnEnd:
          selected[0].columns[selected[0].columns.length - 1].colDef.field,
      };
      props.gridApi.addCellRange(obj);
      console.log("selected[0]", selected[0]);
      // props.gridApi.getRowNode(selected[0].endRow.rowIndex)
      console.log(
        "props.gridApi.getRowNode(selected[0].endRow.rowIndex)",
        props.gridApi.getRowNode(selected[0].endRow.rowIndex)
      );
      props.gridApi.ensureNodeVisible(
        props.gridApi.getRowNode(selected[0].endRow.rowIndex)
      );

      // props.gridApi.setColumnDefs(colDefs)
      // console.log('selectedCells', selectedCells)
      // console.log('selected', selected)
      // setTimeout(() => {
      // }, 1);
    }
  }, [selecteds, props.gridApi]);

  const classes = useStyles();

  return (
    <div>
      <Paper elevation={0} className={classes.paper}>
        <MarginsControl
        gridApi={props.gridApi}
        />
        <SizePicker
          setPrintSize={props.setPrintSize}
          gridApi={props.gridApi}
          setPaperHeight={setPaperHeight}
          setPaperWidth={setPaperWidth}

        />
        <TableFunctions
          selectedFunction={selectedFunction}
          setSelectedFunction={setSelectedFunction}
          handleChangeFunction={handleChangeFunction}
        />

        <StyledToggleButtonGroup
          size="small"
          value={alignment}
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
          value={verticalAlignment}
          exclusive
          onChange={handleVerticalAlignment}
          aria-label="text vertical alignment"
        >
          <ToggleButton value="bottom" aria-label="bottom aligned">
            <VerticalAlignBottomIcon />
          </ToggleButton>
          <ToggleButton value="center" aria-label="centeredVertical">
            <VerticalAlignCenterIcon />
          </ToggleButton>
          <ToggleButton value="top" aria-label="top aligned">
            <VerticalAlignTopIcon />
          </ToggleButton>
          {/* <ToggleButton value="justify" aria-label="justified" disabled>
            <FormatAlignJustifyIcon />
          </ToggleButton> */}
        </StyledToggleButtonGroup>

        <Divider flexItem orientation="vertical" className={classes.divider} />

        <StyledToggleButtonGroup
          size="small"
          value={formats}
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
        <Divider flexItem orientation="vertical" className={classes.divider} />
        <BorderStyle
          handleChangeStyle={handleChangeStyle}
          open={openBorder}
          setOpen={setOpenBorder}
          setBorder={setBorder}
          handleBorder={handleBorder}
          handleBorderColor={handleBorderColor}
          handleLineType={handleLineType}
          border={border}
          color={borderColor}
          setColor={setBorderColor}
          lineType={borderLineType}
          setLineType={setBorderLineType}
        />
        <ColorPicker
          handleChangeStyle={handleChangeStyle}
          open={openColor}
          setOpen={setOpenColor}
          setColor={setBackgroundColor}
          color={backgroundColor}
        />
        <ColorPicker
          handleChangeStyle={handleChangeStyle}
          type="font"
          open={openColorFont}
          setOpen={setOpenColorFont}
          setColor={setColor}
          color={color}
        />
        <FontSizePicker
          handleChangeStyle={handleChangeStyle}
          setFontSize={setFontSize}
          fontSize={fontSize}
        />
        <FontFamilyPicker
          handleChangeStyle={handleChangeStyle}
          setFontFamily={setFontFamily}
          fontFamily={fontFamily}
        />
      </Paper>
    </div>
  );
}
