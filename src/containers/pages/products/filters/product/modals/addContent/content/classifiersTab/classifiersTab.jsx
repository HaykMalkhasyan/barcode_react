import React from 'react'
import classes from './classifiersTab.module.css'

const ClassifiersTab = props => {

    return (
        <div className={classes.classifiersTab}>
            <div className={classes.header}>
                <h3>Դասակարգիչների ընտրություն</h3>
            </div>
            <div className={classes.content}>
                <p className={classes.information}>
                    Հիմնական դասակարգիչ ցանկից կարող եք ընտրել ապրանքին համապատասխան դասակարգիչ կամ ավելացնել նորը և կցել ապրանքին։ Դասակարգիչներն օգնում են հեշտությամբ առանձնացնել նույն կատեգորիային պատկանող ապրանքների ցանկը։
                </p>
            </div>
        </div>
    )
};

export default ClassifiersTab;