import React, {Component} from "react";
import cls from './companyPage.module.css'
import PageHeader from "./header/pageHeader";
import PageContent from "./content/pageContent";

class CompanyPage extends Component {

    render() {

        return (
            <div className={cls.companyPage}>
                <PageHeader/>
                <PageContent/>
            </div>
        )
    }
}

export default CompanyPage