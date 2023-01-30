import React, {useEffect, useState} from "react";
import {getStudentByIdApiCall} from "../../apiCalls/studentApiCalls";
import {Link, useParams} from 'react-router-dom'
import StudentDetailsData from "./StudentDetailsData";
import {useTranslation} from "react-i18next";

function StudentDetails(){
   const [stud, setStud] = useState(null);
   const [error, setError] = useState(null);
   const [isLoaded, setIsLoaded] = useState(false);
   const [message, setMessage] = useState(null);

   let {studId} = useParams();
   studId = parseInt(studId);

    function fetchStudentDetails(){
        getStudentByIdApiCall(studId)
            .then(res => res.json())
            .then(
                data => {
                    if(data.message) {
                        setStud(null);
                        setMessage(data.message);
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
        fetchStudentDetails()
    }, []);

    const {t} = useTranslation();
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
export default StudentDetails