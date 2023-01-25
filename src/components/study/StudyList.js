import React from "react";
import {Link} from "react-router-dom";
import {getStudiesApiCall} from "../../apiCalls/studyApiCalls";
import StudyListTable from "./StudyListTable";
import {withTranslation} from "react-i18next";
import {isAuthenticated} from "../../helpers/authHelper";

class StudyList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            studies: []
        }
    }

    fetchStudyList = () => {
        getStudiesApiCall()
            .then(res => res.json())
            .then(
                data => {
                    this.setState({
                        isLoaded: true,
                        studies: data
                    });
                },
                error => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    componentDidMount() {
        this.fetchStudyList()
    }

    render() {
        const {error, isLoaded, studies} = this.state;
        let content;
        const {t} = this.props;

        if (error){
            content = <p>{t('common.error')}: {error.message}</p>
        } else if (!isLoaded){
            content = <p>{t('study.list.loading')}</p>
        } else {
            content = <StudyListTable studiesList={studies} />
        }

        return(
            <main>
                <h2>{t('study.list.title')}</h2>
                {content}
                {isAuthenticated() &&
                <p className="form-buttons">
                    <Link to="/studies/add" className="button-add">{t('study.form.add.btnLabel')}</Link>
                </p>
                }
            </main>
        )
    }

}

export default withTranslation() (StudyList)