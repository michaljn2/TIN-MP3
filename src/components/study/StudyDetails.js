import React from "react";
import {Link} from "react-router-dom";
import {getStudyByIdApiCall} from "../../apiCalls/studyApiCalls";
import StudyDetailsData from "./StudyDetailsData";
import {withTranslation} from "react-i18next";

class StudyDetails extends React.Component {
    constructor(props) {
        super(props);
        let {studyId} = props.match.params;
        this.state = {
            studyId: studyId,
            study: null,
            error: null,
            isLoaded: false
        }
    }

    fetchStudyDetails = () => {
        getStudyByIdApiCall(this.state.studyId)
            .then(res => res.json())
            .then(
                data => {
                    if(data.message){
                        this.setState({
                            study: null,
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

    componentDidMount() {
        this.fetchStudyDetails()
    }

    render() {
        const {study, error, isLoaded, message} = this.state;
        let content;
        const {t} = this.props;

        if(error){
            content = <p>{t('common.error')}: {error.message}</p>
        } else if (!isLoaded){
            content = <p>{t('study.form.details.loading')}...</p>
        } else if(message) {
            content = <p>{message}</p>
        } else {
            content = <StudyDetailsData studyData={study} />
        }

        return(
            <main>
                <h2>{t('study.form.details.pageTitle')}</h2>
                {content}
                <div className="form-buttons">
                    <Link to="/studies" className="form-buttons-back">{t('form.actions.return')}</Link>
                </div>
            </main>
        )
    }

}
export default withTranslation() (StudyDetails)