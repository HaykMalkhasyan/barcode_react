import React, {useState} from "react";
import classes from "./user-header-content.module.css";
import CustomButton from "../../../../../components/UI/button/customButton/customButton";
import EditIcon from '@material-ui/icons/Edit';
import NavigationContent from "./navigation-content/navigation-content";

const UserHeaderContent = props => {
    const [active, setActive] = useState(null)
    const navigation_data = [
        {id: 1, name: "Գլխավոր"},
        {id: 2, name: "Փաստաթղթեր"},
        {id: 3, name: "Վաճառքներ"},
        {id: 4, name: "Նշումներ"},
        {id: 5, name: "Հանձնարարություններ"},
    ]

    const selectTabHandler = id => setActive(id);

    return (
        <div className={classes.contentWindow}>
            <div className={classes.contentWindowHeader}>
                <h1 className={classes.userName}>
                    {
                        props.user ?
                            `${props.user.firstName} ${props.user.lastName}`
                            :
                            "Օգտատեր"
                    }
                </h1>
                <CustomButton
                    className={classes.editProfileButton}
                    children={
                        <><span>Խմբագրել պրոֆիլը</span> <EditIcon className={classes.editIcon}/></>
                    }
                />
            </div>
            <NavigationContent
                active={active}
                data={navigation_data}
                // Methods
                selectTab={selectTabHandler}
            />
        </div>
    )
}

export default UserHeaderContent