import React, {useEffect, useState} from 'react'
import style from "./income.module.css"
import Table from "../../../../components/table/table"
import { Button, Collapse } from '@material-ui/core';
import cookie from "../../../../services/cookies";
import AddDocument from "../addDocument/addDocument"
import Axios from "axios"
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';

export default function Income() {
    const [openAddDocument, setOpenAddDocument] = useState(false)
    const [selectedTab, setSelectedTab] = useState({id:"documents"})
    const [selectedSubTab, setSelectedSubTab] = useState({})
    const [collapse, setCollapse] = useState(false)
    const [exportStatus, setExportStatus] = useState({bool:false, type:""})
  

    const initialData =[
        {"#":1, Մատակարար: "", Պահեստ: "", Ամսաթիվ: 0, Քանակ: 0, Նկարագիր: "---", "Գին առանց ԱԱՀ-ի": 0, "ԱԱՀ Գում․": 0, "Առքի գումար": 0, "Վճարված է": 0, "Հաշիվ-Ապրանքագիր":"Դեռ ուղարկված չէ", "ՀՎՀՀ": 0, },
    ]


    useEffect(() => {
        
     
         
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

    function exportTo(type){
        setExportStatus({bool:true, type})
    }

    function print(){
        return
    }

    const [rowData, setRowData] = useState(initialData);
    return (
        <div className={style.fullContainer} >
            <AddDocument  
                root={style.backdrop}
                open={openAddDocument}
                setOpen={setOpenAddDocument}
                setRowData={setRowData}
            />
            <div style={{minHeight:"41px"}} >
            {selectedTab.id==="documents" && 
                <Button variant="outlined" size="large" color="primary" onClick={()=>{setOpenAddDocument(true)}} >Ավելացնել փաստաթուղթ</Button>
            }
            </div>
            <div style={{display:"flex", margin:"5px"}} >
            <Button 
                    variant="contained"
                    onClick={()=>{exportTo("print")}}
                    style={{margin:"5px"}}
                >
                    Տպել &nbsp; <PrintIcon />
                </Button>
                <Button 
                    variant="contained"
                    onClick={()=>{exportTo("excel")}}
                    style={{margin:"5px"}}
                >
                    Excel &nbsp; <ViewComfyIcon />
                </Button>

                <Button 
                    variant="contained"
                    style={{margin:"5px"}}
                    onClick={()=>{exportTo("csv")}}
                >
                    CSV &nbsp; <SaveIcon />
                </Button>
            </div>
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
                <Table
                    rowData={rowData} 
                    exportStatus={exportStatus}
                />
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
