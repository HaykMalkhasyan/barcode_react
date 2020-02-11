import React, { Component } from "react";
import {
    Row,
    Col,
    Input,
    Form,
    FormGroup,
    Button,
    Card,
    CardBody
} from "reactstrap";
import  jwt  from 'jwt-simple';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { login } from "../../redux/auth/actions";


class LoginContainer extends Component {
    state = {
        rememberMe: false
    };
    handleChange = event => {
        this.setState({ ...this.state, [event.target.name]: event.target.value });
    };
    handleChecked = e => {
        this.setState({...this.state,rememberMe: !this.state.rememberMe});
    };
    onSubmit = () => {
        let data = [this.state.username,jwt.encode(this.state.password, "password")];
        this.props.login(data,'index')
    }

    render() {
        return (
            <div className="container">
                <Row className="full-height-vh">
                    <Col xs="12" className="d-flex align-items-center justify-content-center">
                        <Card className="gradient-indigo-purple text-center width-400">
                            <CardBody>
                                <h2 className="white py-4">Login</h2>
                                <Form className="pt-2">
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
                                                <div className="custom-control custom-checkbox mb-2 mr-sm-2 mb-sm-0 ml-3">
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
                                            <Button  color="danger" block className="btn-pink btn-raised" onClick={this.onSubmit}>
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
    return state;
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            login
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
