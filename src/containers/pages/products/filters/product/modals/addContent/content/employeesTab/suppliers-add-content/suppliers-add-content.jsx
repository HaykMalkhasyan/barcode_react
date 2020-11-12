import React from "react";
import classes from "./suppliers-add-content.module.css";
import SuppliersList from "./suppliers-list/suppliers-list";
import SuppliersAddContentActions from "./suppliers-add-content-actions/suppliers-add-content-actions";

const SuppliersAddContent = props => {
    const [checked, setChecked] = React.useState([]);
    const cls = [
        classes.listContent,
        checked.length ? classes.withAction : classes.withoutAction
    ];

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const selectSupplier = supplier => {
        props.setSelectSupplier(supplier)
    }

    const selectCheckedSupplier = () => {
        props.setSelectCheckedSupplier(checked)
    }

    return (
        <div className={classes.content}>
            <div className={cls.join(" ")}>
                <SuppliersList
                    suppliers={props.suppliers}
                    selected={props.selected}
                    checked={checked}
                    // Methods
                    selectSupplier={selectSupplier}
                    handleToggle={handleToggle}
                />
            </div>
            {
                checked.length ?
                    <SuppliersAddContentActions
                        onClick={selectCheckedSupplier}
                    />
                    :
                    null
            }
        </div>
    )
}

export default SuppliersAddContent