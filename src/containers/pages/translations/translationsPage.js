import React, {Component} from "react";
import {Col, Card, CardBody} from "reactstrap";
import TableComponent from './translationsTable';
import ModalComponent from './translationsModal';
import MyButton from "../../../components/buttons/button";
import classes from './translationPage.module.css'
import {Maximize} from 'react-feather';
import Translate from "../../../Translate";

// import {toggleTranslationModal, translationActions} from "../../../redux/lang/actions";


class MenuContainer extends Component {

    componentDidMount() {
        this.props.getTranslations()
        this.props.getTranslationsWithSize(10)
    }

    render() {

        return (
            <Col sm="12">
                <Card>
                    <CardBody>
                        <h4 style={this.props.sectionFontColor ? {color: this.props.sectionFontColor} : null}><Translate name={'Translations'}/></h4>
                        <div className={classes.tabHeader}>
                            <MyButton
                                icon={true}
                                langType={'all'}
                                active={this.props.activeTranslationLang}
                                onClick={
                                    this.props.getTranslationAll.bind(this, 'all', 1, this.props.itemsCountPerPage)
                                }>
                                <Maximize/>
                            </MyButton>
                            <MyButton
                                name={'Հայերեն'}
                                langType={'am'}
                                active={this.props.activeTranslationLang}
                                onClick={
                                    this.props.getTranslationWithLang.bind(this, 'am', 1, this.props.itemsCountPerPage)
                                }
                            />
                            <MyButton
                                name={'Русский'}
                                langType={'ru'}
                                active={this.props.activeTranslationLang}
                                onClick={
                                    this.props.getTranslationWithLang.bind(this, 'ru', 1, this.props.itemsCountPerPage)
                                }
                            />
                            <MyButton
                                name={'English'}
                                langType={'us'}
                                active={this.props.activeTranslationLang}
                                onClick={
                                    this.props.getTranslationWithLang.bind(this, 'us', 1, this.props.itemsCountPerPage)
                                }
                            />
                        </div>
                        <TableComponent
                            editabledStatus={this.props.editabledStatus}
                            resetActiveTranslationLang={this.props.resetActiveTranslationLang}
                            translationEditableToggle={this.props.translationEditableToggle}
                            sectionFontColor={this.props.sectionFontColor}
                            getTranslationPage={this.props.getTranslationPage}
                            activeTranslationLang={this.props.activeTranslationLang}
                            itemsCountPerPage={this.props.itemsCountPerPage}
                            pageRangeDisplayed={this.props.pageRangeDisplayed}
                            totalItemsCount={this.props.totalItemsCount}
                            activePage={this.props.activePage}
                            setCount={this.props.setCount}
                            data={this.props.translationsSize}
                            toggleModal={this.props.toggleTranslationModal}
                            actions={this.props.translationActions}
                            // perm={this.props.perm}
                        />
                    </CardBody>
                </Card>
                <ModalComponent {...this.props} type={'add'}/>
                <ModalComponent {...this.props} type={'edit'}/>
                <ModalComponent {...this.props} type={'delete'}/>


            </Col>
        )
    }
}


export default MenuContainer;
