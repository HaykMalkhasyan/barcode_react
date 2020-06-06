import React, {useState} from "react";
import {Col} from "reactstrap";
import Header from "./header/header";
import Section from "./section/section";

const Content = props => {
    const [activeType, setActiveType] = useState(/*'type-table'*/ 'type-product')

    const typeViewHandler = name => {
        setActiveType(name)
    }

    return (
        <Col lg={8} xl={9} className='py-0'>
            <Header
                activeType={activeType}
                typeViewHandler={typeViewHandler}
                editabledStatus={props.editabledStatus}
                editabledProduct={props.editabledProduct}
            />
            <Section
                activeType={activeType}
                sectionFontColor={props.sectionFontColor}
                searchProduct={props.searchProduct}
                searchErrorName={props.searchErrorName}
                editabledStatus={props.editabledStatus}
                data={props.data}
                searchProductResult={props.searchProductResult}
                //methods
                setSearchProductValue={props.setSearchProductValue}
                toggleModal={props.toggleModal}
                actions={props.actions}
            />
        </Col>
    )
}

export default Content