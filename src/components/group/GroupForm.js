import React from "react";
import formMode from '../../helpers/formHelper'
import {checkRequired, checkInteger, checkCourse, checkShortcut,
    checkNumberRange} from '../../helpers/validationCommon';
import {Redirect} from "react-router-dom";
import FormInput from "../form/FormInput";
import FormButtons from "../form/FormButtons";
import {getGroupByIdApiCall} from "../../apiCalls/groupApiCalls";
import {addGroupApiCall, updateGroupApiCall} from "../../apiCalls/groupApiCalls";

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
        let errorMessage = '';
        if(fieldName === 'shortcut'){
            if (!checkRequired(fieldValue)) {
                errorMessage = 'Pole jest wymagane'
            } else if (!checkShortcut(fieldValue)) {
                errorMessage = "Skrót zawiera nazwę semestru, skrót przedmiotu oraz numer grupy oddzielone '-'"
            }
        }

        if(fieldName === 'course'){
            if (!checkRequired(fieldValue)) {
                errorMessage = 'Pole jest wymagane'
            } else if (!checkCourse(fieldValue)) {
                errorMessage = "To pole zawiera 2-3 duże litery"
            }
        }

        if(fieldName === 'capacity'){
            if (!checkRequired(fieldValue)) {
                errorMessage = "Pole jest wymagane"
            } else if (!checkInteger(fieldValue)) {
                errorMessage = "To pole jest liczbą całkowitą"
            } else if (!checkNumberRange(fieldValue, 1,150)) {
                errorMessage = "Liczba miejsc musi być między 1 a 150"
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
        const errorsSummary = this.hasErrors() ? 'Formularz zawiera błędy' : '';
        const fetchError = this.state.error ? `Błąd: ${this.state.error.message}` : '';
        const pageTitle = this.state.formMode === formMode.NEW ? 'Dodawanie nowej grupy' : 'Edycja grupy';

        const globalErrorMessage = errorsSummary || fetchError || this.state.message;
        return (
            <main>
                <h2>{pageTitle}</h2>
                <form className="form" onSubmit={this.handleSubmit}>
                    <FormInput
                        type="text"
                        label="Skrót"
                        required
                        error={this.state.errors.shortcut}
                        name="shortcut"
                        placeholder="np. 2021L-TIN-19c"
                        onChange={this.handleChange}
                        value={this.state.group.shortcut}
                    />
                    <FormInput
                        type="text"
                        label="Przedmiot"
                        required
                        error={this.state.errors.course}
                        name="course"
                        placeholder="np. TIN"
                        onChange={this.handleChange}
                        value={this.state.group.course}
                    />
                    <FormInput
                        type="text"
                        label="Specjalizacja"
                        error={this.state.errors.faculty}
                        name="faculty"
                        placeholder="np. Bazy danych"
                        onChange={this.handleChange}
                        value={this.state.group.faculty}
                    />
                    <FormInput
                        type="number"
                        label="Liczba miejsc"
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

export default GroupForm