import React from "react";
import {getValidationErrorKey} from "../../helpers/formHelper";
import {useTranslation} from "react-i18next";

function FormInput(props) {
    const className = props.error === '' ? '' : 'error-input';
    const name = props.name;
    const errorSpanId = 'error' + name[0].toUpperCase() + name.slice(1);

    const {t} = useTranslation();
    let translatedErrorMessage;
    if(props.error !== '') {
        const error = props.error;
        const errorKey = getValidationErrorKey(error);
        translatedErrorMessage = t(errorKey);
    } else {
        translatedErrorMessage = '';
    }
    return(
        <>
            <label htmlFor={props.name}>
                {props.label}:
                {props.required && <span className="symbol-required">*</span>}
            </label>
            <input
                type={props.type}
                className={className}
                name={props.name}
                id={props.name}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
                checked={props.value === true}
            />
            <span id={errorSpanId} className="errors-text">{translatedErrorMessage}</span>
        </>
    )
}

export default FormInput