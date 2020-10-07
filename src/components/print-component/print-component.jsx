import React, {useRef} from 'react'
import classes from './print-component.module.css'
import Barcode from "react-barcode";

let moveElement;

const PrintComponent = React.forwardRef((props, ref) => {
    const documentRef = useRef();
    const headerName = useRef();
    const countRef = useRef();
    const priceRef = useRef();
    const barcodeRef = useRef();

    const moveHandler = (event, elem) => {
        elem.style.left = event.clientX - documentRef.current.getBoundingClientRect().left - elem.offsetWidth/2 + 'px';
        elem.style.top = event.clientY - documentRef.current.getBoundingClientRect().top - elem.offsetHeight/2 + 'px';
    };

    const clickHandler = (event, elem) => {
        elem.style.position = 'absolute';
        moveElement = event => moveHandler(event, elem);
        window.addEventListener("mousemove", moveElement)
    };

    const endMoving = () => {
        window.removeEventListener("mousemove", moveElement);
        moveElement = null;
    };

    return (
        <div
            ref={ref}
            className={classes.mainContainer}
            style={{
                width: `${props.paper_width}mm`,
                height: `${props.paper_height}mm`,
            }}
        >
            <div
                ref={documentRef}
                className={classes.printComponent}
                style={{
                    width: `${props.paper_width}mm`,
                    height: `${props.paper_height}mm`,
                }}
                onMouseUp={endMoving}
            >
                <h1 ref={headerName}  onMouseDown={event => clickHandler(event, headerName.current)} style={Object.assign({}, {fontFamily: props.font}, props.content_data['name'])}>{props.name}</h1>
                <section ref={barcodeRef} onMouseDown={event => clickHandler(event, barcodeRef.current)}>
                    <Barcode
                        value={props.barcode}
                        format={props.format}
                        font={props.font}
                        height={props.height}
                        width={props.width}
                        background={'transparent'}
                    />
                </section>
                <footer>
                    <span ref={countRef} onMouseDown={event => clickHandler(event, countRef.current)} style={Object.assign({}, {fontFamily: props.font}, props.content_data['count'])}><b>Քանակ։ </b>{props.count}</span>
                    <span ref={priceRef} onMouseDown={event => clickHandler(event, priceRef.current)} style={Object.assign({}, {fontFamily: props.font}, props.content_data['price'])}><b>Գին։ </b>{props.price}</span>
                </footer>
            </div>
        </div>
    )
});

export default PrintComponent;