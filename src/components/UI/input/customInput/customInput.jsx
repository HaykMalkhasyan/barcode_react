import React, {useEffect, useRef} from 'react'

const CustomInput = props => {
    const ref = useRef()

    useEffect(() => {
        if (props.checkRef) {
            ref.current.focus()
        }
    })

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
                            ref={ref}
                            className={props.classNameInput}
                            // -----
                            autoFocus={props.autoFocus}
                            type={props.type}
                            name={props.name}
                            hidden={props.hidden}
                            required={props.required}
                            placeholder={props.placeholder}
                            disabled={props.disabled}
                            value={props.value}
                            readOnly={props.readOnly}
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
                            autoFocus={props.autoFocus}
                            ref={props.inputRef || ref}
                            id={props.id}
                            className={props.classNameInput}
                            disabled={props.disabled}
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