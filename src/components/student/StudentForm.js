import React, {useEffect, useState} from "react";
import {getStudentByIdApiCall, addStudentApiCall, updateStudentApiCall} from "../../apiCalls/studentApiCalls";
import formMode from '../../helpers/formHelper'
import {checkRequired, checkTextLengthRange, checkIndex,
    checkEmail, checkDate, checkDateBefore} from '../../helpers/validationCommon';
import FormInput from "../form/FormInput";
import FormButtons from "../form/FormButtons";
import {getFormattedDate} from "../../helpers/dateHelper";
import {useTranslation, withTranslation} from "react-i18next";
import {formValidationKeys} from "../../helpers/formHelper";
import {Link, useParams, useNavigate} from "react-router-dom";

function StudentForm(){
    const {t} = useTranslation();
    const [stud, setStud] = useState({
        firstName: '',
        lastName: '',
        index: '',
        birthDate: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        index: '',
        birthDate: '',
        email: '',
        password: ''
    })
    const [isLoaded, setIsLoaded] = useState(false);
    const [message, setMessage] = useState(null);
    const [redirect, setRedirect] = useState(false);

    const {studId} = useParams();
    const currentFormMode = studId ? formMode.EDIT : formMode.NEW;
    const navigate = useNavigate();


    function fetchStudentDetails(){
        getStudentByIdApiCall(studId)
            .then(res => res.json())
            .then(
                data => {
                    if(data.message){
                        setMessage(data.message)
                    } else {
                        setStud(data);
                        setMessage(null);
                    }
                    setIsLoaded(true);
                },
                error => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }

   useEffect(() => {
       if (currentFormMode === formMode.EDIT){
           fetchStudentDetails()
       }
   }, []);

    function handleChange(event){
        const {name, value} = event.target;
        const errorMessage = this.validateField(name, value);
        setErrors({
            ...errors,
            [name]: errorMessage
        });
        setStud({
            ...stud,
            [name]: value
        })
    }

    function validateField(fieldName, fieldValue){
        let errorMessage = '';
        if(fieldName === 'firstName'){
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.required;
            } else if (!checkTextLengthRange(fieldValue, 2, 60 )) {
                errorMessage = formValidationKeys.firstName
            }
        }

        if(fieldName === 'lastName'){
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.required
            } else if (!checkTextLengthRange(fieldValue, 2, 60 )) {
                errorMessage = formValidationKeys.lastName
            }
        }

        if (fieldName === 'index'){
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.required
            } else if (!checkIndex(fieldValue)) {
                errorMessage = formValidationKeys.index
            }
        }

        let nowDate = new Date(),
            month = '' + (nowDate.getMonth() + 1),
            day = '' + nowDate.getDate(),
            year = nowDate.getFullYear() - 18;

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        const nowString = [year, month, day].join('-');

        if(fieldName === 'birthDate'){
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.required
            } else if (!checkDate(fieldValue)) {
                errorMessage = formValidationKeys.birthDateRegex
            } else if (!checkDateBefore(fieldValue, nowString)) {
                errorMessage = formValidationKeys.birthDateMature
            }
        }

        if (fieldName === 'email'){
            if(!checkRequired(fieldValue)){
                errorMessage = formValidationKeys.required
            } else if (!checkTextLengthRange(fieldValue, 5, 60)){
                errorMessage = formValidationKeys.emailRange
            } else if(!checkEmail(fieldValue)){
                errorMessage = formValidationKeys.emailRegex
            }
        }

        if (fieldName === 'password' && currentFormMode === 'NEW'){
            if(!checkRequired(fieldValue)){
                errorMessage = formValidationKeys.required
            }
        }
        return errorMessage;
    }

    function handleSubmit(event){
        event.preventDefault();
        const isValid = validateForm();
        if(isValid) {
            let promise, response;
            if(currentFormMode === formMode.NEW) {
                promise = addStudentApiCall(stud);
            } else if (currentFormMode === formMode.EDIT) {
                console.log(stud);
                promise = updateStudentApiCall(studId, stud);
            }

            if(promise){
                promise
                    .then(
                        data => {
                            response = data
                            if(response.status === 201 || response.status === 500){
                                return data.json();
                            }
                        })
                    .then(
                        data => {
                            if(!response.ok && response.status === 500){
                                console.log(data);
                                const serverFieldsErrors = {...errors};
                                for(const i in data) {
                                    const errorItem = data[i];
                                    const errorMessage = errorItem.message;
                                    const fieldName = errorItem.path;
                                    serverFieldsErrors[fieldName] = errorMessage;
                                }
                                setErrors(serverFieldsErrors);
                                setError(null);
                            } else {
                               setRedirect(true);
                            }
                        },
                        error => {
                            setError(error);
                            console.log(error);
                        }
                    )
            }
        }
    }

    function validateForm(){
        let isValid = true;
        let serverFieldErrors = {...errors};
       Object.entries(stud).forEach(([key, value]) => {
           const errorMessage = validateField(key, value);
           serverFieldErrors[key] = errorMessage;
           if (errorMessage.length > 0){
               isValid = false;
           }
       })
        setErrors(serverFieldErrors);
       return isValid;
    }

    function hasErrors(){
        let hasErrors = false;
        Object.values(errors).forEach((value) => {
            if (value.length > 0){
                hasErrors = true;
            }
        })
        return hasErrors;
    }

    useEffect(() => {
        if (redirect){
            navigate('students');
        }
    }, [redirect])

    const errorsSummary = hasErrors() ? t('validation.invalidForm') : '';
    const fetchError = error ? t('common.error')+`: ${error.message}` : '';
    const pageTitle = currentFormMode === formMode.NEW ? t('stud.form.add.pageTitle') : t('stud.form.edit.pageTitle');

    const globalErrorMessage = errorsSummary || fetchError || message;
    return (
        <main>
            <h2>{pageTitle}</h2>
            <form className="form" onSubmit={handleSubmit}>
                <FormInput
                    type="text"
                    label={t('stud.fields.firstName')}
                    required
                    error={errors.firstName}
                    name="firstName"
                    placeholder={t('stud.form.placeholder.firstName')}
                    onChange={handleChange}
                    value={stud.firstName}
                />
                <FormInput
                    type="text"
                    label={t('stud.fields.lastName')}
                    required
                    error={errors.lastName}
                    name="lastName"
                    placeholder={t('stud.form.placeholder.lastName')}
                    onChange={handleChange}
                    value={stud.lastName}
                />
                <FormInput
                    type="text"
                    label={t('stud.fields.index')}
                    required
                    error={errors.index}
                    name="index"
                    placeholder={t('stud.form.placeholder.index')}
                    onChange={handleChange}
                    value={stud.index}
                />
                <FormInput
                    type="date"
                    label={t('stud.fields.birthDate')}
                    required
                    error={errors.birthDate}
                    name="birthDate"
                    placeholder=""
                    onChange={handleChange}
                    value={getFormattedDate(stud.birthDate)}
                />
                <FormInput
                    type="text"
                    label={t('stud.fields.email')}
                    required
                    error={errors.email}
                    name="email"
                    placeholder={t('stud.form.placeholder.email')}
                    onChange={handleChange}
                    value={stud.email}
                />
                <FormInput
                    type="password"
                    label={t('stud.fields.password')}
                    required
                    error={errors.password}
                    name="password"
                    placeholder=""
                    onChange={handleChange}
                />
                <FormButtons
                    formMode={currentFormMode}
                    error={globalErrorMessage}
                    cancelPath="/students"
                />
            </form>
        </main>
    )
}
export default StudentForm