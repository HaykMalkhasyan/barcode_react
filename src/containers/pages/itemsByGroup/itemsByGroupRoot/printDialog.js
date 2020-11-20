import React, {useState, useEffect} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button"
import SnackbarMessage from "../../outlets/outlets/snackbar"
import SelectForAll from "../../income/addDocument/select"
import DatePicker from "../../../../components/datePicker/datePicker"
import { getFullDate } from '../../../../services/services';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';


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
    },
    titleButtons:{
        display:"flex",
        justifyContent:"space-evenly",
        alignItems:"center",
        width:"100%",
    }
  }));



export default function AlertDialog(props) {
  const {open, setOpen, gridApi, columnApi, } = props
  const classes = useStyles();
  const [checkeds, setCheckeds] = React.useState({});

  const handleChange = (event) => {
    setCheckeds({ ...checkeds, [event.target.name]: event.target.checked });
  };



  const [columns, setColumns] = useState([])
  const [success, setSuccess] = useState({})
  const [selected, setSelected] = useState(null)

  

  useEffect(() => {
    columnApi && console.log('props.document', columnApi.getAllColumns())
    columnApi && setColumns(columnApi.getAllColumns())
}, [columnApi])



  const handleConfirm = () => {
      console.log('checkeds', checkeds)
      console.log('columns', columns)
      let columnsToHide = columns.filter(item=>!checkeds[item.colDef.field] )
      console.log('columnsToHide', columnsToHide)
      setOpen(false)
      columnApi.setColumnsVisible(columnsToHide, false)
    //   setTimeout(()=>{
          props.setExportStatus && props.setExportStatus({bool:true, type:"print"});
          console.log('printing')
    //   },1000)
      return
  }


  

  return (
    <div>
      <SnackbarMessage open={success} setOpen={setSuccess} />
      <Dialog
        open={open}
        onClose={()=>{setOpen(false)}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{
          root: props.root
        }}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle id="alert-dialog-title">
        <div className={classes.title}>
            <span style={{whiteSpace:"nowrap"}} >Ընտրեք տպելու սյուները</span>
                <div className={classes.titleButtons}>
                    <Button
                        onClick={()=>{
                            selected !==1 && setSelected(1); 
                            let state = localStorage.getItem(`itemsByGroupSelectedsForPrint_${1}`)
                            if(state){
                                setCheckeds(JSON.parse(state))
                            }else{
                                setCheckeds({})
                            }
                        }}
                    style={ selected===1 ? {backgroundColor:"#aaa", color:"white"} : {}}
                        variant="contained"
                        color="inherit"
                        size="small"
                    >
                        Տարբերակ 1
                    </Button>
                    <Button
                        onClick={()=>{
                            selected !==2 && setSelected(2)
                            let state = localStorage.getItem(`itemsByGroupSelectedsForPrint_${2}`)
                            if(state){
                                setCheckeds(JSON.parse(state))
                            }else{
                                setCheckeds({})
                            }
                        }}
                    style={ selected===2 ? {backgroundColor:"#aaa", color:"white"} : {}}
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
            </div>
        </DialogTitle>
        <DialogContent>
        <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Սյուներ</FormLabel>
        <FormGroup className={classes.checkboxes}>
            {columns.map(item=>{
                if(item.colDef.field){return <FormControlLabel
                key={item.colDef.field}
                className={classes.checkbox}
                control={<Checkbox 
                    color="primary" 
                    checked={!!checkeds[item.colDef.field]} 
                    disabled={item.colDef.field==="ԱՊՄ" || item.colDef.field==="#"} 
                    onChange={handleChange} 
                    name={item.colDef.field} 
                    />}
                label={item.colDef.field}
              />}else{
                  return null
              }
            })}
        </FormGroup>
        </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            variant="outlined"
            onClick={handleConfirm}
            fullWidth
            >
            Հաստատել
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
