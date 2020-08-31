import React from 'react'

const CustomInput = props => {

    return (
        <>
            {
                props.inputType === 'inner' ?
                    <label
                        htmlFor={props.id}
                        className={props.classNameLabel}
                    >
                        {props.label}
                        <input
                            id={props.id}
                            className={props.classNameInput}
                            // -----
                            type={props.type}
                            name={props.name}
                            hidden={props.hidden}
                            required={props.required}
                            placeholder={props.placeholder}
                            value={props.value}
                            multiple={props.multiple}
                            accept={props.accept}
                            // Methods
                            onFocus={props.onFocus}
                            onBlur={props.onBlur}
                            onChange={props.onChange}
                        />
                        {props.children}
                    </label>
                    :
                    <>
                        <label
                            htmlFor={props.id}
                            className={props.classNameLabel}
                            onClick={props.onClick}
                        >
                            {props.label}
                        </label>
                        <input
                            readOnly={props.readOnly }
                            ref={props.inputRef}
                            id={props.id}
                            className={props.classNameInput}
                            // -----
                            multiple={props.multiple}
                            type={props.type}
                            name={props.name}
                            hidden={props.hidden}
                            required={props.required}
                            placeholder={props.placeholder}
                            value={props.value}
                            accept={props.accept}
                            // Methods
                            onFocus={props.onFocus}
                            onBlur={props.onBlur}
                            onChange={props.onChange}
                        />
                    </>
            }

        </>
    )
}

export default CustomInput