import React from 'react'
import classes from './codesTab.module.css'
import CustomButton from "../../../../../../../../../components/UI/button/customButton/customButton";
import Icons from "../../../../../../../../../components/Icons/icons";
import SectionWindow from "./sectionWindow/sectionWindow";

const CodesTab = props => {

    return (
        <div className={classes.codesTab}>
            <div className={classes.header}>
                <h3>Կոդեր</h3>
            </div>
            <div className={classes.content}>
                <p className={classes.information}>
                    Այն ապրանքները, որոնք ունեն գծիկավոր կոդ անհրաժեշտ է կոդ դաշտում լրացնել, որպեսզի տվյալ կոդով հնարավոր լինի վաճառել ապրանքը։ Որոնք կոդեր չունեն կարող եք ծրագրով ստեղծել կոդ՝ սեղմելով "ԳԵՆԵՐԱՑՆԵԼ" կոճակը։
                </p>
                <div className={classes.gridContainer}>
                    <div className={classes.codActions}>
                        <SectionWindow
                            label={'Կոդի ավելացում/փոփոխում'}
                        />
                    </div>
                    <div className={classes.transformActions}>
                        <div className={classes.transformActionsWindow}>
                            <CustomButton
                                className={`${classes.arrowButton} ${classes.leftArrowButton}`}
                                children={<Icons type={'left-arrow'} className={classes.leftArrowIcon}/>}
                            />
                            <CustomButton
                                className={`${classes.arrowButton} ${classes.rightArrowButton}`}
                                children={<Icons type={'right-arrow'} className={classes.rightArrowIcon}/>}
                            />
                        </div>
                    </div>
                    <div className={classes.attachment}>
                        <SectionWindow
                            label={'Ապրանքին կցված կոդերի ցանկ'}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default CodesTab;