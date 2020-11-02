/* eslint-disable no-use-before-define */
import React, {useState, useEffect, useRef} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import style from "./search.module.css"
import Axios from 'axios';
import cookie from "../../../../services/cookies";
import Spinner from "../../../../components/UI/spinners/spinerForContent/spinnerForContent"
// import Button from "@material-ui/core/Button"
// import {useSelector, useDispatch} from "react-redux"
// import ProductModal from "../../products/filters/product/modals/productModal"
// import {setProductValues, closeProductActionModal} from "../../../../Redux/products/actions"


export default function ComboBox(props) {
    const {inputValue, setInputValue} = props
    const {selecteds, setSelected} = props
    const [searchs, setSearchs] = useState([])
    // const [inputValue, setInputValue] = React.useState('');
    const [loading, setLoading] = useState(false)
    // const dispatch = useDispatch()

    useEffect(()=>{
      if(inputValue && inputValue.length>2){
        setLoading(true)
        Axios.get(`${process.env.REACT_APP_API_URL}?path=${props.path}&param={"${props.param}":"${inputValue}"}`, {
            headers: {
                "lang": cookie.get('language') || "am",
                "Content-Type": "application/json",
                "Authorization": `JWT ${cookie.get('access')}`
            }
        }).then(res=>{
          console.log(res.data.data)
            setSearchs(res.data.data)
            setLoading(false)
        }).catch(err=>{
          setLoading(false)
            console.log(err)
        })
      }
    },[inputValue])

  
useEffect(()=>{
  setSearchs([]); 
  setSelected(); 
  setInputValue()
},[ setSelected, setInputValue])



  return (

    <div className={style.container} >
      <Autocomplete
        key={props.keyAutoComplate} 
        autoFocus
        selectOnFocus
        filterOptions={(x) => x}
        autoComplete
        includeInputInList
        filterSelectedOptions
        id="combo-box-demo"
        loading={loading}
        loadingText={<Spinner />}
        options={searchs}
        onClick={()=>{return}}
        getOptionLabel={(option) => option.first_name + " " + option.last_name}
        noOptionsText={<NoOption charsLength={inputValue ? inputValue.length : 0} />}
        onChange={(event, newValue) => {
          setSelected(newValue);
          setSearchs([])
        }}
        // onChange={(e,v)=>{setSelected(v); console.log(v); props.reff.current.focus()}}
        style={{ width: "100%", margin:"10px 0px" }}
        size="small"
        value={selecteds}
        onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
        renderInput={(params) => <TextField {...params} label="Հաճախորդ" variant="outlined" />}
      />
    </div>
  );
}


function NoOption(props){
//   const dispatch = useDispatch()
//  function  OpenAddProducts() {
//   dispatch(setProductValues('open',"add"))
//   dispatch(setProductValues('scroll',"paper"))
//  }

  return <div className={style.noOptionContainer} >
      <div className={style.noOptionText} >
       {props.charsLength < 3 ? `Մուտքագրեք ևս ${3-props.charsLength} նիշ` : `Ոչինչ չգտնվեց`}
      </div>
      {/* {props.product && <Button
        fullWidth
        variant="outlined"
        color="primary"
        onMouseDown={(e)=>{ e.preventDefault(); OpenAddProducts();}}
      >
        Ավելացնել Ապրանք
      </Button>} */}
    </div>
}