import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import SnackbarMessage from "../../outlets/outlets/snackbar";
import { useHistory } from "react-router-dom";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import LocalAtmOutlinedIcon from "@material-ui/icons/LocalAtmOutlined";
import { Grid, IconButton, MenuItem, Select, TextareaAutosize } from "@material-ui/core";
import style from "./formulate.module.css";
import Axios from "axios"
import cookie from "../../../../services/cookies"
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import DatePicker from '../../../../components/datePicker/datePicker'
import CloseIcon from '@material-ui/icons/Close';

function RadioButtonsGroup(props) {

    const {paySize, setPaySize} = props
    

  const handleChange = (event) => {
      if(event.target.value === JSON.stringify({type:"cash"}) && !paySize && paySize!==0){
          props.setPaySize(+props.total)
      }
    props.setValue(event.target.value);
  };

  return (
    <FormControl component="fieldset">
      <RadioGroup aria-label="gender" name="gender1" value={props.value} onChange={handleChange}>
        <FormControlLabel value={JSON.stringify({type:"cash"})} control={<Radio color="primary" />} label={
        <div>
            Վճարել հիմա 
            <input
                disabled={props.value!==JSON.stringify({type:"cash"})}
                type="number"
                value={paySize}
                onChange={(e)=>{setPaySize(e.target.value)}}
                className={style.paySizeInput}
            /> 
            Դրամ
        </div>
        } />
        <FormControlLabel value={JSON.stringify({type:"debt"})} control={<Radio color="primary" />} label="Մնալ պարտք" />
      </RadioGroup>
    </FormControl>
  );
}


