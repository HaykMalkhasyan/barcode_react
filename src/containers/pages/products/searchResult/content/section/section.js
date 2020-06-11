import React from "react";
import Alert from '@material-ui/lab/Alert';
import Translate from "../../../../../../Translate";
import TableType from "./tableType/tableType";
import ProductType from "./productType/productType";
import ListType from "./listType/listType";

const Section = props => {

    const productsShowTypeRender = activeType => {

        switch (activeType) {

            case 'type-list': {
                return <ListType
                    //variables
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
                />;
            }
            case 'type-product': {
                return <ProductType
                    //variables
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
                />;
            }
            default: {
                return <TableType
                    //variables
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
                />;
            }
        }
    }

    return (
        <>
            <Alert className='my-1' severity="success"><Translate name={'found products'}/> {props.data.length}</Alert>
            <div className="mt-4">
                {
                    productsShowTypeRender(props.activeType)
                }
            </div>
        </>
    )
}

export default Section