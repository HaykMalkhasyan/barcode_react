import React from 'react'
import classes from './print-content.module.css'
import ToolsComponent from "./tools-component/tools-component";

const PrintContent = props => {

    const left_cls = [
        classes.col8,
        classes.flexContainer,
        classes.justifyCenter,
    ];
    const right_cls = [
        classes.col4
    ];

    return (
        <section className={classes.printContent}>
            <div className={left_cls.join(' ')}>
                <div className={classes.workWindow}>
                    {props.children}
                </div>
            </div>
            <div className={right_cls.join(' ')}>
                <ToolsComponent
                    width={props.width}
                    height={props.height}
                    font_data={props.font_data}
                    font={props.font}
                    papers={props.papers}
                    content_data={props.content_data}
                    elem_data={props.elem_data}
                    content={props.content}
                    paper_width={props.paper_width}
                    paper_height={props.paper_height}
                    // Methods
                    setBarcodeValue={props.setBarcodeValue}
                    setPaperSize={props.setPaperSize}
                    changeElementSizes={props.changeElementSizes}
                />
            </div>
        </section>
    )
};

export default PrintContent;