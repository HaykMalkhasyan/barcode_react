import React from "react";
import classes from './listType.module.css';
import Grid from '@material-ui/core/Grid';
import SlideComponent from "./slideComponent/slideComponent";
import Translate from "../../../../../../../Translate";
import AlertUi from "../../../../../../../components/alertUi/alertUi";
import ListContent from "./listContent/listContent";

const ListType = props => {

    return (
        <Grid container>
            {
                props.data ?
                    props.data.map(
                        product => {

                            return (
                                <Grid
                                key={product.id}
                                    container
                                    item
                                    spacing={2}
                                    className={classes.product}
                                >
                                    <Grid item md={4}>
                                        <SlideComponent
                                            images={product.pictures}
                                        />
                                    </Grid>
                                    <Grid item md={8}>
                                        <ListContent
                                            data={product}
                                            editabledStatus={props.editabledStatus}
                                            toggleModal={props.toggleModal}
                                            actions={props.actions}
                                        />
                                    </Grid>
                                </Grid>
                            )
                        }
                    )
                    :
                    <AlertUi
                        type={'warning'}
                      text={<Translate name={'product is empty'}/>}
                    />
            }
        </Grid>
    )
}

export default ListType;