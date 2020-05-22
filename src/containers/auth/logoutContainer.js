import React, { Component } from "react";
import {
    DropdownItem
} from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { logout } from "../../redux/auth/actions";
import {LogOut} from "react-feather";
import Translate from "../../Translate";
// import {Link} from "react-router-dom";


class LogoutContainer extends Component {
    // state = {
    //     rememberMe: false
    // };
    // handleChange = event => {
    //     this.setState({ ...this.state, [event.target.name]: event.target.value });
    // };
    // handleChecked = e => {
    //     this.setState({...this.state,rememberMe: !this.state.rememberMe});
    // };
    onSubmit = () => {
        this.props.logout()
    }

    render() {
        return (
                <DropdownItem style={{color: this.props.headerFontColor, transition: '500ms'}} onClick={this.onSubmit}>
                    <LogOut size={16} className="mr-1" /> <Translate name={'Logout'} />
                </DropdownItem>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            logout
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(LogoutContainer);
