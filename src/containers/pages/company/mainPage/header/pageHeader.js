import React from "react";
import cls from './pageHeader.module.css';
import Translate from "../../../../../Translate";
import CustomButton from "../../../../../components/buttons/myButton";

const PageHeader = props => {

    return (
        <div className={cls.pageHeader}>
            <h1><Translate name={'myCompany'}/></h1>
            <CustomButton
                className={cls.addButton}
                onClick={
                    () => console.log('add company')
                }
                children={
                    <Translate name={'add'}/>
                }
            />
        </div>
    )
}

export default PageHeader