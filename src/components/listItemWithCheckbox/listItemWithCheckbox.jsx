import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 460,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function CheckboxList(props) {
    const classes = useStyles();

    return (
        <List className={classes.root}>
            {
                props.products && props.products.length && props.data && props.data.length ?
                    props.data.map(
                        (item) => {
                            const labelId = `checkbox-list-label-${item.id}`;

                            return (
                                <ListItem
                                    key={item.id}
                                    role={undefined}
                                    dense
                                    button
                                    onClick={item.required ? null : () => props.onClick(item.id)}
                                >
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={item.required ? true : props.activeTabs.indexOf(item.id) !== -1}
                                            tabIndex={-1}
                                            disableRipple
                                            size={'small'}
                                            classes={{
                                                colorSecondary: props.colorSecondary
                                            }}
                                            inputProps={{'aria-labelledby': labelId}}
                                        />
                                    </ListItemIcon>
                                    <ListItemText id={labelId} primary={item.name}/>
                                    {
                                        item.required ?
                                            <ListItemSecondaryAction>
                                                <IconButton edge="end" style={{cursor: 'help'}} aria-label="comments">
                                                    <Tooltip title="Տվալ բաժինը պարտադիր է" placement="right">
                                                        <VerifiedUserIcon style={{fontSize: 14}}/>
                                                    </Tooltip>
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                            :
                                            null
                                    }
                                </ListItem>
                            );
                        }
                    )
                    :
                    <small className={props.emptyStyle}>{props.empty}</small>
            }
        </List>
    );
}
