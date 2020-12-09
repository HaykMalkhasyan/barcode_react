import React, {useState, useEffect, useRef} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button"
import SnackbarMessage from "../../../outlets/outlets/snackbar"
// import SelectForAll from "../../income/addDocument/select"
// import DatePicker from "../../../../components/datePicker/datePicker"
import { getFullDate } from '../../../../../services/services';
import { makeStyles } from '@material-ui/core/styles';
// import FormLabel from '@material-ui/core/FormLabel';
// import FormControl from '@material-ui/core/FormControl';
// import FormGroup from '@material-ui/core/FormGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import Checkbox from '@material-ui/core/Checkbox';
import PrintDialog from "./printDialog"
import Table from "../../../../../components/table/table"
import { useLocation } from 'react-router-dom';
import style from "./report.module.css"
import "./report.css"
// import StyleSheet from "../../../../../components/styleSheet/StyleSheet"
import ExcelLikeTable from "../../../../../components/excelLikeTable/excelLikeTableA4"
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import LoadingButton from '@material-ui/lab/LoadingButton';


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    formControl: {
      margin: theme.spacing(3),
      display:"flex"
    },
    checkboxes:{
        display:"flex",
        flexDirection:"row"
    },
    checkbox:{
        width:"calc(97% / 3)",
        padding:"10px 0px",
        borderBottom: "1px solid lightgray",
    },
    title:{
        display:"flex",
        justifyContent:"space-between",
        position:"relative",
    },
    titleButtons:{
        display:"flex",
        justifyContent:"flex-end",
        alignItems:"center",
        width:"100%",
    },
    closeButton:{
      position:"absolute",
      top:0,
      right:0
    }
  }));



