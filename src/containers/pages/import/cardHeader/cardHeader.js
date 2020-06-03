import React from "react";
import UploadButton from "../../../../components/buttons/upploadBtnUI";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import ListItemText from "@material-ui/core/ListItemText";
import Translate from "../../../../Translate";
import MemoryIcon from "@material-ui/icons/Memory";
import AttachmentIcon from "@material-ui/icons/Attachment";
import {CardHeader} from "reactstrap";

const HeaderComponent = props => {

    return (
        <CardHeader>
            <UploadButton
                variant={'contained'}
                color={'primary'}
                multiple={false}
                onChange={props.onChange}
                accept={'".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'}
                padding={'5px 15px'}
                margin={'2px 2px 10px'}
                label={'Attach a file'}
                title={'Attach a file'}
            />
            {
                props.error ?
                    <p
                        className='danger font-small-3'
                    >
                        {props.error}
                    </p>
                    :
                    null
            }
            {
                props.file ?
                    <List component="nav" aria-label="contacts">
                        <ListItem button>
                            <ListItemIcon>
                                <FileCopyIcon />
                            </ListItemIcon>
                            <ListItemText primary={<Translate name={'File name'}/>} style={props.sectionFontColor ? {color: props.sectionFontColor} : null} />
                            <span style={props.sectionFontColor ? {color: props.sectionFontColor} : null}>{props.file.name}</span>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <MemoryIcon />
                            </ListItemIcon>
                            <ListItemText primary={<Translate name={'File size'}/>} style={props.sectionFontColor ? {color: props.sectionFontColor} : null} />
                            <span style={props.sectionFontColor ? {color: props.sectionFontColor} : null}>{props.file.size}&nbsp;
                            <Translate name={'bytes'}/>
                            </span>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <AttachmentIcon />
                            </ListItemIcon>
                            <ListItemText primary={<Translate name={'File type'}/>} style={props.sectionFontColor ? {color: props.sectionFontColor} : null} />
                            <span style={props.sectionFontColor ? {color: props.sectionFontColor} : null}>{props.file.type}</span>
                        </ListItem>
                    </List>
                    :
                    null
            }
        </CardHeader>
    )
}

export default HeaderComponent