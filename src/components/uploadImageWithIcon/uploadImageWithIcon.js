import React from "react";
import classes from './uploadImageWithIcon.module.css'
import {Col, Row} from "reactstrap";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Translate from "../../Translate";
import ImageViewer from "../../containers/pages/group/imageViewer/imageViewer";

const UploadWithIcon = props => {

    return (
        <Row>
            <Col md={4}>
                {
                    props.image ?
                        <ImageViewer
                            image={props.image}
                            onClick={props.onClick}
                        />
                        :
                        <>
                            <label
                                className={classes.btnLabel}
                                htmlFor={props.id}
                            >
                                <img className={classes.btnImage} src={process.env.PUBLIC_URL + '/folder-add.gif'}
                                     alt={props.alt}/>
                            </label>
                            <input
                                hidden={props.hidden}
                                id={props.id}
                                type="file"
                                accept="image/*"
                                value={props.value}
                                name={props.name}
                                onChange={props.onChange}
                            />
                        </>
                }
            </Col>
            <Col md={8}>
                <List aria-label="secondary mailbox folders">
                    <ListItem>
                        <ListItemText primary={<Translate name={'Image name'}/>}/> {props.fileName}
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={<Translate name={'Image size'}/>}/> {props.fileSize} {props.fileSize ? <Translate name={'bytes'} /> : null}
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={<Translate name={'Image type'}/>}/> {props.fileType}
                    </ListItem>
                </List>
            </Col>
        </Row>
    )
}

export default UploadWithIcon