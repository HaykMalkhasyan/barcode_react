import React from 'react'
import classes from './classifiersTab.module.css'
import CustomButton from "../../../../../../../../../components/UI/button/customButton/customButton";
import Icons from "../../../../../../../../../components/Icons/icons";
import {connect} from "react-redux";
import {getAllGroup, setGroupValues} from "../../../../../../../../../Redux/characteristics/actions";

const ClassifiersTab = props => {

    return (
        <div className={classes.classifiersTab}>
            <div className={classes.header}>
                <h3>Դասակարգիչների ընտրություն</h3>
            </div>
            <div className={classes.content}>
                <p className={classes.information}>
                    Հիմնական դասակարգիչ ցանկից կարող եք ընտրել ապրանքին համապատասխան դասակարգիչ կամ ավելացնել նորը և
                    կցել ապրանքին։ Դասակարգիչներն օգնում են հեշտությամբ առանձնացնել նույն կատեգորիային պատկանող
                    ապրանքների ցանկը։
                </p>
                <div className={classes.classifiersControlWindow}>
                    <CustomButton
                        className={classes.addButton}
                        children={<Icons type={'plus'}/>}
                        // Methods
                        onClick={
                            () => {
                                props.getAllGroup();
                                props.setGroupValues('modalGroup', "select")
                            }
                        }
                    />
                    <div className={classes.classifiersButtonsGroup}>
                        <div className={classes.classifiersItem}>
                            <CustomButton
                                className={classes.classifiersCloseButton}
                                children={<Icons type={'close'} className={classes.classifiersCloseIcon} width={10}
                                                 height={10}/>}
                            />
                            <header>
                                <h4>Դասակարգիչ</h4>
                                <h4>Դասակարգիչի խումբ</h4>
                            </header>
                            <section>
                                <CustomButton
                                    className={classes.classifiersButtons}
                                    children={'Հիմնական դասակարգիչ'}
                                />
                            </section>
                        </div>
                        <div className={classes.classifiersItem}>
                            <CustomButton
                                className={classes.classifiersCloseButton}
                                children={<Icons type={'close'} className={classes.classifiersCloseIcon} width={10}
                                                 height={10}/>}
                            />
                            <header>
                                <h4>Դասակարգիչ</h4>
                                <h4>Դասակարգիչի խումբ</h4>
                            </header>
                            <section>
                                <CustomButton
                                    className={classes.classifiersButtons}
                                    children={'Խմիչքներ'}
                                />
                                <span>Ալկոհոլային</span>
                            </section>
                        </div>
                        <div className={classes.classifiersItem}>
                            <CustomButton
                                className={classes.classifiersCloseButton}
                                children={<Icons type={'close'} className={classes.classifiersCloseIcon} width={10}
                                                 height={10}/>}
                            />
                            <header>
                                <h4>Դասակարգիչ</h4>
                                <h4>Դասակարգիչի խումբ</h4>
                            </header>
                            <section>
                                <CustomButton
                                    className={classes.classifiersButtons}
                                    children={'Կահույք'}
                                />
                                <span>Հյուրասենյակի կահույքներ</span>
                            </section>
                        </div>
                        <div className={classes.classifiersItem}>
                            <CustomButton
                                className={classes.classifiersCloseButton}
                                children={<Icons type={'close'} className={classes.classifiersCloseIcon} width={10}
                                                 height={10}/>}
                            />
                            <header>
                                <h4>Դասակարգիչ</h4>
                                <h4>Դասակարգիչի խումբ</h4>
                            </header>
                            <section>
                                <CustomButton
                                    className={classes.classifiersButtons}
                                    children={'Էլեկտրոնիկա'}
                                />
                                <span>Համակարգիչներ</span>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

function mapStateToProps(state) {

    return {}
}

function mapDispatchToProps(dispatch) {

    return {
        setGroupValues: (name, value) => dispatch(setGroupValues(name, value)),
        getAllGroup: () => dispatch(getAllGroup())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassifiersTab);