import React, {useState} from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'

function SketchExample(props) {
    const [state, setState] = useState({
        displayColorPicker: false,
        color: {
            r: '241',
            g: '112',
            b: '19',
            a: '1',
        },
    });

    const handleClick = () => {
        setState({ displayColorPicker: !state.displayColorPicker })
    };

    const handleClose = () => {
        props.setOpenColor(false)
    };

    const handleChange = (color) => {
        setState({ color: color.rgb })
        props.setColor(color.rgb)
    };

    

        const styles = reactCSS({
            'default': {
                color: {
                    width: '100%',
                    height: '14px',
                    borderRadius: '0',
                    background: `rgba(${ state.color.r }, ${ state.color.g }, ${ state.color.b }, ${ state.color.a })`,
                },
                swatch: {
                    width: '100%',
                    padding: '0',
                    background: '#fff',
                    borderRadius: '0',
                    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                    display: 'inline-block',
                    cursor: 'pointer',
                },
                popover: {
                    position: 'absolute',
                    zIndex: '2',
                },
                cover: {
                    position: 'fixed',
                    top: '0px',
                    right: '0px',
                    bottom: '0px',
                    left: '0px',
                },
            },
        });

        return (
            <div>
                <h6 className={props.classLabel}>{props.label}</h6>
                { props.open ? <div style={ styles.popover }>
                    <div style={ styles.cover } onClick={ handleClose }/>
                    <SketchPicker color={ state.color } onChange={ handleChange } />
                </div> : null }

            </div>
        )
    }


export default SketchExample