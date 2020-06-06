import React from "react";
import classes from './productType.module.css'
import Grid from '@material-ui/core/Grid';
import Translate from "../../../../../../../Translate";
import SwitchesUi from "../../../../../../../components/switchUI/switchUI";
import ButtonUi from "../../../../../../../components/buttons/buttonUi";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import LinearProgress from '@material-ui/core/LinearProgress';
import Tooltip from "@material-ui/core/Tooltip";

const ProductType = props => {

    const onEditHandler = product => {
        props.toggleModal('edit', product.id)
        props.actions('get', product)
    }

    const onDeleteHandler = product => {
        props.toggleModal('delete', product.id);
        props.actions('get', product)
    }

    return (
        <Grid container justify='center' spacing={3}>
            {
                props.data ?
                    props.data.map(
                        product => {

                            return (
                                <Grid key={product.id} item xs={'auto'}>
                                    <div className={classes.product}>
                                        <div className={classes.controllers}>
                                            <SwitchesUi
                                                size='small'
                                                mBottom={0}
                                                name={'hasSuppliers'}
                                                color={"primary"}
                                                value={product.active}
                                                // onChange={event => props.changeSwitchHandler(event.target.name, event.target.value)}
                                            />
                                            {
                                                props.editabledStatus ?
                                                    <>
                                                        <ButtonUi
                                                            width={40}
                                                            height={40}
                                                            // variant={'contained'}
                                                            margin={'5px 0 0 0'}
                                                            onClick={onEditHandler.bind(this, product)}
                                                        >
                                                            <EditIcon fontSize='small'/>
                                                        </ButtonUi>
                                                        <ButtonUi
                                                            width={40}
                                                            height={40}
                                                            // variant={'contained'}
                                                            color={'secondary'}
                                                            margin={'5px 0 0 0'}
                                                            onClick={onDeleteHandler.bind(this, product)}
                                                        >
                                                            <DeleteIcon fontSize='small'/>
                                                        </ButtonUi>
                                                    </>
                                                    :
                                                    null
                                            }
                                        </div>
                                        <div className={classes.productImage}>
                                            {
                                                product.pictures.length ?
                                                    <img className={classes.image}
                                                         src={product.pictures[0].image}
                                                         alt="product"
                                                    />
                                                    :
                                                    <img className={classes.image}
                                                         src={process.env.PUBLIC_URL + 'folder-add.gif'}
                                                         alt="product"
                                                    />
                                            }

                                        </div>
                                        <div className={classes.textContent}>
                                            <h5>{product.name}</h5>
                                            <hr className={classes.productNameUnderline}/>
                                            <ul className={classes.productSpecifications}>
                                                <li>
                                                    <small>
                                                        <i>
                                                            <Translate name={'sku'}/>
                                                        </i>
                                                    </small>
                                                    <b>
                                                        {
                                                            product.sku ?
                                                                product.sku
                                                                :
                                                                '-'
                                                        }
                                                    </b>
                                                </li>
                                                <li>
                                                    <small>
                                                        <i>
                                                            <Translate name={'suppliers'}/>
                                                        </i>
                                                    </small>
                                                    <b>
                                                        {
                                                            product.supplier ?
                                                                <>
                                                                    {product.supplier.name}
                                                                </>
                                                                :
                                                                '-'
                                                        }
                                                    </b>
                                                </li>
                                                <li>
                                                    <small>
                                                        <i>
                                                            <Translate name='barcode'/>
                                                        </i>
                                                    </small>
                                                    <b>
                                                        {
                                                            product.barcode ?
                                                                product.barcode.length ?
                                                                    <Tooltip
                                                                        title={
                                                                            product.barcode.map(
                                                                                item => {

                                                                                    return (
                                                                                        <React.Fragment
                                                                                            key={item.id}>
                                                                                            {`${item.barcode}`}
                                                                                            <br/>
                                                                                        </React.Fragment>
                                                                                    )
                                                                                }
                                                                            )
                                                                        }
                                                                        placement="right"
                                                                    >
                                                                        <span>
                                                                            {
                                                                                product.barcode[0].barcode
                                                                            }
                                                                        </span>
                                                                    </Tooltip>
                                                                    :
                                                                    '-'
                                                                :
                                                                '-'
                                                        }
                                                    </b>
                                                </li>
                                            </ul>
                                            <div className={classes.productDescription}>
                                                {
                                                    product.description ?
                                                        product.description
                                                        :
                                                        null
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </Grid>
                            )
                        }
                    )
                    :
                    <Grid item xs={12}>
                        <LinearProgress color="secondary"/>
                    </Grid>
            }
        </Grid>
    )
}

export default ProductType