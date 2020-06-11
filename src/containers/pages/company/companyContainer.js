import CompanyPage from "./mainPage/companyPage";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

function mapStateToProps(state) {

    return {

    }
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators(
        {

        },
        dispatch
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyPage)