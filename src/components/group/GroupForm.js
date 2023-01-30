import React from "react";
import formMode from '../../helpers/formHelper'
import {checkRequired, checkInteger, checkCourse, checkShortcut,
    checkNumberRange} from '../../helpers/validationCommon';
import FormInput from "../form/FormInput";
import FormButtons from "../form/FormButtons";
import {getGroupByIdApiCall} from "../../apiCalls/groupApiCalls";
import {addGroupApiCall, updateGroupApiCall} from "../../apiCalls/groupApiCalls";
import {withTranslation} from "react-i18next";
import {formValidationKeys} from "../../helpers/formHelper";

class GroupForm extends React.Component {
    constructor(props) {
        super(props);
        const paramsGroupId = props.match.params.groupId;
        const currentFormMode = paramsGroupId ? formMode.EDIT : formMode.NEW;

        this.state = {
            groupId: paramsGroupId,
            group: {
                shortcut: '',
                course: '',
                faculty: '',
                capacity: ''
            },
            errors:{
                shortcut: '',
                course: '',
                faculty: '',
                capacity: ''
            },
            formMode: currentFormMode,
            redirect: false,
            error: null
        }
    }

    fetchGroupDetails = () => {
        getGroupByIdApiCall(this.state.groupId)
            .then(res => res.json())
            .then(
                data => {
                    if(data.message){
                        this.setState({
                            message: data.message
                        })
                    } else {
                        this.setState({
                            group: data,
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

    componentDidMount() {
        const currentFormMode = this.state.formMode;
        if (currentFormMode === formMode.EDIT){
            this.fetchGroupDetails()
        }
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        const group = {...this.state.group}
        group[name] = value;

        const errorMessage = this.validateField(name, value);
        const errors = {...this.state.errors};
        errors[name] = errorMessage;

        this.setState({
            group: group,
            errors: errors
        })
    }

    validateField = (fieldName, fieldValue) => {
        const {t} = this.props;
        let errorMessage = '';
        if(fieldName === 'shortcut'){
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.required;
            } else if (!checkShortcut(fieldValue)) {
                errorMessage = formValidationKeys.shortcut;
            }
        }

        if(fieldName === 'course'){
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.required;
            } else if (!checkCourse(fieldValue)) {
                errorMessage = formValidationKeys.course;
            }
        }

        if(fieldName === 'capacity'){
            if (!checkRequired(fieldValue)) {
                errorMessage = formValidationKeys.required;
            } else if (!checkInteger(fieldValue)) {
                errorMessage = formValidationKeys.capacityInteger;
            } else if (!checkNumberRange(fieldValue, 1,150)) {
                errorMessage = formValidationKeys.capacityRange;
            }
        }

        return errorMessage;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const isValid = this.validateForm();
        if(isValid) {
            const
                group = this.state.group,
                currentFormMode = this.state.formMode
            let
                promise,
                response;
            if(currentFormMode === formMode.NEW) {
                promise = addGroupApiCall(group);
            } else if (currentFormMode === formMode.EDIT) {
                console.log(group);
                const groupId = this.state.groupId;
                promise = updateGroupApiCall(groupId, group);
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
        const group = this.state.group;
        const errors = this.state.errors;
        for(const fieldName in group){
            const fieldValue = group[fieldName];
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
        const {t} = this.props;
        if(redirect){
            const currentFormMode = this.state.formMode;
            const notice = currentFormMode === formMode.NEW ? 'Pomyślnie dodano nową grupę' : 'Pomyślnie zaktualizowano dane grupy';
            return(
                <Redirect to={{
                    pathname: "/groups/",
                    state: {
                        notice: notice
                    }
                }} />
            )
        }
        const errorsSummary = this.hasErrors() ? t('validation.invalidForm') : '';
        const fetchError = this.state.error ? t('common.error')+`: ${this.state.error.message}` : '';
        const pageTitle = this.state.formMode === formMode.NEW ? t('group.form.add.pageTitle') : t('group.form.edit.pageTitle');

        const globalErrorMessage = errorsSummary || fetchError || this.state.message;
        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={this.handleSubmit}>
                    <FormInput
                        type="text"
                        label={t('group.fields.shortcut')}
                        required
                        error={this.state.errors.shortcut}
                        name="shortcut"
                        placeholder={t('group.form.placeholder.shortcut')}
                        onChange={this.handleChange}
                        value={this.state.group.shortcut}
                    />
                    <FormInput
                        type="text"
                        label={t('group.fields.course')}
                        required
                        error={this.state.errors.course}
                        name="course"
                        placeholder={t('group.form.placeholder.course')}
                        onChange={this.handleChange}
                        value={this.state.group.course}
                    />
                    <FormInput
                        type="text"
                        label={t('group.fields.faculty')}
                        error={this.state.errors.faculty}
                        name="faculty"
                        placeholder={t('group.form.placeholder.faculty')}
                        onChange={this.handleChange}
                        value={this.state.group.faculty}
                    />
                    <FormInput
                        type="number"
                        label={t('group.fields.capacity')}
                        required
                        error={this.state.errors.capacity}
                        name="capacity"
                        placeholder=""
                        onChange={this.handleChange}
                        value={this.state.group.capacity}
                    />
                    <FormButtons
                        formMode={this.state.formMode}
                        error={globalErrorMessage}
                        cancelPath="/groups"
                    />
                </form>
            </main>
        )
    }
}

export default withTranslation() (GroupForm)