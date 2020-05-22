import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import ImportPage from "./importPage";
import {
    addFile,
    changeFormDataValue,
    checkTouched,
    clearAll,
    checkFormValidate
} from '../../../redux/import/actions'

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        addFile,
        changeFormDataValue,
        checkTouched,
        clearAll,
        checkFormValidate
    }, dispatch)
}

const mapStateToProps = state => {

    return {
        exel: state.importReducer.exel,
        file: state.importReducer.file,
        errorType: state.importReducer.errorType,
        uploadText: state.importReducer.uploadText,
        formData: state.importReducer.formData,
        formDataValue: state.importReducer.formDataValue,
        error: state.importReducer.error,
        sectionFontColor: state.customizer.sidebarSize.sectionFontColor,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportPage)