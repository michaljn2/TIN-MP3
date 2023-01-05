import React from "react";
import {Link} from "react-router-dom";
import {getStudentByIdApiCall, getStudentsApiCall} from "../../apiCalls/studentApiCalls";
import {getGroupsApiCall} from "../../apiCalls/groupApiCalls";
import formMode from '../../helpers/formHelper'
import {checkRequired, checkTextLengthRange, checkIndex,
    checkEmail, checkDate, checkDateBefore} from '../../helpers/validationCommon';

class StudyForm extends React.Component {
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

}

export default StudyForm