import React, {useState} from "react";
import classes from "./suppliers-add-content.module.css";
import SuppliersList from "./suppliers-list/suppliers-list";
import SuppliersAddContentActions from "./suppliers-add-content-actions/suppliers-add-content-actions";
import CustomInput from "../../../../../../../../../../components/UI/input/customInput/customInput";
import Icons from "../../../../../../../../../../components/Icons/icons";

const SuppliersAddContent = props => {
    const [checked, setChecked] = React.useState([]);
    const [search, setSearch] = useState('');
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
            <div className={classes.searchWindow}>
                <CustomInput
                    id={'supplier-search'}
                    type={"search"}
                    classNameInput={classes.search}
                    classNameLabel={classes.searchLabel}
                    label={<Icons type={"search"} width={14} height={17}/>}
                    placeholder={"Որոնել․․․"}
                    value={search}
                    // Methods
                    onChange={event => {
                        setSearch(event.target.value)
                    }}
                />
            </div>
            <div className={cls.join(" ")}>
                <SuppliersList
                    suppliers={props.suppliers}
                    selected={props.selected}
                    checked={checked}
                    search={search}
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