// import external modules
import React, { Component } from "react";

import { NavLink } from "react-router-dom";

// Styling
import "../../../../../assets/scss/components/sidebar/sidemenu/sidemenu.scss";
// import internal(own) modules
import SideMenu from "../sidemenuHelper";


class SideMenuContent extends Component {
   render() {
       if(Object.entries(this.props.pages).length>0){
           return (
               <SideMenu className="sidebar-content" toggleSidebarMenu={this.props.toggleSidebarMenu}>
                   {Object.keys(this.props.pages).map((key) =>
                   <SideMenu.MenuSingleItem badgeColor="danger" key = {key}>
                       <NavLink to={"/"+this.props.pages[key].name} activeclassname="active">
                           <span className="menu-item-text">{this.props.pages[key].name}</span>
                       </NavLink>
                   </SideMenu.MenuSingleItem>
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
