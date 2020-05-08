import React, {Component} from "react";
import {
    Row,
    Col,
    Input,
    Form,
    FormGroup,
    Button,
    Card,
    CardBody,
} from "reactstrap";
// import jwt from 'jwt-simple';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {login, loginIsEmpty, passwordIsEmpty} from "../../redux/auth/actions";
import {getTranslations} from "../../redux/lang/actions"
import {getPages} from '../../redux/pages/actions'
import classes from './login.module.css'
import * as Icon from 'react-feather'
import Translate from "../../Translate";


class LoginContainer extends Component {
    state = {
        // rememberMe: false
    };
    handleChange = event => {
        this.setState({...this.state, [event.target.name]: event.target.value});
    };
    handleChecked = e => {
        this.setState({...this.state, rememberMe: !this.state.rememberMe});
    };
    onSubmit = () => {
        // let data = [this.state.username,jwt.encode(this.state.password, "password")];
        let data = this.state;
        if (!data.username) {
            this.props.loginIsEmpty(true)
        } else {

            this.props.loginIsEmpty(false)
        }
        if (!data.password) {
            this.props.passwordIsEmpty(true)
        } else {
            this.props.passwordIsEmpty(false)
        }
        this.props.login(data, 'index')
        this.props.getTranslations()
        this.props.getPages()

    }

    render() {
        return (
            <div className="container">
                <div className={classes.notificationWindow}>
                    {
                        this.props.authError ?
                            <div className={classes.notification}>
                                <Icon.AlertCircle className="danger" size={20}/>
                                <b className="danger mr-1 ml-1">#error</b>
                                <span>
                                    <Translate name={'incorrect value'}/>
                                </span>
                            </div>
                            :
                            null
                    }
                    {
                        this.props.emptyLogin ?
                            <div className={classes.notification}>
                                <Icon.AlertTriangle className="danger" size={20}/>
                                <b className="warning mr-1 ml-1">#warning</b>
                                <span>
                                    <Translate name={'login is empty'}/>
                                </span>
                            </div>
                            :
                            null
                    }
                    {
                        this.props.emptyPassword ?
                            <div className={classes.notification}>
                                <Icon.AlertTriangle className="danger" size={20}/>
                                <b className="warning mr-1 ml-1">#warning</b>
                                <span>
                                    <Translate name={'password is empty'}/>
                                </span>
                            </div>
                            :
                            null
                    }
                </div>
                <Row className="full-height-vh">
                    <Col xs="12" className="d-flex align-items-center justify-content-center">
                        <Card className="gradient-indigo-purple text-center width-400">
                            <CardBody>
                                <h2 className="white py-4">Login</h2>
                                <Form onSubmit={this.onSubmit} className="pt-2">
                                    <FormGroup>
                                        <Col md="12">
                                            <Input
                                                className="form-control"
                                                name="username"
                                                id="inputEmail"
                                                placeholder="Email"
                                                required
                                                onChange={this.handleChange}
                                            />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup>
                                        <Col md="12">
                                            <Input
                                                type="password"
                                                className="form-control"
                                                name="password"
                                                id="inputPass"
                                                placeholder="Password"
                                                required
                                                onChange={this.handleChange}
                                            />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup>
                                        <Row>
                                            <Col md="12">
                                                <div
                                                    className="custom-control custom-checkbox mb-2 mr-sm-2 mb-sm-0 ml-3">
                                                    <Input
                                                        type="checkbox"
                                                        className="custom-control-input"
                                                        checked={this.state.rememberMe}
                                                        onChange={this.handleChecked}
                                                        id="rememberme"
                                                    />
                                                    {/*<Label className="custom-control-label float-left white" for="rememberme">*/}
                                                    {/*    Remember Me*/}
                                                    {/*</Label>*/}
                                                </div>
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                    <FormGroup>
                                        <Col md="12">
                                            <Button color="danger" block className="btn-pink btn-raised"
                                                    onClick={this.onSubmit}>
                                                Submit
                                            </Button>
                                            {/*<Button type="button" color="secondary" block className="btn-raised">*/}
                                            {/*    Cancel*/}
                                            {/*</Button>*/}
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        authError: state.auth.authError,
        emptyLogin: state.auth.emptyLogin,
        emptyPassword: state.auth.emptyPassword,
    };
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            login,
            getTranslations,
            getPages,
            loginIsEmpty,
            passwordIsEmpty
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
