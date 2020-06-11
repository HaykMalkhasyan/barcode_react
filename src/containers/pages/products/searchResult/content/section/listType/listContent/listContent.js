import React from "react";
import classes from './listContent.module.css';
import Translate from "../../../../../../../../Translate";
import Tooltip from "@material-ui/core/Tooltip";
import SwitchesUi from "../../../../../../../../components/switchUI/switchUI";
import ButtonUi from "../../../../../../../../components/buttons/buttonUi";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const ListContent = props => {

    const onEditHandler = product => {
        props.toggleModal('edit', product.id)
        props.actions('get', product)
    }

    const onDeleteHandler = product => {
        props.toggleModal('delete', product.id);
        props.actions('get', product)
    }

    return (
        <div className={classes.productInfo}>
            <h5>{props.data.name}</h5>
            <ul className={classes.productSpecification}>
                <li className='ml-2'>
                    <small className='mr-1'>
                        <Translate name={'sku'}/>
                    </small>
                    <b className='mr-1'>
                        {
                            props.data.sku ?
                                props.data.sku
                                :
                                '-'
                        }
                    </b>
                    |
                </li>
                <li className='ml-2'>
                    <small className='mr-1'>
                        <Translate name={'suppliers'}/>
                    </small>
                    <b className='mr-1'>
                        {
                            props.data.supplier ?
                                <>
                                    {props.data.supplier.name}
                                </>
                                :
                                '-'
                        }
                    </b>
                    |
                </li>
                <li className='ml-2'>
                    <small className='mr-1'>
                        <Translate name={'barcode'}/>
                    </small>
                    <b className='mr-1'>
                        {
                            props.data.barcode ?
                                props.data.barcode.length ?
                                    <Tooltip
                                        title={
                                            props.data.barcode.map(
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
                                                props.data.barcode[0].barcode
                                            }
                                        </span>
                                    </Tooltip>
                                    :
                                    '-'
                                :
                                '-'
                        }
                    </b>
                    |
                </li>
            </ul>
            <div className={classes.description}>
                {
                    props.data.description ?
                        props.data.description
                        :
                        null
                }
            </div>
            <div className={classes.controllers}>
                <SwitchesUi
                    size='small'
                    mBottom={0}
                    name={'hasSuppliers'}
                    color={"primary"}
                    value={props.data.active}
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
                                onClick={onEditHandler.bind(this, props.data)}
                            >
                                <EditIcon fontSize='small'/>
                            </ButtonUi>
                            <ButtonUi
                                width={40}
                                height={40}
                                // variant={'contained'}
                                color={'secondary'}
                                margin={'5px 0 0 0'}
                                onClick={onDeleteHandler.bind(this, props.data)}
                            >
                                <DeleteIcon fontSize='small'/>
                            </ButtonUi>
                        </>
                        :
                        null
                }
            </div>
        </div>
    )
}

export default ListContent