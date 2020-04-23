// import external modules
import React, {Component} from "react";

import {NavLink} from "react-router-dom";

// Styling
import "../../../../../assets/scss/components/sidebar/sidemenu/sidemenu.scss";
// import internal(own) modules
import SideMenu from "../sidemenuHelper";
import Translate from "../../../../../Translate";
import Icon from "./icons"

class SideMenuContent extends Component {

    sideMenuItem(key) {
        if (this.props.permissions[this.props.pages[key].name] && this.props.permissions[this.props.pages[key].name].length === 0) {
            return <div></div>
        } else {
            return (
                <SideMenu.MenuSingleItem badgeColor="danger" key={key}>
                    <NavLink to={`/${this.props.pages[key].name.trim()}`} activeclassname="active">
                        <i className="menu-icon">
                            <Icon tag={this.props.pages[key].icon.trim()}/>
                        </i>
                        <span className="menu-item-text"><Translate name={this.props.pages[key].name.trim()}/></span>
                    </NavLink>
                </SideMenu.MenuSingleItem>
            )
        }

    }

    render() {
        if (Object.entries(this.props.pages).length > 0) {
            return (
                <SideMenu className="sidebar-content" toggleSidebarMenu={this.props.toggleSidebarMenu}>
                    <SideMenu.MenuSingleItem badgeColor="danger">
                        <NavLink to={`/menu`} activeclassname="active">
                            <i className="menu-icon">
                                <Icon tag={"Menu"}/>
                            </i>
                            <span className="menu-item-text"><Translate name={'EditMenu'} /></span>
                        </NavLink>
                    </SideMenu.MenuSingleItem>
                    {Object.keys(this.props.pages).map((key) =>
                        this.sideMenuItem(key)
                    )}
                </SideMenu>
            );
        } else {
            return (
                <SideMenu className="sidebar-content" toggleSidebarMenu={this.props.toggleSidebarMenu}>
                    <SideMenu.MenuSingleItem badgeColor="danger">
                        <NavLink to={`/menu`} activeclassname="active">
                            <i className="menu-icon">
                                <Icon tag={"Menu"}/>
                            </i>
                            <span className="menu-item-text">Edit menu</span>
                        </NavLink>
                    </SideMenu.MenuSingleItem>
                </SideMenu>
            )
        }


    }
}

export default SideMenuContent;
