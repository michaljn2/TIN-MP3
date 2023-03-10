import React from "react";
import {getStudentsApiCall} from "../../apiCalls/studentApiCalls";
import {getGroupsApiCall} from "../../apiCalls/groupApiCalls";
import {getStudyByIdApiCall, addStudyApiCall, updateStudyApiCall} from "../../apiCalls/studyApiCalls";
import formMode from '../../helpers/formHelper'
import {checkRequired} from '../../helpers/validationCommon';
import FormInput from "../form/FormInput";
import FormButtons from "../form/FormButtons";
import FormSelect from "../form/FormSelect";
import {withTranslation} from "react-i18next";

class StudyForm extends React.Component {
    constructor(props) {
        super(props);
        const paramsStudyId = props.match.params.studyId;
        const currentFormMode = paramsStudyId ? formMode.EDIT : formMode.NEW;

        this.state = {
            studyId: paramsStudyId,
            study: {
                student_id: '',
                group_id: '',
                itn: '',
                grade: ''
            },
            errors:{
                student_id: '',
                group_id: '',
                itn: '',
                grade: ''
            },
            formMode: currentFormMode,
            redirect: false,
            error: null,
            gradeOptions: [],
            studentOptions: [],
            groupOptions: []
        }
    }

    fetchStudyDetails = () => {
        getStudyByIdApiCall(this.state.studyId)
            .then(res => res.json())
            .then(
                data => {
                    if(data.message){
                        this.setState({
                            message: data.message
                        })
                    } else {
                        this.setState({
                            study: data,
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

    fetchGradeOptions = () => {
        const {t} = this.props;
        this.setState({
            gradeOptions: [
                {label: t('study.form.selectGrade'), value: ''},
                {label: "2.0", value: '2.0'},
                {label: "3.0", value: '3.0'},
                {label: "3.5", value: '3.5'},
                {label: "4.0", value: '4.0'},
                {label: "4.5", value: '4.5'},
                {label: "5.0", value: '5.0'}
            ]
        });
    }

    fetchStudentOptions = () => {
        const {t} = this.props;
        getStudentsApiCall()
            .then(res => res.json())
            .then(data => {
                var newList = data.map(stud => ({
                    label: stud.firstName + " " + stud.lastName + " " + stud.index,
                    value: stud._id
                }))
                newList.unshift({
                    label: t('study.form.selectStudent'),
                    value: ''
                });
                return newList;
            })
            .then(list => {
                this.setState({
                    studentOptions: list
                })
            })
    }

    fetchGroupOptions = () => {
        const {t} = this.props;
        getGroupsApiCall()
            .then(res => res.json())
            .then(data => {
                var newList = data.map(group => ({
                    label: group.shortcut,
                    value: group._id
                }));
                newList.unshift({
                    label: t('study.form.selectGroup'),
                    value: ''
                });
                return newList;
            })
            .then(list => {
                this.setState({
                    groupOptions: list
                })
            })
    }


    componentDidMount = () => {
        const currentFormMode = this.state.formMode;
        if(currentFormMode === formMode.EDIT){
            this.fetchStudyDetails();
        }
        this.fetchGradeOptions();
        this.fetchStudentOptions();
        this.fetchGroupOptions();
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        const study = {...this.state.study}
        // pole checkbox musi byc zmieniane recznie
        if (name === 'itn'){
            if (study['itn'] === true){
                study['itn'] = false;
            } else {
                study['itn'] = true;
            }
        } else {
            study[name] = value;
        }

        const errorMessage = this.validateField(name, value);
        const errors = {...this.state.errors};
        errors[name] = errorMessage;

        this.setState({
            study: study,
            errors: errors
        })
    }

    validateField = (fieldName, fieldValue) => {
        let errorMessage = '';
        const {t} = this.props;
        if(fieldName === 'student_id'){
            if (!checkRequired(fieldValue)) {
                errorMessage = t('validation.required')
            }
        }

        if(fieldName === 'group_id'){
            if (!checkRequired(fieldValue)) {
                errorMessage = t('validation.required')
            }
        }
        return errorMessage;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm();
        if(isValid) {
            const
                study = this.state.study,
                currentFormMode = this.state.formMode
            let
                promise,
                response;
            if(currentFormMode === formMode.NEW) {
                promise = addStudyApiCall(study);
            } else if (currentFormMode === formMode.EDIT) {
                console.log(study);
                const studyId = this.state.studyId;
                promise = updateStudyApiCall(studyId, study);
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
        const study = this.state.study;
        const errors = this.state.errors;
        for(const fieldName in study){
            const fieldValue = study[fieldName];
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

    render() {
        const {redirect} = this.state;
        const{t} = this.props;
        if(redirect){
            const currentFormMode = this.state.formMode;
            const notice = currentFormMode === formMode.NEW ? 'Pomy??lnie dodano now?? przynale??no????' : 'Pomy??lnie zaktualizowano przynale??no????';
            return(
                <Redirect to={{
                    pathname: "/studies/",
                    state: {
                        notice: notice
                    }
                }} />
            )
        }
        const errorsSummary = this.hasErrors() ? t('validation.invalidForm') : '';
        const fetchError = this.state.error ? t('common.error')+`: ${this.state.error.message}` : '';
        const pageTitle = this.state.formMode === formMode.NEW ? t('study.form.add.pageTitle') : t('study.form.edit.pageTitle');

        const globalErrorMessage = errorsSummary || fetchError || this.state.message;
        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={this.handleSubmit}>
                    <FormSelect
                        label={t('study.fields.student')}
                        required
                        error={this.state.errors.student_id}
                        name="student_id"
                        onChange={this.handleChange}
                        value={this.state.study.student_id}
                        options={this.state.studentOptions}
                    />
                    <FormSelect
                        label={t('study.fields.group')}
                        required
                        error={this.state.errors.group_id}
                        name="group_id"
                        onChange={this.handleChange}
                        value={this.state.study.group_id}
                        options={this.state.groupOptions}
                    />
                    <FormInput
                        type="checkbox"
                        label={t('study.fields.itn')}
                        error={this.state.errors.itn}
                        name="itn"
                        onChange={this.handleChange}
                        value={this.state.study.itn}
                        checked={this.state.study.itn === true}
                    />
                    <FormSelect
                        label={t('study.fields.grade')}
                        error={this.state.errors.grade}
                        name="grade"
                        onChange={this.handleChange}
                        value={this.state.study.grade}
                        options={this.state.gradeOptions}
                    />
                    <FormButtons
                        formMode={this.state.formMode}
                        error={globalErrorMessage}
                        cancelPath="/studies"
                    />
                </form>
            </main>
        )
    }
}
export default withTranslation() (StudyForm)