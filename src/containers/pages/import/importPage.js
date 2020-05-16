import React, {Component} from "react";
import {Card, Col, Row} from "reactstrap";
import CustomizedSnackbars from "../../../components/snachbarsUI/snachbarsUi";
import HeaderComponent from "./cardHeader/cardHeader";
import BodyComponent from "./cardBody/cardBody";
import FooterComponent from "./cardFooter/cardFooter";
import {clearAll} from "../../../redux/import/actions";

class ImportPage extends Component {
    state = {
        exel: false,
        file: null,
        errorType: null,
        uploadText: ''
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.props.addFile('exel', false)
    };

    importExelHandler = event => {
        let file = event.target.files[0];
        this.props.clearAll();
        if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            this.setState({
                file: file,
            });
            this.props.addFile('exel', true)
            this.props.addFile('uploadText', 'your file added successfully')
            this.props.addFile('errorType', 'success')
            this.props.addFile('file', file.name)
        } else {
            event.target.value = '';
            this.setState({
                file: null,
            })
            this.props.addFile('exel', true)
            this.props.addFile('uploadText', 'file type is not supported, make sure your file is Excel')
            this.props.addFile('errorType', 'error')
            this.props.addFile('file', null)
        }
    }

    componentWillUnmount() {
        this.props.clearAll()
    }

    render() {

        return (
            <Row>
                <Col sm={12}>
                    <Card>
                        <HeaderComponent
                            file={this.state.file}
                            error={this.props.error}
                            onChange={this.importExelHandler}
                        />
                        {
                            this.state.file ?
                                <>
                                    <BodyComponent
                                        // DATA
                                        formData={this.props.formData}
                                        formDataValue={this.props.formDataValue}
                                        //METHODS
                                        changeFormDataValue={this.props.changeFormDataValue}
                                        checkTouched={this.props.checkTouched}
                                    />
                                    <FooterComponent
                                        checkFormValidate={this.props.checkFormValidate}
                                    />
                                </>
                                :
                                null
                        }
                        <CustomizedSnackbars
                            open={this.props.exel}
                            severity={this.props.errorType}
                            text={this.props.uploadText}
                            handleClose={this.handleClose}
                        />
                    </Card>
                </Col>
            </Row>
        )
    }
}

export default ImportPage