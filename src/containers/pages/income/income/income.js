import React, {useEffect, useState} from 'react'
import style from "./income.module.css"
import Table from "../../../../components/table/table"
import { Button, Collapse } from '@material-ui/core';
import cookie from "../../../../services/cookies";
import Login from "../addDocument/addDocument"
import Axios from "axios"
export default function Income() {
    const [openAddDocument, setOpenAddDocument] = useState(false)
    const [selectedTab, setSelectedTab] = useState({})
    const [selectedSubTab, setSelectedSubTab] = useState({})
    const [collapse, setCollapse] = useState(false)
    const [openLogin, setOpenLogin] = useState(true);
    const [supliers, setSupliers] = useState();
    const [selectedSuplier, setSelectedSuplier] = useState({});
    const [keyCashBox, setKeyCashBox] = useState(null)
  

    const initialData =[
        {"#":1, Մատակարար: "", Պահեստ: "", Ամսաթիվ: 0, Քանակ: 0, Նկարագիր: 0, "Գին առանց ԱԱՀ-ի": 0, "ԱԱՀ Գում․": 0, "Առքի գումար": 0, "Վճարված է": 0, "Հաշիվ-Ապրանքագիր":0, "ՀՎՀՀ": 0, },
    ]


    useEffect(() => {
      
     
        setSupliers([{name:"Գրանդ Քենդի", id:1256}, {name:"789789", id:2666}]);
         
      }, []);


    useEffect(()=>{
        if(selectedTab.submenus && selectedTab.submenus.length ){
            setCollapse(true)
        }else{
            setCollapse(false)
        }

            let data = localStorage.getItem(`${selectedTab.id}`)
            if(data){
                data = JSON.parse(data)
                setRowData(data)
            }else{
                setRowData(initialData)
            }
    },[selectedTab])

    const [rowData, setRowData] = useState(initialData);
    return (
        <div className={style.fullContainer} >
            <Login  
                root={style.backdrop}
                selected={selectedSuplier}
                setSelected={setSelectedSuplier}
                values={supliers}
                open={openLogin}
                setOpen={setOpenLogin}
            />
            <Button variant="outlined" size="large" color="primary" onClick={()=>{setOpenAddDocument(true)}} >Ավելացնել փաստաթուղթ</Button>
            <div className={style.tabsFullContainer} >
                <div className={style.tabsContainer}>
                    <Tab 
                        value={{name:"Փաստաթղթեր", id:"documents"}}
                        setter={setSelectedTab}
                        selectedTab={selectedTab}
                    />
                    <Tab 
                        value={{name:"Պատմություն", id:"history", submenus:[
                            {name:"Ընդհանուր", id:"history.all"},
                            {name:"Հիմնական", id:"history.base"},
                            {name:"Պահեստ 2", id:"history.store_2"},
                        ]}}
                        setter={setSelectedTab}
                        selectedTab={selectedTab}
                    />
                    <Tab 
                        value={{name:"Ջնջված", id:"deleted"}}
                        setter={setSelectedTab}
                        selectedTab={selectedTab}
                    />
                </div>
                <Collapse in={collapse}>
                        <div className={style.tabsContainer} style={{minHeight:"54px"}}>
                            {selectedTab.submenus && selectedTab.submenus.map(item=>{
                                return <TabSubMenu
                                value={item}
                                setter={setSelectedSubTab}
                                selectedTab={selectedSubTab}
                                />
                            })}
                        </div>
                </Collapse>
                <Table rowData={rowData} />
            </div>
        </div>
    )
}

function Tab(props) {
    return <button className={props.selectedTab.id === props.value.id ? style.activeTab : style.tab} onClick={()=>props.setter(props.value)} >
        {props.value.name}
    </button>
}

function TabSubMenu(props) {
    return <button className={props.selectedTab.id === props.value.id ? style.activeTab : style.tab} onClick={()=>props.setter(props.value)} >
        {props.value.name}
    </button>
}
