import React from 'react'
import classes from './employeesTab.module.css'
import SectionWindow from "../../../../../../../../../components/sectionWindow/sectionWindow";
import WorkerItem from "./workers-item/workers-item";

const EmployeesTab = props => {

    return (
        <div className={classes.employeesTab}>
            <div className={classes.content}>
                <p className={classes.information}>
                    Գործընկերոջ ընտրելու կամ փոփոխելու համար անրաժեշտ է սեղմել "Գործընկերներ" տողի վրա և ընտրել համապատասխան գործընկերոջը։
                </p>
                <div className={classes.textFieldWindow}>
                    <SectionWindow
                        label={'Գործընկերներ'}
                    >
                        <div className={classes.workersWindow}>
                            <WorkerItem label={'Մատակարար 1'}/>
                            <WorkerItem label={'Մատակարար 2'}/>
                            <WorkerItem label={'Մատակարար 3'}/>
                            <WorkerItem label={'Մատակարար 4'}/>
                        </div>
                    </SectionWindow>
                </div>
            </div>
        </div>
    )
};

export default EmployeesTab;