export default function AlertDialog(props) {
    const location = useLocation()
  const {open, setOpen } = props
  const classes = useStyles();
  const [checkeds, setCheckeds] = React.useState({});
  const [exportStatus, setExportStatus] = useState({bool:false, type:null})
  const [printSize, setPrintSize] = useState({width:null, height:null})


  const handleChange = (event) => {
    setCheckeds({ ...checkeds, [event.target.name]: event.target.checked });
  };



  const [columns, setColumns] = useState([])
  const [openSelectColumnsDialog, setOpenSelectColumnsDialog] = useState(false)
  const [success, setSuccess] = useState({})
  const [selected, setSelected] = useState(null)


  ////////////////table state /////////////
  const [rowData, setRowData] = useState([]);
  const [gridApi, setGridApi] = useState(null)
  const [columnApi, setColumnApi] = useState(null)
  const [pending, setPending] = useState(false)
  const dpiRef = useRef()

  let columnDefinition=[
    {
        headerName: 'Մատակարարի Տվյալներ',
        headerClass: style.headerClass,
        children: [
            { headerName: 'asd', field: 'name', width:200, editable:true, cellStyle: {border: '1px solid lightgray', boxSizing:"border-box"}},
            { headerName: 'name', field: 'age', width:400, editable:true, cellStyle: {border: '1px solid lightgray', boxSizing:"border-box"}},
        ]
    },
];

  useEffect(() => {
    setRowData(props.rowData)
        // console.log('props.rowData', props.rowData)
  }, [props.rowData])



  const handleConfirm = () => {
    
    // let promise = new Promise(function(res, rej) {
    //   gridApi.sizeColumnsToFit()
    //   res();
    // })
    
    setPending(true)
    setTimeout(()=>{
      setExportStatus({
        bool:true, type:"print"
      })
    },100)
      // console.log('checkeds', checkeds)
      // console.log('columns', columns)
      // let columnsToHide = columns.filter(item=>!checkeds[item.colDef.field] )
      // console.log('columnsToHide', columnsToHide)
      // setOpen(false)
      // columnApi.setColumnsVisible(columnsToHide, false)
      //     props.setExportStatus && props.setExportStatus({bool:true, type:"print"});
      //     console.log('printing')
      return
  }


  // useEffect(()=>{
  //   dpiRef.current &&  console.log('dpiRef.current.offsetHeight', dpiRef.current.offsetHeight)
  // },[dpiRef.current])

  

  return (
    <div>
      <SnackbarMessage open={success} setOpen={setSuccess} />
      <PrintDialog
        open={openSelectColumnsDialog}
        setOpen={setOpenSelectColumnsDialog}
        gridApi={gridApi}
        columnApi={columnApi}
        id={props.id}
        exportStatus={exportStatus}
        setExportStatus={setExportStatus}
      /> 
      <Dialog
        open={open}
        onClose={()=>{setOpen(false)}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{
          root: props.root
        }}
        fullScreen
      >
        <DialogTitle id="alert-dialog-title"
          style={{padding:"0", background:"linear-gradient(180deg, #fff, rgba(0, 0, 0, 0.1) 106%)"}}
        >
         <div className={classes.title}>
            <span style={{whiteSpace:"nowrap"}} >Հաշվետվություն</span>
         <IconButton onClick={()=>{setOpen(false)}} className={classes.closeButton} >
              <CloseIcon />
           </IconButton>
                {/* <div className={classes.titleButtons}> */}
                    {/* <Button
                        onClick={()=>{
                            setOpenSelectColumnsDialog(true)
                        }}
                        variant="contained"
                        color="inherit"
                        size="small"
                    >
                        Սյուներ
                    </Button> */}
                
         {/* </div> */}
         </div>
                 {/*   <Button
                        onClick={()=>{
                            selected !==2 && setSelected(2)
                            let state = localStorage.getItem(`itemsByGroupSelectedsForPrint_${2}`)
                            if(state){
                                setCheckeds(JSON.parse(state))
                            }else{
                                setCheckeds({})
                            }
                        }}
                        variant="contained"
                        color="inherit"
                        size="small"
                    >
                        Տարբերակ 2
                    </Button>
                    <Button
                        onClick={()=>{
                            selected !==3 && setSelected(3)
                            let state = localStorage.getItem(`itemsByGroupSelectedsForPrint_${3}`)
                            if(state){
                                setCheckeds(JSON.parse(state))
                            }else{
                                setCheckeds({})
                            }
                        }}
                    style={ selected===3 ? {backgroundColor:"#aaa", color:"white"} : {}}
                        variant="contained"
                        color="inherit"
                        size="small"
                    >
                        Տարբերակ 3
                    </Button>
                    <Button
                        onClick={()=>{
                            selected && localStorage.setItem(`itemsByGroupSelectedsForPrint_${selected}`, JSON.stringify(checkeds))
                        }}
                        variant="contained"
                        color="primary"
                        size="small"
                    >
                        Պահպանել բոլորը
                    </Button>
                    <Button
                        onClick={()=>{
                            let fields = columns.reduce((total, item)=>{
                                if(item.colDef.field && item.colDef.field !== "ԱՊՄ"){
                                    return { ...total, [item.colDef.field]: true}
                                }else{
                                    return { ...total, [item.colDef.field]: false}
                                }
                            },{})
                            console.log('fields', fields)
                            setCheckeds(fields)
                        }}
                        style={{backgroundColor:"#95b75d", color:"white"}}
                        variant="contained"
                        color="inherit"
                        size="small"
                    >
                        Ընտրել բոլորը
                    </Button>
                </div>
            </div> */}
        </DialogTitle>
        <DialogContent >
          
      <div style={{position:"relative"}}>
      {/* <div style={{ position:"absolute", top:"82px", zIndex:"100", color:"blue", left:"210mm"}} >
            |
          </div>
          <div style={{ position:"absolute", top:"297mm", zIndex:"100", color:"blue", left:"53px"}} >
            _
          </div> */}
          {/* <div ref={dpiRef} style={{
            position:"absolute",
            height:"1in",
            top:"100px",
            backgroundColor:"red",
            // height:"100px",
            width:"1in",
            zIndex:"100"
          }} >
            asd
          </div> */}
          {/* {console.log('rowData', rowData)} */}
          
        <ExcelLikeTable 
          setPrintSize={setPrintSize}
          setPending={setPending}
          exportStatus={exportStatus}
          setExportStatus={setExportStatus}
          height={printSize.height ? printSize.height : "100%"} 
          // height={"210mm"} 
          setGridApi={setGridApi}
          width={printSize.width }
          mode={null} 
          rowData={props.rowData} 
          pagination={"true"} 
          id={props.id}
        />
            <LoadingButton  
                pending={pending}
                pendingPosition="center"
                disabled={pending}
                // color="primary"
                variant="contained"
                style={{backgroundColor:"#95b75d", color:"#fff", position:"fixed", bottom:"15px", right:"15px"}}
                // color="primary"
                // variant="outlined"
                onClick={handleConfirm}
            >
                {pending ? 
                <span style={{width:"78px", height:"24px"}} >
                  
                </span>
                 : 
                <span style={{width:"78px", height:"24px"}} >
                Հաստատել
                </span>
                }
            </LoadingButton>
      {/* { !!rowData && !!rowData.length && <Table
            width="602px"
            height={450}
            mode="print"
            pagination={"false"}
            headerHeight={0}
            groupHeaderHeight={47}
            exportStatus={exportStatus}
            setExportStatus={setExportStatus}
            setGridApi={setGridApi}
            setColumnApi={setColumnApi}
            columnDefinition={columnDefinition}
            rowData={[{},{},{},{},{},{}]}
            settings={""}
        />} */}
        </div>

        {/* { !!rowData && !!rowData.length && <Table
          exportStatus={exportStatus}
          setExportStatus={setExportStatus}
          setGridApi={setGridApi}
          setColumnApi={setColumnApi}
          rowData={rowData}
          settings={""}
        />} */}


{/* <div style={{ display: "flex", justifyContent: "space-between" }} >
      <table style={{borderSpacing: "2px 20px"}} >
        <tr style={{lineHeight:"20px"}} >
          <th style={{ width: "200px" }}>Հանձնեց՝</th>
          <th style={{ width: "400px", position:"relative", borderBottom: "1px solid black" }}><span style={{
                position: "absolute",
                left: "35%",
                top: "100%",
                fontSize: "10px"
          }} > Ստորագրություն </span></th>
          <th style={{width:"20px"}}>/</th>
          <th style={{ width: "800px",position:"relative", borderBottom: "1px solid black" }}>
          <span style={{
                position: "absolute",
                left: "46%",
                top: "100%",
                fontSize: "10px"
          }} > Անուն/Ազգանուն </span>
          </th>
        </tr>
        <tr>
          <th style={{ width: "200px" }}>Ընդունեց՝</th>
          <th style={{ width: "400px", position:"relative", borderBottom: "1px solid black" }}>
          <span style={{
                position: "absolute",
                left: "35%",
                top: "100%",
                fontSize: "10px"
          }} > Ստորագրություն </span>
          </th>
          <th style={{width:"20px"}}>/</th>
          <th style={{ width: "800px",position:"relative", borderBottom: "1px solid black" }}>
          <span style={{
                position: "absolute",
                left: "46%",
                top: "100%",
                fontSize: "10px"
          }} > Անուն/Ազգանուն </span>
          </th>
        </tr>
      </table>
    </div> */}
        </DialogContent>
        {/* <DialogActions>
          
        </DialogActions> */}
      </Dialog>
    </div>
  );
}
