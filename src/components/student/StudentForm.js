import React from "react";
import {getStudentByIdApiCall} from "../../apiCalls/studentApiCalls";
import formMode from '../../helpers/formHelper'
import {checkRequired, checkTextLengthRange, checkIndex,
    checkEmail, checkDate, checkDateBefore} from '../../helpers/validationCommon';

class StudentForm extends React.Component {
    constructor(props) {
        super(props);
        const paramsStudId = props.match.params.studId;
        const currentFormMode = paramsStudId ? formMode.EDIT : formMode.NEW;

        this.state = {
            studId: paramsStudId,
            stud: {
                firstName: '',
                lastName: '',
                index: '',
                birthDate: '',
                email: ''
            },
            errors:{
                firstName: '',
                lastName: '',
                index: '',
                birthDate: '',
                email: ''
            },
            formMode: currentFormMode,
            redirect: false,
            error: null
        }
    }

    fetchStudentDetails = () => {
        getStudentByIdApiCall(this.state.studId)
            .then(res => res.json())
            .then(
                data => {
                    if(data.message){
                        this.setState({
                            message: data.message
                        })
                    } else {
                        this.setState({
                            stud: data,
                            message: null
                        })
                    }
                    this.setState({
                        isLoaded: true
                    })
                },
                error => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                }
            )
    }

    componentDidMount = () => {
        const currentFormMode = this.state.formMode;
        if(currentFormMode === formMode.EDIT){
            this.fetchStudentDetails();
        }
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        const stud = {...this.state.stud}
        stud[name] = value;

        const errorMessage = this.validationField(name, value);
        const errors = {...this.state.errors};
        errors[name] = errorMessage;

        this.setState({
            stud: stud,
            errors: errors
        })
    }

    validateField = (fieldName, fieldValue) => {
        let errorMessage = '';
        if(fieldName === 'firstName'){
            if (!checkRequired(fieldValue)) {
                errorMessage = 'Pole jest wymagane'
            } else if (!checkTextLengthRange(fieldValue, 2, 60 )) {
                errorMessage = "Pole powinno zawierać od 2 do 60 znaków"
            }
        }

        if(fieldName === 'lastName'){
            if (!checkRequired(fieldValue)) {
                errorMessage = 'Pole jest wymagane'
            } else if (!checkTextLengthRange(fieldValue, 2, 60 )) {
                errorMessage = "Pole powinno zawierać od 2 do 60 znaków"
            }
        }

        if (fieldName === 'index'){
            if (!checkRequired(fieldValue)) {
                errorMessage = "Pole jest wymagane"
            } else if (!checkIndex(fieldValue)) {
                errorMessage = "To pole musi zawierać 's' oraz 5-znakowy numer studenta (np.s2222)"
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
                errorMessage = "Pole jest wymagane"
            } else if (!checkDate(fieldValue)) {
                errorMessage = "To pole musi zawierać datę w formacie yyyy-MM-dd (np. 2001-01-11)"
            } else if (!checkDateBefore(fieldValue, nowString)) {
                errorMessage = "Student musi mieć co najmniej 18 lat"
            }
        }

        if (fieldName === 'email'){
            if(!checkRequired(fieldValue)){
                errorMessage = "To pole jest wymagane"
            } else if (!checkTextLengthRange(fieldValue, 5, 60)){
                errorMessage = "To pole musi zawierać od 5 do 60 znaków"
            } else if(!checkEmail(fieldValue)){
                errorMessage = "To pole musi zawierać poprawny adres email"
            }
        }
        return errorMessage;

    }

    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm();
        if(isValid) {
            const
                stud = this.state.stud,
                currentFormMode = this.state.formMode
            let
                promise,
                response;
            if(currentFormMode === formMode.NEW) {
                promise = addStudentApiCall(stud);
            } else if (currentFormMode === formMode.EDIT) {
                console.log(stud);
                const studId = this.state.studId;
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
                                for(const i in data) {
                                    const errorItem = data[i];
                                    const errorMessage = errorItem.message;
                                    const fieldName = errorItem.path;
                                    const errors = {...this.state.errors};
                                    errors[fieldName] = errorMessage;
                                    this.setState({
                                        errors: errors,
                                        error: null
                                    });
                                }
                            } else {
                                this.setState({
                                    redirect: true
                                });
                            }
                        },
                        error => {
                            this.setState({
                                error
                            });
                            console.log(error);
                        }
                    )
            }
        }
    }

    validateForm = () => {
        const stud = this.state.stud;
        const errors = this.state.errors;
        for(const fieldName in stud){
            const fieldValue = stud[fieldName];
            const errorMessage = this.validateField(fieldName, fieldValue);
            errors[fieldName] = errorMessage;
        }
        this.setState({
            errors: errors
        });
        return !this.hasErrors();
    }

    hasErrors = () => {
        const errors = this.state.errors;
        for(const errorField in this.state.errors) {
            if(errors[errorField].length > 0){
                return true;
            }
        }
        return false;
    }
}

export default StudentForm