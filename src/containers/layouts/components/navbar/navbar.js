// import external modules
import React, { Component } from "react";
import Localize from "../../../localize/localize"
// import { Link } from "react-router-dom";
import {
   Collapse,
   Navbar,
   Nav,
   UncontrolledDropdown,
   DropdownToggle,
   DropdownMenu,
   DropdownItem
} from "reactstrap";
import {
   Menu,
   MoreVertical,
} from "react-feather";
import userImage from "../../../../assets/img/portrait/small/avatar-s-1.png";
import LogoutComponent from "../../../../containers/auth/logoutContainer"
import SessionStorage from "../../../../services/SessionStorage";
class ThemeNavbar extends Component {
   handleClick = e => {
      this.props.toggleSidebarMenu("open");
   };
   constructor(props) {
      super(props);
      this.toggle = this.toggle.bind(this);
      this.state = {
         isOpen: false,
         languages: [
            {code:"am", value:'Armenian'},
            {code:"ru", value:'Russian'},
            {code:"us", value:'English'},
         ],
         user:SessionStorage.get("user"),
      };
   }
   toggle() {
      this.setState({
         isOpen: !this.state.isOpen
      });
   }

   render() {
      return (
         <Navbar className="navbar navbar-expand-lg navbar-light bg-faded">
            <div className="container-fluid px-0">
               <div className="navbar-header">
                  <Menu
                     size={14}
                     className="navbar-toggle d-lg-none float-left"
                     onClick={this.handleClick.bind(this)}
                     data-toggle="collapse"
                  />

                  {/* <Moon size={20} color="#333" className="m-2 cursor-pointer"/> */}
                  <MoreVertical
                     className="mt-1 navbar-toggler black no-border float-right"
                     size={50}
                     onClick={this.toggle}
                  />
               </div>

               <div className="navbar-container">
                  <Collapse isOpen={this.state.isOpen} navbar>
                     <Nav className="ml-auto float-right" navbar>
                        <Localize/>
                        <UncontrolledDropdown nav inNavbar className="pr-1">
                           <DropdownToggle nav>
                              <img src={userImage} alt="logged-in-user" className="rounded-circle width-35" />
                           </DropdownToggle>
                           <DropdownMenu right>
                              <DropdownItem>
                                 <span className="font-small-3">
                                    {this.state.user.firstname} {this.state.user.lastname} <span className="text-muted">({this.state.user.position})</span>
                                 </span>
                              </DropdownItem>
                              <DropdownItem divider />

                              <LogoutComponent/>
                           </DropdownMenu>
                        </UncontrolledDropdown>
                     </Nav>
                  </Collapse>
               </div>
            </div>
         </Navbar>
      );
   }
}

export default ThemeNavbar;
