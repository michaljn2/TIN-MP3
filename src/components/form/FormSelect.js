import React from "react";

function FormSelect(props) {
    const className = props.error === '' ? '' : 'error-input';
    const name = props.name;
    const errorSpanId = 'error' + name[0].toUpperCase() + name.slice(1);
    const options = props.options;
    return(
        <>
            <label htmlFor={props.name}>
                {props.label}:
                {props.required && <span className="symbol-required">*</span>}
            </label>
            <select
                value={props.value}
                onChange={props.onChange}
                className={className}
                name={props.name}
                id={props.name}
                >
                {options.map(({label, value}, index) => <option value={value} selected={value === props.value}>{label}</option> )}
            </select>
            <span id={errorSpanId} className="errors-text">{props.error}</span>
        </>
    )
}
export default FormSelect