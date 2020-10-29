/* eslint-disable no-use-before-define */
import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import style from "./search.module.css"
import Axios from 'axios';
import cookie from "../../../../services/cookies";
import Spinner from "../../../../components/UI/spinners/spinerForContent/spinnerForContent"
import Button from "@material-ui/core/Button"
import {useSelector, useDispatch} from "react-redux"
import ProductModal from "../../products/filters/product/modals/productModal"
import {setProductValues, closeProductActionModal} from "../../../../Redux/products/actions"


export default function ComboBox(props) {
    const {selecteds, setSelected, cashbox, setCashbox} = props
    const [searchs, setSearchs] = useState([])
    const [value, setValue] = React.useState(null);
    const [inputValue, setInputValue] = React.useState('');
    const [options, setOptions] = React.useState([]);
    const [loading, setLoading] = useState(false)
    const [openAddProducts, setOpenAddProducts] = useState(false)
    const product = useSelector(s=>s.products)
    const dispatch = useDispatch()

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
      <ProductModal 
        modalTabs={product.modalTabs} 
        paper={style.modal}
        type={'add'}
        handleClose={
          () => {
              dispatch(closeProductActionModal())
          }
      }
        
      />
      <Autocomplete
        id="combo-box-demo"
        loading={loading}
        loadingText={<Spinner />}
        options={searchs}
        onClick={()=>{return}}
        getOptionLabel={(option) => option.item_name}
        noOptionsText={<NoOption setOpenAddProducts={setOpenAddProducts} charsLength={inputValue.length} />}
        onChange={(event, newValue) => {
          // setOptions(newValue ? [newValue, ...options] : options);
          setSelected(newValue);
          setSearchs([])
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
        renderInput={(params) => <TextField {...params} label="search" variant="outlined" />}
      />
    </div>
  );
}


function NoOption(props){
  // setProductValues

  const product = useSelector(s=>s.products)
  const dispatch = useDispatch()
 console.log(product)
 let clone = JSON.parse(JSON.stringify(product))
 clone.open="add"
 console.log(clone,"clone")
 function  OpenAddProducts() {
  dispatch(setProductValues('open',"add"))
  dispatch(setProductValues('scroll',"paper"))
 }

  return <div className={style.noOptionContainer} >
      <div className={style.noOptionText} >
       {props.charsLength < 3 ? `Մուտքագրեք ևս ${3-props.charsLength} նիշ` : `Ոչինչ չգտնվեց`}
      </div>
      <Button
        fullWidth
        variant="outlined"
        color="primary"
        onMouseDown={(e)=>{ e.preventDefault(); OpenAddProducts();}}
      >
        Ավելացնել Ապրանք
      </Button>
    </div>
}
