import React from 'react'
import DialogUI from "../../../../../components/dialogUI/dialogUI";
import AddContent from "./addContent/addContent";

const ProductModal = props => {
    switch (props.type) {
        case 'add':
            return (
                <DialogUI
                    label={'Ավելացնել ապրանք'}
                    maxWidth={false}
                    scroll={props.scroll}
                    open={props.open === "add"}
                    paper={props.paper}
                    children={
                        <AddContent/>
                    }
                    // Methods
                    handleClose={props.handleClose}
                />
            )
        case 'edit':
            return (
                <DialogUI
                    label={'Փոփոխել ապրանքը'}
                    maxWidth={'lg'}
                    scroll={props.scroll}
                    open={props.open === "edit"}
                    children={
                        <div>
                            <h1>Փոփոխել ապրանք</h1>
                        </div>
                    }
                    // Methods
                    handleClose={props.handleClose}
                />
            )
        case 'delete':
            return (
                <DialogUI
                    label={'Ջնջել ապրանքը'}
                    maxWidth={'md'}
                    scroll={props.scroll}
                    open={props.open === "delete"}
                    children={
                        <div>
                            <h1>Ջնջել ապրանք</h1>
                        </div>
                    }
                    // Methods
                    handleClose={props.handleClose}
                />
            )
        default: return null;
    }
}

export default ProductModal