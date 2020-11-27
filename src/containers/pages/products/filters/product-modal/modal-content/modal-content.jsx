import React, {useState} from "react";
import classes from "./modal-content.module.css";
import ModalTabs from "./modal-tabs/modal-tabs";
import ModalTabPages from "./modal-tab-pages/modal-tab-pages";
import MainTab from "../../product/modals/addContent/content/mainTab/mainTab";
import ClassifiersTab from "../../product/modals/addContent/content/classifiersTab/classifiersTab";
import CodesTab from "../../product/modals/addContent/content/codesTab/codesTab";
import PricesTab from "../../product/modals/addContent/content/pricesTab/pricesTab";
import EmployeesTab from "../../product/modals/addContent/content/employeesTab/employeesTab";
import DescriptionTab from "../../product/modals/addContent/content/descriptionTab/descriptionTab";

const ModalContent = props => {
    const [active, setActive] = useState(0);
    const pages = [MainTab, ClassifiersTab, CodesTab, PricesTab, EmployeesTab, DescriptionTab];

    const selectTab = tab => setActive(tab)

    return (
        <section className={classes.modalContent}>
            <ModalTabs activeTab={active} modalTabs={props.modalTabs} onClick={selectTab}/>
            <ModalTabPages gallery={props.gallery} component={pages[active]}/>
        </section>
    )
}

export default ModalContent