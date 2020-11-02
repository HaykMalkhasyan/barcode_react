import React, { useState, useEffect, useRef, useCallback } from "react";
import Search from "../search/search";
import Login from "../modal/login";
import style from "./outlets.module.css";
import { TextField, Button } from "@material-ui/core";
import Table from "../resultsTable/table";
import Axios from "axios";
import cookie from "../../../../services/cookies";
import { useSpring, animated } from "react-spring";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import Total from "../total/total";
import Confirm from "../confirm/confirm";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";
import CouponsHistory from "../history_coupons/CouponsHistory";
import SnackbarMessage from "./snackbar"

export default function Outlets() {
  let id = Date.now();
  const [selecteds, setSelected] = useState();
  const [openLogin, setOpenLogin] = useState(true);
  const [quanty, setQuany] = useState(0);
  const [sellingPrice, setSellingPrice] = useState(0);
  const [cashbox, setCashbox] = useState([]);
  const [cashiers, setCashiers] = useState();
  const [selectedCahier, setSelectedCashier] = useState({});
  const [items, setItems] = useState([]);
  const [turns, setTurns] = useState([{ i: 1, id: id, items: [] }]);
  const [currentTurn, setCurrentTurn] = useState({ i: 1, items: [] });
  const [props, set] = useSpring(() => ({ opacity: 1 }));
  const quantyRef = useRef();
  const sellingPriceRef = useRef();
  const searchRef = useRef();
  const [inputValue, setInputValue] = React.useState("");
  const [keyAutoComplate, setKeyAutoComplate] = useState(1);

  const [allTotal, setAllTotal] = useState(0);
  const [totalWithDisscount, setTotalWithDisscount] = useState(0);
  const [cash, setCash] = useState(0);
  const [card, setCard] = useState(0);
  const [diff, setDiff] = useState(0);
  const [debt, setDebt] = useState(0);
  const [disscount, setDisscount] = useState("");
  const [disscountPercent, setDisscountPercent] = useState("");
  const [disscountCash, setDisscountCash] = useState("");

  const [disscountType, setDisscountType] = useState("percent");
  const [isFullScreen, setIsFullScreen] = useState(true);
  const [success, setSuccess] = useState({})
  const contentRef = useRef();
  const [selectedCustomer, setSelectedCustomer] = useState()
  const [custmerValue, setCustomerValue] = useState("")
  const [description, setDescription] = useState("")
  const [screenChange, setScreenChange] = useState("")
  const getFromLocale = useCallback(() => {
    let turns_on_storage = localStorage.getItem(`${selectedCahier.id}`);
    if (turns_on_storage) {
      turns_on_storage = JSON.parse(turns_on_storage);
      let currentTurnID = currentTurn.id
        ? currentTurn.id
        : turns_on_storage[0].id;
      let index = turns_on_storage.findIndex((x) => x.id === currentTurnID);
      // setTurns(turns_on_storage)
      // setCurrentTurn(turns_on_storage[0])
      if (index === -1) {
        setItems([]);
      } else {
        setItems(turns_on_storage[index].items);
      }
    } else {
      setItems([]);
    }
  }, [selectedCahier, currentTurn]);

  useEffect(()=>{
    setIsFullScreen(!isFullScreen)
  },[screenChange])


  useEffect(() => {
    function handleEscKey(e){
      setScreenChange(Math.random())
    }
    window.addEventListener("fullscreenchange", handleEscKey)
    Axios.get(
      `${process.env.REACT_APP_API_URL}?path=Cashboxes/Cashboxes&addons=1&cols=id,name,cashier_stay_time,cashbox_version_id`,
      {
        headers: {
          lang: cookie.get("language") || "am",
          "Content-Type": "application/json",
          Authorization: `JWT ${cookie.get("access")}`,
        },
      }
    )
      .then((res) => {
        setCashiers(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (selectedCahier.id) {
      let allTurns = localStorage.getItem(`${selectedCahier.id}`);
      if (allTurns) {
        allTurns = JSON.parse(allTurns);
        setTurns(allTurns);
        setCurrentTurn(allTurns[0]);
        // setItems(allTurns[0].items)
      } else {
        let id = Date.now();
        setTurns([{ i: 1, id: id, items: [] }]);
        setCurrentTurn({ i: 1, id: id, items: [] });
      }
    }
  }, [selectedCahier]);

  const deleteTurn = ()=>{
    let turns_on_storage = localStorage.getItem(`${selectedCahier.id}`);
    if (turns_on_storage) {
      turns_on_storage = JSON.parse(turns_on_storage);
      let index = turns_on_storage.findIndex(item=>item.id===currentTurn.id)
      if(index!==-1){
        let newId = Date.now()
        turns_on_storage.splice(index, 1)
        if(turns_on_storage.length){
          localStorage.setItem(`${selectedCahier.id}`, JSON.stringify(turns_on_storage))
          setTurns(turns_on_storage)
        }else{
          localStorage.setItem(`${selectedCahier.id}`, JSON.stringify([{ i: 0, id: newId, items: [] }]))
          setTurns([{ i: 0, id: newId, items: [] }])
        }
        let nextTurn = turns_on_storage[index] ? turns_on_storage[index] : turns_on_storage[index-1] ? turns_on_storage[index-1] : { i: 0, id: newId, items: [] }
        setCurrentTurn(nextTurn)
      }
    }
  }

  

  useEffect(() => {
    if (selectedCahier.id && currentTurn.id) {
      getFromLocale();
    }
  }, [currentTurn, selectedCahier, getFromLocale]);

  function saveOnLocale(items) {
    let turns_on_storage = localStorage.getItem(`${selectedCahier.id}`);
    if (turns_on_storage) {
      turns_on_storage = JSON.parse(turns_on_storage);
      let index = turns_on_storage.findIndex((x) => x.id === currentTurn.id);
      if (index === -1) {
        let obj = JSON.parse(JSON.stringify(currentTurn));
        obj.items = items;
        turns_on_storage.push(obj);
      } else {
        turns_on_storage[index].items = items;
      }
      localStorage.setItem(
        `${selectedCahier.id}`,
        JSON.stringify(turns_on_storage)
      );
    } else {
      let obj = JSON.parse(JSON.stringify(currentTurn));
      obj.items.push(...items);
      localStorage.setItem(`${selectedCahier.id}`, JSON.stringify([obj]));
    }
  }

  // function getFromLocale(){
  //     let turns_on_storage = localStorage.getItem(`${selectedCahier.id}`)
  //     if(turns_on_storage){
  //         turns_on_storage = JSON.parse(turns_on_storage)
  //         let currentTurnID = currentTurn.id ? currentTurn.id : turns_on_storage[0].id
  //         let index = turns_on_storage.findIndex(x=>x.id === currentTurnID)
  //         // setTurns(turns_on_storage)
  //         // setCurrentTurn(turns_on_storage[0])
  //         if(index === -1){
  //             setItems([])
  //         }else{
  //             setItems(turns_on_storage[index].items)
  //         }
  //     }else{
  //         setItems([])
  //     }
  // }

  function changeTurn(item, i) {
    set({ opacity: 0 });
    setTimeout(() => {
      set({ opacity: 1 });
    }, 200);
    setCurrentTurn(item);
  }

  function get_float_num_length(num) {
    num = num.toString();
    if (num.includes(".")) {
      let arr = num.split(".");
      return arr[1].length;
    } else {
      return 0;
    }
  }

  function addRow(params) {
    if (selecteds && quanty && sellingPrice) {
      let index = items.findIndex(
        (x) => x.selected.item_name === selecteds.item_name
      );
      let clone;
      if (index === -1) {
        clone = [...items, { selected: selecteds, quanty, sellingPrice }];
        setItems([...items, { selected: selecteds, quanty, sellingPrice }]);
      } else {
        clone = JSON.parse(JSON.stringify(items));
        get_float_num_length(clone[index].quanty);
        get_float_num_length(quanty);
        clone[index].quanty = (+clone[index].quanty + +quanty).toFixed(
          Math.max(
            get_float_num_length(clone[index].quanty),
            get_float_num_length(quanty)
          )
        );
        setItems(clone);
      }
      saveOnLocale(clone);
      setQuany("");
      setSellingPrice("");
      setKeyAutoComplate(Math.random());
    }
  }

  function openFullscreen() {
    var isInFullScreen =
      (document.fullscreenElement && document.fullscreenElement !== null) ||
      (document.webkitFullscreenElement &&
        document.webkitFullscreenElement !== null) ||
      (document.mozFullScreenElement &&
        document.mozFullScreenElement !== null) ||
      (document.msFullscreenElement && document.msFullscreenElement !== null);
    if (!isInFullScreen) {
      // setIsFullScreen(true);
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        /* Safari */
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        /* IE11 */
        document.documentElement.msRequestFullscreen();
      }
    } else {
      // setIsFullScreen(false);
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        /* Safari */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        /* IE11 */
        document.msExitFullscreen();
      }
    }
  }

  return (
    <div className={ isFullScreen ? style.fullScreenContent : style.content} id="contents" ref={contentRef}>
      <SnackbarMessage open={success} setOpen={setSuccess} />
      <div className={style.cashiers}>
        {cashiers &&
          cashiers.map((item, i) => {
            return (
              <button
                key={i}
                className={
                  selectedCahier.id === item.id
                    ? style.activeCashboxes
                    : style.cashboxes
                }
                onClick={() => {
                  setSelectedCashier(item);
                }}
              >
                {item.name}
              </button>
            );
          })}
        <span className={style.fullScreen}>
          <IconButton color="primary" onClick={openFullscreen}>
            {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
          </IconButton>
        </span>
      </div>
      <Login
        root={style.backdrop}
        setSelectedCashier={setSelectedCashier}
        cashiers={cashiers}
        open={openLogin}
        setOpen={setOpenLogin}
      />
      <div className={style.tabs}>
        {turns.map((item, i) => {
          return (
            <button
              key={i}
              className={
                item.id === currentTurn.id ? style.actieTurn : style.turns
              }
              onClick={() => {
                changeTurn(item, i);
              }}
            >
              {`TURN ${i + 1}`}
            </button>
          );
        })}
        <IconButton
          style={{ color: "white" }}
          onClick={() => {
            setTurns([
              ...turns,
              { i: turns.length, id: Date.now(), items: [] },
            ]);
          }}
        >
          <AddIcon color="inherit" />
        </IconButton>
      </div>
      <animated.div
        style={{ ...props, backgroundColor: "#fff", padding: "8px", position:"relative" }}
      >
        <div className={style.filters}>
          <Search
            path="Products"
            param="item_name"
            product={true}
            keyAutoComplate={keyAutoComplate}
            inputValue={inputValue}
            setInputValue={setInputValue}
            cashbox={cashbox}
            reff={quantyRef}
            searchRef={searchRef}
            setCashbox={setCashbox}
            selecteds={selecteds}
            setSelected={setSelected}
            setQuany={setQuany}
            setSellingPrice={setSellingPrice}
          />
          <TextField
            margin="none"
            style={{ margin: "0px 10px" }}
            size="small"
            inputRef={quantyRef}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                quanty && sellingPriceRef.current.focus();
              }
            }}
            label="quanty"
            type="number"
            value={quanty}
            onChange={(e) => {
              setQuany(+e.target.value);
            }}
            variant="outlined"
            onFocus={(event) => {
              event.target.select();
            }}
          />
          <TextField
            size="small"
            style={{ margin: "0px 10px 0px 0px" }}
            inputRef={sellingPriceRef}
            label="selling Price"
            type="number"
            value={sellingPrice}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                addRow();
              }
            }}
            onChange={(e) => {
              setSellingPrice(+e.target.value);
            }}
            variant="outlined"
            onFocus={(event) => {
              event.target.select();
            }}
          />
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              addRow();
            }}
          >
            Ավելացնել
          </Button>
        </div>
        <div className={style.results}>
          <Table
            saveOnLocale={saveOnLocale}
            items={items}
            setItems={setItems}
          />
        </div>
        <div className={style.totalContainer}>
          <Total
            cash={cash} setCash={setCash}
            card={card} setCard={setCard}
            diff={diff} setDiff={setDiff}
            debt={debt} setDebt={setDebt}
            items={items} 
            allTotal={allTotal} setAllTotal={setAllTotal}
            disscount={disscount} setDisscount={setDisscount}
            description={description} setDescription={setDescription}
            custmerValue={custmerValue} setCustomerValue={setCustomerValue}
            disscountCash={disscountCash} setDisscountCash={setDisscountCash}
            disscountType={disscountType} setDisscountType={setDisscountType}
            selectedCustomer={selectedCustomer} setSelectedCustomer={setSelectedCustomer}
            disscountPercent={disscountPercent} setDisscountPercent={setDisscountPercent}
            totalWithDisscount={totalWithDisscount} setTotalWithDisscount={setTotalWithDisscount}
          />
        </div>
        <Confirm
          cash={cash}
          card={card}
          diff={diff}
          debt={debt}
          items={items}
          allTotal={allTotal}
          disscount={disscount}
          currentTurn={currentTurn}
          disscountType={disscountType}
          disscountCash={disscountCash}
          success={success}
          selectedCustomer={selectedCustomer}
          setSuccess={setSuccess}
          disscountPercent={disscountPercent}
          totalWithDisscount={totalWithDisscount}
          deleteTurn={deleteTurn}
        />
        {/* <CouponsHistory /> */}
      </animated.div>
    </div>
  );
}
