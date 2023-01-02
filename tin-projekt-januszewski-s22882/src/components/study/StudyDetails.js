import React from "react";
import {Link, useParams} from "react-router-dom";
import {getStudyByIdApiCall} from "../../apiCalls/studyApiCalls";

function StudyDetails() {
    let { studyId } = useParams()
    studyId = parseInt(studyId)
    const study = getStudyByIdApiCall(studyId)

    return (
        <main>
            <h2>Szczegóły przynależności</h2>
            <p>Student: {study.student.firstName + " " + study.student.lastName + " " + study.student.index}</p>
            <p>Grupa: {study.group.shortcut} </p>
            <p>ITN: {(study.itn === 1) ? "tak" : "nie"} </p>
            <p>Ocena: {study.grade ? study.grade : "brak"} </p>
            <div className="form-buttons">
                <Link to="/studies" className="form-buttons-back">Powrót</Link>
            </div>
        </main>
    )
}
export default StudyDetails