export default function AlertDialog(props) {
  const { open, setOpen } = props;
  const [success, setSuccess] = useState({});
  const [total, setTotal] = useState(0);
  const [apply, setApply] = useState(false);
  const [cashbox, setCashbox] = useState([])
  const [selectedCashbox, setSelectedCashbox] = useState({})
  const [payType, setPayType] = useState("")
  const [date, setDate] = useState()
  const [describtion, setDescribtion] = useState("")
  const [paySize, setPaySize] = useState("")


  const history = useHistory();
  useEffect(() => {

    Axios.get(`${process.env.REACT_APP_API_URL}?path=Cashboxes/Cashboxes&addons=1&cols=id,name,cashier_stay_time,cashbox_version_id`,{
        headers: {
          lang: cookie.get("language") || "am",
          "Content-Type": "application/json",
          Authorization: `JWT ${cookie.get("access")}`,
        },
      })
      .then((res)=>{
        setCashbox(res.data.results)
        setSelectedCashbox(res.data.results[0])
      })


    let { rowData } = props;
    let total = rowData.reduce((tot, item) => {
      return (tot += item["Առքի գումար"]);
    }, 0);
    setTotal(total);
  }, [props]);

  const handleConfirm = () => {

    let obj = {
        "#":+props.id,
        total,
        apply,
        selectedCashbox,
        payType: {...JSON.parse(payType), paySize},
        date,
        describtion,
    }
    let documents = localStorage.getItem("documents")
    if(documents){
        documents = JSON.parse(documents)
        let documentIndex = documents.findIndex(item=>item["#"]==props.id)
        documents[documentIndex]["Քանակ"] = props.rowData.reduce((tot,item)=>tot+=item["Քանակ"],0)
        documents[documentIndex]["Վճարված է"] = JSON.parse(payType).type==="cash" ? paySize : 0
        documents[documentIndex]["Գին առանց ԱԱՀ-ի"] = total
        documents[documentIndex]["Առքի գումար"] = total
        documents[documentIndex]["Նկարագիր"] = describtion
        console.log('document', documents)
        localStorage.setItem("documents", JSON.stringify(documents))
    }
    console.log('obj', obj)
    setOpen(false)
    let formulated_documents = localStorage.getItem("formulated_documents") ? JSON.parse(localStorage.getItem("formulated_documents")) : []
    let indexID=formulated_documents.indexOf(+props.id)
    if(indexID === -1){
      formulated_documents.push(obj)
    }
    localStorage.setItem("formulated_documents", JSON.stringify(formulated_documents))
    history.replace(`/formulatedItem/${props.id}`)
    return;
  };

  return (
    <div  >
      <SnackbarMessage open={success} setOpen={setSuccess} />
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{
          root: props.root,
        }}
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle style={{position:"relative"}} id="alert-dialog-title">
          {" "}
          {"Ձևակերպել փաստաթուղթը"}
          <IconButton onClick={()=>{setOpen(false)}} className={style.closeButton} >
            <CloseIcon />
        </IconButton>
        </DialogTitle>
        <DialogContent style={{position:"relative"}} >
       
          <Grid container>
            <Grid item xs={6}>
              <div className={style.contentGrid}>
                <span
                  className={style.circleBack}
                  style={{ backgroundColor: "#1fb5ac" }}
                >
                  <DescriptionOutlinedIcon fontSize="large" />
                </span>
                <span>
                  <p className={style.docId}>{`#${props.id}`}</p>
                  <p className={style.caption}>Փաստաթուղթ</p>
                </span>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className={style.contentGrid}>
                <span
                  className={style.circleBack}
                  style={{ backgroundColor: "#fa8564" }}
                >
                  <LocalAtmOutlinedIcon fontSize="large" />
                </span>
                <span>
                  <p className={style.docId}>{`${total}`}</p>
                  <p className={style.caption}>Ընդհանուր գումար</p>
                </span>
              </div>
            </Grid>  
            <Grid item xs={12}>
              <p className={style.captionType1}>Տվյալ մատակարարին չպատկանող ապրանքները</p>
              <div className={style.applyToggleButtons} >
                <button onClick={()=>{setApply(true)}} style={{borderRadius: "9px 0px 0px 9px"}}  className={apply ? style.applyButtonsActive : style.applyButtons} >
                    Կցել մատակարարին 
                </button>
                <button onClick={()=>{setApply(false)}} style={{borderRadius: "0px 9px 9px 0px"}} className={apply ? style.applyButtons : style.applyButtonsActive} >
                    Չկցել մատակարարին 
                </button>
              </div>
            </Grid>
            <Grid item xs={12}>
              <p className={style.captionType2}>Ընտրեք դրամարկղը </p>
              <div className={style.applyToggleButtons} >
                <Select
                    fullWidth
                    renderValue={(val)=>{
                        return <div className={style.selectValue} >
                            {val.name}
                        </div>
                    }}
                    disableUnderline
                    className={style.select}
                    classes={{icon:style.icon}}
                    value={selectedCashbox}
                    onChange={(e)=>{setSelectedCashbox(e.target.value)}}
                >
                    {cashbox && !!cashbox.length && cashbox.map(item=>{
                        return <MenuItem value={item}>{item.name}</MenuItem>
                    })}
                </Select>
              </div>
            </Grid>
            <Grid item xs={12}>
              <p className={style.captionType2}>Վճարման տեսակ </p>
              <RadioButtonsGroup
                total={total}
                paySize={paySize} 
                setPaySize={setPaySize}
                value={payType}
                setValue={setPayType}
              />
            </Grid>
            <Grid item xs={12}>
            <p className={style.captionType3}>Հիշացնել </p>
              
              <DatePicker
                      value={date}
                      setValue={setDate}
                      fullWidth={true}
                      variant={"outlined"}
                />
            </Grid>
            <Grid item xs={12}>
            <p className={style.captionType2}>Նկարագիր </p>
              
              <TextareaAutosize
                style={{border:"1px solid lightgray"}}
                value={describtion}
                onChange={(e)=>{setDescribtion(e.target.value)}} 
                className={style.describtion}
                minRows={8}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions style={{color:"#fff"}} >
          <Button
            color="inherit"
            size="large"
            style={{backgroundColor:"#95b75d"}}
            variant="contained"
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
