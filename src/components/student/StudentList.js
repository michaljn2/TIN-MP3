import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {getStudentsApiCall} from "../../apiCalls/studentApiCalls";
import StudentListTable from "./StudentListTable";
import {useTranslation} from "react-i18next";
import {isAuthenticated} from "../../helpers/authHelper";

function StudentList() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [students, setStudents] = useState([]);

    function fetchStudentList(){
        getStudentsApiCall()
            .then(res => res.json())
            .then(
                data => {
                   setIsLoaded(true);
                   setStudents(data);
                },
                error => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }

   useEffect(() => {
       fetchStudentList()
   }, []);


    const {t} = useTranslation();
    let content;
    if (error) {
        content = <p>{t('common.error')}: {error.message}</p>
    } else if (!isLoaded) {
        content = <p>{t('stud.list.loading')}...</p>
    } else {
        content = <StudentListTable studList={students}/>
    }
    return (
        <main>
            <h2>{t('stud.list.pageTitle')}</h2>
            {content}
            {isAuthenticated() &&
            <p className="form-buttons">
                <Link to="/students/add" className="button-add">{t('stud.list.addNew')}</Link>
            </p>
            }
        </main>
    )

}

export default StudentList