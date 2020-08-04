import React from 'react'

const CustomTextArea = props => {

    return (
        <textarea
            name={props.name}
            id={props.id}
            className={props.className}
            placeholder={props.placeholder}
            // Methods
            onChange={props.onChange}
        />
    )
};

export default CustomTextArea;