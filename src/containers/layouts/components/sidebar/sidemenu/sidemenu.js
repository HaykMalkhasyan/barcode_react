// import external modules
import React, { Component } from "react";

import { NavLink } from "react-router-dom";

// Styling
import "../../../../../assets/scss/components/sidebar/sidemenu/sidemenu.scss";
// import internal(own) modules
import SideMenu from "../sidemenuHelper";
import Translate from "../../../../../Translate";
import Icon from "./icons"
class SideMenuContent extends Component {

     sideMenuItem(key){
        if(this.props.permissions[this.props.pages[key].name] && this.props.permissions[this.props.pages[key].name].length===0){
            return <div></div>
        }else{
            return(
            <SideMenu.MenuSingleItem badgeColor="danger" key = {key}>
                <NavLink to={"/"+this.props.pages[key].name} activeclassname="active">
                    <i className="menu-icon">
                        <Icon tag={this.props.pages[key].icon} />
                    </i>
                    <span className="menu-item-text"><Translate name={this.props.pages[key].name}/></span>
                </NavLink>
            </SideMenu.MenuSingleItem>
            )
        }

    }
   render() {
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
