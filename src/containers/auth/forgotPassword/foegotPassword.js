import React, {Component} from "react";
import classes from './foegotPassword.module.css';
import {NavLink} from "react-router-dom";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";

class RecoverPassword extends Component {

    state = {
        email: '',
        showPass: false,
        loginStatus: false,
        severity: null,
        text: null,
        emailStatus: null,
        selected: null
    };

    handleChange = event => {
        this.setState({
            email: event.target.value
        });
        let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (event.target.name === 'username') {
            if (regex.test(event.target.value)) {
                this.setState({
                    emailStatus: true
                })
            } else {
                this.setState({
                    emailStatus: false
                })
            }
        }
    };

    onSubmit = event => {
        event.preventDefault()
        console.log('Send mail')

    }

    showPasswordHandler = () => {
        this.setState({
            showPass: true
        })
    }

    hidePasswordHandler = () => {
        this.setState({
            showPass: false
        })
    }

    checkStatus = status => {

        switch (status) {

            case true:
                return (
                    <ErrorOutlineOutlinedIcon fontSize='small' style={{color: '#578DE4'}}/>
                );
            case false:
                return (
                    <ErrorOutlineOutlinedIcon fontSize='small' style={{color: '#ff3939'}}/>
                );
            default:
                return null;
        }
    }


    clickHandler = name => {

        this.setState({
            selected: name
        })
    }

    render() {

        return (
            <div className={classes.main}>
                <div className={classes.backdrop}>
                    <div className={`text-center ${classes.mainWindow}`}>
                        <span className={classes.name}>Barcode.am</span>
                        <span className={classes.action}>
                                Վերականգնել գաղտնաբառը
                            </span>
                        <form onSubmit={event => this.onSubmit(event)}>
                            <label htmlFor={'email'}
                                   className={`${classes.email} ${this.state.selected === 'email' ? classes.selected : null}`}>
                                <span className={classes.forIcon}>
                                    <svg width={16} height={13} viewBox="0 0 14.408 11.658">
                                        <defs>
                                            <style>{".statick{fill: #444 !important;}"}</style>
                                        </defs>
                                        <path
                                            className="statick"
                                            d="M19.207,15.844a2.144,2.144,0,0,0-2.144-2.134H7.144A2.144,2.144,0,0,0,5,15.843v7.181a2.144,2.144,0,0,0,2.144,2.144h9.92a2.144,2.144,0,0,0,2.144-2.144v-7.18ZM5.952,14.662a1.679,1.679,0,0,1,1.192-.494h9.92a1.682,1.682,0,0,1,1.68,1.572l-5.7,4.1a1.6,1.6,0,0,1-1.874,0l-5.7-4.1A1.678,1.678,0,0,1,5.952,14.662Zm12.8,8.362a1.686,1.686,0,0,1-1.686,1.686H7.144a1.686,1.686,0,0,1-1.686-1.686V16.3L10.9,20.216a2.063,2.063,0,0,0,2.409,0L18.75,16.3Z"
                                            transform="translate(-4.9 -13.61)"
                                        />
                                    </svg>
                                </span>
                                <input
                                    onFocus={this.clickHandler.bind(this, 'email')}
                                    onBlur={this.clickHandler.bind(this, null)}
                                    id={'email'}
                                    className={`border-0 ${classes.input}`}
                                    type="email"
                                    required={true}
                                    name="username"
                                    placeholder={'Էլ․ հասցե'}
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                />
                                <span className={classes.forIcon}>
                                    {
                                        this.checkStatus(this.state.emailStatus)
                                    }
                                </span>
                            </label>
                            <button
                                className={classes.signIn}
                                onClick={event => this.onSubmit(event)}
                            >
                                Ուղարկել
                            </button>
                        </form>
                        <div className={classes.createAccount}>
                            <NavLink className={classes.signUp} to={'login'}>
                                Մուտք գործել
                            </NavLink>
                            <span>
                                կամ
                            </span>
                            <NavLink className={classes.signUp} to={'registration'}>
                                Գրանցվել
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default RecoverPassword