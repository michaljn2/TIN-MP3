import React from "react";
import {getStudentByIdApiCall} from "../../apiCalls/studentApiCalls";
import {Link} from 'react-router-dom'
import StudentDetailsData from "./StudentDetailsData";
import {withTranslation} from "react-i18next";

class StudentDetails extends React.Component{
    constructor(props) {
        super(props);
        let {studId} = this.props.match.params;
        this.state = {
            studId: studId,
            stud: null,
            error: null,
            isLoaded: false,
            message: null
        }
    }

    fetchStudentDetails = () => {
        getStudentByIdApiCall(this.state.studId)
            .then(res => res.json())
            .then(
                data => {
                    if(data.message) {
                        this.setState({
                            stud: null,
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

    componentDidMount() {
        this.fetchStudentDetails()
    }

    render() {
        const {t} = this.props;
        const {stud, error, isLoaded, message} = this.state;
        let content;

        if(error) {
            content = <p>{t('common.error')}: {error.message}</p>
        } else if (!isLoaded) {
            content = <p>{t('stud.form.details.loading')}</p>
        } else if (message) {
            content = <p>{message}</p>
        } else {
            content = <StudentDetailsData studData = {stud}/>
        }

        return (
            <main>
                <h2>{t('stud.form.details.pageTitle')}</h2>
                {content}
                <div className="form-buttons">
                    <Link to="/students" className="form-buttons-back">{t('form.actions.return')}</Link>
                </div>
            </main>
        )
    }
}
export default withTranslation() (StudentDetails)