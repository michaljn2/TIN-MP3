function resetErrors (inputs, errorTexts, errorInfo) {
// try catche dlatego, ze przy update Studenta nie ma pól password i repeatPassword
    for (let i=0; i < inputs.length; i++) {
        try {
            inputs[i].classList.remove("error-input");
        } catch (error){

        }
    }
    for (let i=0; i < errorTexts.length; i++) {
        try {
            errorTexts[i].innerText = "";
        } catch (error){

        }
    }
    errorInfo.innerText = "";
}

export function checkRequired(value) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    if (value === "") {
        return false;
    }
    return true;
}

export function checkTextLengthRange(value, min, max) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    const length = value.length;

    if (max && length > max) {
        return false;
    }
    if (min && length < min) {
        return false;
    }
    return true;
}

export function checkIndex(value) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    const re = /^s[1-9][0-9]{0,4}$/;
    return re.test(value);
}

export function checkEmail (value) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(value);
}

export function checkShortcut (value) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    const re = /20[0-9][0-9][LZ]-[A-Z]{2,3}-[1-9][0-9]c/;
    return re.test(value);
}

export function checkCourse (value) {
    if (!value) {
        return false;
    }

    value = value.toString().trim();
    const re = /[A-Z]{2,3}/;
    return re.test(value);
}

export function checkNumber (value) {
    if (!value) {
        return false;
    }

    if (isNaN(value)) {
        return false;
    }
    return true;
}

export function checkInteger (value) {
    if (!value) {
        return false;
    }
    if(isNaN(value)){
        return false;
    }
    value = parseFloat(value);
    return Number.isInteger(value);
}

export function checkNumberRange (value, min, max) {
    if (!value) {
        return false;
    }
    if (isNaN(value)) {
        return false;
    }
    value = parseFloat(value);
    if (value < min) {
        return false;
    }
    if (value > max) {
        return false;
    }
    return true;
}

export function checkDate (value) {
    if (!value) {
        return false;
    }

    const pattern = /(\d{4})-(\d{2})-(\d{2})/i;
    return pattern.test(value);
}

export function checkDateBefore(value, compareTo) {
    if (!value) {
        return false;
    }
    if (!compareTo) {
        return false;
    }

    const pattern = /(\d{4})-(\d{2})-(\d{2})/i;
    if (!pattern.test(value)) {
        return false;
    }

    if (!pattern.test(compareTo)) {
        return false;
    }

    const valueDate = new Date(value);
    const compareToDate = new Date(compareTo);
    if (valueDate.getTime() > compareToDate.getTime()) {
        return false;
    }

    return true;
}
