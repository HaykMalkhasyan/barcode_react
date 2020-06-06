import React from "react";
import classes from '../content.module.css'
import ButtonUi from "../../../../../../components/buttons/buttonUi";
import AppsIcon from '@material-ui/icons/Apps';
import ViewListIcon from '@material-ui/icons/ViewList';
import ReorderIcon from '@material-ui/icons/Reorder';
import Translate from "../../../../../../Translate";
import BuildIcon from "@material-ui/icons/Build";

const Header = props => {

    return (
        <div className={classes.header}>
            {/*<div>*/}
            {/*    <h5 className={classes.productCount}><Translate name={'products'}/></h5>*/}
            {/*</div>*/}
            <div>
                <ButtonUi
                    width={30}
                    height={30}
                    margin={'0 5px'}
                    variant={'contained'}
                    color={props.activeType === 'type-table' ? 'primary' : 'default'}
                    name={'type-table'}
                    onClick={
                        () => props.typeViewHandler('type-table')
                    }
                >
                    <ReorderIcon/>
                </ButtonUi>
                <ButtonUi
                    width={30}
                    height={30}
                    margin={'0 5px'}
                    variant={'contained'}
                    color={props.activeType === 'type-list' ? 'primary' : 'default'}
                    name={'type-list'}
                    onClick={
                        () => props.typeViewHandler('type-list')
                    }
                >
                    <ViewListIcon/>
                </ButtonUi>
                <ButtonUi
                    width={30}
                    height={30}
                    margin={'0 5px'}
                    variant={'contained'}
                    color={props.activeType === 'type-product' ? 'primary' : 'default'}
                    name={'type-product'}
                    onClick={
                        () => props.typeViewHandler('type-product')
                    }
                >
                    <AppsIcon/>
                </ButtonUi>
                <ButtonUi
                    width={30}
                    height={30}
                    margin={'0 5px'}
                    variant={'contained'}
                    label={<BuildIcon fontSize='small' />}
                    color={props.editabledStatus ? 'secondary' : 'default'}
                    onClick={props.editabledProduct}
                />
            </div>
        </div>
    )
}

export default Header