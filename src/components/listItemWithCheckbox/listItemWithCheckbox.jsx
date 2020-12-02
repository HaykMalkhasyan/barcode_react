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
import {getLanguage} from "../../controllers/languages/languages";
import cookie from "../../services/cookies";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 460,
        maxHeight: 300,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function CheckboxList(props) {
    const classes = useStyles();

    return (
        <List className={classes.root}>
            {
                props.products && props.products.length ?
                    Object.keys(props.products[0]).map(
                        (item) => {

                            const labelId = `checkbox-list-label-${item}`;

                            return item !== "profile_id" && item !== "item_name" && item !== "id" ?
                                <ListItem
                                    key={item}
                                    role={undefined}
                                    dense
                                    button
                                    onClick={item === "item_name" ? null : () => props.onClick(item)}
                                >
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={item.required ? true : props.activeTabs.indexOf(item) === -1}
                                            tabIndex={-1}
                                            disableRipple
                                            size={'small'}
                                            classes={{
                                                colorSecondary: props.colorSecondary
                                            }}
                                            inputProps={{'aria-labelledby': labelId}}
                                        />
                                    </ListItemIcon>
                                    <ListItemText id={labelId} primary={getLanguage(cookie.get("language") || "am", item).toLowerCase()}/>
                                    {
                                        item === "item_name" ?
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
                                :
                                null
                        }
                    )
                    :
                    <small className={props.emptyStyle}>{props.empty}</small>
            }
        </List>
    );
}
