// import external modules
import React, { Component } from "react";

import { NavLink } from "react-router-dom";

// Styling
import "../../../../../assets/scss/components/sidebar/sidemenu/sidemenu.scss";
// import internal(own) modules
import SideMenu from "../sidemenuHelper";
import Translate from "../../../../../Translate";


class SideMenuContent extends Component {
     sideMenuItem(key){
         console.log(this.props.permissions)
         console.log(this.props.pages[key].name)
        if(this.props.permissions[this.props.pages[key].name] && this.props.permissions[this.props.pages[key].name].length===0){
            return <div></div>
        }else{
            return(
            <SideMenu.MenuSingleItem badgeColor="danger" key = {key}>
                <NavLink to={"/"+this.props.pages[key].name} activeclassname="active">
                    <span className="menu-item-text"><Translate name={this.props.pages[key].name}/></span>
                </NavLink>
            </SideMenu.MenuSingleItem>
            )
        }

    }
   render() {
        console.log(this.props.permissions)
       if(Object.entries(this.props.pages).length>0){
           return (
               <SideMenu className="sidebar-content" toggleSidebarMenu={this.props.toggleSidebarMenu}>
                   {Object.keys(this.props.pages).map((key) =>
                       this.sideMenuItem(key)
                   )}
               </SideMenu>
           );
       }else{
           return (
               <div></div>
           )
       }



   }
}

export default SideMenuContent;
