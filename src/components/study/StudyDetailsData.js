import React from "react";

function StudyDetailsData(props) {
    const study = props.studyData;
    return (
        <React.Fragment>
            <p>Student: {study.student.firstName + " " + study.student.lastName + " " + study.student.index} </p>
            <p>Grupa: {study.group.shortcut} </p>
            <p>ITN: {(study.itn === 1) ? "tak" : "nie"} </p>
            <p>Ocena: {study.grade ? study.grade : "brak"} </p>
        </React.Fragment>
    )
}

export default StudyDetailsData