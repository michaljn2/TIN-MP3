const formMode = {
    NEW: 'NEW',
    EDIT: 'EDIT'
}
export default formMode

export const formValidationKeys = {
    required: "required",
    invalidForm: "invalidForm",
    firstName: "firstName",
    lastName: "lastName",
    index: "index",
    birthDateRegex: "birthDateRegex",
    birthDateMature: "birthDateMature",
    emailRange: "emailRange",
    emailRegex: "emailRegex",
    shortcut: "shortcut",
    course: "course",
    capacityInteger: "capacityInteger",
    capacityRange: "capacityRange",
    password: "password",
    repeatPassword: "repeatPassword",
    courseFromShortcut: "courseFromShortcut",
    emailFromIndex: "emailFromIndex"
}

export function getValidationErrorKey(error){
    return `validation.${error}`;
}
