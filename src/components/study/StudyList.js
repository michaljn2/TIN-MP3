import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {getStudiesApiCall} from "../../apiCalls/studyApiCalls";
import StudyListTable from "./StudyListTable";
import {useTranslation} from "react-i18next";
import {isAuthenticated} from "../../helpers/authHelper";

function StudyList(){

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [studies, setStudies] = useState([]);

    function fetchStudyList(){
        getStudiesApiCall()
            .then(res => res.json())
            .then(
                data => {
                    setIsLoaded(true);
                    setStudies(data);
                },
                error => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }

    useEffect(() => {
        fetchStudyList()
    }, []);


    let content;
    const {t} = useTranslation();

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

export default StudyList