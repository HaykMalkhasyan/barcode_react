/* eslint-disable no-use-before-define */
import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import style from "./search.module.css"
import Axios from 'axios';
import cookie from "../../../../services/cookies";


export default function ComboBox(props) {
    const {selecteds, setSelected, cashbox, setCashbox} = props
    const [searchs, setSearchs] = useState([])
    const [value, setValue] = React.useState(null);
    const [inputValue, setInputValue] = React.useState('');
    const [options, setOptions] = React.useState([]);
    const [loading, setLoading] = useState(false)
    

    useEffect(()=>{
      if(inputValue.length>2){
        setLoading(true)
        Axios.get(`${process.env.REACT_APP_API_URL}?path=Products/Search&param={"item_name":"${inputValue}"}`, {
            headers: {
                "lang": cookie.get('language') || "am",
                "Content-Type": "application/json",
                "Authorization": `JWT ${cookie.get('access')}`
            }
        }).then(res=>{
            console.log(res)
            setSearchs(res.data.data)
            setLoading(false)
        }).catch(err=>{
          setLoading(false)
            console.log(err)
        })
      }
    },[inputValue])

    



  return (

      <div className={style.container} >
         
    <Autocomplete
      id="combo-box-demo"
      loading={loading}
      loadingText={"loading ..."}
      options={searchs}
      getOptionLabel={(option) => option.item_name}
      onChange={(event, newValue) => {
        // setOptions(newValue ? [newValue, ...options] : options);
        setSelected(newValue);
        // setValue(newValue);
        props.reff.current.focus()
      }}
      // onChange={(e,v)=>{setSelected(v); console.log(v); props.reff.current.focus()}}
      style={{ width: 300 }}
      size="small"
      value={selecteds}
      onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
      renderInput={(params) => <TextField onClick={()=>{console.log(params)}} {...params} label="search" variant="outlined" />}
    />

    </div>
  );
}
